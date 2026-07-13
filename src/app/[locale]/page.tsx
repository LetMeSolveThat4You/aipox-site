import { getMessages, getTranslations } from 'next-intl/server';
import { pageMeta, productsJsonLd } from '@/lib/seo';
import { buildAlternates } from '@/lib/meta';
import QuoteCard from '@/components/QuoteCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

import ScrollToAboutButton from '@/components/ScrollToAboutButton';
import BuilderStorySection from '@/components/BuilderStorySection';
import ProductsSection from '@/components/ProductsSection';

export default async function HomePage({ params }: Props) {
  const { locale } = (await params) as { locale: string };
  // Use next-intl's standard translations helper scoped to the HomePage namespace.
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  // SoftwareApplication JSON-LD for the product family (MB-024). Built from the
  // localized product copy via static keys (next-intl/no-dynamic-translation-key);
  // status is honest, urls only where a public site exists, no offers/ratings.
  const productLd = productsJsonLd([
    {
      name: t('products.vincalis.name'),
      description: t('products.vincalis.description'),
      status: t('products.vincalis.status'),
      url: 'https://vincalis.com',
    },
    {
      name: t('products.smartdocgen.name'),
      description: t('products.smartdocgen.description'),
      status: t('products.smartdocgen.status'),
    },
    {
      name: t('products.proceshuis.name'),
      description: t('products.proceshuis.description'),
      status: t('products.proceshuis.status'),
      url: 'https://proceshuis.com',
    },
  ]);

  return (
    <div className="relative text-foreground">
      {/* Product structured data — sits with the products it describes. */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(productLd)}
      </script>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-between px-6 lg:px-8 py-20 md:py-24">
        {/* Main content - centered vertically with flex-grow.
            De hero leidt met de waardebelofte (H1). Het interactieve AiPOX-acroniem
            is verplaatst naar het header-lettermerk (MB-005), niet langer de hoofdact. */}
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="w-full max-w-4xl text-center space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {t('tagline')}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('subtitle')}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/80 max-w-2xl mx-auto">
                {t('intro')}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="font-medium">
                  <Link href="/#producten">{t('ctaPrimary')}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-medium">
                  <Link href="/contact">{t('ctaSecondary')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint - always at bottom with safe spacing */}
        <div className="flex-shrink-0 pb-4 md:pb-8">
          <ScrollToAboutButton label={t('scrollHint')} ariaLabel={t('scrollHint')} />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-muted/20 to-muted/5">
        <div className="max-w-3xl mx-auto">
          <QuoteCard
            quote={t('description')}
            author={t('authorQuote')}
            imageSrc="/portret.jpg"
            imageAlt="Arthur Scheen - AiPOX"
            showImage={true}
            size="medium"
            priority={true}
          />
        </div>
      </section>

      {/* Builder story — "een team dat nooit slaapt" (MB-003) */}
      <BuilderStorySection locale={locale} />

      {/* Producten-etalage — canonieke plek voor de AiPOX-producten (MB-004) */}
      <ProductsSection locale={locale} />

      {/* About Section */}
      <section id="about" className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-foreground">
              {t('about.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('about.intro')}</p>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {/* From hobby to passion */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{t('about.passion.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.passion.description')}
                </p>
              </CardContent>
            </Card>

            {/* Practical experience */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  {t('about.experience.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.experience.description')}
                </p>
              </CardContent>
            </Card>

            {/* Connector between worlds */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{t('about.connector.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.connector.description')}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {t('about.connector.strength')}
                </p>
                <p className="text-sm text-muted-foreground">{t('about.connector.conviction')}</p>
                <p className="text-sm font-medium text-primary">{t('about.connector.practice')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = (await params) as { locale: string };
  const messages = await getMessages({ locale });
  const homePageMessages = messages['HomePage'] as Record<string, string> | undefined;
  
  const title = homePageMessages?.title ?? homePageMessages?.tagline ?? 'AiPOX';
  const description = homePageMessages?.metaDescription ?? homePageMessages?.subtitle ?? 'AiPOX — moderne software';

  const meta = pageMeta({
    title: String(title),
    description: String(description),
    url: `https://aipox.nl/${locale}`,
    image: '/og-image.png',
  });
  // Use an absolute title so the parent layout's "%s | aipox" template does not
  // append a suffix to the homepage title; the marketing copy is exact.
  return { ...meta, title: { absolute: String(title) }, alternates: buildAlternates(locale, '') };
}
