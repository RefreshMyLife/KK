import { chromium } from 'playwright';

async function testSliderNavigation() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  const page = await context.newPage();

  console.log('Открываем страницу аукционов...');
  await page.goto('http://localhost:3001/auctions', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  console.log('Ждем загрузки слайдера...');
  await page.waitForTimeout(3000);

  console.log('Делаем скриншот первого слайда...');
  await page.screenshot({ path: 'mobile-slider-1.png' });

  console.log('Переключаем на второй слайд (клик по точке пагинации)...');
  // Ищем вторую точку пагинации и кликаем
  const paginationDots = await page.locator('button[aria-label*="слайд"]').all();
  if (paginationDots.length > 1) {
    await paginationDots[1].click();
    await page.waitForTimeout(1000);

    console.log('Делаем скриншот второго слайда...');
    await page.screenshot({ path: 'mobile-slider-2.png' });
  }

  console.log('Тест завершен! Скриншоты сохранены.');
  console.log('Проверьте файлы: mobile-slider-1.png и mobile-slider-2.png');

  await browser.close();
}

testSliderNavigation().catch(console.error);
