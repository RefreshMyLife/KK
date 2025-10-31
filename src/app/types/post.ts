import { MediaItem } from './image';
import { CategoryBasic } from './category';

export interface Post {
  id: string;
  title: string;
  slug: string;
  link: string;
  uri: string;
  date: string;
  excerpt?: string;
  content?: string;
  featuredImage?: {
    node: MediaItem;
  } | null;
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
  categories?: {
    nodes: CategoryBasic[];
  };
}