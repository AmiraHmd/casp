'use client'
import { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

import { CourseDetailData } from '@/app/data'

const Courses = () => {
  const t = useTranslations('home')
  const commonT = useTranslations('common')
  const navT = useTranslations('nav')

  const courseDetail = CourseDetailData

  const [selectedButton, setSelectedButton] = useState<
    | 'printed-books'
    | 'ebooks'
    | 'cds'
    | 'teaching-tools'
    | 'all'
  >('printed-books')

  const filteredCourses = courseDetail.filter(
    (item) => item.category === selectedButton
  )

  const categories: { id: 'printed-books' | 'ebooks' | 'cds' | 'teaching-tools'; label: string; icon: string }[] = [
    { id: 'printed-books', label: navT('printedBooks'), icon: 'solar:book-2-line-duotone' },
    { id: 'ebooks', label: navT('ebooks'), icon: 'solar:tablet-line-duotone' },
    { id: 'cds', label: navT('educationalCDs'), icon: 'solar:disk-line-duotone' },
    { id: 'teaching-tools', label: navT('teachingTools'), icon: 'solar:pen-new-square-line-duotone' },
  ]

  return (
    <section id='courses-section' className='bg-white dark:bg-transparent py-24 transition-colors duration-300 relative'>
      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-12'
        >
          <div>
            <h2 className='text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-4'>
              {t('popularResources')}
            </h2>
            <div className='h-1.5 w-20 bg-brand-orange/20 dark:bg-brand-gold/40 rounded-full' />
          </div>
          <Link
            href='/store'
            className='bg-brand-orange dark:bg-brand-gold text-white dark:text-brand-navy font-bold py-4 px-10 rounded-full shadow-soft hover:shadow-soft-hover transform hover:-translate-y-1 transition-all duration-300 text-center whitespace-nowrap'
          >
            {commonT('viewAll')}
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='flex items-center gap-4 overflow-x-auto pb-6 mb-12 scrollbar-hide'
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedButton(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold transition-all whitespace-nowrap cursor-pointer border-2 ${
                selectedButton === cat.id
                  ? 'bg-brand-orange dark:bg-brand-gold border-brand-orange dark:border-brand-gold text-white dark:text-brand-navy shadow-soft-hover'
                  : 'bg-brand-sky/5 dark:bg-white/5 border-transparent text-brand-navy/60 dark:text-white/60 hover:border-brand-orange/20 hover:text-brand-orange dark:hover:text-brand-gold dark:hover:border-brand-gold/20'
              }`}
            >
              <Icon icon={cat.icon} className='text-2xl' />
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[400px]'>
          <AnimatePresence mode='popLayout'>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((name) => (
                <motion.div
                  key={name.course}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className='bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-soft dark:shadow-none border border-brand-sky/10 dark:border-white/10 group flex flex-col hover:shadow-soft-hover dark:hover:bg-white/10 transition-all duration-500 relative'
                >
                  <div className='relative overflow-hidden aspect-4/3'>
                    <Image
                      src={name.imageSrc}
                      alt={name.course}
                      fill
                      className='object-cover group-hover:scale-110 transition duration-700 ease-in-out'
                    />
                    <div className='absolute top-4 end-4 bg-white/95 dark:bg-brand-navy/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-brand-orange dark:text-brand-gold shadow-soft text-sm z-10'>
                      {name.price} {commonT('currency')}
                    </div>
                    <div className='absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/5 transition-colors duration-500' />
                  </div>
                  <div className='p-7 flex flex-col gap-4 flex-1'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-xl font-bold text-brand-navy dark:text-white group-hover:text-brand-orange dark:group-hover:text-brand-gold transition-colors line-clamp-1'>
                        {name.course}
                      </h3>
                      <p className='text-brand-navy/60 dark:text-white/60 text-sm line-clamp-2 min-h-[40px] leading-relaxed'>
                        {name.profession}
                      </p>
                    </div>
                    <div className='mt-auto pt-5 border-t border-brand-sky/20 dark:border-white/10 flex items-center justify-between'>
                      <div className='flex items-center gap-1.5 text-brand-gold font-bold text-sm'>
                        <Icon icon='solar:star-bold' className='text-xl' />
                        <span>4.9</span>
                      </div>
                      <Link
                        href={`/store/${name.category}`}
                        className='text-brand-orange dark:text-brand-gold font-bold text-sm flex items-center gap-2 group/link'
                      >
                        <span className='group-hover/link:underline transition-all'>{commonT('readMore')}</span>
                        <Icon icon='solar:arrow-left-linear' className='rtl:rotate-0 rotate-180 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform' />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='col-span-full py-24 text-center bg-brand-sky/5 dark:bg-white/5 rounded-4xl border-2 border-dashed border-brand-sky/20 dark:border-white/10'
              >
                <Icon icon="solar:box-minimalistic-linear" className="text-6xl text-brand-navy/20 dark:text-white/20 mx-auto mb-4" />
                <p className='text-brand-navy/40 dark:text-white/40 text-lg font-bold'>{t('noProducts')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Courses
