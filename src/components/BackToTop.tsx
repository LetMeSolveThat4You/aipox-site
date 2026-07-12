'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 220);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed right-6 bottom-6 z-50 transition-opacity duration-300',
        !visible && 'opacity-0 pointer-events-none',
        visible && 'opacity-100'
      )}
    >
      <div className="rounded-lg shadow-lg p-1 inline-flex bg-[oklch(var(--background)/0.02)] backdrop-blur-[var(--blur-strength)] ">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          aria-label="Back to top"
          className="h-10 w-10 "
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
