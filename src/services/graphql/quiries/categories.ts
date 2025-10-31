import { CATEGORY_WITH_POSTS_FRAGMENT } from "../fragmants/category";


export const GET_CATEGORIES_BY_IDS = `
  ${CATEGORY_WITH_POSTS_FRAGMENT}
  
  query GetCategories($ids: [ID!]!) {
    categories(where: {include: $ids}) {
      nodes {
        ...CategoryWithPostsFields
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = `
  ${CATEGORY_WITH_POSTS_FRAGMENT}
  
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      ...CategoryWithPostsFields
    }
  }
`;

export const GET_ALL_CATEGORIES = `
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        uri
        count
      }
    }
  }
`;