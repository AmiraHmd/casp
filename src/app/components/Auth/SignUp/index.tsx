'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialSignUp from '../SocialSignUp'
import { Input } from '@/app/components/UI'
import PremiumButton from '@/app/components/UI/PremiumButton'
import { useTranslations } from 'next-intl'

const SignUp = () => {
  const router = useRouter()
  const tAuth = useTranslations('auth')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = tAuth('nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = tAuth('nameLength')
    }
    
    if (!formData.email) {
      newErrors.email = tAuth('emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tAuth('invalidEmail')
    }
    
    if (!formData.password) {
      newErrors.password = tAuth('passwordRequired')
    } else if (formData.password.length < 8) {
      newErrors.password = tAuth('passwordLength')
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = tAuth('passwordRegEx')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      toast.success(tAuth('registerSuccess'))
      setLoading(false)
      router.push('/platform/login')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      toast.error(errorMessage)
      setLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <div className="w-full">
      <SocialSignUp />

      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-brand-sky/20"></div>
        <span className='relative z-10 px-4 text-xs font-bold uppercase tracking-widest text-brand-navy/40 bg-white dark:bg-brand-navy-dark'>
          {tAuth('or')}
        </span>
        <div className="flex-1 border-t border-brand-sky/20"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type='text'
          label={tAuth('nameLabel')}
          placeholder={tAuth('namePlaceholder')}
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          leftIcon="solar:user-bold-duotone"
          fullWidth
          required
          autoComplete="name"
          className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
        />
        
        <Input
          type='email'
          label={tAuth('emailLabel')}
          placeholder={tAuth('emailPlaceholder')}
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          leftIcon="solar:letter-linear"
          fullWidth
          required
          autoComplete="email"
          className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
        />
        
        <Input
          type='password'
          label={tAuth('passwordLabel')}
          placeholder={tAuth('passwordPlaceholder')}
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          leftIcon="solar:lock-password-linear"
          fullWidth
          required
          autoComplete="new-password"
          className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
        />
        
        <div className='py-2'>
          <label className="flex items-start gap-3 cursor-pointer group select-none">
             <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                required
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-brand-sky/40 rounded-md peer-checked:bg-brand-orange peer-checked:border-brand-orange transition-all duration-200 shrink-0"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-xs text-brand-navy/70 dark:text-white/70 group-hover:text-brand-navy dark:group-hover:text-white transition-colors leading-relaxed">
              {tAuth('agreeTerms')}{' '}
              <Link href='/privacy' className='text-brand-orange hover:text-brand-orange-dark font-bold underline decoration-brand-orange/20 underline-offset-4 transition-all'>
                {tAuth('privacyPolicy')}
              </Link>{' '}
              &{' '}
              <Link href='/terms' className='text-brand-orange hover:text-brand-orange-dark font-bold underline decoration-brand-orange/20 underline-offset-4 transition-all'>
                {tAuth('termsOfService')}
              </Link>
            </span>
          </label>
        </div>

        <PremiumButton
          type='submit'
          variant='primary'
          size='lg'
          className="w-full mt-4 font-bold text-lg h-14 shadow-soft-hover"
          disabled={loading}
        >
          {loading ? (
             <span className="flex items-center gap-2">
               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               Processing...
             </span>
          ) : tAuth('signUpButton')}
        </PremiumButton>
      </form>

      <div className="mt-8 text-center">
        <p className='text-brand-navy/60 dark:text-white/60 text-sm font-medium'>
          {tAuth('alreadyAccount')}{' '}
          <Link 
            href='/platform/login' 
            className='text-brand-orange hover:text-brand-orange-dark font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded border-b-2 border-brand-orange/20 hover:border-brand-orange'
          >
            {tAuth('signInButton')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
