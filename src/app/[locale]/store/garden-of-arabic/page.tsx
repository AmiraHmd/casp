import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.gardenOfArabic' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/garden-of-arabic`,
      languages: {
        ar: '/ar/store/garden-of-arabic',
        fr: '/fr/store/garden-of-arabic',
        en: '/en/store/garden-of-arabic',
      },
    },
  };
}

export default async function GardenOfArabicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.gardenOfArabic' });
  const tLevels = await getTranslations({ locale: locale, namespace: 'store.levels' });

  // --- Dynamic Level Generation ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8'];
  
  const generateLevels = (isExercises = false) => {
    return levelKeys.map(key => {
      const id = key;
      const section = isExercises ? 'exercices' : 'assas';
      
     
      return {
        id,
        bookId: `garden-${key}-${section}`,
        title: tLevels(key),
        icon: 'mdi:tree',
        color: 'bg-emerald-50 text-emerald-500',
        border: 'border-emerald-300',
        bookCover: `/pdfbooks/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`,
        pdfUrl: isExercises 
          ? `/store-book/garden-book/garden-${key}/${section}/${key}.pdf`
          : `/store-book/garden-book/garden-${key}/${section}/gardenAsses${key}.pdf`,
      };

    });
  };

  const levels = generateLevels(false);
  const exercisesLevels = generateLevels(true);

  return (
    <main className="min-h-screen bg-background">
      
      {/* ================= HERO SECTION (Nature Themed) ================= */}
      <section className="relative overflow-hidden bg-emerald-700 pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Abstract Leaves Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:leaf-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:leaf-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed mb-2">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= THE GARDEN PATH (Main Levels) ================= */}
      <PdfBookGrid levels={levels} watermark={true} />
      {/* ================= EXERCISES PATH ================= */}
      <div className="text-center px-4 py-0 border-t border-gray-100 dark:border-gray-800/20">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
           {t('exercisesTitle')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t('exercisesDesc')}
        </p>
      </div>
      <PdfBookGrid levels={exercisesLevels} watermark={true} />
    </main>
  );
}
