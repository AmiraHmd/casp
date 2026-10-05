import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hidayahFr' });
  return { title: t('title'), description: t('description') };
}

export default async function HidayahFrenchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.hidayahFr' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });

  // --- Pillars: Tailored for Francophones ---


  // --- The Levels ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4'];
  const levels = levelKeys.map(key => {
  const id = key;
    return {
      bookId: `hidayah-fr-${key}`,
      id,
      title: tLevels(key),
      color: "bg-blue-50 text-blue-500",
      border: "border-blue-300",
      bookCover: `/pdfbooks/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.png`,
      pdfUrl: `/api/books/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.pdf`,
    };

  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-blue-600 pt-24 pb-0 text-center relative overflow-hidden rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background: Icons & Connections */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Icon icon="solar:moon-stars-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:stars-minimalistic-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-bounce-slow" />
           <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 Q 50 0 100 100" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M0 80 Q 50 -20 100 80" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
           </svg>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1> 

          <p className="text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ================= LEVELS GRID ================= */}

      <PdfBookGrid levels={levels} />

    </main>
  );
}
