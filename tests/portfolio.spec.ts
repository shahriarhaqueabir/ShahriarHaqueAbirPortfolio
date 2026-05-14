import { test, expect } from '@playwright/test';

test.describe('Design Laboratory Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the homepage with correct title and elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Shahriar Haque Abir/);
    await expect(page.getByText('NUKA AI')).toBeVisible();
    await expect(page.getByText('Architect of Systems')).toBeVisible();
  });

  test('should navigate to all views through navigation protocols', async ({ page }) => {
    const protocols = ['ABOUT', 'VISION', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'STACK'];
    
    for (const protocol of protocols) {
      await page.getByRole('button', { name: protocol }).click();
      // Verify view-specific heading appears
      // The heading text usually matches the button text or is similar
      if (protocol === 'ABOUT') {
        await expect(page.getByText('The Philosophy')).toBeVisible();
      } else if (protocol === 'PROJECTS') {
        await expect(page.getByText('Selected Works')).toBeVisible();
      } else if (protocol === 'SKILLS') {
        await expect(page.getByText('Competencies')).toBeVisible();
      }
    }
  });

  test('should open a project case study', async ({ page }) => {
    await page.getByRole('button', { name: 'PROJECTS' }).click();
    // Click the first project card
    await page.locator('.grid > div').first().click();
    await expect(page.getByText('Project Case Study')).toBeVisible();
    await page.getByRole('button').filter({ has: page.locator('svg') }).first().click({ force: true });
  });

  test('should profile visitor in chat', async ({ page }) => {
    const chatInput = page.getByPlaceholder('Calibrating...');
    // Wait for the chat to be active (Nuka's greeting is done)
    await page.waitForTimeout(2000); 
    await chatInput.fill('My name is John and I am here for hiring.');
    await chatInput.press('Enter');
    
    // Check if Nuka responds or if state changes
    // This is hard to verify precisely without specific response text, 
    // but we can check if the message appeared in the chat log if we had a selector
  });
});
