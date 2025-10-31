export const IMAGE_FRAGMENT = `
  fragment ImageFields on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export const ACF_IMAGE_FRAGMENT = `
  fragment AcfImageFields on AcfMediaItemConnectionEdge {
    node {
      sourceUrl
      altText
    }
  }
`;