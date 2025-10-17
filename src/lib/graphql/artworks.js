import { client } from './client';
import { GET_ARTWORKS } from './queries';

export async function getArtworks() {
  const { artworks } = await client.request(GET_ARTWORKS);
  return artworks.nodes;
}
