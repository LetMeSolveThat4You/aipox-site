import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { ArrowRight, ExternalLink } from 'lucide-react';

type Props = {
  locale: string;
};

/**
 * Framed, theme-aware product screenshot ("receipt" — real UI, not an abstract
 * visual; design-brief §5). Ships a light + dark PNG of the same size; the
 * `.mockup-light`/`.mockup-dark` helpers in globals.css reveal the one that
 * matches the visible theme (mirrors the palette's [data-theme] cascade — NOT
 * Tailwind's `dark:`, which tracks OS media in this Tailwind-v4 setup). Both
 * variants carry the same alt; the hidden one is `display:none` and so drops
 * out of the a11y tree, leaving a single announcement. Lazy-loaded (below the
 * fold); next/image downscales the large sources to the served width.
 */
function MockupFrame({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
}) {
  const sizes = '(min-width: 1024px) 22rem, (min-width: 768px) 44vw, 90vw';
  return (
    <div className="relative px-6 pt-6">
      {/* Soft brand-glow backdrop behind the frame */}
      <div
        aria-hidden
        className="mockup-glow pointer-events-none absolute inset-x-4 top-6 -bottom-2 rounded-2xl blur-2xl"
      />
      <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card/60 shadow-lg">
        <Image
          src={lightSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="mockup-light h-auto w-full"
        />
        <Image
          src={darkSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="mockup-dark h-auto w-full"
        />
      </div>
    </div>
  );
}

/**
 * Producten-etalage op de homepage — de canonieke plek voor de AiPOX-producten
 * (MB-004, single-source). Volgt na het bouwer-verhaal en toont drie kaarten met
 * eerlijke statuslabels. Server component; copy via de HomePage.products-namespace.
 */
export default async function ProductsSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'HomePage.products' });

  return (
    <section id="producten" aria-label={t('title')} className="scroll-mt-24 py-20 px-6 lg:px-8">
      <Container className="px-0">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-foreground">{t('title')}</h2>
        </div>

        <div className="grid gap-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Vincalis — vlaggenschip, building in public (vincalis.com) */}
          <article aria-label={`${t('vincalis.name')}: ${t('vincalis.summary')}`}>
            <Card className="flex h-full flex-col border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl">
              <MockupFrame
                lightSrc="/mockups/vincalis-mockup-light.png"
                darkSrc="/mockups/vincalis-mockup-dark.png"
                alt={t('vincalis.screenshotAlt')}
                width={1960}
                height={1024}
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg text-primary">{t('vincalis.name')}</CardTitle>
                  <span className="shrink-0 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                    {t('vincalis.status')}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('vincalis.description')}
                </p>
                <div className="mt-auto pt-4">
                  <Button asChild variant="outline" size="sm">
                    <a href="https://vincalis.com" target="_blank" rel="noopener noreferrer">
                      {t('vincalis.cta')}
                      <ExternalLink aria-hidden />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* SmartDocGen — eigen AiPOX-product, momenteel offline (geen live/demo-CTA) */}
          <article aria-label={`${t('smartdocgen.name')}: ${t('smartdocgen.summary')}`}>
            <Card className="flex h-full flex-col border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg text-primary">{t('smartdocgen.name')}</CardTitle>
                  <span className="shrink-0 rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {t('smartdocgen.status')}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('smartdocgen.description')}
                </p>
                <div className="mt-auto pt-4">
                  <Button asChild variant="link" size="sm" className="px-0">
                    <Link href="/contact">
                      {t('smartdocgen.cta')}
                      <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Proceshuis — eigen IP, live (proceshuis.com) */}
          <article aria-label={`${t('proceshuis.name')}: ${t('proceshuis.summary')}`}>
            <Card className="flex h-full flex-col border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl">
              <MockupFrame
                lightSrc="/mockups/proceshuis-light.png"
                darkSrc="/mockups/proceshuis-dark.png"
                alt={t('proceshuis.screenshotAlt')}
                width={2880}
                height={1800}
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg text-primary">{t('proceshuis.name')}</CardTitle>
                  <span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {t('proceshuis.status')}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('proceshuis.description')}
                </p>
                <div className="mt-auto pt-4">
                  <Button asChild variant="outline" size="sm">
                    <a href="https://proceshuis.com" target="_blank" rel="noopener noreferrer">
                      {t('proceshuis.cta')}
                      <ExternalLink aria-hidden />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </Container>
    </section>
  );
}
