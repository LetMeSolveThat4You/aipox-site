import { getTranslations } from 'next-intl/server';
import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { P } from '@/components/ui/typography';
import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';

type Props = {
  locale: string;
};

/**
 * "Een team dat nooit slaapt" — het bouwer-verhaal op de homepage.
 * Vertelt hoe aipox draait op een bestuurde vloot AI-collega's onder Arthurs
 * regie. Server component; alle copy via de HomePage.story-namespace (nl+en).
 */
export default async function BuilderStorySection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'HomePage.story' });

  // Static keys only (next-intl/no-dynamic-translation-key); resolved up front
  // so the render loop maps over plain strings.
  const points = [
    {
      key: 'operations',
      title: t('points.operations.title'),
      desc: t('points.operations.desc'),
    },
    {
      key: 'development',
      title: t('points.development.title'),
      desc: t('points.development.desc'),
    },
    {
      key: 'direction',
      title: t('points.direction.title'),
      desc: t('points.direction.desc'),
    },
  ];

  return (
    <section
      id="werkwijze"
      aria-label={t('title')}
      className="scroll-mt-24 py-20 px-6 lg:px-8"
    >
      <Container className="px-0">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-primary mb-4">
            {t('label')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-light mb-6 text-foreground">{t('title')}</h2>
          <P className="text-lg">{t('lead')}</P>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {points.map((point) => (
            <Card key={point.key} variant="glass" className="h-full">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <P className="text-sm">{point.desc}</P>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="accent" className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">{t('governance.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <P>{t('governance.desc')}</P>
          </CardContent>
        </Card>

        {/* Subtiele verwijzing naar de "Zo bouw ik"-pagina (MB-008) */}
        <div className="mt-8 text-center">
          <Link
            href="/how-i-build"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t('readMore')}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
