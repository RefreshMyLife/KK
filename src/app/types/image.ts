export interface MediaItem {
  id?: string;
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface AcfImage {
  node: MediaItem;
}

// Для совместимости с REST API (просто URL)
export type ImageUrl = string;