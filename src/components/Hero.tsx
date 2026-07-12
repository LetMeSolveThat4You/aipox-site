import React from 'react';
import BackToTop from '@/components/BackToTop';
import Container from '@/components/Container';
import { H1, Lead } from './ui/typography';

type Props = {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** optional small variant (less vertical space) */
  variant?: 'compact' | 'default';
  /** optional actions area */
  actions?: React.ReactNode;
};

const Hero = ({ title, intro, variant = 'default', actions }: Props) => {
  const padding = variant === 'compact' ? 'py-12' : 'py-20 lg:py-28';

  return (
    <header className={`w-full ${padding}`}>
      <Container>
        <div className="flex flex-col items-center text-center gap-6">
          <H1>{title}</H1>
          {intro && <Lead>{intro}</Lead>}
          {actions && <div className="mt-4">{actions}</div>}
        </div>
      </Container>
      <Container className="mt-8">
        <BackToTop />
      </Container>
    </header>
  )
};

export default Hero;
