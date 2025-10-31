export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Post {
    id
    title
    slug
    link
    uri
    excerpt
    featuredImage {
      node {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
        uri
      }
    }
  }
`;

export const PRODUCT_FULL_FRAGMENT = `
  fragment ProductFullFields on Post {
    id
    title
    slug
    link
    uri
    date
    content
    excerpt
    featuredImage {
      node {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
        uri
      }
    }
    tags {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
