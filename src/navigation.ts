'use client';

import { createNavigation } from 'next-intl/navigation';

const { Link, usePathname, useRouter } = createNavigation({
  locales: ['en', 'nl'] as const,
  defaultLocale: 'nl' as const,
});

export { Link, usePathname, useRouter };
