'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const Platforms = () => {
  const t = useTranslations('home.platforms');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const platforms = [
    {
      id: 'alwafi',
      title: t('wafiTitle'),
      description: t('wafiDesc'),
      link: 'https://alwafi.academy/',
      icon: 'solar:square-academic-cap-bold-duotone',
      color: 'bg-brand-navy',
      lightColor: 'bg-brand-navy/5 text-brand-navy',
      stats: '', // Home doesn't have stats yet
    },
    {
      id: 'qalamnet',
      title: t('qalamnetTitle'),
      description: t('qalamnetDesc'),
      link: 'https://qalamnet.com/',
      icon: 'solar:pen-new-square-bold-duotone',
      color: 'bg-teal-600',
      lightColor: 'bg-teal-50 text-teal-600',
      stats: '',
    },
    {
      id: 'keetaby',
      title: t('keetabyTitle'),
      description: t('keetabyDesc'),
      link: 'https://www.keetaby.com/',
      icon: 'solar:book-bookmark-bold-duotone',
      color: 'bg-brand-orange',
      lightColor: 'bg-brand-orange/10 text-brand-orange',
      stats: '',
    },
  ];

  return (
    <section id="platforms" className="relative py-24 bg-white dark:bg-brand-navy-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 start-0 w-[400px] h-[400px] bg-brand-sky/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 end-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-navy/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Platforms Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {platforms.map((platform) => (
            <motion.a
              key={platform.id}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative flex flex-col bg-white dark:bg-white/5 rounded-[3rem] p-10 shadow-soft border border-brand-navy/5 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-soft-lg overflow-hidden h-full"
            >
              {/* Hover Fill Effect */}
              <div className={`absolute inset-0 opacity-0 ${platform.color} group-hover:opacity-100 transition-opacity duration-500 ease-out`} />

              {/* Icon Container */}
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`w-20 h-20 rounded-4xl flex items-center justify-center text-4xl shadow-inner-soft transition-all duration-500 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 ${platform.lightColor}`}>
                  <Icon icon={platform.icon} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 grow flex flex-col">
                <h3 className="text-3xl font-black text-brand-navy dark:text-white mb-4 group-hover:text-white transition-colors">
                  {platform.title}
                </h3>
                <p className="text-brand-navy/60 dark:text-white/60 leading-relaxed font-medium mb-10 group-hover:text-white/80 transition-colors">
                  {platform.description}
                </p>

                {/* Visit Button */}
                <div className="mt-auto flex items-center gap-2 font-bold text-lg text-brand-orange group-hover:text-white transition-colors">
                  <span>{t('visitPlatform')}</span>
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-orange transition-all">
                    <Icon icon="solar:arrow-right-up-bold" className={isRTL ? "-rotate-90" : ""} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Platforms;
