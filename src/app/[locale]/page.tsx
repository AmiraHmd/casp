import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import Hero from '@/app/components/Home/Hero';
import Companies from '@/app/components/Home/Companies';
import Partners from '@/app/components/Home/Partners';
import NewsTicker from '@/app/components/Home/NewsTicker';
import Platforms from '@/app/components/Home/Platforms/Platforms';


const Mentor = dynamic(() => import('@/app/components/Home/Mentor'));
const Testimonial = dynamic(() => import('@/app/components/Home/Testimonial'));
const Newsletter = dynamic(() => import('@/app/components/Home/Newsletter'));
const ContactForm = dynamic(() => import('@/app/components/Contact/Form'));
const About = dynamic(() => import('@/app/components/Home/About'));
const Publications = dynamic(() => import('@/app/components/Home/Publications'));
const VideoSection = dynamic(() => import('@/app/components/Home/VideoSection'));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ar': '/ar',
        'en': '/en',
        'fr': '/fr',
      },
    },
  };
}

export default async function HomePage() {
  return (
    <main className="relative">
      {/* Global Background Logo Watermark */}
      <div className="fixed inset-0 top-[0%] pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.05] dark:opacity-[0.05]">
        <Image 
          src="/images/logo/casp-logo.png" 
          alt="" 
          width={800} 
          height={800} 
          className="object-contain"
          priority
        />
      </div>

      <div className="pt-22 lg:pt-22">
        <NewsTicker />
      </div>
      <Hero />
      <Companies />
      <Platforms />
      <Partners />
      <Publications />
      <About />
      <VideoSection />
      <Mentor />
      <Testimonial />
      <ContactForm />
      <Newsletter />
    </main>
  );
}

