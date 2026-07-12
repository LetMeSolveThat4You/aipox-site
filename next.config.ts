import { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin'



const nextConfig: NextConfig = {
  output: 'standalone',
  // Verberg de Next.js dev-indicator (het "N"-knopje linksonder) tijdens dev.
  // Alleen van invloed op dev-mode; geen effect op de productie-build.
  devIndicators: false,
  // Prefer modern image formats where possible. Next will still serve fallbacks
  // for browsers that don't support AVIF/WebP.
  images: {
    formats: ['image/avif', 'image/webp']
  },
  // Remove console.* calls from production bundles to reduce JS payload
  compiler: {
    removeConsole: true
  },
  // Turbopack-specific optimization options (moved from deprecated experimental)
  // See Next.js upgrade notes: move `experimental.turbo.optimizeCss` to `turbopack`.
  // Remove unrecognized turbopack options to avoid Next.js warnings during dev.
  // If you rely on turbopack-specific optimizations, re-check the Next.js docs
  // for supported keys for your Next version.
  // Note: removed experimental.allowedDevOrigins because Next.js flags it as
  // unrecognized for the current runtime. If you need to allow dev UI on a
  // LAN host, configure your browser or Next dev-server separately.
  // Skip ESLint during build to avoid passing deprecated CLI options to ESLint
  // from some environments; linting still runs via npm run lint.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // MB-002: the freelance services/pricing/collaboration pages were removed.
  // Redirect old (bookmarked / indexed) URLs to the homepage so nothing 404s.
  // These run before the next-intl middleware, so locale-prefixed paths are
  // caught here; the bare (locale-less) paths are handled too for safety and
  // resolve to the default locale via the middleware after the redirect.
  async redirects() {
    return [
      { source: '/:locale(en|nl)/services', destination: '/:locale', permanent: true },
      { source: '/:locale(en|nl)/pricing', destination: '/:locale', permanent: true },
      { source: '/:locale(en|nl)/collaboration', destination: '/:locale', permanent: true },
      { source: '/services', destination: '/', permanent: true },
      { source: '/pricing', destination: '/', permanent: true },
      { source: '/collaboration', destination: '/', permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

export default withNextIntl(nextConfig);
