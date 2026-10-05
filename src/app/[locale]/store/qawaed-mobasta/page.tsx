import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.qawaedMobasta' });
  return { 
    title: t('title'), 
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/qawaed-mobasta`,
      languages: {
        ar: '/ar/store/qawaed-mobasta',
        fr: '/fr/store/qawaed-mobasta',
        en: '/en/store/qawaed-mobasta',
      },
    },
  };
}

export default async function QawaedMobastaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'store.qawaedMobasta' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });



  // --- The Levels (The Toolkit) ---
  const levelKeys = ['4', '5', '6', '7', '8'];
  const levels = levelKeys.map(key => {
  const id = key;
  const section = "exercices";
    return {
      bookId: `qawaed-${key}`,
      id,
      title: tLevels(key),
      color: "bg-lime-50 text-lime-500",
      border: "border-lime-300",
      bookCover: `/pdfbooks/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`,
      pdfUrl: `/store-book/garden-book/garden-${key}/${section}/${key}.pdf`,
    };

  });

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-lime-600 pt-24 pb-0 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Background Icons & Patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay translate-x-1/3 -translate-y-1/3"></div>
            <Icon icon="solar:ruler-pen-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:ruler-pen-bold" className="absolute bottom-10 right-10 text-8xl text-white animate-bounce-slow" />
        </div>
        
        {/* Background: Blueprint Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
           <p className="text-xl text-lime-100/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>
          
        </div>
      </section>

      {/* ================= TOPICS GRID (The "Smart Cards") ================= */}

      <PdfBookGrid 
        levels={levels} 
      />
    </main>
  );
}
