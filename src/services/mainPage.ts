import { MainPageBlock, MainPageData } from '@/app/types';
import { wpGraphQL } from '@/lib/wordpress';
import { GET_MAIN_PAGE_BLOCKS } from './graphql';
import { getCategoriesByIds } from './services';

const HOME_PAGE_ID = 117;

// ============================================
// GraphQL Functions
// ============================================

interface MainPageBlocksResponse {
  page: {
    id: string;
    title: string;
    mainPage: {
      bloks: MainPageBlock[];
    };
  };
}

/**
 * Получает все блоки главной страницы через GraphQL
 */
export async function getMainPageBlocks(): Promise<MainPageBlock[]> {
  const data = await wpGraphQL<MainPageBlocksResponse>(GET_MAIN_PAGE_BLOCKS);
  return data.page.mainPage.bloks;
}

/**
 * Получает только слайдер главной страницы через GraphQL
 */
export async function getMainPageSliderGraphQL() {
  const blocks = await getMainPageBlocks();
  const sliderBlock = blocks.find((block) => block.typeBloka?.[0] === 'rs_slider');
  return sliderBlock?.slider || [];
}

/**
 * Получает данные главной страницы с категориями и товарами через GraphQL
 */
export async function getMainPageWithCategories(): Promise<MainPageData> {
  // Получаем блоки
  const blocks = await getMainPageBlocks();

  // Извлекаем уникальные ID категорий
  const categoryIds = [
    ...new Set(
      blocks
        .filter((block) => block.categoryMain && block.categoryMain.length > 0)
        .flatMap((block) => block.categoryMain as string[])
    ),
  ];

  // Получаем категории (если есть ID)
  const categories =
    categoryIds.length > 0 ? await getCategoriesByIds(categoryIds) : [];

  // Создаем Map для быстрого доступа
  const categoryMap = new Map(
    categories.map((cat) => [cat.databaseId.toString(), cat])
  );

  return { blocks, categories, categoryMap };
}

/**
 * Получает блок по типу через GraphQL
 */
export async function getBlockByTypeGraphQL(
  blockType: string
): Promise<MainPageBlock | null> {
  const blocks = await getMainPageBlocks();
  return blocks.find((block) => block.typeBloka?.[0] === blockType) || null;
}