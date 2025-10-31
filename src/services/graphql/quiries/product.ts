import { PRODUCT_CARD_FRAGMENT, PRODUCT_FULL_FRAGMENT } from '../fragmants/product';

export const GET_PRODUCT_BY_SLUG = `
  ${PRODUCT_FULL_FRAGMENT}
  query GetProductBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...ProductFullFields
    }
  }
`;

export const GET_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductCardFields
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProductsByCategory($categorySlug: String!, $first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { categoryName: $categorySlug }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductCardFields
      }
    }
  }
`;

export const GET_RELATED_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetRelatedProducts($categoryId: Int!, $excludeId: ID!, $first: Int = 4) {
    posts(
      first: $first,
      where: {
        categoryId: $categoryId,
        notIn: [$excludeId]
      }
    ) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;
