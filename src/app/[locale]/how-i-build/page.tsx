import Image from 'next/image';
import { getTranslations, getMessages } from 'next-intl/server';
import { GitCommitHorizontal, GitBranch, Github } from 'lucide-react';
import { Link } from '@/navigation';
import { pageMeta, faqJsonLd } from '@/lib/seo';
import { buildAlternates } from '@/lib/meta';
import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { H1, H2, Lead, P } from '@/components/ui/typography';
import recentCommits from '@/data/recent-commits.json';

// The receipts show real aipox-v3 commit hashes as proof-of-work, but NOT as
// links: the repo is private (it also holds internal working notes), so a
// commit URL would 404 for visitors. Hashes render as static monospace chips —
// verifiable by anyone with repo access, honest and harmless for everyone else.

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * "Zo bouw ik" / "How I build" — één openbare, eerlijke pagina over de werkwijze
 * (MB-008). Laat de bestuurde AI-squad onder Arthurs regie zien als vertrouwens-
 * signaal ("receipts"). Klein begonnen, kan later groeien. Server component;
 * alle copy via de HowIBuild-namespace (nl+en).
 */
export default async function HowIBuildPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HowIBuild' });

  // Static keys only (next-intl/no-dynamic-translation-key): resolve up front so
  // the render loops map over plain strings.
  const points = [
    {
      key: 'operations',
      title: t('work.points.operations.title'),
      desc: t('work.points.operations.desc'),
    },
    {
      key: 'development',
      title: t('work.points.development.title'),
      desc: t('work.points.development.desc'),
    },
    {
      key: 'direction',
      title: t('work.points.direction.title'),
      desc: t('work.points.direction.desc'),
    },
  ];

  const receipts = [
    {
      key: 'thisSite',
      title: t('receipts.items.thisSite.title'),
      desc: t('receipts.items.thisSite.desc'),
    },
    {
      key: 'git',
      title: t('receipts.items.git.title'),
      desc: t('receipts.items.git.desc'),
    },
    {
      key: 'homelab',
      title: t('receipts.items.homelab.title'),
      desc: t('receipts.items.homelab.desc'),
    },
  ];

  // FAQ — visible Q&A + FAQPage JSON-LD from the SAME strings (MB-024). Static
  // keys up front, mirroring the points/receipts pattern above.
  const faqItems = [
    { key: 'q1', question: t('faq.items.q1.question'), answer: t('faq.items.q1.answer') },
    { key: 'q2', question: t('faq.items.q2.question'), answer: t('faq.items.q2.answer') },
    { key: 'q3', question: t('faq.items.q3.question'), answer: t('faq.items.q3.answer') },
    { key: 'q4', question: t('faq.items.q4.question'), answer: t('faq.items.q4.answer') },
  ];
  const faqLd = faqJsonLd(faqItems);

  // "How this got built" — concrete receipts (MB-026). Static keys resolved up
  // front (next-intl/no-dynamic-translation-key). `commits` link real aipox-v3
  // commits; `meta` is a monospace stat line for the ecosystem stories.
  type Story = {
    key: string;
    title: string;
    body: string;
    commits: string[];
    meta: string | null;
  };
  const builtStories: Story[] = [
    {
      key: 'mobileBug',
      title: t('built.stories.mobileBug.title'),
      body: t('built.stories.mobileBug.body'),
      commits: ['3c0d4c0'],
      meta: null,
    },
    {
      key: 'designSystem',
      title: t('built.stories.designSystem.title'),
      body: t('built.stories.designSystem.body'),
      commits: ['4ee5810', '331a243'],
      meta: null,
    },
    {
      key: 'adviceFirst',
      title: t('built.stories.adviceFirst.title'),
      body: t('built.stories.adviceFirst.body'),
      commits: ['07535ea'],
      meta: null,
    },
    {
      key: 'vincalis',
      title: t('built.stories.vincalis.title'),
      body: t('built.stories.vincalis.body'),
      commits: [],
      meta: t('built.stories.vincalis.meta'),
    },
    {
      key: 'ci',
      title: t('built.stories.ci.title'),
      body: t('built.stories.ci.body'),
      commits: [],
      meta: t('built.stories.ci.meta'),
    },
  ];

  // Townhall proof — owner-approved, safety-checked screenshots. The primary
  // shot (townhall-1: #reviews + human-gate) is rendered large; these two are a
  // supporting 2-up. Single dark PNGs read on both site themes; next/image
  // serves avif/webp and lazy-loads (below the fold).
  const townhallShots = [
    {
      key: 'claims',
      src: '/mockups/townhall-3.png',
      width: 1511,
      height: 708,
      caption: t('built.townhall.captionClaims'),
    },
    {
      key: 'tokens',
      src: '/mockups/townhall-2.png',
      width: 1513,
      height: 717,
      caption: t('built.townhall.captionTokens'),
    },
  ];

  return (
    <div className="min-h-screen">
      <Container className="py-16 lg:py-24">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-primary mb-4">
            {t('label')}
          </p>
          <H1>{t('title')}</H1>
          <Lead>{t('lead')}</Lead>
        </div>

        {/* Waarom deze pagina */}
        <section className="mb-16 scroll-mt-navbar">
          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="max-w-3xl mx-auto text-center">
                <H2 className="text-primary">{t('introTitle')}</H2>
                <P>{t('introBody')}</P>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Het werk — de bestuurde vloot */}
        <section className="mb-16 scroll-mt-navbar">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <H2>{t('work.title')}</H2>
            <P className="text-lg">{t('work.intro')}</P>
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

          {/* Governance — één grens, zelf getrokken */}
          <Card variant="accent" className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{t('governance.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <P>{t('governance.desc')}</P>
            </CardContent>
          </Card>
        </section>

        {/* Receipts — wat er écht is */}
        <section className="mb-16 scroll-mt-navbar">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <H2>{t('receipts.title')}</H2>
            <P className="text-lg">{t('receipts.intro')}</P>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {receipts.map((item) => (
              <Card key={item.key} className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <P className="text-sm">{item.desc}</P>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Eerlijk over de grens/waar agents falen */}
          <Card variant="accent" className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{t('receipts.limits.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <P>{t('receipts.limits.desc')}</P>
            </CardContent>
          </Card>
        </section>

        {/* Zo is dit gebouwd — de abstracte receipts hierboven, nu als concrete,
            klikbare "receipts": echte taken uit de bouw van deze site + de
            producten, elk met een commit-hash of een monospace bewijsregel,
            een build-time git-feed en de door de eigenaar goedgekeurde Townhall-
            screenshots (MB-026). */}
        <section className="mb-16 scroll-mt-navbar">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <H2>{t('built.title')}</H2>
            <P className="text-lg">{t('built.intro')}</P>
            <p className="mt-3 font-mono text-xs text-muted-foreground">{t('built.sourceNote')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {builtStories.map((story) => (
              <Card key={story.key} variant="glass" className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{story.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <P className="text-sm">{story.body}</P>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                    {story.commits.map((hash) => (
                      <span
                        key={hash}
                        className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary"
                      >
                        <GitCommitHorizontal aria-hidden className="size-3.5 opacity-70" />
                        {hash}
                      </span>
                    ))}
                    {story.meta && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                        <GitBranch aria-hidden className="size-3.5 opacity-70" />
                        {story.meta}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recently shipped — build-time git-feed uit src/data/recent-commits.json
              (feat/fix, chore-ruis eruit). Regenereer met scripts/generate-recent-commits.js. */}
          {recentCommits.commits.length > 0 && (
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="mb-1">
                <h3 className="text-lg font-semibold tracking-tight text-primary">
                  {t('built.feed.title')}
                </h3>
              </div>
              <P className="mb-4 text-sm">{t('built.feed.intro')}</P>
              <Card variant="glass" className="overflow-hidden p-0">
                <ul className="divide-y divide-border/40">
                  {recentCommits.commits.map((c) => (
                    <li key={c.hash} className="flex items-start gap-3 px-4 py-3 sm:items-center">
                      <time className="w-[4.5rem] shrink-0 font-mono text-xs text-muted-foreground">
                        {c.date}
                      </time>
                      <span className="min-w-0 flex-1 text-sm text-foreground">{c.subject}</span>
                      <span className="shrink-0 font-mono text-xs text-primary">{c.hash}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Townhall — de coördinatielaag + human-gate. Eén donkere, door de
              eigenaar goedgekeurde en veiligheids-gecontroleerde screenshot werkt
              in beide site-thema's; ingekaderd als "receipt" (zoals MB-025). */}
          <div className="mx-auto mt-14 max-w-3xl">
            <H2 className="text-primary">{t('built.townhall.title')}</H2>
            <P>{t('built.townhall.body')}</P>

            <figure className="mt-6">
              <div className="relative px-2 pt-2">
                <div
                  aria-hidden
                  className="mockup-glow pointer-events-none absolute inset-x-4 top-4 -bottom-2 rounded-2xl blur-2xl"
                />
                <div className="relative overflow-hidden rounded-lg border border-border/60 bg-card shadow-xl">
                  <Image
                    src="/mockups/townhall-1.png"
                    alt={t('built.townhall.caption')}
                    width={1918}
                    height={868}
                    sizes="(min-width: 768px) 42rem, 92vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {t('built.townhall.caption')}
              </figcaption>
            </figure>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {townhallShots.map((shot) => (
                <figure key={shot.key} className="m-0">
                  <div className="relative overflow-hidden rounded-lg border border-border/60 bg-card shadow-lg">
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 640px) 21rem, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* De tastbaarste build-in-the-open-receipt: de privé werk-repo blijft
              privé (vandaar de de-linkte hashes hierboven), maar de broncode van
              déze site staat volledig open. Echte externe link. */}
          <Card variant="glass" className="mx-auto mt-14 max-w-3xl">
            <CardContent className="flex flex-col items-center gap-5 py-8 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-primary">
                  {t('built.source.title')}
                </h3>
                <P className="mt-1 text-sm">{t('built.source.body')}</P>
              </div>
              <Button asChild size="lg" variant="outline" className="shrink-0 font-medium">
                <a
                  href="https://github.com/LetMeSolveThat4You/aipox-site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github aria-hidden className="mr-2 size-4" />
                  {t('built.source.cta')}
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* FAQ — zichtbare, citeerbare Q&A (GEO-signaal) + FAQPage JSON-LD.
            De tekst staat in de DOM (schema-only is tegen de richtlijnen). */}
        <section className="mb-16 scroll-mt-navbar">
          <script type="application/ld+json" suppressHydrationWarning>
            {JSON.stringify(faqLd)}
          </script>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <H2>{t('faq.title')}</H2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {faqItems.map((item) => (
              <Card key={item.key} variant="glass">
                <CardHeader>
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-primary">
                    {item.question}
                  </h3>
                </CardHeader>
                <CardContent>
                  <P>{item.answer}</P>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Afsluiting — outcome-eerst + verwijzing producten/contact */}
        <section className="scroll-mt-navbar">
          <Card variant="glass">
            <CardContent className="pt-6 text-center">
              <div className="max-w-2xl mx-auto">
                <H2 className="text-primary">{t('closing.title')}</H2>
                <P className="mb-8">{t('closing.desc')}</P>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="font-medium">
                    <Link href="/#producten">{t('closing.ctaProducts')}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-medium">
                    <Link href="/contact">{t('closing.ctaContact')}</Link>
                  </Button>
                </div>
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
  const ns = (messages['HowIBuild'] as Record<string, string> | undefined) ?? {};

  return {
    ...pageMeta({
      title: ns.metaTitle ?? 'How I build',
      description: ns.metaDescription ?? '',
      url: `https://aipox.nl/${locale}/how-i-build`,
      image: '/og-image.png',
    }),
    alternates: buildAlternates(locale, '/how-i-build'),
  };
}
