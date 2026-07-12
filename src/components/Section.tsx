import React, { type ReactNode } from 'react';

type Props = {
  id?: string;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
};

export default function Section({ id, ariaLabel, className = '', children }: Props) {
  return (
    <section id={id} aria-label={ariaLabel} className={`scroll-mt-24 py-12 ${className}`}>
      {children}
    </section>
  );
}
