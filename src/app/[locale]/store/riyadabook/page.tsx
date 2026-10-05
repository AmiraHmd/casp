import { Metadata } from 'next';
import { Icon } from '@iconify/react';
import PdfBookGrid from '@/app/components/Store/PdfBookGrid';
import { cookies } from 'next/headers';
import { verifyPdfAccessToken } from '@/lib/token';

export const revalidate = 86400; // 24 hours

export async function generateMetadata(): Promise<Metadata> {
  // Hardcoded for now as Riyada might not exist in translations yet
  return { title: 'Riyada Books', description: 'Riyada Book Collection Strategy' };
}

export default async function RiyadabookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Try to use a base translation or fallback to generic
  const tTitle = locale === 'ar' ? 'سلسلة ريادة' : locale === 'fr' ? 'Série Riyada' : 'Riyada Series';
  const tDesc = locale === 'ar' ? 'تصفح كتب ريادة التفاعلية' : locale === 'fr' ? 'Parcourez les livres interactifs Riyada' : 'Browse Riyada interactive books';

  // --- Server-Side Session Check ---
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('book_session')?.value;

  let valid = false;
  if (sessionToken) {
    try {
      verifyPdfAccessToken(sessionToken);
      valid = true;
    } catch {
      valid = false;
    }
  }

  if (!valid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#09121E] text-center p-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Icon icon="solar:shield-warning-bold" className="text-4xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          You need a valid access code to view the Riyada Collection. Please return to the store and enter your code.
        </p>
        <a
          href={`/${locale}/store`}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/20"
        >
          <Icon icon="solar:round-alt-arrow-left-bold" />
          {locale === 'ar' ? 'العودة إلى المتجر' : locale === 'fr' ? 'Retour à la boutique' : 'Return to Store'}
        </a>
      </div>
    );
  }

  // --- Riyada Levels ---
  const bookDefs = [
    {
      folderName: 'RiyadaKg2',
      bookId: 'riyada-kg2',
      titleAr: 'ريادة التحضيري',
      titleOther: 'Préparatoire',
    },
    {
      folderName: 'Riyada1',
      bookId: 'riyada-1',
      titleAr: 'ريادة 1',
      titleOther: 'Riyada 1',
    },
    {
      folderName: 'Riyada2',
      bookId: 'riyada-2',
      titleAr: 'ريادة 2',
      titleOther: 'Riyada 2',
    },
    { folderName: 'Riyada3', bookId: 'riyada-3', titleAr: 'ريادة 3', titleOther: 'Riyada 3' },
    { folderName: 'Riyada4', bookId: 'riyada-4', titleAr: 'ريادة 4', titleOther: 'Riyada 4' },
    { folderName: 'Riyada5', bookId: 'riyada-5', titleAr: 'ريادة 5', titleOther: 'Riyada 5' },
    { folderName: 'Riyada6', bookId: 'riyada-6', titleAr: 'ريادة 6', titleOther: 'Riyada 6' },
    { folderName: 'Riyada7', bookId: 'riyada-7', titleAr: 'ريادة 7', titleOther: 'Riyada 7' },
    { folderName: 'Riyada8', bookId: 'riyada-8', titleAr: 'ريادة 8', titleOther: 'Riyada 8' },
    { folderName: 'Riyada9', bookId: 'riyada-9', titleAr: 'ريادة 9', titleOther: 'Riyada 9' },
  ];

  const levels = bookDefs.map(def => ({
    bookId: def.bookId,
    id: def.folderName,
    title: locale === 'ar' ? def.titleAr : def.titleOther,
    bookCover: `/api/books/book-office/Riyada/${def.folderName}/thumb/1.jpg`,
    pdfUrl: `/Riyadabook/${def.folderName}/index.html`,
    color: "bg-emerald-50 text-emerald-500",
    border: "border-emerald-300",
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-emerald-600 pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">

        {/* Background Patterns & Icons */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay -translate-x-1/3 -translate-y-1/3"></div>
          <Icon icon="solar:book-bookmark-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
          <Icon icon="solar:notebook-bold" className="absolute bottom-10 right-10 text-8xl text-white animate-bounce-slow" />
          <Icon icon="solar:folder-with-files-bold" className="absolute bottom-20 left-10 text-8xl text-white animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {tTitle}
          </h1>

          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {tDesc}
          </p>

        </div>
      </section>

      {/* ================= LEVELS GRID ================= */}
      <div className="py-8">
        <PdfBookGrid levels={levels} usePopup={true} />
      </div>
    </main>
  );
}
