import { getTranslations } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { buildPageMeta } from '@/lib/meta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackToTop from '@/components/BackToTop';
import Container from '@/components/Container';
import { H1, H2, Lead, P } from '@/components/ui/typography';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arthur Scheen',
    jobTitle: 'Founder',
    affiliation: { '@type': 'Organization', name: 'AiPOX' },
    url: 'https://aipox.nl',
    sameAs: ['https://www.linkedin.com/in/arthurscheen'],
  };

  return (
    <div className="min-h-screen">
      <Container className="py-16 lg:py-24">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
        <div className="text-center mb-16">
          <div className="flex flex-col items-center mb-6">
            <H1>{t('title')}</H1>
            <Lead>{t('intro')}</Lead>
          </div>

          {/* Back-to-top after hero to create breathing room */}
          <BackToTop />

        </div>

        {/* Sector intro & Brand Promise: moved out of hero to create more space */}
  <section className="mb-16 scroll-mt-navbar">
          <Card variant="glass">
            <CardContent>
              <div className="max-w-3xl mx-auto text-center mb-6">
                <H2 className="text-primary">{t('sectorIntroTitle')}</H2>
                <P>{t('sectorIntro')}</P>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:items-start">
                <div className="max-w-3xl mx-auto">
                  <blockquote className="border-l-4 border-primary/60 pl-4 italic text-muted-foreground text-center">
                    {t('brandPromise')}
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
  </section>

        {/* Experience Timeline */}
  <section className="mb-20 scroll-mt-navbar">
          <div className="space-y-8">
            {/* Youth & Early Learning - split into two clearer cards */}
              <article id="de-vonk">
              <Card
                className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  🌱 {t('experience.youth.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {t('experience.youth.summary') && (
                  <p className="text-muted-foreground leading-relaxed italic">
                    {t('experience.youth.summary')}
                  </p>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.youth.openbsd')}
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.youth.webdev')}
                </p>
              </CardContent>
            </Card>
            </article>

            {/* Early story separated to its own card for readability */}
            {t('experience.youth.early.description') && (
              <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary">
                    {t('experience.youth.early.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {t('experience.youth.early.description')
                    .split(/\n\n/)
                    .map((para: string, i: number) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                </CardContent>
              </Card>
            )}

            {/* Servicedesk Experience */}
            <article id="support">
            <Card
              className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  📞 {t('experience.servicedesk.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.servicedesk.description')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.servicedesk.skills')}
                </p>
              </CardContent>
            </Card>
            </article>

            {/* ERP Experience */}
            <article id="erp">
            <Card
              className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  🏭 {t('experience.rexnord.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.rexnord.description')}
                </p>
              </CardContent>
            </Card>
            </article>

            {/* Sierteelt & Development */}
            <article id="sierteelt">
            <Card
              className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  🌸 {t('experience.sierteelt.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.sierteelt.description')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.sierteelt.tms')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.sierteelt.modules')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.sierteelt.crm')}
                </p>
              </CardContent>
            </Card>
            </article>

            {/* Infrastructure & Automation */}
            <article id="automatisering">
            <Card
              className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  🖥️ {t('experience.automation.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.automation.description')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.automation.virtualization')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.automation.cloud')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.automation.backup')}
                </p>
              </CardContent>
            </Card>
            </article>

            {/* Software Implementations */}
            <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl">
                <CardHeader>
                <CardTitle id="implementaties" className="flex items-center gap-3 text-primary scroll-mt-navbar">
                  💻 {t('experience.implementations.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.implementations.manualmaster')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.implementations.sharepoint')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.implementations.erp')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.implementations.powerbi')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('experience.implementations.reporting')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold mb-4">{t('ctaTitle')}</h3>
            <Button asChild>
              <a href={`/${locale}/contact`} className="px-6 py-2">
                {t('ctaButton')}
              </a>
            </Button>
          </div>
        </section>

  {/* Philosophy Section */}
  <section id="filosofie" className="scroll-mt-navbar">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-4">
              {t('philosophy.title')}
            </h2>
          </div>

          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  🎯{' '}
                  {t('philosophy.title') === 'Philosophy & Approach' ? 'What Counts' : 'Wat telt'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t('philosophy.diplomas')}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  🛠️{' '}
                  {t('philosophy.title') === 'Philosophy & Approach'
                    ? 'Learning by Doing'
                    : 'Leren door doen'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t('philosophy.learning')}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  📋{' '}
                  {t('philosophy.title') === 'Philosophy & Approach' ? 'Methodology' : 'Werkwijze'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.methodology')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  💪 {t('philosophy.title') === 'Philosophy & Approach' ? 'Character' : 'Karakter'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {t('philosophy.character')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results Summary */}
          <Card className="mt-8 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-md shadow-2xl">
            <CardContent className="pt-6 text-center">
              <p className="text-lg font-medium text-foreground">{t('philosophy.results')}</p>
            </CardContent>
          </Card>
        </section>
      </Container>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return buildPageMeta(messages, locale, 'AboutPage');
}
