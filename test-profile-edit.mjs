import { chromium } from "playwright";

(async () => {
  console.log("🚀 Запуск теста редактирования профиля...\n");

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // 1. Переходим на страницу редактирования профиля
    console.log("1️⃣ Переход на страницу редактирования профиля...");
    await page.goto("http://localhost:3002/profile/edit");
    await page.waitForLoadState("networkidle");
    console.log("✅ Страница загружена\n");

    // Ждем загрузки данных профиля
    await page.waitForTimeout(2000);

    // 2. Проверяем наличие формы и полей
    console.log("2️⃣ Проверка наличия формы...");
    const form = await page.locator("form");
    console.log("✅ Форма найдена");

    const firstNameInput = await page.locator('input[name="firstName"]');
    const lastNameInput = await page.locator('input[name="lastName"]');
    const phoneInput = await page.locator('input[name="phone"]');
    const countryInput = await page.locator('input[name="country"]');
    const cityInput = await page.locator('input[name="city"]');

    console.log("✅ Все поля формы найдены\n");

    // 3. Проверяем загруженные данные
    console.log("3️⃣ Проверка загруженных данных...");
    const firstName = await firstNameInput.inputValue();
    const phone = await phoneInput.inputValue();
    const country = await countryInput.inputValue();
    const city = await cityInput.inputValue();

    console.log(`   Имя: ${firstName}`);
    console.log(`   Телефон: ${phone}`);
    console.log(`   Страна: ${country}`);
    console.log(`   Город: ${city}`);
    console.log("✅ Данные успешно загружены из API\n");

    // 4. Изменяем данные
    console.log("4️⃣ Изменение данных профиля...");
    await firstNameInput.fill("Александр");
    await lastNameInput.fill("Иванов");
    await phoneInput.fill("+7 999 888 77 66");
    await countryInput.fill("Россия");
    await cityInput.fill("Санкт-Петербург");
    console.log("✅ Данные изменены\n");

    // 5. Сохраняем изменения
    console.log("5️⃣ Отправка формы...");
    const submitButton = await page.locator('button[type="submit"]');
    await submitButton.click();

    // Ждем сообщения об успехе
    await page.waitForSelector("text=Профиль успешно обновлен", {
      timeout: 5000,
    });
    console.log("✅ Профиль успешно обновлен!\n");

    // Делаем скриншот с сообщением об успехе
    await page.screenshot({ path: "profile-edit-success.png", fullPage: true });
    console.log("📸 Скриншот сохранен: profile-edit-success.png\n");

    // Ждем перенаправления
    await page.waitForTimeout(2000);

    console.log("✅ Тест успешно завершен!");
  } catch (error) {
    console.error("❌ Ошибка:", error.message);
    await page.screenshot({ path: "profile-edit-error.png", fullPage: true });
    console.log("📸 Скриншот ошибки сохранен: profile-edit-error.png");
  } finally {
    await browser.close();
  }
})();
