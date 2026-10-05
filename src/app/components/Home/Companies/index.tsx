'use client'
import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Companiesdata } from '@/app/data'

const Companies = () => {
  const t = useTranslations('home')
  const [isHovered, setIsHovered] = useState(false)

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1.5, centerMode: true, centerPadding: '40px' },
      },
    ],
  }

  // Show nothing if empty
  if (!Companiesdata.length) return null

  return (
    <section className="py-16 bg-brand-sky/5 dark:bg-brand-navy-dark/30 border-y border-brand-navy/5 dark:border-white/5 overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg font-bold text-brand-navy-dark/60 dark:text-white/40 text-center mb-12 uppercase tracking-widest">
            {t('trustedByFull')}
          </p>
          
          <div 
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient fade edges - Adaptive to theme */}
            <div className="absolute start-0 top-0 bottom-0 w-24 bg-linear-to-r from-brand-sky/5 dark:from-brand-navy-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute end-0 top-0 bottom-0 w-24 bg-linear-to-l from-brand-sky/5 dark:from-brand-navy-dark to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              style={{ opacity: isHovered ? 1 : 0.8 }}
              className={`transition-all duration-500`}
            >
              <Slider {...settings}>
                {Companiesdata.map((item, i) => (
                  <div key={i} className="px-6 lg:px-8 py-4">
                    <div className="relative group/item flex items-center justify-center">
                      <div className="relative w-32 h-16 md:w-40 md:h-20 bg-white dark:bg-brand-navy-dark rounded-2xl p-4 shadow-sm border border-brand-navy/5 dark:border-white/10 group-hover/item:shadow-xl group-hover/item:shadow-brand-orange/10 group-hover/item:border-brand-orange/30 transition-all duration-500 backdrop-blur-sm">
                        <Image
                          src={item.imgSrc}
                          alt={item.alt || 'Partner Logo'}
                          fill
                          className="object-contain p-3 transition-all duration-500 group-hover/item:scale-110"
                          sizes="(max-width: 640px) 120px, 160px"
                          loading={i < 5 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Companies
