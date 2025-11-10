import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Переходим на страницу
    await page.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    console.log('✓ Страница загружена');

    // Проверяем наличие BreadCrumbs
    const breadcrumbs = await page.locator('nav[aria-label="Breadcrumb"]').isVisible();
    console.log(breadcrumbs ? '✓ BreadCrumbs найдены' : '✗ BreadCrumbs не найдены');

    // Проверяем текст в BreadCrumbs
    const profileLink = await page.locator('text=Профиль').isVisible();
    const submitLink = await page.locator('text=Предложить товар').first().isVisible();
    console.log(profileLink ? '✓ Ссылка "Профиль" найдена' : '✗ Ссылка "Профиль" не найдена');
    console.log(submitLink ? '✓ Текст "Предложить товар" найден' : '✗ Текст "Предложить товар" не найден');

    // Проверяем наличие заголовка в правой части
    const heading = await page.locator('h3:has-text("ПРЕДЛОЖИТЬ ТОВАР")').isVisible();
    console.log(heading ? '✓ Заголовок найден' : '✗ Заголовок не найден');

    // Проверяем наличие описания
    const description1 = await page.locator('text=Вы можете предложить разместить ваш товар в нашем каталоге').isVisible();
    const description2 = await page.locator('text=После отправления заявки ваш товар появится в разделе').isVisible();
    console.log(description1 ? '✓ Первый абзац описания найден' : '✗ Первый абзац описания не найден');
    console.log(description2 ? '✓ Второй абзац описания найден' : '✗ Второй абзац описания не найден');

    // Проверяем наличие полей формы
    const titleField = await page.locator('label:has-text("Название")').isVisible();
    const artistField = await page.locator('label:has-text("Художник")').isVisible();
    const genreField = await page.locator('label:has-text("Жанр")').isVisible();
    const heightField = await page.locator('label:has-text("Высота")').isVisible();
    const widthField = await page.locator('label:has-text("Ширина")').isVisible();
    const priceField = await page.locator('label:has-text("Цена")').isVisible();
    const descriptionField = await page.locator('label:has-text("Описание")').isVisible();

    console.log(titleField ? '✓ Поле "Название" найдено' : '✗ Поле "Название" не найдено');
    console.log(artistField ? '✓ Поле "Художник" найдено' : '✗ Поле "Художник" не найдено');
    console.log(genreField ? '✓ Поле "Жанр" найдено' : '✗ Поле "Жанр" не найдено');
    console.log(heightField ? '✓ Поле "Высота" найдено' : '✗ Поле "Высота" не найдено');
    console.log(widthField ? '✓ Поле "Ширина" найдено' : '✗ Поле "Ширина" не найдено');
    console.log(priceField ? '✓ Поле "Цена" найдено' : '✗ Поле "Цена" не найдено');
    console.log(descriptionField ? '✓ Поле "Описание" найдено' : '✗ Поле "Описание" не найдено');

    // Проверяем зону загрузки фото
    const uploadZone = await page.locator('text=Загрузите фотографию').isVisible();
    console.log(uploadZone ? '✓ Зона загрузки фото найдена' : '✗ Зона загрузки фото не найдена');

    // Проверяем требования к фотографиям
    const requirements = await page.locator('text=Требования к фотографиям').isVisible();
    console.log(requirements ? '✓ Требования к фотографиям найдены' : '✗ Требования к фотографиям не найдены');

    // Проверяем кнопку отправки
    const submitButton = await page.locator('button:has-text("Отправить на модерацию")').isVisible();
    console.log(submitButton ? '✓ Кнопка отправки найдена' : '✗ Кнопка отправки не найдена');

    // Делаем скриншот для визуальной проверки
    await page.screenshot({ path: 'submit-artwork-desktop.png', fullPage: true });
    console.log('✓ Скриншот десктопной версии сохранен: submit-artwork-desktop.png');

    // Проверка мобильной версии
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'submit-artwork-mobile.png', fullPage: true });
    console.log('✓ Скриншот мобильной версии сохранен: submit-artwork-mobile.png');

    console.log('\n✓ Тестирование завершено успешно!');

  } catch (error) {
    console.error('✗ Ошибка:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
  } finally {
    await browser.close();
  }
})();
