'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import GlassCard from '@/app/components/UI/GlassCard'
import { Icon } from '@iconify/react'
import Image from 'next/image'

interface Video {
  id: string;
  title: string;
  url: string;
}

interface AcademyContentProps {
  videos: Video[];
  translations: {
    educatorZone: string;
    title: string;
    subtitle: string;
    exploreVideos: string;
    videoDesc: string;
    watchNow: string;
  };
}

const AcademyContent: React.FC<AcademyContentProps> = ({ videos, translations }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-brand-navy-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <Image 
            src="/images/logo/casp-logo.png" 
            alt="CASP Logo" 
            width={600} 
            height={600} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grayscale invert brightness-200"
            priority
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight tracking-tight"
          >
            {translations.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-orange-50/80 max-w-2xl mx-auto leading-relaxed mb-2"
          >
            {translations.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Video Content */}
      <section className="py-24 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 flex items-center gap-4">
             <div className="h-px bg-brand-navy/10 dark:bg-white/10 grow" />
             <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-navy/40 dark:text-white/40">
                {translations.exploreVideos}
             </h2>
             <div className="h-px bg-brand-navy/10 dark:bg-white/10 grow" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {videos.map((video) => (
              <motion.div key={video.id} variants={itemVariants}>
                <GlassCard className="group p-4 rounded-[2.5rem] border-brand-navy/5 dark:border-white/10 hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-2 shadow-soft hover:shadow-brand-orange/10 overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-black mb-6 shadow-2xl">
                    <iframe
                      src={video.url}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                    />
                    <div className="absolute inset-0 pointer-events-none group-hover:bg-brand-orange/5 transition-colors" />
                  </div>
                  
                  <div className="px-2 grow">
                    <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-brand-navy/60 dark:text-white/60 leading-relaxed">
                      {translations.videoDesc}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-brand-navy/5 dark:border-white/5 flex items-center justify-between group-hover:px-2 transition-all">
                    <button className="flex items-center gap-2 text-brand-orange font-black text-sm uppercase tracking-wider">
                       <Icon icon="solar:play-bold" />
                       {translations.watchNow}
                    </button>
                    <Icon icon="solar:share-bold-duotone" className="text-xl text-brand-navy/20 dark:text-white/20 hover:text-brand-orange transition-colors cursor-pointer" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AcademyContent
