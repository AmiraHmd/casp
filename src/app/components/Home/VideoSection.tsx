'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import GlassCard from '@/app/components/UI/GlassCard'

const VideoSection = () => {
  const t = useTranslations('home')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-sky/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-brand-navy dark:text-white mb-6"
          >
            {t('videoTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-brand-navy/70 dark:text-white/70 max-w-3xl mx-auto font-medium"
          >
            {t('videoSubtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
        >
          <GlassCard className="p-2 sm:p-4 rounded-4xl overflow-hidden border-white/20 dark:border-white/10 shadow-2xl">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black group">
              {isMounted && (
               <video
                src={`/pdfbooks/video/caspvideo.mp4`}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/logo.png"
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
              )}
              
              {/* Overlay for better look when not playing */}
              <div className="absolute inset-0 bg-brand-navy/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </GlassCard>

          {/* Floating elements for visual interest */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </motion.div>
      </div>
    </section>
  )
}

export default VideoSection
