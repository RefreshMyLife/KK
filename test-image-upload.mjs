import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('🧪 Тестирование загрузки изображений...\n');

    // Переходим на страницу
    await page.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    console.log('✓ Страница загружена');

    // Тест 1: Проверка начального состояния
    console.log('\n📋 Тест 1: Проверка начального состояния');

    const uploadZone = await page.locator('text=Загрузите фотографию').isVisible();
    console.log(uploadZone ? '✓ Зона загрузки отображается' : '✗ Зона загрузки не найдена');

    const submitButton = page.locator('button:has-text("Отправить на модерацию")');
    const isDisabledInitially = await submitButton.isDisabled();
    console.log(isDisabledInitially ? '✓ Кнопка отправки заблокирована без изображений' : '✗ Кнопка должна быть заблокирована');

    // Тест 2: Загрузка первого изображения
    console.log('\n📋 Тест 2: Загрузка первого изображения');

    // Создаем тестовое изображение (используем любое существующее изображение или создаем простое)
    const testImagePath = path.join(__dirname, 'public', 'img', 'logo.svg');

    // Кликаем на зону загрузки и загружаем файл
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testImagePath);
    await page.waitForTimeout(1000);

    // Проверяем, что изображение загрузилось
    const hasImages = await page.locator('.grid.grid-cols-3').isVisible();
    console.log(hasImages ? '✓ Изображение отобразилось в сетке' : '✗ Изображение не отобразилось');

    // Тест 3: Проверка кнопки "Загрузить ещё"
    console.log('\n📋 Тест 3: Проверка кнопки "Загрузить ещё"');

    const loadMoreButton = await page.locator('text=Загрузить ещё').isVisible();
    console.log(loadMoreButton ? '✓ Кнопка "Загрузить ещё" отображается' : '✗ Кнопка не найдена');

    // Тест 4: Загрузка нескольких изображений
    console.log('\n📋 Тест 4: Загрузка нескольких изображений');

    await page.locator('text=Загрузить ещё').click();
    await page.waitForTimeout(300);
    await fileInput.setInputFiles([testImagePath, testImagePath]);
    await page.waitForTimeout(1000);

    const imageCount = await page.locator('.grid.grid-cols-3 > div').count();
    console.log(imageCount >= 2 ? `✓ Загружено несколько изображений (${imageCount})` : `✗ Ожидалось >= 2, получено ${imageCount}`);

    // Тест 5: Проверка кнопок управления при наведении
    console.log('\n📋 Тест 5: Проверка кнопок управления при наведении');

    const firstImage = page.locator('.grid.grid-cols-3 > div').first();
    await firstImage.hover();
    await page.waitForTimeout(500);

    const deleteButton = await firstImage.locator('button[title="Удалить"]').isVisible();
    const editButton = await firstImage.locator('button[title="Заменить"]').isVisible();

    console.log(deleteButton ? '✓ Кнопка удаления отображается при наведении' : '✗ Кнопка удаления не найдена');
    console.log(editButton ? '✓ Кнопка замены отображается при наведении' : '✗ Кнопка замены не найдена');

    // Тест 6: Удаление изображения
    console.log('\n📋 Тест 6: Удаление изображения');

    const countBefore = await page.locator('.grid.grid-cols-3 > div').count();
    await firstImage.locator('button[title="Удалить"]').click();
    await page.waitForTimeout(500);

    const countAfter = await page.locator('.grid.grid-cols-3 > div').count();
    console.log(countAfter < countBefore ? `✓ Изображение удалено (было ${countBefore}, стало ${countAfter})` : '✗ Изображение не удалилось');

    // Тест 7: Проверка валидации при отсутствии изображений
    console.log('\n📋 Тест 7: Проверка валидации после удаления всех изображений');

    // Удаляем все оставшиеся изображения
    while (await page.locator('.grid.grid-cols-3 > div').count() > 0) {
      const img = page.locator('.grid.grid-cols-3 > div').first();
      await img.hover();
      await page.waitForTimeout(200);
      await img.locator('button[title="Удалить"]').click();
      await page.waitForTimeout(300);
    }

    // Проверяем, что зона загрузки вернулась
    const uploadZoneReturned = await page.locator('text=Загрузите фотографию').isVisible();
    console.log(uploadZoneReturned ? '✓ Зона загрузки вернулась после удаления всех изображений' : '✗ Зона загрузки не вернулась');

    // Скриншот
    await page.screenshot({ path: 'image-upload-test.png', fullPage: true });
    console.log('\n✓ Скриншот теста сохранен: image-upload-test.png');

    console.log('\n✅ Все тесты загрузки изображений завершены!');

  } catch (error) {
    console.error('✗ Ошибка:', error.message);
    await page.screenshot({ path: 'image-upload-error.png' });
  } finally {
    await browser.close();
  }
})();
