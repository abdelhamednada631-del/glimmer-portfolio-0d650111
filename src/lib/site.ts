/** Canonical public origin for absolute metadata URLs (og:image, twitter:image). */
export const SITE_URL = "https://abdelhamednada.vercel.app";

/** Default social share card (1200x630). */
export const OG_IMAGE = `${SITE_URL}/og.png`;

/** Build an absolute URL from a site-relative or bundled asset path. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
