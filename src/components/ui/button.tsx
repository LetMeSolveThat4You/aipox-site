import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // NB: this is a Tailwind v4 project with no @theme/@config mapping, so semantic
  // color utilities (bg-primary, text-primary-foreground, border-input, ...) emit
  // NO CSS — they are silent no-ops. Colors here therefore reference the design
  // tokens directly via arbitrary values: oklch(var(--token)). See globals.css.
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(var(--background))] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary CTA — solid brand blue + a neon glow (btn-cta-glow, globals.css)
        // that echoes the hero H1's text-shadow, with a motion-safe hover lift.
        default:
          'btn-cta-glow bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))] hover:bg-[oklch(var(--primary)/0.92)] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        // Secondary CTA — visible in BOTH themes: a brand-blue outline (AA non-text,
        // ~3.7:1 light / 4.6:1 dark) over a faint tint. Reads as clearly secondary
        // (outline, no glow) yet never vanishes on dark like the old border-input did.
        outline:
          'border border-[oklch(var(--primary)/0.8)] bg-[oklch(var(--primary)/0.07)] text-[oklch(var(--foreground))] shadow-sm hover:border-[oklch(var(--primary))] hover:bg-[oklch(var(--primary)/0.14)] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        // icon buttons should be perfect circles with no internal padding
        icon: 'h-9 w-9 rounded-full p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
