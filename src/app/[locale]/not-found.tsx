import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'common' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sky/5 dark:bg-brand-navy-dark text-center transition-colors duration-300">
      <div className="text-center p-8 bg-white dark:bg-white/5 rounded-3xl shadow-soft dark:shadow-none border border-brand-sky/20 dark:border-white/10 backdrop-blur-sm">
        <h1 className="text-6xl font-bold text-brand-orange mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-brand-navy dark:text-white mb-4">
          {t('pageNotFound')}
        </h2>
        <p className="text-brand-navy/70 dark:text-white/70 mb-8 max-w-md mx-auto">
          {t('pageNotFoundDescription')}
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-orange text-white px-8 py-3 rounded-xl font-medium shadow-brand-orange hover:bg-brand-orange-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}

