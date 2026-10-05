import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alShamil' });
  return { title: t('title'), description: t('description') };
}

export default async function AlShamilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.alShamil' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- The Levels (Modules) ---
  const levelKeys = ['1', '2', '3', '4'];
  const levels = levelKeys.map(key => {
  const id = key;

    return {
      bookId: `shamil-${key}`,
      id,
      title: tLevels(key),
      color: "bg-indigo-50 text-indigo-500",
      border: "border-indigo-300",
      bookCover: `/pdfbooks/store-book/shamil-book/shamil-${key}/${key}.jpg`,
      pdfUrl: `/api/books/store-book/shamil-book/shamil-${key}/${key}.pdf`,
    };

  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-indigo-700 pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Patterns & Icons */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay translate-x-1/3 -translate-y-1/3"></div>
            <Icon icon="solar:book-2-bold" className="absolute top-10 right-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:book-2-bold" className="absolute bottom-10 left-10 text-8xl text-white animate-bounce-slow" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>

          <p className="text-xl text-indigo-100/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>

        </div>
      </section>

      <PdfBookGrid 
        levels={levels} 
      />

    </main>
  );
}
