import { POST_CARD_FRAGMENT, POST_FULL_FRAGMENT } from "../fragmants/post";

export const GET_POSTS = `
  ${POST_CARD_FRAGMENT}
  
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        ...PostCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  ${POST_FULL_FRAGMENT}
  
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFullFields
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = `
  ${POST_CARD_FRAGMENT}
  
  query GetPostsByCategory($categoryId: Int!, $first: Int = 10) {
    category(id: $categoryId, idType: DATABASE_ID) {
      id
      name
      posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          ...PostCardFields
        }
      }
    }
  }
`;