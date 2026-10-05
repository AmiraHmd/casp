'use client'
import { Link } from '@/i18n/routing'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslations } from 'next-intl'

type CategoryCardProps = {
  title: string
  description: string
  icon: string
  href: string
  color: string
}

const CategoryCard = ({ title, description, icon, href, color }: CategoryCardProps) => {
  const t = useTranslations('common')

  return (
    <Link href={href} className='group relative block h-full'>
      <div className={`relative h-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-white/5 border border-brand-sky/20 dark:border-white/10 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-sky/10 group-hover:-translate-y-2`}>
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <Icon icon={icon} className='text-3xl' />
        </div>
        
        <h3 className='text-2xl font-bold text-brand-navy dark:text-white mb-3 group-hover:text-brand-orange transition-colors'>
          {title}
        </h3>
        <p className='text-brand-navy/60 dark:text-white/60 leading-relaxed mb-8'>
          {description}
        </p>

        <div className='flex items-center gap-2 text-brand-orange font-bold group-hover:gap-4 transition-all'>
          <span>{t('exploreNow')}</span>
          <Icon icon='solar:alt-arrow-right-linear' className='text-xl rtl:rotate-180' />
        </div>

        {/* Floating background image/element */}
        <div className='absolute bottom-[-20px] right-[-20px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-150 ltr:right-[-20px] rtl:left-[-20px]'>
             <Icon icon={icon} className='text-[120px]' />
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
