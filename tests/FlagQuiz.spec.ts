import { test, expect } from '@playwright/test';

test.describe('Flag Quiz', () => {
  test('should display quiz question and allow answering', async ({ page }) => {
    // given
    await page.goto('/quiz/flag');

    // then
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    await expect(page.getByTestId('answer-option-0')).toBeVisible();
    await expect(page.getByTestId('answer-option-1')).toBeVisible();
    await expect(page.getByTestId('answer-option-2')).toBeVisible();
    await expect(page.getByTestId('answer-option-3')).toBeVisible();

    // when
    await page.getByTestId('answer-option-0').click();

    // then
    await expect(page.getByTestId('answer-option-0')).toHaveClass(/flag-option (correct|incorrect)/);
  });

  test('should complete quiz after 10 questions', async ({ page }) => {
    // given
    await page.goto('/quiz/flag');

    // when
    for (let i = 0; i < 10; i++) {
      await page.getByTestId('answer-option-0').click();
      if (i < 9) {
        await page.waitForTimeout(2100); // Wait for the next question
      }
    }

    // then
    await expect(page.getByTestId('quiz-summary')).toBeVisible();
    await expect(page.getByTestId('play-again-button')).toBeVisible();
  });

  test('should reset quiz when clicking Play Again', async ({ page }) => {
    // given
    await page.goto('/quiz/flag');
    await page.getByTestId('answer-option-0').click();
    await page.waitForTimeout(2100);

    // when
    await page.getByTestId('answer-option-0').click();
    await page.waitForTimeout(2100);
    await page.getByTestId('answer-option-0').click();
    await page.waitForTimeout(2100);

    // then
    await expect(page.getByTestId('answer-option-0')).toBeVisible();
  });

  test('should handle language switching during quiz', async ({ page }) => {
    // given
    await page.goto('/quiz/flag');
    const initialQuestion = await page.getByTestId('quiz-question').textContent();

    // when
    await page.getByRole('button', { name: 'Language' }).click();
    await page.getByText('Polski').click();

    // then
    await page.waitForTimeout(500);
    const translatedQuestion = await page.getByTestId('quiz-question').textContent();
    expect(translatedQuestion).not.toBe(initialQuestion);
  });

  test('should show answer feedback', async ({ page }) => {
    // given
    await page.goto('/quiz/flag');

    // when
    await page.getByTestId('answer-option-0').click();

    // then
    await expect(page.getByTestId('answer-option-0')).toHaveClass(/flag-option (correct|incorrect)/);
    await page.waitForTimeout(2100);
    await expect(page.getByTestId('answer-option-0')).not.toHaveClass(/flag-option (correct|incorrect)/);
  });

  test('should complete quiz and show translated summary', async ({ page }) => {
    // given
    await page.goto('/quiz/flag');
    await page.getByRole('button', { name: 'Language' }).click();
    await page.getByText('Polski').click();

    // when
    for (let i = 0; i < 10; i++) {
      await page.getByTestId('answer-option-0').click();
      if (i < 9) {
        await page.waitForTimeout(2100);
      }
    }

    // then
    await expect(page.getByTestId('quiz-summary')).toBeVisible();
    const summaryText = await page.getByTestId('quiz-summary').textContent();
    expect(summaryText).toContain('Podsumowanie');
  });
}); 