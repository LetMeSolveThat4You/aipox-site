import { getTranslations } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { buildPageMeta } from '@/lib/meta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Building } from 'lucide-react';
import Container from '@/components/Container';
import { H1 } from '@/components/ui/typography';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LegalPage' });

  return (
    <div className="min-h-screen">
      <Container className="py-16 lg:py-24">
        <div className="text-center mb-16">
          <H1>{t('title')}</H1>
        </div>

        <div className="space-y-8">
          {/* Privacy */}
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl text-primary">{t('privacy.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{t('privacy.content')}</p>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl text-primary">{t('terms.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General */}
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t('terms.sections.general.title')}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('terms.sections.general.content')}
                </p>
              </div>

              {/* Liability */}
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t('terms.sections.liability.title')}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('terms.sections.liability.content')}
                </p>
              </div>

              {/* Payment */}
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t('terms.sections.payment.title')}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('terms.sections.payment.content')}
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t('terms.sections.intellectual.title')}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('terms.sections.intellectual.content')}
                </p>
              </div>

              {/* Confidentiality */}
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {t('terms.sections.confidentiality.title')}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('terms.sections.confidentiality.content')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl text-primary">{t('company.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('company.labels.company')}</span>
                    <span className="font-medium text-foreground">{t('company.name')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('company.labels.location')}</span>
                    <span className="font-medium text-foreground">{t('company.location')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('company.labels.kvk')}</span>
                    <span className="font-medium text-foreground">{t('company.kvk')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('company.labels.btw')}</span>
                    <span className="font-medium text-foreground">{t('company.btw')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {t('company.labels.contact')}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t('company.labels.email')}</p>
                    <p className="text-sm text-muted-foreground">{t('company.labels.phone')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card variant="ghost">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="font-medium text-foreground">{t('disclaimer.title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {t('disclaimer.content')}
                </p>
                <p className="text-xs text-muted-foreground">{t('disclaimer.copyright')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return buildPageMeta(messages, locale, 'LegalPage');
}
