'use client'
import { createPortal } from 'react-dom'

import React, { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Input } from '@/app/components/UI'
import PremiumButton from '@/app/components/UI/PremiumButton'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { register } from '@/actions/auth'
import { Icon } from '@iconify/react'
import { Listbox, Transition } from '@headlessui/react'
import { countries, Country } from '@/data/countries'

export function RegisterModal({ onClose, onSwitchToLogin }: { onClose: () => void, onSwitchToLogin: () => void }) {
  const router = useRouter()
  const tAuth = useTranslations('auth')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCode: '+966',
    country: '',
    password: '',
  })
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<Country>(countries[0])
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = tAuth('nameRequired')
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = tAuth('nameRequired')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    const submitData = new FormData()
    submitData.append('firstName', formData.firstName)
    submitData.append('lastName', formData.lastName)
    submitData.append('email', formData.email)
    submitData.append('phone', `${formData.phoneCode}${formData.phone}`)
    submitData.append('country', selectedCountry?.name || formData.country)
    submitData.append('password', formData.password)
    
    try {
      const res = await register(submitData)
      
      if (res?.error) {
         toast.error(res.error)
         setLoading(false)
      } else {
         toast.success(tAuth('registerSuccess'))
         setLoading(false)
         onClose()
         router.refresh()
      }
    } catch (err: unknown) {
      setLoading(false)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      toast.error(errorMessage)
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

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      setMounted(false)
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div 
      id="auth-modal" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-white/90 dark:bg-brand-navy/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 relative animate-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex justify-center mb-2 mt-0 pt-0">
          <Image
            src="/images/logo/casp-logo.png"
            alt="CASP Logo"
            width={100}
            height={100}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-brand-navy dark:text-white text-center">{tAuth('signUpButton')}</h2>

        <div className="flex-1 border-t mt-2 mb-2 border-brand-sky/20"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
              <Input
                type='text'
                label={tAuth('firstNameLabel')}
                placeholder={tAuth('firstNamePlaceholder')}
                value={formData.firstName}
                onChange={handleChange('firstName')}
                error={errors.firstName}
                leftIcon="solar:user-bold-duotone"
                fullWidth
                required
                autoComplete="given-name"
                className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
              />
              <Input
                type='text'
                label={tAuth('lastNameLabel')}
                placeholder={tAuth('lastNamePlaceholder')}
                value={formData.lastName}
                onChange={handleChange('lastName')}
                error={errors.lastName}
                leftIcon="solar:user-bold-duotone"
                fullWidth
                required
                autoComplete="family-name"
                className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                  {tAuth('phoneLabel')}
                </label>
                <div className="flex gap-2">
                  <Listbox value={selectedPhoneCountry} onChange={(c) => {
                    setSelectedPhoneCountry(c)
                    setFormData({ ...formData, phoneCode: c.dialCode })
                  }}>
                    <div className="relative">
                      <Listbox.Button className="h-[52px] flex items-center justify-center gap-2 px-3 border-2 border-brand-sky/20 hover:border-brand-orange/30 rounded-xl bg-white/50 dark:bg-brand-navy/50 transition-all outline-none">
                        <Icon icon={selectedPhoneCountry.flag} className="text-2xl pt-1" />
                        <span className="text-xs font-bold pt-1">{selectedPhoneCountry.dialCode}</span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-[110px] overflow-auto rounded-xl bg-white dark:bg-brand-navy-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {countries.map((country, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-2 ${
                                  active ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-navy dark:text-white'
                                }`
                              }
                              value={country}
                            >
                              <div className="flex items-center gap-2">
                                <Icon icon={country.flag} className="text-xl" />
                                <span className="text-xs font-bold">{country.dialCode}</span>
                              </div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder={tAuth('phonePlaceholder')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-[52px] px-4 text-base text-brand-navy bg-white/50 dark:bg-brand-navy/50 dark:text-white border-2 border-brand-sky/20 hover:border-brand-orange/30 rounded-xl transition-all outline-none placeholder:text-brand-navy/40 dark:placeholder:text-white/40 focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                  {tAuth('countryLabel')}
                </label>
                <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                  <div className="relative">
                    <Listbox.Button className="w-full h-[52px] flex items-center gap-3 px-4 border-2 border-brand-sky/20 hover:border-brand-orange/30 rounded-xl bg-white/50 dark:bg-brand-navy/50 transition-all outline-none text-start pr-10">
                      {selectedCountry ? (
                        <>
                          <Icon icon={selectedCountry.flag} className="text-xl" />
                          <span className="text-sm truncate pt-1">{selectedCountry.code3}</span>
                        </>
                      ) : (
                        <span className="text-brand-navy/40 dark:text-white/40 text-sm">{tAuth('countryPlaceholder')}</span>
                      )}
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <Icon icon="solar:alt-arrow-down-linear" className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-brand-navy-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {countries.map((country, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-4 pr-10 ${
                                active ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-navy dark:text-white'
                              }`
                            }
                            value={country}
                          >
                            <div className="flex items-center gap-3">
                              <Icon icon={country.flag} className="text-xl" />
                              <span className="text-sm">{country.code3}</span>
                            </div>
                            {selectedCountry?.code === country.code && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-orange">
                                <Icon icon="solar:check-read-linear" className="h-4 w-4" />
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
          </div>
          
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
          
          <div className='py-1'>
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
            className="w-full mt-4 font-bold text-lg h-12 shadow-soft-hover"
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

        <div className="mt-6 text-center">
          <p className='text-brand-navy/60 dark:text-white/60 text-sm font-medium'>
            {tAuth('alreadyAccount')}{' '}
            <button 
              onClick={onSwitchToLogin}
              className='text-brand-orange hover:text-brand-orange-dark font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded border-b-2 border-brand-orange/20 hover:border-brand-orange'
            >
              {tAuth('signInButton')}
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
