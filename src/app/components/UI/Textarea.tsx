'use client'

import React from 'react'
import { Icon } from '@iconify/react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error
    
    const baseStyles = 'w-full px-4 py-3 text-base text-brand-navy bg-white dark:bg-brand-navy-dark dark:text-white border-2 rounded-xl transition-all duration-300 placeholder:text-brand-navy/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-brand-sky/5 resize-none'
    
    const stateStyles = hasError
      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
      : 'border-brand-sky/20 hover:border-brand-orange/30 focus:border-brand-orange'
    
    const textareaClasses = `${baseStyles} ${stateStyles} ${className}`
    
    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <div className={widthClass}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {label}
            {props.required && <span className="text-destructive ms-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          aria-invalid={hasError}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-2 text-sm text-destructive flex items-center gap-1.5"
            role="alert"
          >
            <Icon icon="solar:danger-circle-bold-duotone" className="text-lg" />
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="mt-2 text-sm text-brand-navy/60"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea

