import { gql } from 'graphql-request';

export const GET_ARTWORKS = gql`
  {
    artworks(first: 10) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
