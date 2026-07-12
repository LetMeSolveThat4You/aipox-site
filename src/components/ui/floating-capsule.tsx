import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCapsuleProps {
  children: ReactNode;
  variant?: 'primary' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isScrolled?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export default function FloatingCapsule({
  children,
  size = 'md',
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: FloatingCapsuleProps) {
  return (
    <div
      className={cn(
        // Base styles - modern glassmorphism without visible border
        'relative backdrop-blur-md border-transparent transition-all duration-200 rounded-full',
        'flex items-center justify-center will-change-transform',
        // Subtle shadow for depth
        'shadow-[0_1px_3px_0_oklch(var(--shadow-color)/0.08),0_1px_2px_-1px_oklch(var(--shadow-color)/0.06)]',

        // Size variants - all with consistent rounded-full and fixed heights
        size === 'xs' && 'h-10 sm:h-12 min-w-10 sm:min-w-12 px-3 sm:px-4',
        size === 'sm' && 'h-10 sm:h-12 min-w-10 sm:min-w-12 px-3 sm:px-4',
        size === 'md' && 'h-10 sm:h-12 min-w-10 sm:min-w-12 px-3 sm:px-4',
        size === 'lg' && 'h-10 sm:h-12 px-6 sm:px-8',

        // Clean glassmorphism background
        'bg-[linear-gradient(135deg,oklch(var(--background)/0.7)_0%,oklch(var(--background)/0.8)_100%)]',

        // Hover state with subtle accent fill and border
        'hover:shadow-[0_4px_8px_0_oklch(var(--shadow-color)/0.12),0_2px_4px_-1px_oklch(var(--shadow-color)/0.08)]',
        'hover:border-[oklch(var(--accent)/0.2)]',
        'hover:bg-[linear-gradient(135deg,oklch(var(--accent)/0.05)_0%,oklch(var(--background)/0.85)_50%,oklch(var(--accent)/0.03)_100%)]',
        'hover:-translate-y-0.5 hover:scale-[1.02]',

        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
