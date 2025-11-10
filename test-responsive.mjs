import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });

  try {
    console.log('🧪 Тестирование адаптивной версии формы...\n');

    // Тест десктопной версии
    console.log('📱 Тест 1: Десктопная версия (1920x1080)');
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: 'responsive-desktop.png', fullPage: true });
    console.log('✓ Скриншот десктопной версии сохранен');
    await desktopContext.close();

    // Тест планшетной версии
    console.log('\n📱 Тест 2: Планшетная версия (768x1024)');
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 }
    });
    const tabletPage = await tabletContext.newPage();

    await tabletPage.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    await tabletPage.waitForTimeout(1000);
    await tabletPage.screenshot({ path: 'responsive-tablet.png', fullPage: true });
    console.log('✓ Скриншот планшетной версии сохранен');
    await tabletContext.close();

    // Тест мобильной версии (iPhone 12)
    console.log('\n📱 Тест 3: Мобильная версия - iPhone 12 (390x844)');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    await mobilePage.waitForTimeout(1000);

    // Проверяем элементы на мобильной версии
    const formWidth = await mobilePage.evaluate(() => {
      const form = document.querySelector('form');
      return form ? form.offsetWidth : 0;
    });

    console.log(`Ширина формы на мобильном: ${formWidth}px`);
    console.log(formWidth < 400 ? '✓ Форма адаптирована под мобильный экран' : '✗ Форма слишком широкая');

    await mobilePage.screenshot({ path: 'responsive-mobile.png', fullPage: true });
    console.log('✓ Скриншот мобильной версии сохранен');
    await mobileContext.close();

    // Тест мобильной версии (маленький экран - 320px)
    console.log('\n📱 Тест 4: Маленький мобильный экран (320x568)');
    const smallMobileContext = await browser.newContext({
      viewport: { width: 320, height: 568 }
    });
    const smallMobilePage = await smallMobileContext.newPage();

    await smallMobilePage.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    await smallMobilePage.waitForTimeout(1000);
    await smallMobilePage.screenshot({ path: 'responsive-small-mobile.png', fullPage: true });
    console.log('✓ Скриншот маленького мобильного экрана сохранен');
    await smallMobileContext.close();

    console.log('\n✅ Все тесты адаптивности завершены!');
    console.log('\nСозданные скриншоты:');
    console.log('  - responsive-desktop.png (1920x1080)');
    console.log('  - responsive-tablet.png (768x1024)');
    console.log('  - responsive-mobile.png (390x844)');
    console.log('  - responsive-small-mobile.png (320x568)');

  } catch (error) {
    console.error('✗ Ошибка:', error.message);
  } finally {
    await browser.close();
  }
})();
