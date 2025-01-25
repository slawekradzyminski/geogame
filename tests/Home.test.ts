import { test, expect } from '@playwright/test';

test.describe('Home Page Navigation', () => {
  test('should navigate to capital quiz from home page', async ({ page }) => {
    // given
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for animations
    
    // when
    await page.locator('.MuiCard-root').filter({ hasText: 'Guess the Capital' }).first().click();
    
    // then
    await expect(page).toHaveURL('/quiz/capital');
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    await expect(page.getByTestId('country-flag')).toBeVisible();
  });

  test('should start capital quiz in Polish', async ({ page }) => {
    // given
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // wait for animations
    
    // when - switch language
    await page.getByRole('button', { name: /select language/i }).click();
    await page.getByText('Polski').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // wait longer for translations
    
    // then - verify Polish UI is loaded
    await expect(page.getByRole('heading', { name: 'Wybierz tryb quizu' })).toBeVisible();
    
    // Debug: print page content
    console.log('Page content before clicking quiz button:');
    console.log(await page.content());
    
    // when - start quiz
    await page.getByText('Zgadnij stolicę').click();
    
    // then
    await expect(page).toHaveURL('/quiz/capital');
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    const questionText = await page.getByRole('heading', { level: 5 }).textContent();
    expect(questionText?.toLowerCase()).toContain('jaka jest stolica');
  });
}); 