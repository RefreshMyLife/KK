import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint для On-Demand Revalidation
 *
 * Позволяет принудительно обновлять ISR страницы через защищенный API.
 * Используется с WordPress webhooks для моментального обновления контента.
 *
 * Примеры использования:
 *
 * 1. Обновить конкретную страницу товара:
 *    POST /api/revalidate?secret=YOUR_SECRET&path=/product/картина-123
 *
 * 2. Обновить главную страницу:
 *    POST /api/revalidate?secret=YOUR_SECRET&path=/
 *
 * 3. Обновить по тегу (все страницы с этим тегом):
 *    POST /api/revalidate?secret=YOUR_SECRET&tag=paintings
 *
 * 4. Обновить несколько путей:
 *    POST /api/revalidate
 *    Body: { secret: "YOUR_SECRET", paths: ["/", "/product/картина-1"] }
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем параметры из URL или тела запроса
    const searchParams = request.nextUrl.searchParams;
    const body = await request.json().catch(() => ({}));

    // Secret token для защиты от несанкционированного доступа
    const secret = searchParams.get('secret') || body.secret;
    const expectedSecret = process.env.REVALIDATE_SECRET;

    // Проверка secret token
    if (!expectedSecret) {
      console.error('[Revalidate API] REVALIDATE_SECRET is not configured in environment');
      return NextResponse.json(
        {
          error: 'Revalidation endpoint is not configured',
          message: 'Please set REVALIDATE_SECRET in .env.local'
        },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.warn('[Revalidate API] Invalid secret token provided');
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Получаем параметры revalidation
    const path = searchParams.get('path') || body.path;
    const tag = searchParams.get('tag') || body.tag;
    const paths = body.paths; // Массив путей для множественного обновления

    const revalidated: string[] = [];

    // Revalidation по path
    if (path) {
      revalidatePath(path);
      revalidated.push(`path:${path}`);
      console.log(`[Revalidate API] Revalidated path: ${path}`);
    }

    // Revalidation по tag
    if (tag) {
      revalidateTag(tag);
      revalidated.push(`tag:${tag}`);
      console.log(`[Revalidate API] Revalidated tag: ${tag}`);
    }

    // Revalidation множественных путей
    if (paths && Array.isArray(paths)) {
      for (const p of paths) {
        revalidatePath(p);
        revalidated.push(`path:${p}`);
      }
      console.log(`[Revalidate API] Revalidated ${paths.length} paths`);
    }

    // Проверка: был ли указан хотя бы один параметр
    if (revalidated.length === 0) {
      return NextResponse.json(
        {
          error: 'Missing revalidation parameters',
          message: 'Please provide at least one of: path, tag, or paths',
          usage: {
            path: 'Single path to revalidate (e.g., /product/painting-123)',
            tag: 'Cache tag to revalidate (e.g., paintings)',
            paths: 'Array of paths to revalidate (e.g., ["/", "/news"])',
          },
        },
        { status: 400 }
      );
    }

    // Успешный ответ
    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
      message: `Successfully revalidated ${revalidated.length} item(s)`,
    });
  } catch (error) {
    console.error('[Revalidate API] Error:', error);

    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET метод для проверки работоспособности endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/revalidate',
    status: 'active',
    method: 'POST',
    parameters: {
      secret: {
        type: 'string',
        required: true,
        description: 'Secret token from REVALIDATE_SECRET env variable',
      },
      path: {
        type: 'string',
        optional: true,
        description: 'Single path to revalidate (e.g., /product/painting-123)',
        example: '/product/картина-123',
      },
      tag: {
        type: 'string',
        optional: true,
        description: 'Cache tag to revalidate',
        example: 'paintings',
      },
      paths: {
        type: 'array',
        optional: true,
        description: 'Multiple paths to revalidate',
        example: ['/', '/product/картина-1', '/product/картина-2'],
      },
    },
    examples: [
      {
        description: 'Revalidate single product page',
        curl: 'curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET&path=/product/картина-123"',
      },
      {
        description: 'Revalidate by tag',
        curl: 'curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET&tag=paintings"',
      },
      {
        description: 'Revalidate multiple paths (POST body)',
        curl: 'curl -X POST http://localhost:3000/api/revalidate -H "Content-Type: application/json" -d \'{"secret":"YOUR_SECRET","paths":["/","/product/картина-1"]}\'',
      },
    ],
    wordpress_webhook: {
      description: 'Configure WordPress to call this endpoint on post update',
      url: 'https://your-domain.com/api/revalidate',
      method: 'POST',
      params: {
        secret: 'YOUR_REVALIDATE_SECRET',
        path: '/product/{{post_slug}}', // WordPress заменит на реальный slug
      },
    },
  });
}
