import { test, expect } from '@playwright/test';

test.describe('Home Page UI Tests', () => {
  test('content should be perfectly centered', async ({ page }) => {
    // given
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    
    // when
    const container = await page.locator('main').first();
    const content = await page.getByRole('heading', { name: /Test Your Geography Knowledge/i });
    
    // then
    const containerBox = await container.boundingBox();
    const contentBox = await content.boundingBox();
    const viewportSize = page.viewportSize();
    
    expect(containerBox).toBeTruthy();
    expect(contentBox).toBeTruthy();
    expect(viewportSize).toBeTruthy();
    
    if (containerBox && contentBox && viewportSize) {
      // Calculate the expected center position
      const expectedCenterX = viewportSize.width / 2;
      const contentCenterX = contentBox.x + (contentBox.width / 2);
      
      // Check if content is horizontally centered with a small tolerance (2px)
      const centeringDifference = Math.abs(expectedCenterX - contentCenterX);
      expect(centeringDifference).toBeLessThanOrEqual(2);
      
      // Verify container styles
      const containerStyles = await container.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          justifyContent: style.justifyContent,
          alignItems: style.alignItems
        };
      });
      
      // Verify flex properties
      expect(containerStyles.display).toBe('flex');
      expect(containerStyles.justifyContent).toBe('center');
      expect(containerStyles.alignItems).toBe('center');
      
      // Verify the container width is appropriate
      expect(containerBox.width).toBeLessThanOrEqual(viewportSize.width);
    }
  });

  test('should display all quiz options with correct translations', async ({ page }) => {
    // given
    await page.goto('/');

    // when
    const quizCards = await page.locator('.MuiCard-root');

    // then
    await expect(quizCards).toHaveCount(3);

    // Verify card titles
    await expect(page.getByText('Guess the Capital')).toBeVisible();
    await expect(page.getByText('Guess the Flag')).toBeVisible();
    await expect(page.getByText('Guess the Language')).toBeVisible();

    // Verify card descriptions
    await expect(page.getByText('What is the capital of ?', { exact: false })).toBeVisible();
    await expect(page.getByText('Which flag belongs to ?', { exact: false })).toBeVisible();
    await expect(page.getByText('Which language is spoken in ?', { exact: false })).toBeVisible();

    // Verify exact descriptions with empty country
    await expect(page.getByText('What is the capital of')).toBeVisible();
    await expect(page.getByText('Which flag belongs to')).toBeVisible();
    await expect(page.getByText('Which language is spoken in')).toBeVisible();
  });

  test('should navigate to random quiz on start button click', async ({ page }) => {
    // given
    await page.goto('/');

    // when
    await page.getByRole('button', { name: /Start Random Quiz/i }).click();

    // then
    await expect(page).toHaveURL(/\/quiz\/random$/);
  });

  test('should navigate to specific quiz modes on card click', async ({ page }) => {
    // given
    await page.goto('/');

    // when & then - Capital quiz
    await page.getByText('Guess the Capital').click();
    await expect(page).toHaveURL(/\/quiz\/capital$/);

    // when & then - Flag quiz
    await page.goto('/');
    await page.getByText('Guess the Flag').click();
    await expect(page).toHaveURL(/\/quiz\/flag$/);

    // when & then - Language quiz
    await page.goto('/');
    await page.getByText('Guess the Language').click();
    await expect(page).toHaveURL(/\/quiz\/language$/);
  });

  test('should be responsive', async ({ page }) => {
    // given
    await page.goto('/');

    // when - Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileCards = await page.locator('.MuiGrid-item');
    const mobileCardWidth = await mobileCards.first().evaluate((el) => {
      return window.getComputedStyle(el).width;
    });

    // then - Mobile view
    expect(parseInt(mobileCardWidth)).toBeGreaterThan(300); // Should be nearly full width on mobile

    // when - Desktop view
    await page.setViewportSize({ width: 1024, height: 768 });
    const desktopCards = await page.locator('.MuiGrid-item');
    const desktopCardWidth = await desktopCards.first().evaluate((el) => {
      return window.getComputedStyle(el).width;
    });

    // then - Desktop view
    expect(parseInt(desktopCardWidth)).toBeLessThan(400); // Should be roughly 1/3 width on desktop
  });

  test('should have hover effects on quiz cards', async ({ page }) => {
    // given
    await page.goto('/');
    const firstCard = await page.locator('.MuiCard-root').first();

    // when
    const initialTransform = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    await firstCard.hover();
    await page.waitForTimeout(300); // Wait for hover animation

    // then
    const hoverTransform = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('should display correct translations for app title and description', async ({ page }) => {
    // given
    await page.goto('/');

    // when & then
    await expect(page.getByRole('heading', { name: /Geography Quiz/i })).toBeVisible();
    await expect(page.getByText(/Test your knowledge/i)).toBeVisible();
  });
}); 