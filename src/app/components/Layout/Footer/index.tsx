'use client'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const Footer = () => {
  const t = useTranslations('footer')
  const navT = useTranslations('nav')
  const contactT = useTranslations('contact')

  // Shared Link Component to ensure "same everything"
  const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <li role="listitem">
      <Link
        href={href}
        className='text-white/70 hover:text-brand-gold-light transition-all duration-300 text-sm md:text-base flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark rounded-lg'
      >
        <Icon
          icon='solar:alt-arrow-right-linear'
          className='rtl:rotate-180 rotate-0 text-brand-gold-light opacity-0 group-hover:opacity-100 transition-all text-lg'
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  )

  return (
    <footer
      className='bg-brand-navy-dark text-white overflow-hidden relative'
      id='footer'
      role="contentinfo"
    >
      {/* Top Accent Line */}
      <div className='absolute top-0 start-0 w-full h-1 bg-linear-to-r from-transparent via-brand-sky/60 to-transparent' aria-hidden="true" />

      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 lg:pt-40 pb-8 md:pb-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'
        >
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col gap-4 md:gap-6'
          >
            <Link
              href="/"
              className='inline-block w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark rounded-lg'
              aria-label="Casp Education Home"
            >
              <Image
                src='/images/logo/casp-logo.png'
                alt='Casp Education Logo'
                width={80}
                height={80}
                className='brightness-0 invert h-16 md:h-30 w-auto group-hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_10px_rgb(244,121,32)]'
                priority
              />
            </Link>
            <p className='text-white/70 text-base md:text-lg leading-relaxed max-w-sm'>
              {t('description')}
            </p>
            <div className='flex gap-3' role="list" aria-label="Social media links">
              {[
                { icon: 'ri:twitter-x-fill', href: '#', label: 'Twitter' },
                { icon: 'ri:instagram-line', href: '#', label: 'Instagram' },
                { icon: 'ri:facebook-fill', href: 'https://www.facebook.com/caspeducation?rdid=gMP9FoFjFiCWfr4W&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HDVhzFqx4%2F#', label: 'Facebook' },
                { icon: 'ri:youtube-fill', href: 'https://www.youtube.com/@%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D9%84%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9-%D9%83%D9%86', label: 'YouTube' },
              ].map((social, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="listitem"
                >
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className='w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 border border-white/10 hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark'
                  >
                    <Icon icon={social.icon} className='text-lg md:text-xl' aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className='text-lg md:text-xl font-bold text-brand-gold mb-6 md:mb-8 relative inline-block after:content-[""] after:absolute after:bottom-[-10px] after:start-0 after:w-12 after:h-1 after:bg-brand-gold after:rounded-full'>
              {t('links')}
            </h4>
            <ul className='space-y-3 md:space-y-4 space-x-0 md:space-x-0' role="list">
              <FooterLink href="/" label={navT('home')} />
              <FooterLink href="/store" label={navT('store')} />
              <FooterLink href="/teacher-guide" label={navT('teacherGuide')} />
              <FooterLink href="/academy" label={navT('academy')} />
              <FooterLink href="/contact" label={navT('contact')} />
            </ul>
          </motion.div>

          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className='text-lg md:text-xl text-brand-gold font-bold mb-6 md:mb-8 relative inline-block after:content-[""] after:absolute after:bottom-[-10px] after:start-0 after:w-12 after:h-1 after:bg-brand-gold after:rounded-full'>
              {t('about')}
            </h4>
            <ul className='space-y-3 md:space-y-4' role="list">
              <FooterLink href="/#platforms" label={navT('educationalPlatform')} />
              <FooterLink href="https://www.youtube.com/@%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D9%84%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9-%D9%83%D9%86" label={navT('educationalChannel')} />
              <FooterLink href="#" label={t('privacy')} />
              <FooterLink href="#" label={t('terms')} />
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className='text-lg md:text-xl text-brand-gold font-bold mb-6 md:mb-8 relative inline-block after:content-[""] after:absolute after:bottom-[-10px] after:start-0 after:w-12 after:h-1 after:bg-brand-gold after:rounded-full'>
              {t('contact')}
            </h4>
            <ul className='space-y-4 md:space-y-6' role="list">
              <li className='flex items-start gap-3 md:gap-4' role="listitem"> 
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 hover:bg-brand-gold-light'>
                  <Icon icon='solar:map-point-wave-linear' className='text-xl md:text-2xl text-brand-sky hover:text-white' aria-hidden="true" />
                </div>
                <p className='text-white font-bold tracking-wider cursor-pointer hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark rounded'>
                  {contactT('officeAddress')}
                </p>
              </li>
              <li className='flex items-start gap-3 md:gap-4' role="listitem">
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 hover:bg-brand-gold-light'>
                  <Icon icon='solar:phone-calling-linear' className='text-xl md:text-2xl text-brand-sky hover:text-white' aria-hidden="true" />
                </div>
                <div>
                  <p className='text-white/50 text-xs mb-1 uppercase tracking-wider'>{contactT('phoneTitle')}</p>
                  <a
                    href="tel:+21612345678"
                    className='text-white font-bold tracking-wider hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark rounded'
                  >
                    +216 12 345 678
                  </a>
                </div>
              </li>
              <li className='flex items-start gap-3 md:gap-4' role="listitem">
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 hover:bg-brand-gold-light'>
                  <Icon icon='solar:letter-linear' className='text-xl md:text-2xl text-brand-sky hover:text-white' aria-hidden="true" />
                </div>
                <div>
                  <p className='text-white/50 text-xs mb-1 uppercase tracking-wider'>{contactT('emailTitle')}</p>
                  <a
                    href="mailto:centrecasp.ca@gmail.com"
                    className='text-white font-bold hover:text-brand-gold transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark rounded'
                  >
                    {/* contact@centerarabic.com */}centrecasp.ca@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className='mt-12 md:mt-16 lg:mt-20 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-start'>
          <p className='text-white/50 text-xs md:text-sm'>
            © {new Date().getFullYear()} Casp Education. {t('rights')}
          </p>
          <div className='flex items-center justify-center'>
             <Image
               src="/images/logo/casp-logo.png"
               alt="Accepted payment methods"
               width={50}
               height={30}
               className='opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500'
               priority
             />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
