import { Product, ProductDetails, PaintingCategoryResponse } from '@/app/types';
import { wpGraphQL } from '@/lib/wordpress';
import {
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_RELATED_PRODUCTS,
  GET_PAINTINGS_BY_CATEGORY_SLUG,
} from './graphql';

interface ProductsResponse {
  posts: {
    nodes: Product[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

interface ProductResponse {
  post: ProductDetails;
}

interface RelatedProductsResponse {
  posts: {
    nodes: Product[];
  };
}

/**
 * Получает список товаров с пагинацией
 */
export async function getProducts(first = 10, after?: string) {
  const data = await wpGraphQL<ProductsResponse>(GET_PRODUCTS, { first, after });
  return data.posts;
}

/**
 * Получает товар по slug
 */
export async function getProductBySlug(slug: string): Promise<ProductDetails | null> {
  try {
    const data = await wpGraphQL<ProductResponse>(GET_PRODUCT_BY_SLUG, { slug });
    return data.post;
  } catch (error) {
    console.error(`Failed to fetch product "${slug}":`, error);
    return null;
  }
}

/**
 * Получает товары по категории
 */
export async function getProductsByCategory(
  categorySlug: string,
  first = 10,
  after?: string
) {
  const data = await wpGraphQL<ProductsResponse>(GET_PRODUCTS_BY_CATEGORY, {
    categorySlug,
    first,
    after,
  });
  return data.posts;
}

/**
 * Получает похожие товары (из той же категории)
 */
export async function getRelatedProducts(
  categoryId: number,
  excludeId: string,
  first = 4
): Promise<Product[]> {
  try {
    const data = await wpGraphQL<RelatedProductsResponse>(GET_RELATED_PRODUCTS, {
      categoryId,
      excludeId,
      first,
    });
    return data.posts.nodes;
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    return [];
  }
}

/**
 * Получает картины по категории (slug) для главной страницы
 * Возвращает данные готовые для компонента ProductCard
 * @param categorySlug - slug категории
 * @param limit - количество картин (по умолчанию 10)
 */
export async function getPaintingsByCategory(categorySlug: string, limit = 10) {
  try {
    const data = await wpGraphQL<PaintingCategoryResponse>(
      GET_PAINTINGS_BY_CATEGORY_SLUG,
      { categorySlug, first: limit }
    );

    // Маппинг данных WordPress в формат ProductCard
    const paintings = data.category.posts.nodes.map((post) => {
      const { paintings: paintingData, featuredImage, title, slug } = post;

      // Форматирование цены
      const formattedPrice = paintingData.picturePrice
        ? `${paintingData.picturePrice.toLocaleString('ru-RU')} ₽`
        : '';

      return {
        id: post.id,
        slug: slug,
        title: title, // Название картины
        subtitle: '', // Можно добавить описание если нужно
        price: formattedPrice,
        details: paintingData.pictureTechnique || '',
        size: paintingData.pictureSize || '',
        country: '', // Нет в данных
        year: '', // Нет в данных
        imageUrl: featuredImage?.node.sourceUrl || '',
      };
    });

    return paintings;
  } catch (error) {
    console.error(`Failed to fetch paintings for category "${categorySlug}":`, error);
    return [];
  }
}
