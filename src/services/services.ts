import { Category, CategoryBasic } from '@/app/types';
import { wpGraphQL } from '@/lib/wordpress';
import { GET_ALL_CATEGORIES, GET_CATEGORIES_BY_IDS, GET_CATEGORY_BY_SLUG } from './graphql';


interface CategoriesResponse {
  categories: {
    nodes: Category[];
  };
}

interface CategoryResponse {
  category: Category;
}

interface AllCategoriesResponse {
  categories: {
    nodes: CategoryBasic[];
  };
}

/**
 * Получает категории по массиву ID
 */
export async function getCategoriesByIds(ids: string[]): Promise<Category[]> {
  if (!ids || ids.length === 0) return [];

  const data = await wpGraphQL<CategoriesResponse>(
    GET_CATEGORIES_BY_IDS,
    { ids }
  );
  
  return data.categories.nodes;
}

/**
 * Получает категорию по slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await wpGraphQL<CategoryResponse>(
      GET_CATEGORY_BY_SLUG,
      { slug }
    );
    return data.category;
  } catch (error) {
    console.error(`Failed to fetch category "${slug}":`, error);
    return null;
  }
}

/**
 * Получает все категории (без постов)
 */
export async function getAllCategories(): Promise<CategoryBasic[]> {
  const data = await wpGraphQL<AllCategoriesResponse>(GET_ALL_CATEGORIES);
  return data.categories.nodes;
}