'use client'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useTranslations, useLocale } from 'next-intl' // Added useLocale
import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'

import { TestimonialData } from '@/app/data'

const Testimonial = () => {
  const t = useTranslations('home')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const testimonial = TestimonialData

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 800, // Smoother transition
    autoplaySpeed: 6000,
    pauseOnHover: true, // UX Improvement
    rtl: isRtl, // Essential for Arabic support
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 800, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <section 
      id='testimonial-section' 
      className='relative section-padding bg-linear-to-b from-white via-brand-sky/10 to-white dark:from-brand-navy-dark dark:via-brand-navy/30 dark:to-brand-navy-dark overflow-hidden'
      aria-label="Testimonials section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" 
           aria-hidden="true" />
      
      <div className='absolute top-0 start-0 w-full h-32 bg-linear-to-b from-white dark:from-brand-navy-dark to-transparent' aria-hidden="true" />

      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 md:mb-16 lg:mb-20'
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='inline-block px-4 py-2 mb-4 text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/10 rounded-full'
          >
            {t('feedback')}
          </motion.span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white mb-4 md:mb-6 leading-tight max-w-3xl mx-auto text-balance'>
            {t('testimonialsTitle')}
          </h2>
          <div className='flex justify-center gap-2'>
            <div className='h-1.5 w-12 bg-brand-orange rounded-full' />
            <div className='h-1.5 w-6 bg-brand-gold rounded-full' />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Slider {...settings} className='testimonial-slider-custom'>
            {testimonial.map((items, i) => (
                  <div key={i} className='px-3 md:px-4 pb-12 md:pb-16'>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -8 }}
                      className='group card card-hover p-6 md:p-8 lg:p-10 rounded-3xl relative h-full flex flex-col min-h-[380px] md:min-h-[420px] bg-white dark:bg-brand-navy-dark border border-brand-sky/20 dark:border-white/10'
                    >
                      {/* Quote Icon */}
                      <div className='absolute -top-4 start-6 md:start-8 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 z-10'>
                        <div className='bg-brand-orange w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-soft-primary'>
                          <Icon icon='ri:double-quotes-l' className='text-white text-2xl md:text-3xl' aria-hidden="true" />
                        </div>
                      </div>
                      
                      {/* Testimonial Text */}
                      <div className='mt-6 md:mt-8 flex-1'>
                        <p className='text-base md:text-lg lg:text-xl font-medium leading-relaxed text-brand-navy/80 dark:text-white/80 italic mb-6 md:mb-8 text-balance'>
                          &quot;{t(`testimonials.item${i + 1}.comment`)}&quot;
                        </p>
                      </div>

                      {/* User Info Section */}
                      <div className='mt-auto pt-6 md:pt-8 border-t border-brand-sky/20 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between'>
                        <div className='flex items-center gap-3 md:gap-4'>
                          <div className='relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-3 ring-white dark:ring-white/10 shadow-soft shrink-0'>
                            <Image
                              src={items.imgSrc}
                              alt={`${t(`testimonials.item${i + 1}.name`)}, ${t(`testimonials.item${i + 1}.role`)}`}
                              fill
                              className='object-cover'
                              sizes="(max-width: 768px) 48px, 56px"
                            />
                          </div>
                          <div>
                            <h4 className='text-sm md:text-base font-bold text-brand-navy dark:text-white leading-tight'>{t(`testimonials.item${i + 1}.name`)}</h4>
                            <p className='text-brand-orange text-xs md:text-sm font-semibold uppercase tracking-wider mt-1'>{t(`testimonials.item${i + 1}.role`)}</p>
                          </div>
                        </div>
                        
                        {/* Star Rating */}
                        <div className='flex gap-0.5 bg-brand-gold/10 px-3 py-1.5 rounded-full' aria-label="5 out of 5 stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Icon 
                              key={s} 
                              icon='solar:star-bold' 
                              className='text-brand-gold text-sm md:text-base' 
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Decorative Element */}
                      <div className='absolute bottom-4 end-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-8 transition-opacity duration-300' aria-hidden="true">
                         <Icon icon="gis:ornament" className="text-5xl md:text-6xl text-brand-orange" />
                      </div>
                    </motion.div>
                  </div>
                ))}
          </Slider>
        </motion.div>
      </div>

      {/* Enhanced Slider Dot Styling */}
      <style jsx global>{`
        .testimonial-slider-custom .slick-dots {
          bottom: -40px;
          display: flex !important;
          justify-content: center;
          gap: 8px;
        }
        .testimonial-slider-custom .slick-dots li {
          width: auto;
          height: auto;
          margin: 0;
        }
        .testimonial-slider-custom .slick-dots li button {
          width: 10px;
          height: 10px;
          padding: 0;
          border-radius: 50%;
          background: rgba(244, 121, 32, 0.2);
          border: none;
          transition: all 0.3s ease;
        }
        .testimonial-slider-custom .slick-dots li button:before {
          display: none;
        }
        .testimonial-slider-custom .slick-dots li.slick-active button {
          background: #F47920;
          width: 24px;
          border-radius: 5px;
        }
        .testimonial-slider-custom .slick-dots li button:hover {
          background: rgba(244, 121, 32, 0.4);
        }
      `}</style>
    </section>
  )
}

export default Testimonial
