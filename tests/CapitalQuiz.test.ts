import { test, expect } from '@playwright/test';
import countriesPL from '../src/data/countries.pl.json' assert { type: 'json' };

test.describe('Capital Quiz', () => {
  // given
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz/capital');
  });

  test('should display quiz question and allow answering', async ({ page }) => {
    // given
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 2000 });
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
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 2000 });
    for (let i = 0; i < 10; i++) {
      await page.waitForSelector('[data-testid="answer-option-0"]:not([disabled])', { timeout: 2000 });
      await page.getByTestId('answer-option-0').click();
      await page.waitForTimeout(2100); // Wait for animation and state update
    }
    
    // when
    await page.getByTestId('play-again-button').click();
    
    // then
    await expect(page.getByTestId('quiz-summary')).not.toBeVisible();
    await expect(page.getByTestId('quiz-question')).toBeVisible();
  });

  test('should display quiz question with correct translations', async ({ page }) => {
    // given
    await page.goto('/quiz/capital');
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for translations to load
    
    // then - check English translations
    const questionHeading = await page.getByTestId('quiz-question').getByRole('heading').first();
    await expect(questionHeading).toBeVisible();
    expect(await questionHeading.textContent()).toMatch(/question \d+\/10/i);
    
    // Check if any heading contains the capital question text
    const headings = await page.getByRole('heading').all();
    let foundCapitalQuestion = false;
    for (const heading of headings) {
      const text = await heading.textContent();
      if (text && text.toLowerCase().includes('what is the capital')) {
        foundCapitalQuestion = true;
        break;
      }
    }
    expect(foundCapitalQuestion).toBe(true);
    
    // when - switch language
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByText('Polski').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for translations to load
    
    // then - check Polish translations
    const questionHeadingPL = await page.getByTestId('quiz-question').getByRole('heading').first();
    await expect(questionHeadingPL).toBeVisible();
    expect(await questionHeadingPL.textContent()).toMatch(/pytanie \d+\/10/i);
    
    // Check if any heading contains the Polish capital question text
    const headingsPL = await page.getByRole('heading').all();
    let foundCapitalQuestionPL = false;
    for (const heading of headingsPL) {
      const text = await heading.textContent();
      if (text && text.toLowerCase().includes('jaka jest stolica')) {
        foundCapitalQuestionPL = true;
        break;
      }
    }
    expect(foundCapitalQuestionPL).toBe(true);
  });

  test('should display flag in capital quiz', async ({ page }) => {
    // given
    await page.goto('/quiz/capital');
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // increased wait for flag to load
    
    // Check if we're in capital quiz mode by looking for the capital question text
    const headings = await page.getByRole('heading').all();
    let foundCapitalQuestion = false;
    for (const heading of headings) {
      const text = await heading.textContent();
      if (text && text.toLowerCase().includes('what is the capital')) {
        foundCapitalQuestion = true;
        break;
      }
    }
    expect(foundCapitalQuestion).toBe(true);
    
    // then
    const flag = page.getByTestId('country-flag');
    await expect(flag).toBeVisible();
    const flagSrc = await flag.getAttribute('src');
    expect(flagSrc).toMatch(/^\/flags\/.+\.svg$/);
  });

  test('should complete quiz and show translated summary', async ({ page }) => {
    // given
    await page.goto('/quiz/capital');
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
    
    // when
    for (let i = 0; i < 10; i++) {
      await page.getByTestId('answer-option-0').click();
      if (i < 9) {
        await page.waitForTimeout(500);
      }
    }
    
    // then - check English translations
    await expect(page.getByTestId('quiz-summary')).toBeVisible();
    const summaryHeading = await page.getByTestId('quiz-summary').getByRole('heading').first();
    await expect(summaryHeading).toBeVisible();
    expect(await summaryHeading.textContent()).toMatch(/summary/i);
    await expect(page.getByText(/final score/i)).toBeVisible();
    await expect(page.getByTestId('play-again-button')).toBeVisible();
    
    // when - switch language
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByText('Polski').click();
    await page.waitForLoadState('networkidle');
    
    // then - check Polish translations
    const summaryHeadingPL = await page.getByTestId('quiz-summary').getByRole('heading').first();
    await expect(summaryHeadingPL).toBeVisible();
    expect(await summaryHeadingPL.textContent()).toMatch(/podsumowanie/i);
    await expect(page.getByText(/wynik końcowy/i)).toBeVisible();
    await expect(page.getByTestId('play-again-button')).toBeVisible();
  });

  test('should display Polish cities when language is Polish', async ({ page }) => {
    // given
    await page.goto('/quiz/capital');
    await page.waitForSelector('[data-testid="quiz-question"]', { timeout: 2000 });
    
    // when
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByText('Polski').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for translations to load
    
    // then
    const cityOptions = await Promise.all(
      [0, 1, 2, 3].map(async (index) => 
        page.getByTestId(`answer-option-${index}`).textContent()
      )
    );

    // Get capitals from Polish data
    const polishCapitals = countriesPL.map(country => country.capital);
    
    // Verify that all cities are in Polish
    const hasPolishCity = cityOptions.every(city => 
      polishCapitals.some(polishCity => city?.includes(polishCity))
    );
    expect(hasPolishCity).toBe(true);
  });
}); 