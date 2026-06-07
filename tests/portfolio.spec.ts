import { test, expect } from '@playwright/test';

test.describe('Shahriar Haque Abir portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Wait for boot screen and enter
    await page.getByTestId('enter-portfolio').click();
  });

  test('loads the homepage with current portfolio identity', async ({ page }) => {
    await expect(page).toHaveTitle(/Shahriar Haque Abir/);
    await expect(page.getByRole('heading', { name: /Shahriar Haque Abir Portfolio/i })).toBeVisible();
    // Match the actual tagline from data.ts
    await expect(page.getByText(/Technical Operations Engineer | Integration Engineer/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /View Case Studies/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Download CV/i })).toHaveAttribute('href', '/shahriar-haque-abir-cv.pdf');
    await expect(page.getByRole('button', { name: /Connect With Me/i })).toBeVisible();
  });

  test('navigates through primary portfolio views', async ({ page }) => {
    const protocols = [
      { button: /Home/i, expected: /Integration Engineer \| Application Support/ },
      { button: /Blog/i, expected: /Owner-authored updates/ },
      { button: /About/i, expected: /It's good to catch up/ },
      { button: /Projects/i, expected: /Featured Projects/ },
      { button: /Experience/i, expected: /Experience/ },
      { button: /Skills/i, expected: /Capability Map/ },
      { button: /Stats/i, expected: /Life's sky/ },
      { button: /Contact/i, expected: /Let's talk/ },
    ];
    
    for (const protocol of protocols) {
      await page.getByRole('button', { name: protocol.button }).first().click();
      await expect(page.getByText(protocol.expected).first()).toBeVisible();
    }
  });

  test('resets content scroll position after navigation', async ({ page }) => {
    const contentScroll = page.getByTestId('content-scroll');

    await page.getByRole('button', { name: /Experience/i }).first().click();

    // Ensure content has loaded and is scrollable
    await expect(page.getByText(/Professional Influence Map/i)).toBeVisible();

    await contentScroll.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });

    // Check that it actually scrolled
    await expect.poll(async () => contentScroll.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);

    await page.getByRole('button', { name: /Projects/i }).first().click();

    // Wait for the scroll to reset
    await expect.poll(async () => contentScroll.evaluate((element) => element.scrollTop)).toBe(0);
    await expect(page.getByText(/Featured Projects/).first()).toBeVisible();
  });

  test('routes typed commands without relying on the local model', async ({ page }) => {
    // Open sidebar on mobile if needed, but here we just target the placeholder
    await page.getByPlaceholder(/Ask about Shahriar|Enable AI guide|Search the portfolio/i).fill('show me his contact details');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Let's talk/)).toBeVisible();
  });
});
