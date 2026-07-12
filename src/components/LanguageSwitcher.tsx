"use client";

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'nl' ? 'en' : 'nl';
    const currentUrl = window.location.pathname;
    const segments = currentUrl.split('/');
    if (segments.length > 1 && (segments[1] === 'nl' || segments[1] === 'en')) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newUrl = segments.join('/');
    window.location.href = newUrl;
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="h-8 px-2 hover:bg-accent/20 hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 flex items-center gap-1.5"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{locale}</span>
    </Button>
  );
}
