# Как попасть на страницу товара

## Способы доступа к странице товара

### 1. Прямой URL
Откройте в браузере:
```
http://localhost:3000/product/[slug-товара]
```

Примеры:
- `http://localhost:3000/product/test`
- `http://localhost:3000/product/glebov-fedor-petrovich`

### 2. Через карточку товара
Обновленный компонент `ProductCard` теперь поддерживает переход на страницу товара:

```tsx
import { ProductCard } from "@/components/Card";

<ProductCard
  id="1"
  slug="glebov-fedor-petrovich"  // Добавьте slug!
  title="ГЛЕБОВ ФЕДОР ПЕТРОВИЧ"
  subtitle="У Чёрного моря"
  price="420 000 ₽"
  details="бумага, гуашь, масло"
  size="82×64"
  country="Россия"
  year="1984"
  imageUrl="/img/product.jpg"
/>
```

**Что изменилось в ProductCard:**
- Добавлен новый prop `slug` (опциональный)
- Клик на изображение ведет на `/product/[slug]`
- Клик на название ведет на `/product/[slug]`
- Кнопка "В корзину" работает без перехода на страницу товара

### 3. Тестовый пример с моковыми данными

Страница товара уже настроена с моковыми данными для тестирования.
Просто откройте любой URL:

```
http://localhost:3000/product/test-product
```

Вы увидите страницу с демо-данными товара.

## Подключение к WordPress

Когда WordPress API будет готов, замените моковые данные на реальные:

1. Убедитесь, что в WordPress настроены ACF поля:
   - `artist` - Художник
   - `material` - Материал
   - `size` - Размер
   - `country` - Страна
   - `year` - Год
   - `gallery` - Галерея изображений

2. Функция `getProductBySlug()` в [src/services/product.ts](src/services/product.ts) уже готова к использованию

3. GraphQL запросы находятся в:
   - [src/services/graphql/quiries/product.ts](src/services/graphql/quiries/product.ts)
   - [src/services/graphql/fragmants/product.ts](src/services/graphql/fragmants/product.ts)

## Структура URL

- **Главная**: `/`
- **Каталог**: `/catalog` (нужно создать)
- **Категория**: `/category/[slug]` (нужно создать)
- **Товар**: `/product/[slug]` ✅ Готово!
- **Корзина**: `/cart` ✅ Существует

## Что уже работает

✅ Адаптивная вёрстка (mobile + desktop)
✅ Галерея изображений с миниатюрами
✅ Хлебные крошки навигации
✅ Кнопки "Оставить заявку" и "Добавить в корзину"
✅ SEO метаданные
✅ TypeScript типизация
✅ GraphQL интеграция (готова к подключению)

## Что нужно доработать

- [ ] Подключить реальные данные из WordPress
- [ ] Реализовать модальное окно "Оставить заявку"
- [ ] Добавить блок "Похожие товары"
- [ ] Создать страницу каталога с фильтрами
- [ ] Добавить "Избранное" функционал
