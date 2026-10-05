'use client'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <section id='join-section' className='relative z-20 -mb-32 px-4'>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className='mx-auto max-w-7xl bg-brand-navy rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-brand-navy/30'
      >
        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className='absolute top-0 end-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2 blur-3xl' 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className='absolute bottom-0 start-0 w-96 h-96 bg-brand-sky/20 rounded-full translate-y-1/2 -translate-x-1/2 rtl:translate-x-1/2 blur-3xl' 
        />

        <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className='text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight'>
              {t('newsletterTitle')}
            </h3>
            <p className='text-white/80 text-lg md:text-xl font-medium mb-2'>
              {t('description')}
            </p>
            
            <form className='flex flex-col sm:flex-row gap-4' onSubmit={(e) => e.preventDefault()}>
              <input
                type='email'
                className='flex-1 py-5 px-8 bg-white/10 border border-white/20 text-white placeholder:text-white/50 transition-all duration-300 focus:bg-white focus:text-brand-navy rounded-2xl outline-none text-lg'
                placeholder={t('newsletterPlaceholder')}
                required
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-brand-orange hover:bg-white hover:text-brand-orange text-white font-bold py-5 px-12 rounded-2xl transition-all shadow-lg text-lg whitespace-nowrap shadow-brand-orange/20'
              >
                {t('subscribe')}
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className='hidden lg:flex justify-end'
          >
            <div className='relative w-full max-w-sm aspect-square'>
               <Image
                src={'/images/newsletter/Free.svg'}
                alt='Educational Resources'
                fill
                className='object-contain animate-float'
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Newsletter
