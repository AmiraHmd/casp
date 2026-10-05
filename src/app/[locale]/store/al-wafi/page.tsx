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
  const t = await getTranslations({ locale: locale, namespace: 'store.alWafi' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AlWafiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.alWafi' });
  const tLevels = await getTranslations({ locale: locale, namespace: 'store.levels' });



  // --- Al Wafi Levels & Assets ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8'];
  
  const generateLevels = (isExercises = false) => {
    return levelKeys.map(key => {
      const id = key;
      const section = isExercises ? 'exercices' : 'assas';
      const idPrefix = isExercises ? 'ex' : 'assas';

      return {
        bookId: `wafi-${idPrefix}-${key}`,
        id,
        title: tLevels(key),
        bookCover: `/pdfbooks/store-book/wafi-book/wafi-${key}/${section}/cover/${key}-1.png`,
        pdfUrl: `/api/books/store-book/wafi-book/wafi-${key}/${section}/${key}-1.pdf`,
        color: "bg-brand-gold-dark text-brand-gold-dark",
        border: "border-brand-gold-dark",
      };

    });
  };

  const levels = generateLevels(false);
  const exercisesLevels = generateLevels(true);

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-gold-dark pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay translate-x-1/3 -translate-y-1/3"></div>
            <Icon icon="solar:book-bookmark-bold" className="absolute bottom-20 left-20 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:book-bookmark-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-brand-gold/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>

        </div>
      </section>

      {/* ================= MAIN LEVELS GRID ================= */}

      <PdfBookGrid levels={levels} />

      {/* ================= EXERCISES GRID ================= */}
      <div className="text-center mt-32 mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4 italic">
           {t('exercises')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {t('exercisesDesc')}
        </p>
        <div className="h-1 w-24 bg-brand-sky mx-auto rounded-full"></div>
      </div>

      <PdfBookGrid levels={exercisesLevels} />
    </main>
  );
}
