import { test, expect } from '@playwright/test';

test.describe('Capital Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz/capital');
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
  });

  test('should display quiz question and allow answering', async ({ page }) => {
    // given
    const questionText = await page.getByTestId('quiz-question').getByRole('heading').first().textContent();
    const options = await page.getByTestId('answer-option-0').all();
    
    // when
    await page.waitForSelector('[data-testid="answer-option-0"]:not([disabled])', { timeout: 2000 });
    await options[0].click();
    await page.waitForTimeout(2100); // Wait for animation and state update
    
    // then
    const newQuestionText = await page.getByTestId('quiz-question').getByRole('heading').first().textContent();
    expect(newQuestionText).not.toBe(questionText);
  });

  test('should complete quiz after 10 questions', async ({ page }) => {
    // given
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 2000 });
    
    // when
    for (let i = 0; i < 10; i++) {
      await page.waitForSelector('[data-testid="answer-option-0"]:not([disabled])', { timeout: 2000 });
      await page.getByTestId('answer-option-0').click();
      await page.waitForTimeout(2100); // Wait for animation and state update
    }
    
    // then
    await expect(page.getByTestId('quiz-summary')).toBeVisible();
    await expect(page.getByTestId('play-again-button')).toBeVisible();
  });

  test('should reset quiz when clicking Play Again', async ({ page }) => {
    // given
    for (let i = 0; i < 10; i++) {
      await page.waitForSelector('[data-testid="answer-option-0"]:not([disabled])', { timeout: 2000 });
      await page.getByTestId('answer-option-0').click();
      await page.waitForTimeout(2100);
    }
    
    // when
    await page.getByTestId('play-again-button').click();
    
    // then
    await expect(page.getByTestId('quiz-summary')).not.toBeVisible();
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    const questionNumber = await page.getByRole('heading', { level: 4 }).textContent();
    expect(questionNumber).toContain('1/10');
  });

  test('should handle language switching during quiz', async ({ page }) => {
    // given
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for translations to load
    
    // then - check English translations
    const questionHeading = await page.getByTestId('quiz-question').getByRole('heading').first();
    await expect(questionHeading).toBeVisible();
    expect(await questionHeading.textContent()).toMatch(/question \d+\/10/i);
    
    // when - switch language
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByText('Polski').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // then - check Polish translations
    const questionHeadingPL = await page.getByTestId('quiz-question').getByRole('heading').first();
    await expect(questionHeadingPL).toBeVisible();
    expect(await questionHeadingPL.textContent()).toMatch(/pytanie \d+\/10/i);
  });

  test('should display flag in capital quiz', async ({ page }) => {
    // given
    await page.waitForLoadState('networkidle');
    
    // then
    const flag = page.getByTestId('country-flag');
    await expect(flag).toBeVisible();
    const flagSrc = await flag.getAttribute('src');
    expect(flagSrc).toMatch(/^\/flags\/.+\.svg$/);
  });

  test('should show answer feedback', async ({ page }) => {
    // given
    await page.waitForLoadState('networkidle');
    
    // when
    const options = await page.getByTestId(/answer-option-/).all();
    await options[0].click();
    await page.waitForTimeout(1000);
    
    // then
    await expect(page.locator('.answer-button.correct')).toBeVisible();
    const hasWrongButton = await page.locator('.answer-button.wrong').count() > 0;
    const hasCorrectButton = await page.locator('.answer-button.correct').count() > 0;
    expect(hasWrongButton || hasCorrectButton).toBe(true);
  });

  test('should complete quiz and show translated summary', async ({ page }) => {
    // given
    await page.waitForLoadState('networkidle');
    
    // when
    for (let i = 0; i < 10; i++) {
      await page.getByTestId('answer-option-0').click();
      await page.waitForTimeout(2100);
    }
    
    // then - check English translations
    await expect(page.getByTestId('quiz-summary')).toBeVisible();
    const summaryHeading = await page.getByTestId('quiz-summary').getByRole('heading').first();
    await expect(summaryHeading).toBeVisible();
    expect(await summaryHeading.textContent()).toMatch(/summary/i);
    await expect(page.getByText(/final score/i)).toBeVisible();
    
    // when - switch language
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByText('Polski').click();
    await page.waitForLoadState('networkidle');
    
    // then - check Polish translations
    const summaryHeadingPL = await page.getByTestId('quiz-summary').getByRole('heading').first();
    await expect(summaryHeadingPL).toBeVisible();
    expect(await summaryHeadingPL.textContent()).toMatch(/podsumowanie/i);
    await expect(page.getByText(/wynik końcowy/i)).toBeVisible();
  });
}); 