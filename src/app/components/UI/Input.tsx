'use client'

import React from 'react'
import { Icon } from '@iconify/react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: string
  rightIcon?: string
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error
    
    const baseStyles = 'w-full px-4 py-3 text-base text-brand-navy bg-white dark:bg-brand-navy-dark dark:text-white border-2 rounded-xl transition-all duration-300 placeholder:text-brand-navy/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-brand-sky/10'
    
    const stateStyles = hasError
      ? 'border-brand-orange focus:border-brand-orange focus:ring-brand-orange/20'
      : 'border-brand-sky/20 hover:border-brand-orange/30 focus:border-brand-orange'
    
    const inputClasses = `${baseStyles} ${stateStyles} ${leftIcon ? 'ps-11' : ''} ${rightIcon ? 'pe-11' : ''} ${className}`
    
    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <div className={widthClass}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {label}
            {props.required && <span className="text-brand-orange ms-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-navy/50 dark:text-white/50 pointer-events-none">
              <Icon icon={leftIcon} className="text-xl" />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute end-4 top-1/2 -translate-y-1/2 text-brand-navy/50 dark:text-white/50 pointer-events-none">
              <Icon icon={rightIcon} className="text-xl" />
            </div>
          )}
        </div>
        
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-brand-orange flex items-center gap-1.5"
            role="alert"
          >
            <Icon icon="solar:danger-circle-bold-duotone" className="text-lg" />
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-brand-navy/60 dark:text-white/60"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

