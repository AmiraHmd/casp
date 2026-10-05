import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { cookies } from 'next/headers';
import { verifyPdfAccessToken } from '@/lib/token';
import RiyadaCategoryClient from './RiyadaCategoryClient';

export const revalidate = 86400; // 24 hours

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store' });
  return { title: t('title'), description: t('description') };
}

export default async function StorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store' });
  const isRTL = locale === 'ar';

  let hasSession = false;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('book_session')?.value;
  if (sessionToken) {
    try {
      verifyPdfAccessToken(sessionToken);
      hasSession = true;
    } catch {
      hasSession = false;
    }
  }

  const categories = [
    {
      id: 'riyada',
      title: locale === 'ar' ? 'سلسلة ريادة' : locale === 'fr' ? 'Série Riyada' : 'Riyada Series',
      desc: locale === 'ar' ? 'تصفح كتب ريادة التفاعلية' : locale === 'fr' ? 'Parcourez la série Riyada interactive' : 'Browse the interactive Riyada series',
      href: '/store/riyadabook',
      icon: 'solar:folder-with-files-bold-duotone',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
    },
    {
      id: 'al-shamil',
      title: t('alShamil.title'),
      desc: t('alShamil.description'),
      href: '/store/al-shamil',
      icon: 'solar:book-2-bold-duotone',
      color: 'bg-indigo-700',
      textColor: 'text-indigo-700',
    },
    {
      id: 'al-mufid',
      title: t('alMufid.title'),
      desc: t('alMufid.description'),
      href: '/store/al-mufid',
      icon: 'solar:notebook-bold-duotone',
      color: 'bg-amber-600',
      textColor: 'text-amber-600',
    },
    {
      id: 'al-wafi',
      title: t('alWafi.title'),
      desc: t('alWafi.description'),
      href: '/store/al-wafi',
      icon: 'solar:book-bookmark-bold-duotone',
      color: 'bg-brand-gold-dark',
      textColor: 'text-brand-gold-dark',
    },
    {
      id: 'garden',
      title: t('gardenOfArabic.title'),
      desc: t('gardenOfArabic.description'),
      href: '/store/garden-of-arabic',
      icon: 'solar:leaf-bold-duotone',
      color: 'bg-emerald-700',
      textColor: 'text-emerald-700',
    },
    {
      title: t('hidayahFr.title'),
      desc: t('hidayahFr.description'),
      href: '/store/hidayah-fr',
      icon: 'solar:moon-stars-bold-duotone',
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
    },
    {
      title: t('qawaedMobasta.title'),
      desc: t('qawaedMobasta.description'),
      href: '/store/qawaed-mobasta',
      icon: 'solar:ruler-pen-bold-duotone',
      color: 'bg-lime-600',
      textColor: 'text-lime-600',
    },
    {
      title: t('tareeqAlMuneerAr.title'),
      desc: t('tareeqAlMuneerAr.description'),
      href: '/store/tareeq-al-muneer',
      icon: 'solar:map-point-bold-duotone',
      color: 'bg-brand-gold',
      textColor: 'text-brand-gold',
    },
    {
      id: 'happy-muslim',
      title: t('theHappyMuslim.title'),
      desc: t('theHappyMuslim.description'),
      href: '/store/the-happy-muslim',
      icon: 'solar:smile-circle-bold-duotone',
      color: 'bg-blue-400',
      textColor: 'text-blue-400',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] text-foreground transition-colors duration-300">

      {/* Hero Section */}
      <section className="bg-brand-gold pt-24 pb-0 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <Icon
            icon="solar:shop-bold"
            className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow"
          />
          <Icon
            icon="solar:shop-bold"
            className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>

          <p className="text-xl text-brand-gold-dark max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => {
              if (cat.id === 'riyada') {
                return (
                  <RiyadaCategoryClient
                    key={idx}
                    cat={cat}
                    locale={locale}
                    isRTL={isRTL}
                    tShopNow={t('shopNow')}
                    hasSession={hasSession}
                  />
                );
              }

              return (
                <Link
                  key={idx}
                  href={cat.href}
                  locale={locale}
                  className="group relative flex items-center p-8 bg-white dark:bg-[#112240] rounded-[2.5rem] shadow-soft hover:-translate-y-2 hover:shadow-soft-lg transition-all duration-300 overflow-hidden border border-transparent hover:border-brand-sky/20"
                >
                  {/* 
                   DECORATIVE BLOB LOGIC:
                   - isRTL (Arabic): Icon is Right -> Blob is '-right-10'
                   - !isRTL (English/French): Icon is Left -> Blob is '-left-10'
                */}
                  <div
                    className={`
                    absolute w-40 h-40 rounded-full opacity-10 ${cat.color} 
                    group-hover:scale-150 transition-transform duration-500
                    -bottom-10 
                    ${isRTL ? '-right-10' : '-left-10'}
                  `}
                  ></div>

                  <div className={`w-20 h-20 rounded-3xl ${cat.color} flex items-center justify-center shrink-0 shadow-lg relative z-10`}>
                    <Icon icon={cat.icon} className="text-4xl text-white" />
                  </div>

                  <div className="px-6 relative z-10">
                    <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">{cat.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{cat.desc}</p>

                    <div className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wider ${cat.textColor} group-hover:gap-3 transition-all`}>
                      <span>{t('shopNow')}</span>
                      <Icon icon="solar:arrow-right-linear" className={isRTL ? "rotate-180" : ""} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured / Sale Banner */}
      <section className="pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-brand-gold rounded-[3rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-soft-lg">
            <div className="absolute inset-0 bg-black/5 pattern-dots"></div>
            <div className="relative z-10 text-brand-navy-dark text-center md:text-start rtl:md:text-right">
              <h2 className="text-3xl md:text-5xl font-black mb-4">{t('bundleOffer')}</h2>
              <p className="text-lg font-medium opacity-80 max-w-md">{t('bundleDesc')}</p>
            </div>
            <button className="relative z-10 mt-8 md:mt-0 px-8 py-4 bg-white text-brand-navy font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <Icon icon="solar:bag-check-bold" className="text-xl" />
              {t('viewBundles')}
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
