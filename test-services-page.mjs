import playwright from 'playwright';

async function testServicesPage() {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await playwright.chromium.launch({
      headless: false,
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });

    const page = await context.newPage();

    console.log('Navigating to services page...');
    await page.goto('http://localhost:3001/services', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Check if breadcrumbs are visible
    const breadcrumbs = await page.locator('nav[aria-label="Breadcrumb"]').isVisible();
    console.log('Breadcrumbs visible:', breadcrumbs);

    // Check if title is visible
    const title = await page.locator('h1:has-text("УСЛУГИ")').isVisible();
    console.log('Page title visible:', title);

    // Check if hero section is visible
    const heroSection = await page.locator('section').first().isVisible();
    console.log('Hero section visible:', heroSection);

    // Check if hero title is visible
    const heroTitle = await page.locator('h1:has-text("Предоставляем больше 10 услуг")').isVisible();
    console.log('Hero title visible:', heroTitle);

    // Check if background image is loaded
    const bgImage = await page.locator('img[alt="Services background"]').first();
    const bgImageLoaded = await bgImage.evaluate((img) => {
      return img.complete && img.naturalHeight !== 0;
    });
    console.log('Background image loaded:', bgImageLoaded);

    // Get background image src
    const bgImageSrc = await bgImage.getAttribute('src');
    console.log('Background image src:', bgImageSrc);

    // Check if service cards are visible
    const serviceCards = await page.locator('div.grid > div').count();
    console.log('Number of service cards:', serviceCards);

    // Take screenshots
    console.log('Taking desktop screenshot...');
    await page.screenshot({
      path: 'services-page-desktop.png',
      fullPage: true
    });

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);

    console.log('Taking mobile screenshot...');
    await page.screenshot({
      path: 'services-page-mobile.png',
      fullPage: true
    });

    console.log('✓ Test completed successfully!');

  } catch (error) {
    console.error('Error during test:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testServicesPage();
