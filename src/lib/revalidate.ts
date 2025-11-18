/**
 * Helper функции для работы с On-Demand Revalidation
 *
 * Эти функции помогают удобно вызывать revalidation API
 * из серверных компонентов или внешних сервисов.
 */

/**
 * Базовый URL для revalidation API
 * В production используется абсолютный URL сайта
 */
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return 'http://localhost:3000';
};

/**
 * Интерфейс ответа от revalidation API
 */
export interface RevalidateResponse {
  success: boolean;
  revalidated?: string[];
  error?: string;
  message?: string;
  timestamp?: string;
}

/**
 * Опции для revalidation запроса
 */
export interface RevalidateOptions {
  /** Путь для revalidation (например, "/product/картина-123") */
  path?: string;
  /** Тег для revalidation (например, "paintings") */
  tag?: string;
  /** Множественные пути для revalidation */
  paths?: string[];
  /** Secret token (если не указан, берется из process.env.REVALIDATE_SECRET) */
  secret?: string;
}

/**
 * Отправляет запрос на revalidation API
 *
 * @example
 * // Обновить одну страницу
 * await revalidate({ path: '/product/картина-123' });
 *
 * @example
 * // Обновить по тегу
 * await revalidate({ tag: 'paintings' });
 *
 * @example
 * // Обновить несколько страниц
 * await revalidate({ paths: ['/', '/product/картина-1', '/product/картина-2'] });
 */
export async function revalidate(options: RevalidateOptions): Promise<RevalidateResponse> {
  const { path, tag, paths, secret } = options;
  const revalidateSecret = secret || process.env.REVALIDATE_SECRET;

  if (!revalidateSecret) {
    throw new Error('REVALIDATE_SECRET is not defined');
  }

  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/revalidate', baseUrl);

    // Если передан только path или tag, используем query parameters
    if ((path || tag) && !paths) {
      if (path) url.searchParams.set('path', path);
      if (tag) url.searchParams.set('tag', tag);
      url.searchParams.set('secret', revalidateSecret);

      const response = await fetch(url.toString(), { method: 'POST' });
      return response.json();
    }

    // Для множественных путей используем POST body
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: revalidateSecret,
        path,
        tag,
        paths,
      }),
    });

    return response.json();
  } catch (error) {
    console.error('[Revalidate Helper] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Обновить страницу товара/картины
 *
 * @example
 * await revalidateProduct('картина-123');
 */
export async function revalidateProduct(slug: string): Promise<RevalidateResponse> {
  return revalidate({ path: `/product/${slug}` });
}

/**
 * Обновить главную страницу
 *
 * @example
 * await revalidateHome();
 */
export async function revalidateHome(): Promise<RevalidateResponse> {
  return revalidate({ path: '/' });
}

/**
 * Обновить страницу новости
 *
 * @example
 * await revalidateNews('latest-news-slug');
 */
export async function revalidateNews(slug: string): Promise<RevalidateResponse> {
  return revalidate({ path: `/news/${slug}` });
}

/**
 * Обновить все страницы с определенным тегом
 *
 * @example
 * await revalidateByTag('paintings');
 */
export async function revalidateByTag(tag: string): Promise<RevalidateResponse> {
  return revalidate({ tag });
}

/**
 * Проверить доступность revalidation API
 */
export async function checkRevalidationEndpoint(): Promise<boolean> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/revalidate`, { method: 'GET' });
    const data = await response.json();
    return data.status === 'active';
  } catch {
    return false;
  }
}
