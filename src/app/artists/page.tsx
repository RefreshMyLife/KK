import ArtistsList from '@/components/artists/ArtistsList';
import { mockArtists } from '@/data/mockArtists';

export default function ArtistsPage() {
  return <ArtistsList artists={mockArtists} />;
}
