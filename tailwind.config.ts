/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  
  future: {
    hoverOnlyWhenSupported: true,
  },

  theme: {
    // Container configuration
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },

    extend: {
      // Font families mapped to AiPOX design tokens
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
      },
      
      // Typography scale using AiPOX tokens (extend keeps defaults)
      fontSize: {
        base: ['var(--font-size-base)', { lineHeight: '1.5rem' }],
        lg: ['var(--font-size-lg)', { lineHeight: '1.75rem' }],
        xl: ['var(--font-size-xl)', { lineHeight: '1.75rem' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: '2rem' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: '1.2' }],
        // Fluid typography using clamp()
        'fluid-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'fluid-4xl': 'clamp(2.5rem, 8vw, 3rem)',
        'fluid-6xl': 'clamp(3rem, 10vw, 4.5rem)',
      },

      // Spacing using AiPOX tokens (mapped to existing scale)
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        // Map design tokens to numeric utilities for consistency
        4: 'var(--space-md)',  // p-4 = p-md
        6: 'var(--space-lg)',  // p-6 = p-lg
      },

      // Border radius using AiPOX tokens
      borderRadius: {
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },

      // Max width constraints using AiPOX layout tokens
      maxWidth: {
        container: 'var(--max-container)',
        content: 'var(--max-content)',
        grid: 'var(--max-grid)',
      },

      // Colors: the semantic AiPOX palette now lives in the `@theme inline`
      // block in src/app/globals.css (MB-019). Tailwind v4 ignores this legacy
      // v3-style `colors` map (no @config directive), so it was dead config and
      // was removed to avoid confusion. Do NOT re-add colors here — add tokens
      // to globals.css `@theme inline` instead.

      // Box shadow using AiPOX tokens
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },

      // Custom transitions using AiPOX easing
      transitionTimingFunction: {
        'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // AiPOX specific utilities
      letterSpacing: {
        'logo': 'var(--logo-letter-spacing)',
        'logo-mobile': '0.15rem',
        'logo-small': '0.1rem',
      },
    },
  },
  
  plugins: [
    // tailwindcss-animate exposes ESM default; require() triggers ESLint in ESM projects
    // keep a runtime-safe require fallback while silencing the rule above
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (function () { try { return require('tailwindcss-animate'); } catch { return undefined; } })(),
  ],
}

export default config
