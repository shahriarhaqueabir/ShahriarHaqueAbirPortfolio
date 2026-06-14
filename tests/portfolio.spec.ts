import { test, expect } from "@playwright/test";

test.describe("Shahriar Haque Abir portfolio E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    // Wait for boot screen and enter
    await page.getByTestId("enter-portfolio").click();
  });

  test("loads the homepage with current portfolio identity", async ({ page }) => {
    await expect(page).toHaveTitle(/Shahriar Haque Abir/);
    await expect(page.getByRole("heading", { name: /Shahriar Haque Abir Portfolio/i })).toBeVisible();
    // Match the actual tagline from data.ts
    await expect(page.getByText(/Technical Operations Engineer | Integration Engineer/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /View Case Studies/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Download CV/i })).toHaveAttribute("href", "/shahriar-haque-abir-cv.pdf");
    await expect(page.getByRole("button", { name: /Connect With Me/i })).toBeVisible();
  });

  test("navigates through primary portfolio views", async ({ page }) => {
    const protocols = [
      { button: /Home/i, expected: /Technical Operations Engineer \| Solutions Engineer/ },
      { button: /About/i, expected: /It's good to catch up/ },
      { button: /Projects/i, expected: /Featured Projects/ },
      { button: /Experience/i, expected: /Experience/ },
      { button: /Skills/i, expected: /Capability Map/ },
      { button: /Stats/i, expected: /Life's sky/ },
      { button: /Contact/i, expected: /Let's talk/ },
    ];

    for (const protocol of protocols) {
      const btn = page.getByRole("button", { name: protocol.button }).first();
      await expect(btn).toBeVisible({ timeout: 10000 });
      await btn.click();
      await expect(page.getByText(protocol.expected).first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("resets content scroll position after navigation", async ({ page }) => {
    const contentScroll = page.getByTestId("content-scroll");

    await page
      .getByRole("button", { name: /Experience/i })
      .first()
      .click();

    // Ensure content has loaded and is scrollable
    await expect(page.getByText(/Professional Influence Map/i)).toBeVisible();

    // Use evaluate to force a scroll and wait for it to take effect
    await contentScroll.evaluate(async (element) => {
      element.scrollTop = 2000;
    });

    // Verify it actually scrolled
    await expect.poll(async () => contentScroll.evaluate((element) => element.scrollTop)).toBeGreaterThan(100);

    await page
      .getByRole("button", { name: /Projects/i })
      .first()
      .click();

    // Wait for the scroll to reset to zero. In CI, we give it a bit more time.
    await expect
      .poll(async () => contentScroll.evaluate((element) => element.scrollTop), {
        timeout: 10000,
      })
      .toBe(0);

    await expect(page.getByText(/Featured Projects/).first()).toBeVisible();
  });

  test("routes free-form questions to the fallback engine instead of hijacking as navigation", async ({ page }) => {
    // Input is always visible in the footer — no need to enable AI
    await page.getByPlaceholder(/Ask a question/i).fill("show me his contact details");
    await page.keyboard.press("Enter");
    // The panel opens and the fallback engine responds with contact info
    // (previously this was hijacked by the command router as a navigation command)
    await expect(page.getByText(/shahriarhaque90@gmail\.com/i).first()).toBeVisible({ timeout: 10000 });
  });
});
