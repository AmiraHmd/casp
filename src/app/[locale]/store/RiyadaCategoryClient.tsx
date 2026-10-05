'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import RiyadaAccessModal from '@/app/components/Store/RiyadaAccessModal';

interface RiyadaCategoryClientProps {
  cat: {
    id?: string;
    title: string;
    desc: string;
    href: string;
    icon: string;
    color: string;
    textColor: string;
  };
  locale: string;
  isRTL: boolean;
  tShopNow: string;
  hasSession: boolean;
}

export default function RiyadaCategoryClient({
  cat,
  locale,
  isRTL,
  tShopNow,
  hasSession,
}: RiyadaCategoryClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasSession) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Link
        href={cat.href}
        locale={locale}
        onClick={handleClick}
        className="group relative flex items-center p-8 bg-white dark:bg-[#112240] rounded-[2.5rem] shadow-soft hover:-translate-y-2 hover:shadow-soft-lg transition-all duration-300 overflow-hidden border border-transparent hover:border-brand-sky/20"
      >
        <div
          className={`
            absolute w-40 h-40 rounded-full opacity-10 ${cat.color} 
            group-hover:scale-150 transition-transform duration-500
            -bottom-10 
            ${isRTL ? '-right-10' : '-left-10'}
          `}
        ></div>

        <div className={`w-20 h-20 rounded-3xl ${cat.color} flex items-center justify-center shrink-0 shadow-lg relative z-10`}>
          <Icon icon={cat.icon} className="text-4xl text-white" />
        </div>

        <div className="px-6 relative z-10">
          <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">{cat.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{cat.desc}</p>
          
          <div className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wider ${cat.textColor} group-hover:gap-3 transition-all`}>
            <span>{tShopNow}</span>
            <Icon icon="solar:arrow-right-linear" className={isRTL ? "rotate-180" : ""} />
          </div>
        </div>
      </Link>

      <RiyadaAccessModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
}
