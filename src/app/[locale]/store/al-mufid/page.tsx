import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alMufid' });
  return { title: t('title'), description: t('description') };
}

export default async function AlMufidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alMufid' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- Al Mufid Levels ---
  const levelKeys = ['1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => {
  const id = key;
    return {
      bookId: `mufid-${key}`,
      id,
      title: tLevels(key),
      bookCover: `/pdfbooks/store-book/mufid-book/mufid-${key}/${key}-1.png`,
      pdfUrl: `/api/books/store-book/mufid-book/mufid-${key}/${key}-1.pdf`,
      color: "bg-amber-50 text-amber-500",
      border: "border-amber-300",
    };
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-amber-600 pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Patterns & Icons */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay -translate-x-1/3 -translate-y-1/3"></div>
            <Icon icon="solar:notebook-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:notebook-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:notebook-bold" className="absolute bottom-10 right-10 text-8xl text-white animate-bounce-slow" />
            <Icon icon="solar:notebook-bold" className="absolute bottom-20 left-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>

          <p className="text-xl text-orange-100/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>

        </div>
      </section>



      {/* ================= LEVELS GRID ================= */}

      <PdfBookGrid levels={levels} />
    </main>
  );
}
