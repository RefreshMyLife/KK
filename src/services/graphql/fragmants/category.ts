export const CATEGORY_BASIC_FRAGMENT = `
  fragment CategoryBasicFields on Category {
    id
    databaseId
    name
    slug
    uri
    description
    count
  }
`;

export const CATEGORY_WITH_POSTS_FRAGMENT = `
  fragment CategoryWithPostsFields on Category {
    id
    databaseId
    name
    slug
    uri
    description
    count
    posts(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        title
        slug
        link
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;