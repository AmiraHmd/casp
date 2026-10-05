
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Icon } from '@iconify/react';
import { verifyPdfAccessToken } from '@/lib/token';
import { cookies } from 'next/headers';
import Image from 'next/image';
import PrivateBookClient from './PrivateBookClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivateBook' });
  return { title: t('title'), description: t('description') };
}

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PrivateBookPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivateBook' });
  
  // --- Server-Side Session Check ---
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('book_session')?.value;

  let valid = false;
  let email = '';

  if (sessionToken) {
    try {
      const payload = verifyPdfAccessToken(sessionToken);
      email = payload.email;
      valid = true;
    } catch {
      valid = false;
    }
  }

  // --- ACCESS DENIED View ---
  if (!valid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-brand-navy-black text-center p-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Icon icon="solar:shield-warning-bold" className="text-4xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('errorTitle')}</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          {t('errorDescription')}
        </p>
        <a 
          href={`/${locale}/services/book-access`}
          className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-brand-gold/20"
        >
          <Icon icon="solar:refresh-bold" />
          {t('requestNew')}
        </a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative pb-20">
       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]">
            <Image 
                src="/images/logo/casp-logo.png" 
                alt="" 
                width={600} 
                height={600} 
                className="object-contain"
                priority
            />
       </div>

        {/* Watermark Overlay for the whole page */}
       <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-end justify-end p-6">
            <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-end">
                <p className="text-white/50 text-xs font-mono">{t('accessibleBy')}</p>
                <p className="text-white/90 text-sm font-bold">{email}</p>
            </div>
       </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-brand-gold pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10 mb-16">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay -translate-x-1/3 -translate-y-1/3"></div>
            <Icon icon="solar:notebook-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:notebook-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
            <Icon icon="solar:notebook-bold" className="absolute bottom-10 right-10 text-8xl text-white animate-bounce-slow" />
            <Icon icon="solar:notebook-bold" className="absolute bottom-20 left-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl text-orange-50 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>

        </div>
      </section>

      {/* ================= COLLECTION TABS & GRID ================= */}
      <div className="container mx-auto max-w-7xl relative z-20">
        <PrivateBookClient />
      </div>
    </main>
  );
}
