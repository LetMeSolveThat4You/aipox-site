import { useTheme } from 'next-themes';

/**
 * Hook to get consistent theme-aware CSS classes
 * Ensures we use proper design tokens instead of custom CSS variables
 */
export function useThemeClasses() {
  const { theme } = useTheme();

  return {
    // Background variants
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      muted: 'bg-muted',
    },

    // Text variants
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      accent: 'text-accent-foreground',
    },

    // Border variants
    border: {
      default: 'border-border',
      muted: 'border-border/50',
      accent: 'border-accent',
    },

    // State variants
    hover: {
      background: 'hover:bg-accent/10',
      scale: 'hover:scale-[1.01]',
      text: 'hover:text-foreground',
    },

    // Focus variants
    focus: {
      ring: 'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
      outline: 'focus-visible:outline-none',
    },

    // Theme-specific adjustments
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isContrast: theme === 'contrast',
  };
}
