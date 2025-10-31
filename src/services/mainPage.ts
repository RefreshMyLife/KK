import { SliderItem, WPPageResponse, PageBlock, MainPageBlock, MainPageData } from '@/app/types';
import { wpGraphQL, wpRest } from '@/lib/wordpress';
import { GET_MAIN_PAGE_BLOCKS } from './graphql';
import { getCategoriesByIds } from './services';

const HOME_PAGE_ID = 117;

// ============================================
// REST API Functions
// ============================================

/**
 * Получает слайдер главной страницы из WordPress REST API
 * @returns Массив элементов слайдера или пустой массив при ошибке
 */
export async function getMainSlider(): Promise<SliderItem[]> {
  try {
    const page = await wpRest<WPPageResponse>(
      `wp/v2/pages/${HOME_PAGE_ID}?acf_format=standard`
    );

    if (!page?.acf?.bloks) {
      console.warn('No ACF blocks found in page response');
      return [];
    }

    const sliderBlock = page.acf.bloks.find(
      (block) =>
        block.type_bloka === 'rs_slider' &&
        Array.isArray(block.slider) &&
        block.slider.length > 0
    );

    if (!sliderBlock?.slider) {
      console.warn('Slider block not found or empty');
      return [];
    }

    return sliderBlock.slider;
  } catch (error) {
    console.error('Failed to fetch main slider:', error);
    return [];
  }
}

/**
 * Вспомогательная функция для получения конкретного блока по типу (REST API)
 */
export async function getBlockByType(blockType: string): Promise<PageBlock | null> {
  try {
    const page = await wpRest<WPPageResponse>(
      `wp/v2/pages/${HOME_PAGE_ID}?acf_format=standard`
    );

    if (!page?.acf?.bloks) {
      return null;
    }

    return page.acf.bloks.find((block) => block.type_bloka === blockType) || null;
  } catch (error) {
    console.error(`Failed to fetch block type "${blockType}":`, error);
    return null;
  }
}

/**
 * Функция для получения всех блоков страницы (REST API)
 */
export async function getAllBlocks(): Promise<PageBlock[]> {
  try {
    const page = await wpRest<WPPageResponse>(
      `wp/v2/pages/${HOME_PAGE_ID}?acf_format=standard`
    );

    return page?.acf?.bloks || [];
  } catch (error) {
    console.error('Failed to fetch page blocks:', error);
    return [];
  }
}

// ============================================
// GraphQL Functions (новые)
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

// ============================================
// Deprecated Functions
// ============================================

/**
 * @deprecated Используйте getMainPageBlocks() или getMainPageWithCategories()
 */
export async function getMainPage() {
  const query = `
    query MainPage {
      page(id: "home", idType: URI) {
        id
        title
        mainPage {
          bloks {
            typeBloka
          }
        }
      }
    }
  `;
  return wpGraphQL(query);
}