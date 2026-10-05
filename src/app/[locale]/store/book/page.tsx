import BookDescriptionClient from "@/app/components/Store/BookDescriptionClient";
import { storeBooksDetails } from "@/data/storeBooksDetails";
import { getStoreBookData } from "@/utils/storeBooksHelper";

// ... existing metadata function ...

export default async function BookDescriptionPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentSearchParams = await searchParams;

  const title = (currentSearchParams.title as string) || "";
  const bookId = currentSearchParams.bookId as string;
  const watermarkParam = currentSearchParams.watermark as string;
  
  // Resolve book data from helper
  const storeHelperData = getStoreBookData(bookId);
  
  const pdfUrl = storeHelperData?.pdfUrl || "";
  const cover = storeHelperData?.cover || "";
  const icon = storeHelperData?.icon || "solar:book-bookmark-bold-duotone";
  const color = storeHelperData?.color || "bg-emerald-100 text-emerald-600";
  const borderColor = storeHelperData?.borderColor || "border-emerald-200";
  const buyUrl = storeHelperData?.buyUrl || "https://sindbadglobal.com";
  
  const watermark = watermarkParam === "false" ? false : true; 
  const isRTL = locale === "ar";
  
  const bookData = bookId && storeBooksDetails[bookId] ? storeBooksDetails[bookId] : null;

  const translatedTitle = bookData 
    ? (locale === 'ar' ? bookData.titleAr : locale === 'fr' ? (bookData.titleFr || bookData.titleEn || bookData.titleAr) : (bookData.titleEn || bookData.titleAr))
    : (title || "Book Details");

  const levelText = bookData 
    ? (locale === 'ar' ? bookData.titleAr : locale === 'fr' ? (bookData.titleFr || bookData.titleEn || bookData.titleAr) : (bookData.titleEn || bookData.titleAr))
    : "Level N/A";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617] pt-28 pb-16">
      <div className="container mx-auto max-w-7xl px-4">
        <BookDescriptionClient
          title={translatedTitle}
          pdfUrl={pdfUrl}
          cover={cover}
          icon={icon}
          color={color}
          borderColor={borderColor}
          watermark={watermark}
          isRTL={isRTL}
          locale={locale}
          pages={bookData?.pages}
          lessons={bookData?.lessons}
          isbn={bookData?.isbn}
          size={bookData?.size}
          levelText={levelText}
          buyUrl={buyUrl}
        />
      </div>
    </main>
  );

}
