"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

interface StoreBookCardLinkProps {
  bookId?: string;
  title: string;
  readLabel: string;
  color: string;
  borderColor: string;
  icon: string;
  isRTL: boolean;
  coverImage?: string;
  watermark?: boolean;
}

export default function StoreBookCardLink({
  bookId,
  title,
  readLabel,
  color,
  borderColor,
  icon,
  isRTL,
  coverImage,
  watermark,
}: StoreBookCardLinkProps) {
  const [imageError, setImageError] = useState(false);
  const locale = useLocale();

  // Create search params for description page
  const searchParams = new URLSearchParams();
  if (bookId) searchParams.set("bookId", bookId);
  searchParams.set("title", title);
  if (watermark !== undefined) searchParams.set("watermark", watermark.toString());

  const href = `/${locale}/store/book?${searchParams.toString()}`;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Safelist for Tailwind JIT
  // hover:shadow-emerald-300 hover:shadow-teal-300 hover:shadow-indigo-300 hover:shadow-orange-300 hover:shadow-brand-gold-dark hover:shadow-amber-300 hover:shadow-red-300 hover:shadow-brand-gold hover:shadow-brand-navy hover:shadow-blue-300 hover:shadow-lime-300
  // dark:hover:shadow-emerald-800 dark:hover:shadow-teal-800 dark:hover:shadow-indigo-800 dark:hover:shadow-orange-800 dark:hover:shadow-brand-gold-dark dark:hover:shadow-amber-800 dark:hover:shadow-red-800 dark:hover:shadow-brand-gold dark:hover:shadow-brand-navy dark:hover:shadow-blue-800 dark:hover:shadow-lime-800
  const shadowClasses = borderColor.split(' ').map(c => c.replace('border-', 'shadow-')).join(' ') + ' ' + borderColor.split(' ').map(c => c.replace('border-', 'hover:shadow-')).join(' ');

  return (
    <div className={`group relative bg-white dark:bg-brand-navy-dark p-8 md:p-10 rounded-4xl shadow-xl ${shadowClasses} border-2 ${borderColor} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center h-full`}>
      {/* Background Decoration */}
      <div className="absolute top-8 left-8 rtl:right-auto rtl:left-8 ltr:left-auto ltr:right-8 opacity-5 pointer-events-none">
        <Icon icon="solar:book-2-bold" className="text-6xl dark:text-white" />
      </div>

      {/* Icon Box or Cover Image */}
      {coverImage ? (
        <div className="w-full aspect-3/4 mb-4 relative z-10 group-hover:-translate-y-4 transition-transform duration-500 ease-out perspective-1000">
          <div
            onContextMenu={handleContextMenu}
            className="relative w-full h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden transform group-hover:rotate-x-2 group-hover:scale-105 transition-all duration-500 ring-1 ring-black/5 dark:ring-white/10 group-hover:ring-4 group-hover:ring-brand-gold/20 dark:group-hover:ring-brand-sky/20 bg-gray-50 dark:bg-white/5"
          >
            {coverImage && !imageError ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-110 p-2"
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50 p-6 text-center">
                <Icon
                  icon="solar:book-2-bold-duotone"
                  className="text-6xl text-brand-navy/20 dark:text-white/20 mb-3"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>
      ) : (
        <div
          className={`w-24 h-24 rounded-4xl flex items-center justify-center text-5xl shadow-inner-soft ${color} mb-6 relative z-10`}
        >
          <Icon icon={icon} />
        </div>
      )}
      {/* Title */}
      <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-4 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
        {title}
      </h3>

      {/* Action Button */}
      <Link
        href={href}
        className="group/btn relative px-8 py-4 bg-brand-gold text-brand-navy-dark rounded-2xl font-bold shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden inline-flex items-center gap-2 mt-auto"
      >
        <span className="relative z-10 flex items-center gap-2">
          {readLabel} {/* Reusing the original label which is probably 'Read Book' but we can use 'View Details' later. Wait, we should just use readLabel as instructed, or user wants it to say 'View Book' */}
          <Icon icon="solar:round-alt-arrow-right-bold" className={isRTL ? "rotate-180" : ""} />
        </span>
        {/* Shine Effect on Button */}
        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
      </Link>
    </div>
  );
}
