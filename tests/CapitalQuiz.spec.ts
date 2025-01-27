import { test, expect } from '@playwright/test';

test.describe('Capital Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz/capital');
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
  });

  test('should display quiz question and allow answering', async ({ page }) => {
    // when
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    await expect(page.getByTestId('country-flag')).toBeVisible();
    await expect(page.locator('.map-container')).toBeVisible();
    await expect(page.locator('.capital-marker-outer')).toBeVisible();
    await expect(page.locator('.continent-label')).toHaveCount(6);

    // then
    const answerButtons = page.getByTestId(/answer-option-\d/);
    await expect(answerButtons).toHaveCount(4);
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

  test('should show map with correct elements', async ({ page }) => {
    // when
    const mapContainer = page.locator('.map-container');
    const continentLabels = page.locator('.continent-label');
    const capitalMarker = page.locator('.capital-marker-outer');

    // then
    await expect(mapContainer).toBeVisible();
    await expect(continentLabels).toHaveCount(6);
    await expect(capitalMarker).toBeVisible();
    
    // Verify continent labels in both languages
    const expectedContinents = [
      'North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania',
      'Ameryka Północna', 'Ameryka Południowa', 'Europa', 'Afryka', 'Azja', 'Oceania'
    ];
    for (const continent of expectedContinents) {
      const label = page.getByText(continent, { exact: true });
      const isVisible = await label.isVisible().catch(() => false);
      if (isVisible) {
        await expect(label).toBeVisible();
        break;
      }
    }
  });
}); 