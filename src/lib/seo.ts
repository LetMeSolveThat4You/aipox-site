type FounderOpts = {
  '@type'?: string;
  name?: string;
  url?: string;
  sameAs?: string[];
};

type OrgOpts = {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: Array<{
    '@type'?: string;
    telephone?: string;
    contactType?: string;
    areaServed?: string;
  }>;
  address?: {
    '@type'?: string;
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  founder?: FounderOpts;
};

export function organizationJsonLd({
  name = 'AiPOX',
  // Absolute URL so crawlers resolve the logo regardless of the page path.
  logo = 'https://aipox.nl/favicon-512.png',
  url = 'https://aipox.nl',
  sameAs = [],
  contactPoint = [],
  address,
  founder,
}: OrgOpts = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // Stable node id so other JSON-LD on the page (e.g. product publishers) can
    // reference the single Organization instead of duplicating it.
    '@id': `${url}/#organization`,
    name,
    url,
    logo,
    sameAs,
    contactPoint,
    address,
    // Only emit `founder` when provided so the node stays valid when omitted.
    ...(founder ? { founder: { '@type': 'Person', ...founder } } : {}),
  };
}

export function websiteJsonLd({
  url = 'https://aipox.nl',
  name = 'AiPOX',
  description = 'AiPOX bouwt moderne software die werk uit handen neemt — met een team van AI-agents dat nooit slaapt, onder menselijke regie.',
  inLanguage = 'nl',
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    inLanguage,
  };
}

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

type PageMetaOpts = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export function pageMeta({ title, description, url, image }: PageMetaOpts) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
    },
  };
}

type ProductSeoInput = {
  name: string;
  description: string;
  /** Honest human status (e.g. "Live", "In opbouw", "Momenteel niet online"). */
  status?: string;
  /** Public URL — omit for products without a live site (e.g. SmartDocGen). */
  url?: string;
};

/**
 * SoftwareApplication JSON-LD for the AiPOX product family, emitted as an
 * `@graph`. Honesty rule (MB-024): status is folded into the description; there
 * are NO `offers`/price or `aggregateRating` because none exist. Each node
 * `publisher`s the single Organization node (by `@id`) rather than duplicating
 * it — see `organizationJsonLd`.
 */
export function productsJsonLd(
  products: ProductSeoInput[],
  { orgUrl = 'https://aipox.nl', orgName = 'AiPOX' }: { orgUrl?: string; orgName?: string } = {},
) {
  const publisher = {
    '@type': 'Organization',
    '@id': `${orgUrl}/#organization`,
    name: orgName,
    url: orgUrl,
  };
  return {
    '@context': 'https://schema.org',
    '@graph': products.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.status ? `${p.description} Status: ${p.status}.` : p.description,
      applicationCategory: 'BusinessApplication',
      ...(p.url ? { url: p.url } : {}),
      publisher,
    })),
  };
}

type FaqSeoItem = { question: string; answer: string };

/**
 * FAQPage JSON-LD built from the SAME strings rendered on the page. Google
 * requires the Q&A text to be visible in the DOM (schema-only is a violation),
 * so callers must render these questions/answers as well.
 */
export function faqJsonLd(items: FaqSeoItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}
