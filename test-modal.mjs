import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Открываем тестовую страницу продукта напрямую
    console.log('Открываю страницу продукта...');
    await page.goto('http://localhost:3000/product/gleba-fyodor-petrovich-u-chernogo-morya', {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });

    await page.waitForTimeout(2000);

    // Делаем скриншот страницы продукта
    await page.screenshot({ path: 'screenshot-product-page.png', fullPage: true });
    console.log('Скриншот страницы продукта сохранён');

    // Ищем кнопку "Оставить заявку"
    console.log('Ищу кнопку "Оставить заявку"...');
    const quoteButton = page.getByRole('button', { name: /оставить заявку/i });

    if (await quoteButton.count() > 0) {
      console.log('Кнопка найдена, кликаю...');
      await quoteButton.click();

      // Ждём появления модалки
      await page.waitForTimeout(1000);

      // Делаем скриншот модалки
      await page.screenshot({ path: 'screenshot-modal.png', fullPage: true });
      console.log('Скриншот модалки сохранён: screenshot-modal.png');

      // Ждём 5 секунд чтобы визуально проверить
      await page.waitForTimeout(5000);
    } else {
      console.log('Кнопка "Оставить заявку" не найдена');
    }

  } catch (error) {
    console.error('Ошибка:', error);
    await page.screenshot({ path: 'screenshot-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
