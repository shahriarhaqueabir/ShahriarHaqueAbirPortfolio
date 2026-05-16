import { test, expect } from '@playwright/test';

test.describe('Hawkward portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByTestId('enter-portfolio').click();
  });

  test('loads the homepage with current portfolio identity', async ({ page }) => {
    await expect(page).toHaveTitle(/Shahriar Haque Abir/);
    await expect(page.getByText("Shahriar's Portfolio")).toBeVisible();
    await expect(page.getByText('AI Enabled Portfolio')).toBeVisible();
    await expect(page.getByRole('button', { name: /View Projects/i })).toBeVisible();
  });

  test('navigates through primary portfolio views', async ({ page }) => {
    const protocols = [
      { button: /About/i, expected: /It's good to catch up/ },
      { button: /Projects/i, expected: /Selected Project Works/ },
      { button: /Experience/i, expected: /Experience/ },
      { button: /Skills/i, expected: /Competencies/ },
      { button: /Stats/i, expected: /Living metrics/ },
      { button: /Contact/i, expected: /Establish/ },
    ];
    
    for (const protocol of protocols) {
      await page.getByRole('button', { name: protocol.button }).first().click();
      await expect(page.getByText(protocol.expected).first()).toBeVisible();
    }
  });

  test('opens a project case study', async ({ page }) => {
    await page.getByRole('button', { name: /Projects/i }).first().click();
    await page.getByTestId('project-card-0').click();
    await expect(page.getByText('Project Case Study')).toBeVisible();
  });

  test('routes typed commands without relying on the local model', async ({ page }) => {
    await page.getByPlaceholder(/Execute command|Calibrating/i).fill('show me his contact details');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Establish/)).toBeVisible();
  });
});
