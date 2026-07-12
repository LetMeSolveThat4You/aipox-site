import { pageMeta } from './seo';

const SITE_URL = 'https://aipox.nl';
const LOCALES = ['nl', 'en'] as const;
const DEFAULT_LOCALE = 'nl';

type Messages = Record<string, unknown>;

/**
 * Build per-page `alternates` for Next.js metadata: a self-referencing
 * `canonical`, one `hreflang` entry per locale for THIS page, and an
 * `x-default` pointing at the default (nl) locale.
 *
 * @param locale active locale ('nl' | 'en')
 * @param path   locale-less path for the page, e.g. '' (home) or '/about'
 */
export function buildAlternates(locale: string, path: string) {
  const href = (loc: string) => `${SITE_URL}/${loc}${path}`;
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) languages[loc] = href(loc);
  languages['x-default'] = href(DEFAULT_LOCALE);
  return {
    canonical: href(locale),
    languages,
  };
}

function safeGet(obj: unknown, path: string[]) {
  let current: unknown = obj;
  for (const key of path) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export async function buildPageMeta(messages: Messages, locale: string, segment: string) {
  const title = safeGet(messages, [segment, 'title']) ?? safeGet(messages, ['title']) ?? 'AiPOX';
  const description =
    safeGet(messages, [segment, 'intro']) ??
    safeGet(messages, ['subtitle']) ??
    'AiPOX — moderne software, gebouwd met een team dat nooit slaapt';
  const path = segment === 'HomePage' ? '' : `/${segment.replace(/Page$/, '').toLowerCase()}`;
  return {
    ...pageMeta({
      title: String(title),
      description: String(description),
      url: `${SITE_URL}/${locale}${path}`,
      image: '/og-image.png',
    }),
    alternates: buildAlternates(locale, path),
  };
}
