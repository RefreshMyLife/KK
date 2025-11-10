import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('🧪 Тестирование валидации формы...\n');

    // Переходим на страницу
    await page.goto('http://localhost:3000/profile/submit-artwork', {
      waitUntil: 'networkidle'
    });

    console.log('✓ Страница загружена');

    // Тест 1: Попытка отправки пустой формы
    console.log('\n📋 Тест 1: Проверка отправки пустой формы');
    const submitButton = page.locator('button:has-text("Отправить на модерацию")');

    // Проверяем, что кнопка заблокирована
    const isDisabled = await submitButton.isDisabled();
    console.log(isDisabled ? '✓ Кнопка отправки заблокирована при пустой форме' : '✗ Кнопка отправки должна быть заблокирована');

    // Тест 2: Проверка валидации обязательных полей
    console.log('\n📋 Тест 2: Проверка отображения ошибок при blur');

    // Фокусируемся и выходим из поля "Название"
    await page.locator('input[placeholder="Звёздная ночь"]').click();
    await page.locator('select').first().click(); // Переход к следующему полю
    await page.waitForTimeout(300);

    const titleError = await page.locator('text=Название обязательно для заполнения').isVisible();
    console.log(titleError ? '✓ Ошибка для пустого поля "Название" отображается' : '✗ Ошибка не отображается');

    // Тест 3: Ввод некорректных данных в числовые поля
    console.log('\n📋 Тест 3: Проверка ввода только цифр в числовые поля');

    const heightInput = page.locator('input[placeholder="100.2"]');
    await heightInput.fill('abc123');
    await page.waitForTimeout(300);
    let heightValue = await heightInput.inputValue();
    console.log(heightValue === '123' ? '✓ В поле "Высота" принимаются только цифры' : `✗ Значение: ${heightValue}`);

    await heightInput.fill('12.5');
    await page.waitForTimeout(300);
    heightValue = await heightInput.inputValue();
    console.log(heightValue === '12.5' ? '✓ В поле "Высота" принимаются десятичные числа' : `✗ Значение: ${heightValue}`);

    const priceInput = page.locator('input[placeholder="0"]');
    await priceInput.fill('abc100');
    await page.waitForTimeout(300);
    let priceValue = await priceInput.inputValue();
    console.log(priceValue === '100' ? '✓ В поле "Цена" принимаются только целые числа' : `✗ Значение: ${priceValue}`);

    await priceInput.fill('100.5');
    await page.waitForTimeout(300);
    priceValue = await priceInput.inputValue();
    console.log(priceValue === '100' || priceValue === '1005' ? '✓ В поле "Цена" не принимаются десятичные числа' : `✗ Значение: ${priceValue}`);

    // Тест 4: Заполнение всех полей корректными данными
    console.log('\n📋 Тест 4: Заполнение формы корректными данными');

    await page.locator('input[placeholder="Звёздная ночь"]').fill('Звёздная ночь');
    await page.locator('select').first().selectOption('artist1');
    await page.locator('select').nth(1).selectOption('genre1');
    await page.locator('input[placeholder="100.2"]').fill('100.2');
    await page.locator('input[placeholder="45.5"]').fill('45.5');
    await page.locator('input[placeholder="0"]').fill('50000');
    await page.locator('textarea').fill('Это картина была написана Винсентом ван Гогом в 1889 году');

    await page.waitForTimeout(500);

    // Проверяем, что кнопка разблокирована
    const isEnabledAfterFill = await submitButton.isEnabled();
    console.log(isEnabledAfterFill ? '✓ Кнопка отправки разблокирована после заполнения всех полей' : '✗ Кнопка должна быть разблокирована');

    // Тест 5: Проверка минимальной длины описания
    console.log('\n📋 Тест 5: Проверка минимальной длины описания');

    await page.locator('textarea').fill('Короткий');
    await page.locator('textarea').blur();
    await page.waitForTimeout(300);

    const descError = await page.locator('text=Описание должно содержать минимум 10 символов').isVisible();
    console.log(descError ? '✓ Ошибка для короткого описания отображается' : '✗ Ошибка не отображается');

    // Тест 6: Проверка валидации отрицательных чисел
    console.log('\n📋 Тест 6: Проверка валидации отрицательных значений');

    await page.locator('input[placeholder="100.2"]').fill('0');
    await page.locator('input[placeholder="100.2"]').blur();
    await page.waitForTimeout(300);

    const heightNegError = await page.locator('text=Высота должна быть больше 0').isVisible();
    console.log(heightNegError ? '✓ Ошибка для нулевой высоты отображается' : '✗ Ошибка не отображается');

    // Финальный скриншот
    await page.screenshot({ path: 'form-validation-test.png', fullPage: true });
    console.log('\n✓ Скриншот теста сохранен: form-validation-test.png');

    console.log('\n✅ Все тесты валидации завершены!');

  } catch (error) {
    console.error('✗ Ошибка:', error.message);
    await page.screenshot({ path: 'validation-error.png' });
  } finally {
    await browser.close();
  }
})();
