import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public static assets
  matcher: [
    // Exclude Next.js internal assets (all _next/*) and API/static files from i18n middleware
    // keep public static assets and common files out of the middleware so they are
    // served directly from /public (site.webmanifest, robots.txt, sitemap.xml, images, etc.)
    // Also exclude the `logos` folder used for brand assets so images are served directly
    // Exclude common static assets and the logos folder so they are served directly from /public
    '/((?!api|_next|favicon|apple-touch-icon.png|site.webmanifest|robots.txt|llms.txt|sitemap.xml|manifest.json|portret.jpg|meanings.json|logos|mockups).*)',
  ],
};
