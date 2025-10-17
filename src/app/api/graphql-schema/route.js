import { GraphQLClient, gql } from 'graphql-request';

export async function GET() {
  const client = new GraphQLClient('https://kupitkartinu.ru/graphql', {
    headers: {
      Authorization:
        'Basic ' + Buffer.from('admin:30jt ezTz 9mfM 4oVY FNqX SD6c').toString('base64'),
    },
  });

  const QUERY = gql`
    {
      __schema {
        types {
          name
        }
      }
    }
  `;

  try {
    const data = await client.request(QUERY);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
