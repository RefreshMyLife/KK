import playwright from 'playwright';

async function testServicesPage() {
  let browser;
  try {
    console.log('Installing Chromium...');
    const { execSync } = await import('child_process');
    execSync('npx playwright install chromium', { stdio: 'inherit' });

    console.log('Launching browser...');
    browser = await playwright.chromium.launch({
      headless: true,
    });

    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });

    console.log('Navigating to services page...');
    await page.goto('http://localhost:3001/services', {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });

    // Wait a bit for images to load
    await page.waitForTimeout(3000);

    // Check if background image exists in DOM
    const bgImageExists = await page.locator('img[alt="Services background"]').count();
    console.log('Background image elements found:', bgImageExists);

    if (bgImageExists > 0) {
      const bgImage = page.locator('img[alt="Services background"]').first();

      // Get image attributes
      const src = await bgImage.getAttribute('src');
      const alt = await bgImage.getAttribute('alt');
      console.log('Image src:', src);
      console.log('Image alt:', alt);

      // Check if image is in viewport
      const isVisible = await bgImage.isVisible();
      console.log('Image is visible:', isVisible);

      // Check computed opacity of parent
      const parentOpacity = await bgImage.evaluate((img) => {
        const parent = img.parentElement;
        return window.getComputedStyle(parent).opacity;
      });
      console.log('Parent opacity:', parentOpacity);
    }

    // Take screenshots
    console.log('Taking desktop screenshot...');
    await page.screenshot({
      path: 'services-page-test.png',
      fullPage: true
    });

    console.log('✓ Test completed successfully!');
    console.log('Screenshot saved as: services-page-test.png');

  } catch (error) {
    console.error('Error during test:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testServicesPage();
