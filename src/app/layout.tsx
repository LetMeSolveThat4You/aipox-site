import '@/app/globals.css';
import { ThemeProvider } from '@/utils/theme';
import { websiteJsonLd } from '@/lib/seo';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-inter' });
const jbMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-jbmono' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'AiPOX',
  description: 'AiPOX — moderne software, gebouwd met een team dat nooit slaapt',
  icons: {
    icon: [
      { url: '/favicon_blauw_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_blauw_32x32.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon_blauw_32x32.png', sizes: '180x180' }],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Serve the correct `<html lang>` per locale (/en -> en, /nl -> nl).
  const locale = await getLocale();
  // Locale-driven WebSite description, pulled from the message files.
  const messages = await getMessages();
  const homePageMessages = messages['HomePage'] as Record<string, string> | undefined;
  const siteLd = websiteJsonLd({
    inLanguage: locale,
    description:
      homePageMessages?.metaDescription ??
      homePageMessages?.subtitle ??
      undefined,
  });
  return (
    <html lang={locale} className={`${inter.variable} ${jbMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Ensure relative URLs resolve from site root (prevents /nl/_next/.. requests) */}
        <base href="/" />
      </head>
      <body>
        {/* Subtle film-grain overlay that breaks up the Aurora gradient tiling */}
        <div className="bg-noise" aria-hidden />
        <ThemeProvider>
          {/* WebSite JSON-LD for SEO and AI crawlers. The (locale-aware,
              populated) Organization node is emitted once from the locale
              layout — see src/app/[locale]/layout.tsx. */}
          <script type="application/ld+json">{JSON.stringify(siteLd)}</script>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
