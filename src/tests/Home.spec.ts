import { test, expect } from '@playwright/test';

test('home page layout', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  
  // Wait for the content to be visible
  await page.waitForSelector('.chakra-container');
  
  // Get the content box and check its position
  const contentBox = await page.locator('.chakra-container').first().boundingBox();
  const viewportSize = page.viewportSize();
  
  if (contentBox && viewportSize) {
    // Calculate the expected center position
    const expectedCenterX = viewportSize.width / 2;
    const actualCenterX = contentBox.x + (contentBox.width / 2);
    
    console.log('Viewport width:', viewportSize.width);
    console.log('Content box:', contentBox);
    console.log('Expected center:', expectedCenterX);
    console.log('Actual center:', actualCenterX);
    
    // Check if the container is centered (allowing for small differences)
    expect(Math.abs(actualCenterX - expectedCenterX)).toBeLessThan(5);
  }
}); 