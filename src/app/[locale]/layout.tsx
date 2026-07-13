import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { organizationJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aipox.nl'),
  title: {
    template: '%s | AiPOX',
    default: 'AiPOX — moderne software, gebouwd met een team dat nooit slaapt',
  },
  description: 'AiPOX bouwt moderne software die werk uit handen neemt — met een team van AI-agents dat nooit slaapt, onder menselijke regie.',
  keywords: ['AiPOX', 'moderne software', 'software die werk automatiseert', 'AI-agents', 'productontwikkeling', 'Arthur Scheen', 'building in public', 'automatisering'],
  authors: [{ name: 'Arthur Scheen' }],
  creator: 'AiPOX',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://aipox.nl',
    siteName: 'AiPOX',
    title: 'AiPOX — moderne software, gebouwd met een team dat nooit slaapt',
    description: 'AiPOX bouwt moderne software die werk uit handen neemt — met een team van AI-agents dat nooit slaapt, onder menselijke regie.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AiPOX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AiPOX — moderne software, gebouwd met een team dat nooit slaapt',
    description: 'AiPOX bouwt moderne software die werk uit handen neemt — met een team van AI-agents dat nooit slaapt, onder menselijke regie.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Await the params object before destructuring
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  // Build Organization JSON-LD using real contact data from messages
  const footerContact = messages?.footer?.contact ?? {};
  const footerCompany = messages?.footer?.company ?? 'AiPOX';
  const orgName = typeof footerCompany === 'string' ? footerCompany.split('|')[0].trim() : 'AiPOX';

  const orgLd = organizationJsonLd({
    name: orgName,
    url: 'https://aipox.nl',
    logo: 'https://aipox.nl/favicon-512.png',
    // AiPOX's own presence + product sites.
    sameAs: [
      'https://www.linkedin.com/company/aipox/',
      'https://github.com/LetMeSolveThat4You',
      'https://vincalis.com',
      'https://proceshuis.com',
    ],
    founder: {
      name: 'Arthur Scheen',
      url: 'https://aipox.nl',
      // The founder's personal profiles belong on the Person, not the Org.
      sameAs: [
        'https://nl.linkedin.com/in/arthurscheen',
        'https://github.com/LetMeSolveThat4You',
      ],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: footerContact.phone || undefined,
        contactType: 'customer service',
        areaServed: 'NL',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: "'s-Gravenzande",
      addressCountry: 'NL',
    },
  });

  const bcLd = breadcrumbJsonLd([{ name: 'Home', url: `https://aipox.nl/${locale}` }]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Explicit favicon links help some browsers pick up a non-standard filename.
          Per-page hreflang/canonical alternates are emitted via each page's
          generateMetadata (buildAlternates); the single <base href="/"> lives in
          the root layout <head>. */}
      <link rel="icon" href="/favicon-32.png" sizes="32x32" />
      <link rel="icon" href="/favicon-16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Locale-aware structured data */}
      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(bcLd)}</script>

      <Header />
      <main className="pt-16 sm:pt-20 relative z-10">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
