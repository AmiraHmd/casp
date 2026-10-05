'use client';

import { Icon } from '@iconify/react';

interface BookRowProps {
  title: string;
  color: string;
  readLabel: string;
  isRTL: boolean;
  bookId: string; // Used to identify which PDF to load
}

export default function BookRow({ title, color, readLabel, isRTL, bookId }: BookRowProps) {
  
  const handleReadClick = () => {
    // Logic to open PDF viewer
    // Example: router.push(`/pdf-viewer/${bookId}`) or open a modal
    console.log(`Opening PDF for: ${bookId}`);
    alert(`Opening PDF: ${title}`); 
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-white dark:bg-brand-navy-dark border border-gray-100 dark:border-white/5 rounded-2xl hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Book Icon */}
        <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center shrink-0`}>
          <Icon icon="solar:book-2-bold-duotone" className={`text-2xl ${color.replace('bg-', 'text-')}`} />
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg text-brand-navy dark:text-white">
          {title}
        </h3>
      </div>

      {/* Read Button */}
      <button 
        onClick={handleReadClick}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-brand-sky hover:text-white text-brand-navy dark:text-gray-200 font-semibold transition-all duration-300 group-hover:shadow-md`}
      >
        <span>{readLabel}</span>
        <Icon 
          icon="solar:eye-bold" 
          className={isRTL ? "rotate-0" : ""} 
        />
      </button>
    </div>
  );
}
