import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ar', 'fr', 'en'],

  // Used when no locale matches
  defaultLocale: 'ar',
  
  // Locale prefix strategy
  localePrefix: 'as-needed', // Only show locale prefix for non-default locale
  localeDetection: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

