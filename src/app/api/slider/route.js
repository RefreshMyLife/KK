import { GraphQLClient, gql } from 'graphql-request';

export async function GET() {
  const client = new GraphQLClient('https://kupitkartinu.ru/graphql', {
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from('admin:30jt ezTz 9mfM 4oVY FNqX SD6c').toString('base64'),
    },
  });

  const QUERY = gql`
 query GetMainPage {
  page(id: "home", idType: URI) {
    title
    mainPage {
      bloks {
        typeBloka
        title
        image {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}

`;

  try {
    const data = await client.request(QUERY);
    return new Response(JSON.stringify(data, null, 2), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, details: error.response }),
      { status: 500 }
    );
  }
}


//   const QUERY = gql`
//  query GetMainPage {
//   page(id: "home", idType: URI) {
//     title
//     mainPage {
//       bloks {
//         typeBloka
//         title
//         image {
//           node {
//             sourceUrl
//           }
//         }
//       }
//     }
//   }
// }

