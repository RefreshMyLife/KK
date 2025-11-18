export const GET_ALL_NEWS = `
  query GetAllNews($first: Int = 10, $after: String) {
    allNews(first: $first, after: $after) {
      nodes {
        id
        title
        content
        date
        guid
        dateGmt
        modified
        slug
        uri
        link
        status
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
        contentType {
          node {
            name
            label
          }
        }
        lastEditedBy {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_NEWS_BY_SLUG = `
  query GetNewsBySlug($slug: ID!) {
    news(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      guid
      dateGmt
      modified
      slug
      uri
      link
      status
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
      contentType {
        node {
          name
          label
        }
      }
      lastEditedBy {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;
