import { test, expect } from '@playwright/test';

test.describe('Quiz', () => {
  // given
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz');
  });

  test('should display quiz question and allow answering', async ({ page }) => {
    // given
    const questionText = await page.getByRole('heading', { level: 1 }).textContent();
    const options = await page.getByRole('button').all();
    
    // when
    await options[0].click();
    
    // then
    const newQuestionText = await page.getByRole('heading', { level: 1 }).textContent();
    expect(newQuestionText).not.toBe(questionText);
  });

  test('should complete quiz after 10 questions', async ({ page }) => {
    // given
    const options = await page.getByRole('button').all();
    
    // when
    for (let i = 0; i < 10; i++) {
      await options[0].click();
      if (i < 9) {
        await page.waitForTimeout(100); // wait for next question
      }
    }
    
    // then
    await expect(page.getByText('Quiz Summary')).toBeVisible();
    await expect(page.getByText('Play Again')).toBeVisible();
  });

  test('should switch language and maintain quiz state', async ({ page }) => {
    // given
    const languageButton = await page.getByRole('button', { name: 'PL' });
    const questionText = await page.getByRole('heading', { level: 1 }).textContent();
    
    // when
    await languageButton.click();
    
    // then
    const newQuestionText = await page.getByRole('heading', { level: 1 }).textContent();
    expect(newQuestionText).not.toBe(questionText);
  });

  test('should reset quiz when clicking Play Again', async ({ page }) => {
    // given
    const options = await page.getByRole('button').all();
    for (let i = 0; i < 10; i++) {
      await options[0].click();
      if (i < 9) {
        await page.waitForTimeout(100);
      }
    }
    
    // when
    await page.getByText('Play Again').click();
    
    // then
    await expect(page.getByText('Quiz Summary')).not.toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}); 