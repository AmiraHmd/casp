export const locales = ['ar', 'fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
};

export const rtlLocales: Locale[] = ['ar'];
export const ltrLocales: Locale[] = ['fr', 'en'];

export function isRTL(page: Locale): boolean {
  return rtlLocales.includes(page);
}

