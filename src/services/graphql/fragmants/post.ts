export const POST_CARD_FRAGMENT = `
  fragment PostCardFields on Post {
    id
    title
    slug
    link
    uri
    date
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }
`;

export const POST_FULL_FRAGMENT = `
  fragment PostFullFields on Post {
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
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;