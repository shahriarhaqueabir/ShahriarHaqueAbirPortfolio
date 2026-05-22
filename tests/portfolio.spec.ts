import { test, expect } from '@playwright/test';

test.describe('Shahriar Haque Abir portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByTestId('enter-portfolio').click();
  });

  test('loads the homepage with current portfolio identity', async ({ page }) => {
    await expect(page).toHaveTitle(/Shahriar Haque Abir/);
    await expect(page.getByText("Shahriar Haque Abir")).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Lead Technical Solution')).toBeVisible();
    await expect(page.getByRole('button', { name: /View Case Studies/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Download CV/i })).toHaveAttribute('href', '/shahriar-haque-abir-cv.pdf');
    await expect(page.getByRole('button', { name: /Connect With Me/i })).toBeVisible();
  });

  test('navigates through primary portfolio views', async ({ page }) => {
    const protocols = [
      { button: /Home/i, expected: /Lead Technical Solution Consultant/ },
      { button: /Blog/i, expected: /Owner-authored updates/ },
      { button: /About/i, expected: /It's good to catch up/ },
      { button: /Projects/i, expected: /Selected Work/ },
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
    await contentScroll.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect.poll(async () => contentScroll.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);

    await page.getByRole('button', { name: /Projects/i }).first().click();
    await expect.poll(async () => contentScroll.evaluate((element) => element.scrollTop)).toBe(0);
    await expect(page.getByText(/Selected Work/).first()).toBeVisible();
  });

  test('opens a project case study', async ({ page }) => {
    await page.getByRole('button', { name: /Projects/i }).first().click();
    await page.getByTestId('project-card-0').click();
    await expect(page.getByText(/Showcase Project/i).last()).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: /Pathfinder International/i })).toBeVisible();
  });

  test('routes typed commands without relying on the local model', async ({ page }) => {
    await page.getByPlaceholder(/Ask about Shahriar|Loading guide|Search the portfolio/i).fill('show me his contact details');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Let's talk/)).toBeVisible();
  });
});
