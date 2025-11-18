import { NewsConnection, NewsItem } from '@/app/types';
import { wpGraphQL } from '@/lib/wordpress';
import { GET_ALL_NEWS, GET_NEWS_BY_SLUG } from './graphql';

interface NewsResponse {
  allNews: NewsConnection;
}

interface NewsBySlugResponse {
  news: NewsItem;
}

/**
 * Получает список новостей с пагинацией
 * @param first Количество новостей для получения (по умолчанию 10)
 * @param after Курсор для пагинации
 * @returns Объект с новостями и информацией о пагинации
 */
export async function getAllNews(
  first: number = 10,
  after?: string
): Promise<NewsConnection> {
  const variables = { first, after };
  const data = await wpGraphQL<NewsResponse>(GET_ALL_NEWS, variables);
  return data.allNews;
}

/**
 * Получает новость по slug
 * @param slug Slug новости
 * @returns Объект новости или null
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const data = await wpGraphQL<NewsBySlugResponse>(GET_NEWS_BY_SLUG, {
      slug,
    });
    return data.news;
  } catch (error) {
    console.error(`Failed to fetch news by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Получает последние новости для главной страницы
 * @param count Количество новостей (по умолчанию 3)
 * @returns Массив новостей
 */
export async function getLatestNews(count: number = 3): Promise<NewsItem[]> {
  const { nodes } = await getAllNews(count);
  return nodes;
}
