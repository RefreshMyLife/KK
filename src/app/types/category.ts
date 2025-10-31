import { Post } from "./post";



export interface CategoryBasic {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  uri: string;
  description?: string;
  count?: number;
}

export interface Category extends CategoryBasic {
  posts: {
    nodes: Post[];
  };
}