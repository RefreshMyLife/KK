import { Product, ProductDetails } from '@/app/types';
import { wpGraphQL } from '@/lib/wordpress';
import {
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_RELATED_PRODUCTS,
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
