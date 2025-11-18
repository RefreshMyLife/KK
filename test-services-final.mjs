import playwright from 'playwright';

async function testServicesPage() {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await playwright.chromium.launch({
      headless: true,
    });

    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });

    console.log('Navigating to services page...');
    await page.goto('http://localhost:3002/services', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait a bit for images to load
    await page.waitForTimeout(2000);

    // Check if background image exists in DOM
    const bgImageCount = await page.locator('img[alt="Services background"]').count();
    console.log('✓ Background image elements found:', bgImageCount);

    if (bgImageCount > 0) {
      const bgImage = page.locator('img[alt="Services background"]').first();

      // Get image attributes
      const src = await bgImage.getAttribute('src');
      const alt = await bgImage.getAttribute('alt');
      console.log('✓ Image src:', src);
      console.log('✓ Image alt:', alt);

      // Check if image is in viewport
      const isVisible = await bgImage.isVisible();
      console.log('✓ Image is visible:', isVisible);

      // Check computed opacity of parent
      const parentOpacity = await bgImage.evaluate((img) => {
        const parent = img.parentElement;
        return window.getComputedStyle(parent).opacity;
      });
      console.log('✓ Parent opacity:', parentOpacity);

      // Check if image loaded successfully
      const imageLoaded = await bgImage.evaluate((img) => {
        return img.complete && img.naturalHeight !== 0;
      });
      console.log('✓ Image loaded successfully:', imageLoaded);
    }

    // Check breadcrumbs
    const breadcrumbs = await page.locator('nav[aria-label="Breadcrumb"]').isVisible();
    console.log('✓ Breadcrumbs visible:', breadcrumbs);

    // Check page title
    const pageTitle = await page.locator('h1:has-text("УСЛУГИ")').isVisible();
    console.log('✓ Page title visible:', pageTitle);

    // Check hero title
    const heroTitle = await page.locator('h1:has-text("Предоставляем больше 10 услуг")').isVisible();
    console.log('✓ Hero title visible:', heroTitle);

    // Check service cards
    const serviceCardsCount = await page.locator('div.grid > div').count();
    console.log('✓ Number of service cards:', serviceCardsCount);

    // Take screenshots
    console.log('\nTaking desktop screenshot...');
    await page.screenshot({
      path: 'services-page-desktop.png',
      fullPage: true
    });
    console.log('✓ Desktop screenshot saved: services-page-desktop.png');

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);

    console.log('\nTaking mobile screenshot...');
    await page.screenshot({
      path: 'services-page-mobile.png',
      fullPage: true
    });
    console.log('✓ Mobile screenshot saved: services-page-mobile.png');

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error during test:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testServicesPage();
