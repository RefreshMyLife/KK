import { ImageUrl } from './image';

/** Автор новости */
export interface NewsAuthor {
  name: string;
  avatar: {
    url: string;
  } | null;
}

/** Тип контента */
export interface NewsContentType {
  name: string;
  label: string;
}

/** Основное изображение новости - внутренний объект */
export interface NewsFeaturedImageNode {
  id: string;
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  } | null;
}

/** Основное изображение новости - обертка с node */
export interface NewsFeaturedImage {
  node: NewsFeaturedImageNode;
}

/** Новость - базовая карточка для списков */
export interface NewsCard {
  id: string;
  title: string;
  slug: string;
  date: string;
  dateGmt: string;
  excerpt?: string;
  featuredImage: NewsFeaturedImage | null;
  contentType: {
    node: NewsContentType;
  } | null;
}

/** Новость - полная информация */
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  guid: string;
  dateGmt: string;
  modified: string;
  slug: string;
  uri: string;
  link: string;
  status: string;
  featuredImage: NewsFeaturedImage | null;
  contentType: {
    node: NewsContentType;
  } | null;
  lastEditedBy: {
    node: NewsAuthor;
  } | null;
}

/** Информация о пагинации */
export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

/** Ответ на запрос списка новостей */
export interface NewsConnection {
  nodes: NewsItem[];
  pageInfo: PageInfo;
}
