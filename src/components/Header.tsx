'use client';

import AppNavbar from '@/components/layout/AppNavbar';

export default function Header() {
  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4">
      <AppNavbar />
    </header>
  );
}
