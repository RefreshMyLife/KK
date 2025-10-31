import { Post } from '@/app/types';
import { wpGraphQL } from '@/lib/wordpress';
import { GET_POST_BY_SLUG, GET_POSTS, GET_POSTS_BY_CATEGORY } from './graphql';


interface PostsResponse {
  posts: {
    nodes: Post[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

interface PostResponse {
  post: Post;
}

interface PostsByCategoryResponse {
  category: {
    id: string;
    name: string;
    posts: {
      nodes: Post[];
    };
  };
}

/**
 * Получает список постов с пагинацией
 */
export async function getPosts(first = 10, after?: string) {
  const data = await wpGraphQL<PostsResponse>(
    GET_POSTS,
    { first, after }
  );
  return data.posts;
}

/**
 * Получает пост по slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data = await wpGraphQL<PostResponse>(
      GET_POST_BY_SLUG,
      { slug }
    );
    return data.post;
  } catch (error) {
    console.error(`Failed to fetch post "${slug}":`, error);
    return null;
  }
}

/**
 * Получает посты по категории
 */
export async function getPostsByCategory(categoryId: number, first = 10) {
  const data = await wpGraphQL<PostsByCategoryResponse>(
    GET_POSTS_BY_CATEGORY,
    { categoryId, first }
  );
  return data.category.posts.nodes;
}