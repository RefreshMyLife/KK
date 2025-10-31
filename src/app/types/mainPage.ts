import { AcfImage, ImageUrl } from './image';
import type { Category } from './category';
// ============================================
// REST API Types 
// ============================================

/** Элемент слайдера на главной странице */
export interface SliderItem {
  title: string;
  content: string;
  images: {
    desctop: string; // опечатка в php, не буду исправлять
    mobile: string;
  };
}

/** Элемент feature/преимущества */
export interface Feature {
  icon: string;
  title: string;
  content: string;
}

/** Элемент marquee */
export interface MarqueeItem {
  img: string;
}

/** Последний слайд блока */
export interface LastSlide {
  img: string | false;
  title: string;
  btn: string;
}

/** Блок страницы ACF (REST API) */
export interface PageBlock {
  type_bloka: string;
  slider?: SliderItem[] | false;
  title: string;
  image: string | false;
  features: Feature[] | false;
  marquee: MarqueeItem[] | false;
  category_main: string | false;
  last_slaid: LastSlide; // Опечатка "slaid" вместо "slide"
}

/** ACF данные страницы */
export interface PageACF {
  bloks: PageBlock[];
}

/** Полная структура ответа WordPress REST API */
export interface WPPageResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Record<string, unknown>;
  class_list: string[];
  acf: PageACF;
  yoast_head?: string;
  yoast_head_json?: Record<string, unknown>;
  _links: Record<string, unknown>;
}

// ============================================
// GraphQL Types 
// ============================================

/** Слайдер главной страницы (GraphQL) */
export interface MainPageSlide {
  title: string;
  content: string;
  images: {
    desctop: AcfImage | null;
    mobile: AcfImage | null;
  };
}

/** Преимущества (GraphQL) */
export interface MainPageFeature {
  icon: AcfImage | null;
  title: string;
  content: string;
}

/** Последний слайд для товарных блоков (GraphQL) */
export interface MainPageLastSlide {
  img: AcfImage | null;
  title: string | null;
  btn: string | null;
}

/** Элемент бегущей строки (GraphQL) */
export interface MainPageMarquee {
  img: AcfImage | null;
}

/** Блок главной страницы (GraphQL) */
export interface MainPageBlock {
  typeBloka: string[];
  title: string | null;
  categoryMain?: string[];

  // Разные типы контента в зависимости от блока
  slider?: MainPageSlide[];
  features?: MainPageFeature[];
  image?: AcfImage | null;
  lastSlaid?: MainPageLastSlide;
  marquee?: MainPageMarquee[];
}

/** Данные главной страницы с категориями */
export interface MainPageData {
  blocks: MainPageBlock[];
  categories: Category[];
  categoryMap: Map<string, Category>;
}

