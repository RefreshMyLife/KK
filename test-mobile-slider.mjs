import { chromium } from 'playwright';

async function testMobileSlider() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  const page = await context.newPage();

  console.log('Открываем страницу аукционов...');
  await page.goto('http://localhost:3003/auctions', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  console.log('Ждем 3 секунды для полной загрузки...');
  await page.waitForTimeout(3000);

  console.log('Перезагружаем страницу для очистки кэша...');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Делаем скриншот...');
  await page.screenshot({ path: 'mobile-slider-test.png', fullPage: false });

  console.log('Скриншот сохранен в mobile-slider-test.png');
  console.log('Браузер останется открытым для визуального тестирования...');
  console.log('Нажмите Enter для закрытия браузера...');

  // Держим браузер открытым для визуального тестирования
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  await browser.close();
}

testMobileSlider().catch(console.error);
