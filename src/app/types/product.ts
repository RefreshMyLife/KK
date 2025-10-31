import { MediaItem } from './image';
import { CategoryBasic } from './category';

export interface Product {
  id: string;
  title: string;
  slug: string;
  price?: number;
  description?: string;
  excerpt?: string;

  // ACF поля для картин
  artist?: string; // Художник
  year?: string; // Год
  material?: string; // Материал (бумага, холст, масло и т.д.)
  size?: string; // Размер (например "82×64")
  country?: string; // Страна (например "Россия")

  // Изображения
  featuredImage?: {
    node: MediaItem;
  } | null;
  gallery?: MediaItem[]; // Галерея изображений

  // Категории
  categories?: {
    nodes: CategoryBasic[];
  };

  // Метаданные
  uri: string;
  link: string;
}

export interface ProductDetails extends Product {
  content?: string; // Полное описание
  relatedProducts?: Product[]; // Похожие товары
  tags?: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
}
