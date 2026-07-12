import type { MetadataRoute } from 'next';

// Single canonical host (non-www). Keep in sync with buildAlternates in
// src/lib/meta.ts and the Organization/WebSite JSON-LD in src/lib/seo.ts.
const SITE_URL = 'https://aipox.nl';
const LOCALES = ['nl', 'en'] as const;
const DEFAULT_LOCALE = 'nl';

// Only LIVE routes. /services and /pricing 308-redirect (see next.config) and
// /test was removed — they must NOT appear here. /how-i-build is included.
const ROUTES = ['', '/about', '/how-i-build', '/contact', '/legal'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => {
      const languages: Record<string, string> = {};
      for (const loc of LOCALES) languages[loc] = `${SITE_URL}/${loc}${route}`;
      languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${route}`;

      return {
        url: `${SITE_URL}/${locale}${route}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        alternates: { languages },
      };
    }),
  );
}
