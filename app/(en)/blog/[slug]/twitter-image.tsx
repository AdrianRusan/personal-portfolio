// Same per-post card as Open Graph; without this, posts inherit the /blog card.
export {
  default,
  size,
  contentType,
  generateImageMetadata,
} from "./opengraph-image";
// Route config must be literal here, not re-exported.
export const revalidate = 3600;
