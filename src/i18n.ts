import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4: resolve the active locale from the request (the `[locale]`
  // segment). The old `locale` argument is deprecated and always undefined,
  // which made getLocale()/getMessages() fall back to the default locale in
  // the root layout — breaking per-locale `<html lang>` and JSON-LD.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./i18n/messages/${locale}.json`)).default,
  };
});
