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
  const t = await getTranslations({ locale: locale, namespace: 'store.theHappyMuslim' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/store/the-happy-muslim`,
      languages: {
        ar: '/ar/store/the-happy-muslim',
        fr: '/fr/store/the-happy-muslim',
        en: '/en/store/the-happy-muslim',
      },
    },
  };
}

export default async function TheHappyMuslimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'store.theHappyMuslim' });
  const tLevels = await getTranslations({ locale, namespace: 'store.levels' });
  // --- The Little Muslim Bookshelf ---
  const levelKeys = ['R', 'P', '1', '2', '3', '4', '5', '6'];
  const levels = levelKeys.map(key => {
  const id = key;
    return {
      bookId: `happymuslim-en-${key}`,
      id,
      title: tLevels(key),
      color: "bg-blue-50 text-blue-500",
      border: "border-blue-300",
      bookCover: `/pdfbooks/store-book/happymuslimEn-book/happymuslimEn-${key}/cover/${key}-1.png`,
      pdfUrl: `/api/books/store-book/happymuslimEn-book/happymuslimEn-${key}/${key}-1.pdf`,
    };

  });

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* ================= HERO SECTION (Cloudy & Playful) ================= */}
      <section className="bg-blue-400 pt-24 pb-0 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        
        {/* Playful Floating Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:cloud-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:balloon-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-bounce-slow" />
           <Icon icon="solar:cloud-bold" className="absolute top-40 right-40 text-7xl text-white opacity-50" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 drop-shadow-sm leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
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
