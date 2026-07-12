import { getTranslations } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { buildPageMeta } from '@/lib/meta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import Container from '@/components/Container';
import { H1, Lead, P } from '@/components/ui/typography';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  // One canonical inbox + one neutral, non-salesy body for every subject.
  const mailTo = 'info@aipox.nl';
  const mailBody = 'Hallo Arthur,\n\n\n\nGroet,\n';
  const mailHref = (subject: string) =>
    `mailto:${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

  // Shared classes: wrap-safe, left-aligned, min 44px tap target (a11y).
  // Token colors are referenced via arbitrary values (oklch(var(--token))): this
  // is a Tailwind v4 project with no @theme mapping, so from-primary/text-primary-
  // foreground utilities emit no CSS. See src/components/ui/button.tsx.
  const subjectButtonClass =
    'justify-start h-auto min-h-11 py-2.5 whitespace-normal text-left leading-snug bg-gradient-to-r from-[oklch(var(--primary)/0.9)] to-[oklch(var(--primary)/0.7)] border hover:from-[oklch(var(--primary))] hover:to-[oklch(var(--primary)/0.8)] text-[oklch(var(--primary-foreground))] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]';

  return (
    <div className="min-h-screen">
      <Container className="py-16 lg:py-24">
        <div className="text-center mb-16">
          <H1>{t('title')}</H1>
          <Lead>{t('intro')}</Lead>
          <P className="max-w-2xl mx-auto">{t('description')}</P>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Phone Contact */}
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl text-primary">{t('phone.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 md:h-full md:justify-center">
              <p className="text-muted-foreground">{t('phone.description')}</p>
              <div className="text-2xl font-bold text-foreground">{t('phone.number')}</div>
              <Button
                asChild
                className="min-h-11 bg-gradient-to-r border from-[oklch(var(--primary))] to-[oklch(var(--primary)/0.8)] hover:from-[oklch(var(--primary)/0.9)] hover:to-[oklch(var(--primary)/0.7)] text-[oklch(var(--primary-foreground))] w-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <a href="tel:+31613505918">📞 {t('phone.cta')}</a>
              </Button>
            </CardContent>
          </Card>

          {/* Email Contact */}
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl text-primary">{t('email.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t('email.description')}</p>

              <div className="grid gap-3">
                <Button asChild className={subjectButtonClass}>
                  <a href={mailHref(t('email.subjects.product'))}>
                    📦 {t('email.subjects.product')}
                  </a>
                </Button>
                <Button asChild className={subjectButtonClass}>
                  <a href={mailHref(t('email.subjects.sparring'))}>
                    💬 {t('email.subjects.sparring')}
                  </a>
                </Button>
                <Button asChild className={subjectButtonClass}>
                  <a href={mailHref(t('email.subjects.general'))}>
                    ✉️ {t('email.subjects.general')}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location & Company Info */}
        <section>
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl text-primary">{t('location.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t('company.title')}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{t('company.name')}</p>
                    <p>{t('company.location')}</p>
                    <p>KvK: {t('company.kvk')}</p>
                    <p>BTW: {t('company.btw')}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {t('location.availability.title')}
                  </h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{t('location.availability.based')}</p>
                    <p>{t('location.availability.channel')}</p>
                    <p>{t('location.availability.response')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/30">
                <p className="text-center text-sm text-muted-foreground italic">
                  &ldquo;{t('tagline')}&rdquo;
                </p>
              </div>
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
  return buildPageMeta(messages, locale, 'ContactPage');
}
