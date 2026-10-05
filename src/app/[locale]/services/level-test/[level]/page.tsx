'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { useLocale } from 'next-intl';

const validLevels = ['eval1', 'eval2', 'eval3'];

export default function LevelTestRunner({ params }: { params: Promise<{ level: string, locale: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!validLevels.includes(resolvedParams.level)) {
      setIsValid(false);
      router.push('/services/level-test');
    }
  }, [resolvedParams.level, router]);

  if (!isValid) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-black">
      <iframe 
        src={`/${resolvedParams.level}/index.html`} 
        className="w-full h-full border-none"
        title={`Level Test - ${resolvedParams.level}`}
        allowFullScreen
      />
      
      {/* Back Button Overlay */}
      <button 
        onClick={() => router.push('/services/level-test')}
        className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-[101] flex items-center justify-center gap-2 bg-white/90 dark:bg-brand-navy-dark/90 backdrop-blur-md text-brand-navy dark:text-white px-5 py-2.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-brand-navy transition-all hover:scale-105 hover:shadow-xl`}
      >
        <Icon icon="solar:arrow-left-linear" className={`text-xl ${isRTL ? 'rotate-180' : ''}`} />
        <span className="font-bold">{locale === 'ar' ? 'العودة للاختبارات' : locale === 'fr' ? 'Retour aux tests' : 'Back to Tests'}</span>
      </button>
    </div>
  );
}
