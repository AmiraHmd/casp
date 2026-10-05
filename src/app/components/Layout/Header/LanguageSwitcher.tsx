'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { type Locale } from '@/i18n/config';

interface LanguageOption {
  code: Locale;
  label: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'EN', flag: 'circle-flags:us', name: 'English' },
  { code: 'fr', label: 'FR', flag: 'circle-flags:fr', name: 'Français' },
  { code: 'ar', label: 'AR', flag: 'circle-flags:sa', name: 'العربية' },
];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Validate current locale or fallback
  const currentLang = languages.find(l => l.code === locale) || languages[2]; // Default to AR if not found

  const currentParams = searchParams.toString();
  const pathWithParams = currentParams ? `${pathname}?${currentParams}` : pathname;

  return (
    <div
      className="relative z-50"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-brand-navy-dark rounded-[24px] shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/10"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Icon icon={currentLang.flag} width={24} height={24} className="rounded-full shrink-0 shadow-sm" />
        <span className="font-bold text-sm tracking-wide text-brand-navy dark:text-white">
            {currentLang.label}
        </span>
        <Icon
            icon="solar:alt-arrow-down-linear"
            width={16}
            height={16}
            className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
        <div
            className={`absolute top-full pt-3 w-full min-w-[150px] transition-all duration-300 origin-top transform ${
                isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            } end-0`}
        >
          <div className="bg-white dark:bg-brand-navy-dark rounded-2xl shadow-xl overflow-hidden p-1.5 flex flex-col gap-1">
             {languages.map((lang) => (
                <Link
                    key={lang.code}
                    href={pathWithParams}
                    locale={lang.code}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors w-full group ${
                        locale === lang.code
                            ? 'bg-brand-gold/10 text-brand-gold'
                            : 'hover:bg-gray-50 dark:hover:bg-white/5 text-brand-navy/60 dark:text-white/80'
                    }`}
                >
                    <Icon 
                        icon={lang.flag} 
                        width={20} 
                        height={20} 
                        className={`shrink-0 rounded-full transition-shadow group-hover:shadow-md ${locale === lang.code ? 'shadow-md' : ''}`} 
                    />
                     <span className={`text-sm ${locale === lang.code ? 'font-bold' : 'font-medium'}`}>
                        {lang.name}
                     </span>
                </Link>
             ))}
          </div>
        </div>
    </div>
  );
}
