# Компоненты страницы товара

## Компоненты

### ProductGallery
Компонент галереи изображений товара с возможностью выбора изображения из миниатюр.

**Props:**
- `mainImage: MediaItem` - главное изображение товара
- `gallery?: MediaItem[]` - дополнительные изображения
- `title: string` - название товара для alt текста

### ProductInfo
Компонент информации о товаре с кнопками действий.

**Props:**
- `product: Product` - объект товара
- `onAddToCart?: () => void` - обработчик добавления в корзину
- `onRequestQuote?: () => void` - обработчик оставления заявки

## Использование

```tsx
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { getProductBySlug } from "@/services/product";

const product = await getProductBySlug("product-slug");

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <ProductGallery
    mainImage={product.featuredImage.node}
    gallery={product.gallery}
    title={product.title}
  />

  <ProductInfo
    product={product}
    onAddToCart={() => {/* добавить в корзину */}}
    onRequestQuote={() => {/* оставить заявку */}}
  />
</div>
```

## Структура данных товара

Товар использует тип `Product` из `@/app/types/product`:

- `id` - ID товара
- `title` - название
- `slug` - URL slug
- `price` - цена (опционально, если используется ACF)
- `artist` - художник (ACF поле)
- `material` - материал (ACF поле)
- `size` - размер (ACF поле)
- `country` - страна (ACF поле)
- `year` - год (ACF поле)
- `featuredImage` - главное изображение
- `gallery` - галерея изображений (ACF поле)
- `categories` - категории товара

## GraphQL

Для получения товаров используются следующие запросы:

- `GET_PRODUCT_BY_SLUG` - получение товара по slug
- `GET_PRODUCTS` - список товаров с пагинацией
- `GET_PRODUCTS_BY_CATEGORY` - товары по категории
- `GET_RELATED_PRODUCTS` - похожие товары

## Сервисы

Функции для работы с товарами находятся в `@/services/product`:

- `getProductBySlug(slug)` - получить товар по slug
- `getProducts(first, after)` - получить список товаров
- `getProductsByCategory(categorySlug, first, after)` - товары по категории
- `getRelatedProducts(categoryId, excludeId, first)` - похожие товары
