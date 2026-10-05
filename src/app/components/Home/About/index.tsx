'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'

const About = () => {
  const t = useTranslations('home')

  const points = [
    { key: 'aboutPoint1', icon: 'solar:verified-check-bold-duotone' },
    { key: 'aboutPoint2', icon: 'solar:laptop-minimalistic-bold-duotone' },
    { key: 'aboutPoint3', icon: 'solar:user-speak-bold-duotone' },
  ]

  return (
    <section id='about-section' className='py-24 bg-white dark:bg-transparent overflow-hidden transition-colors duration-300 relative'>
      {/* Background decoration for Dark Mode */}
      <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full mix-blend-screen opacity-0 dark:opacity-20 pointer-events-none" />
      
      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
        <div className='flex flex-col lg:flex-row items-center gap-16 lg:gap-24'>
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className='flex-1 relative'
          >
            <div className='relative z-10 rounded-4xl overflow-hidden shadow-soft-lg bg-white dark:bg-white/5 border border-white/10 group'>
              <Image
                src='/images/home/about-casp.png'
                alt='About Casp Education'
                width={600}
                height={600}
                className='w-full h-auto object-cover group-hover:scale-105 transition duration-700'
              />
              <div className='absolute inset-0 bg-brand-orange/5 dark:bg-brand-navy/20 group-hover:opacity-0 transition-opacity duration-500' />
            </div>
            {/* Decorative blobs */}
            <div className='absolute -top-10 -start-10 w-40 h-40 bg-brand-orange/10 dark:bg-brand-orange/20 rounded-full blur-3xl animate-pulse' />
            <div className='absolute -bottom-10 -end-10 w-40 h-40 bg-brand-gold/10 dark:bg-brand-gold/10 rounded-full blur-3xl animate-pulse delay-700' />
          </motion.div>

          {/* Content Column */}
          <div className='flex-1'>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className='max-w-xl'
            >
              <p className='text-brand-orange dark:text-brand-gold font-bold text-sm uppercase tracking-[0.25em] mb-4'>
                {t('aboutTitle')}
              </p>
              <h2 className='text-3xl md:text-5xl font-extrabold text-brand-navy dark:text-white mb-8 leading-tight'>
                {t('aboutTitle')}
              </h2>
              <p className='text-lg text-brand-navy/70 dark:text-white/70 leading-relaxed mb-2'>
                {t('aboutDescription')}
              </p>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
                className='space-y-6'
              >
                {points.map((point, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className='flex gap-5 items-start group p-4 rounded-2xl hover:bg-brand-sky/5 dark:hover:bg-white/5 border border-transparent hover:border-brand-orange/10 dark:hover:border-white/10 transition-all duration-300'
                  >
                    <div className='w-14 h-14 rounded-2xl bg-brand-orange/10 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm'>
                      <Icon icon={point.icon} className='text-3xl text-brand-orange dark:text-white group-hover:text-white transition-colors duration-300' />
                    </div>
                    <div>
                      <p className='text-lg font-bold text-brand-navy dark:text-white mb-1'>
                        {t(point.key)}
                      </p>
                      <div className='h-0.5 w-0 group-hover:w-12 bg-brand-orange/30 dark:bg-brand-gold/50 transition-all duration-500' />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
