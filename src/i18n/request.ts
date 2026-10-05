import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let page = (await requestLocale) as Locale | undefined;

  if (!page || !routing.locales.includes(page)) {
    page = routing.defaultLocale;
  }

  return {
    locale: page,
    messages: (await import(`../../languages/${page}.json`)).default,
  };
});
