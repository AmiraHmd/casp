'use client'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

import { MentorData } from '@/app/data'

const Mentor = () => {
  const t = useTranslations('home')
  const commonT = useTranslations('common')

  const mentor = MentorData

  return (
    <section id='mentors-section' className='py-24 bg-brand-sky/10 overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='flex flex-col sm:flex-row gap-8 justify-between sm:items-center mb-16'
        >
          <div className='max-w-2xl'>
            <h2 className='text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-4'>
              {t('expertsTitle')}
            </h2>
            <div className='h-1.5 w-20 bg-brand-orange/20 rounded-full' />
          </div>
          <Link
            href='/contact'
            className='bg-brand-orange hover:bg-brand-navy text-white font-bold py-4 px-10 rounded-full transition-all shadow-soft hover:shadow-soft-hover transform hover:-translate-y-1 text-center'
          >
            {commonT('learnMore')}
          </Link>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {mentor.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative flex flex-col items-center'
                >
                  <div className='relative w-full aspect-square overflow-hidden rounded-[48px] bg-white dark:bg-white/5 group-hover:shadow-soft-hover transition-all duration-700 ease-out'>
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className='object-cover object-top group-hover:scale-105 transition duration-700'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-brand-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className='relative -mt-16 bg-white/90 dark:bg-brand-navy-dark/95 backdrop-blur-md px-8 py-7 rounded-3xl shadow-soft w-[85%] text-center border border-white/50 dark:border-white/10 group-hover:-translate-y-3 transition-all duration-500'
                  >
                    <h3 className='text-2xl font-bold text-brand-navy dark:text-white mb-1 group-hover:text-brand-orange transition-colors'>
                      {t(`mentors.item${index + 1}.name`)}
                    </h3>
                    <p className='text-brand-orange font-bold text-sm uppercase tracking-widest'>
                      {t(`mentors.item${index + 1}.role`)}
                    </p>
                    <div className='mt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                       <div className='w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors cursor-pointer'>
                          <ExternalLink size={16} />
                       </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Mentor
