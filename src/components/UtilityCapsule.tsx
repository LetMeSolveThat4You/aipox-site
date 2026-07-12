'use client';

import { useMemo, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Sun, Moon, Monitor, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UtilityCapsuleProps {
  className?: string;
}

const themeCycle = ['light', 'dark', 'contrast'] as const;

export default function UtilityCapsule({ className }: UtilityCapsuleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme cycling logic - direct toggle to next theme
  const toggleTheme = () => {
    const currentIndex = themeCycle.indexOf(theme as (typeof themeCycle)[number]);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  // Language switching logic - direct toggle between NL/EN
  const toggleLanguage = () => {
    const newLocale = locale === 'nl' ? 'en' : 'nl';

    // Build the new URL with the same path but different locale
    const currentUrl = window.location.pathname;
    // Replace the first segment (current locale) with the new locale
    const segments = currentUrl.split('/');
    if (segments.length > 1 && (segments[1] === 'nl' || segments[1] === 'en')) {
      segments[1] = newLocale;
    } else {
      // If no locale in URL, add it
      segments.splice(1, 0, newLocale);
    }

    const newUrl = segments.join('/');
    window.location.href = newUrl;
  };

  // Memoized theme icon - prevent hydration mismatch
  const themeIcon = useMemo(() => {
    if (!mounted) {
      // Return consistent fallback during SSR
      return <Sun className="h-4 w-4" />;
    }

    switch (theme) {
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'contrast':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  }, [theme, mounted]);

  return (
    <div className={cn('rounded-lg p-1 hover:scale-[1.02] transition-all duration-200', className)}>
      <div className="flex items-center gap-1">
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 hover:bg-accent/20 hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200"
          aria-label="Toggle theme"
        >
          {themeIcon}
        </Button>

        {/* Separator */}
        <div className="h-4 w-px bg-border/40 mx-0.5" />

        {/* Language Toggle Button with current language indicator */}
        <Button
          variant="ghost"
          onClick={toggleLanguage}
          className="h-8 px-2 hover:bg-accent/20 hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 flex items-center gap-1.5"
          aria-label="Toggle language"
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {locale}
          </span>
        </Button>
      </div>
    </div>
  );
}
