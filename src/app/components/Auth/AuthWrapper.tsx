'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Logo from '@/app/components/Layout/Header/Logo'
import GlassCard from '@/app/components/UI/GlassCard'
import { Icon } from '@iconify/react'

interface AuthWrapperProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4 overflow-hidden bg-white dark:bg-[#09121e]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-brand-sky/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 opacity-60" />
      <div className="absolute bottom-0 start-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 opacity-60" />
      
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 start-10 hidden xl:block opacity-20 dark:opacity-40"
      >
        <Icon icon="solar:book-bookmark-bold-duotone" className="text-8xl text-brand-navy dark:text-brand-sky" />
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 end-10 hidden xl:block opacity-20 dark:opacity-40"
      >
        <Icon icon="solar:medal-star-bold-duotone" className="text-8xl text-brand-orange" />
      </motion.div>

      <div className="relative z-10 w-full max-w-xl">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-10"
        >
          <div className="p-4 bg-white dark:bg-brand-navy-dark rounded-4xl shadow-soft-lg border border-brand-sky/10">
            <Logo />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, type: "spring" }}
        >
          <GlassCard className="p-8 md:p-12 bg-white/80! dark:bg-brand-navy-dark/80! backdrop-blur-3xl! border-white/20 dark:border-white/5 shadow-2xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-black text-brand-navy dark:text-white mb-3 tracking-tight">
                {title}
              </h1>
              <p className="text-brand-navy/60 dark:text-white/60 font-medium">
                {subtitle}
              </p>
            </div>

            {children}
          </GlassCard>
        </motion.div>

        {/* Support Links / Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-widest text-brand-navy/40 dark:text-white/30"
        >
          <a href="#" className="hover:text-brand-orange transition-colors">Help Center</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthWrapper
