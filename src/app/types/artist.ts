export interface Artist {
  id: string;
  name: string;
  birthYear: string;
  deathYear: string;
  slug: string;
}

export interface ArtistsByLetter {
  [letter: string]: Artist[];
}
