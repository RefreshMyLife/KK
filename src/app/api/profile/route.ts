import { NextRequest, NextResponse } from "next/server";

// Временное хранилище данных профиля (в реальном приложении это будет БД)
let userProfile = {
  id: "1",
  firstName: "Иван",
  lastName: "Петров",
  email: "ivan@example.com",
  phone: "+7 937 954 81 92",
  country: "Россия",
  city: "Москва",
  avatarUrl: "/img/profile/avatar-placeholder.png",
  stats: {
    itemsSold: 12,
    auctionParticipations: 4,
  },
};

// GET - получить данные профиля
export async function GET() {
  try {
    // TODO: Получить данные из БД или WordPress
    // TODO: Проверить авторизацию пользователя

    return NextResponse.json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось загрузить профиль",
      },
      { status: 500 }
    );
  }
}

// PUT - обновить данные профиля
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация данных
    if (!body.firstName || body.firstName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Имя должно содержать минимум 2 символа",
        },
        { status: 400 }
      );
    }

    if (!body.phone || body.phone.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Некорректный номер телефона",
        },
        { status: 400 }
      );
    }

    if (!body.country || body.country.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Страна обязательна для заполнения",
        },
        { status: 400 }
      );
    }

    if (!body.city || body.city.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Город обязателен для заполнения",
        },
        { status: 400 }
      );
    }

    // TODO: Проверить авторизацию пользователя
    // TODO: Обновить данные в БД или WordPress

    // Обновляем данные профиля
    userProfile = {
      ...userProfile,
      firstName: body.firstName.trim(),
      lastName: body.lastName?.trim() || "",
      phone: body.phone.trim(),
      country: body.country.trim(),
      city: body.city.trim(),
      avatarUrl: body.avatarUrl || userProfile.avatarUrl,
    };

    return NextResponse.json({
      success: true,
      data: userProfile,
      message: "Профиль успешно обновлен",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось обновить профиль",
      },
      { status: 500 }
    );
  }
}
