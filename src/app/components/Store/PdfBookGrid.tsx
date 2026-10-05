'use client';

import { useTranslations, useLocale } from 'next-intl';
import StoreBookCardLink from './StoreBookCardLink';
import DynamicBookViewer from '@/app/components/TeacherGuide/DynamicBookViewer';

interface Level {
  id: string | number;
  bookId?: string;
  title: string;
  bookCover: string;
  pdfUrl: string;
  sub?: string;
  desc?: string;
  icon?: string;
  color?: string;
  border?: string;
}

interface PdfBookGridProps {
  levels: Level[];
  watermark?: boolean;
  usePopup?: boolean;
}

export default function PdfBookGrid({ levels, watermark, usePopup = false }: PdfBookGridProps) {
  const tNav = useTranslations('nav');
  const tGuide = useTranslations('store');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <section className="py-5 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {levels.map((level, idx) => (
            usePopup ? (
              <DynamicBookViewer
                key={idx}
                title={level.title}
                pdfUrl={level.pdfUrl}
                readLabel={usePopup ? tNav('readBook') : (tGuide('viewDetails') || tNav('readBook'))}
                downloadLabel={tNav('download') || "Download"}
                closeLabel={tNav('close') || "Close"}
                color={level.color || "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"}
                borderColor={level.border || "border-emerald-200 dark:border-emerald-800"}
                icon={level.icon || "solar:book-bookmark-bold-duotone"}
                isRTL={isRTL}
                coverImage={level.bookCover}
                watermark={watermark}
              />
            ) : (
              <StoreBookCardLink
                key={idx}
                bookId={level.bookId}
                title={level.title}
                readLabel={usePopup ? tNav('readBook') : (tGuide('viewDetails') || tNav('readBook'))}
                color={level.color || "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"}
                borderColor={level.border || "border-emerald-200 dark:border-emerald-800"}
                icon={level.icon || "solar:book-bookmark-bold-duotone"}
                isRTL={isRTL}
                coverImage={level.bookCover}
                watermark={watermark}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
}
