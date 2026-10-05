'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Icon } from '@iconify/react'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: string
  rightIcon?: string
  fullWidth?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-brand-orange text-white hover:bg-brand-orange-dark active:bg-brand-orange-dark shadow-soft-hover hover:shadow-lg',
      secondary: 'bg-brand-navy text-white hover:bg-brand-navy-light active:bg-brand-navy-dark shadow-soft-primary hover:shadow-lg',
      outline: 'bg-transparent text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white active:bg-brand-navy-dark dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-brand-navy',
      ghost: 'bg-transparent text-brand-navy hover:bg-brand-sky/10 active:bg-brand-sky/20 dark:text-white dark:hover:bg-white/10',
      destructive: 'bg-brand-orange text-white hover:bg-brand-orange-dark active:bg-brand-orange-dark shadow-soft-hover hover:shadow-lg', // Using Orange for errors as per brand guide
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2.5',
      lg: 'px-8 py-4 text-lg gap-3',
      xl: 'px-10 py-5 text-xl gap-3',
    }
    
    const widthClass = fullWidth ? 'w-full' : ''
    
    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.02, y: -1 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {isLoading ? (
          <>
            <Icon icon="line-md:loading-twotone-loop" className="text-xl animate-spin" />
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <Icon icon={leftIcon} className="text-xl" />}
            {children}
            {rightIcon && <Icon icon={rightIcon} className="text-xl" />}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button

