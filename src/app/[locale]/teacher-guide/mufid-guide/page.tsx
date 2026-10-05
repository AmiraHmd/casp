import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import GuideBookCardLink from '@/app/components/TeacherGuide/GuideBookCardLink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'teacherGuide' });
  return { title: `${t('mufid.title')} - ${t('title')}` };
}

export default async function MufidGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'teacherGuide' });
  const isRTL = locale === 'ar';

  // --- Dynamic level generation ---
  const levelKeys = ['1', '2', '3', '4'];
  const bookList = levelKeys.map(key => ({
    key,
  }));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617]">
      <section className="relative overflow-hidden bg-orange-600 pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:notebook-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:notebook-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
         
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">{t('mufid.title')}</h1>
          <p className="text-xl text-orange-100/90 max-w-2xl mx-auto leading-relaxed mb-2">{t('mufid.desc')}</p>
        </div>
      </section>

      <section className="py-24 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">{t('stagesOfGrowth')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookList.map((item, idx) => (
              <GuideBookCardLink
                key={idx}
                title={t(`mufid.books.${item.key}`)}
                bookId={`guide-mufid-${item.key}`}
                readLabel={t('readBtn')}
                color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                borderColor="border-orange-200 dark:border-orange-800"
                icon="solar:notebook-bold-duotone"
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
