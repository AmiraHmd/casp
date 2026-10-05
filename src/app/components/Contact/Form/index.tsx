'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Icon } from '@iconify/react/dist/iconify.js'

const ContactForm = () => {
  const t = useTranslations('contact')
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    Message: '',
  })
  const [showThanks, setShowThanks] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ''
    )
    setIsFormValid(isValid)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const reset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phnumber: '',
      Message: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)

    // FormSubmit integration (keeping original logic but improving feedback)
    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@centerarabic.com', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          Name: `${formData.firstname} ${formData.lastname}`,
          Email: formData.email,
          Phone: formData.phnumber,
          Message: formData.Message,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setShowThanks(true)
        reset()
        setTimeout(() => setShowThanks(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoader(false)
    }
  }

  return (
    <section id='contact' className='py-20 bg-brand-sky/5 dark:bg-brand-navy-dark transition-colors duration-300'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='relative bg-white dark:bg-brand-navy/50 rounded-[3rem] p-8 md:p-16 shadow-soft dark:shadow-none border border-brand-sky/20 dark:border-white/10 backdrop-blur-sm transition-all duration-300'>
          <div className='max-w-3xl mb-12'>
            <h2 className='text-3xl md:text-5xl font-extrabold text-brand-navy dark:text-white mb-4 tracking-tight'>
              {t('title')}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-2'>
              <label htmlFor='fname' className='text-sm font-bold text-brand-navy/60 dark:text-white/60 ms-2 uppercase tracking-wider'>
                {t('firstName')}
              </label>
              <input
                id='fname'
                type='text'
                name='firstname'
                value={formData.firstname}
                onChange={handleChange}
                placeholder={t('placeholderFirstName')}
                className='w-full text-lg px-6 rounded-2xl py-4 bg-brand-sky/5 dark:bg-white/5 border-2 border-transparent transition-all duration-300 focus:border-brand-orange focus:bg-white dark:focus:bg-white/10 text-brand-navy dark:text-white outline-none'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='lname' className='text-sm font-bold text-brand-navy/60 ms-2 uppercase tracking-wider'>
                {t('lastName')}
              </label>
              <input
                id='lname'
                type='text'
                name='lastname'
                value={formData.lastname}
                onChange={handleChange}
                placeholder={t('placeholderLastName')}
                className='w-full text-lg px-6 rounded-2xl py-4 bg-brand-sky/5 border-2 border-transparent transition-all duration-300 focus:border-brand-orange focus:bg-white outline-none'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-bold text-brand-navy/60 ms-2 uppercase tracking-wider'>
                {t('email')}
              </label>
              <input
                id='email'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder={t('placeholderEmail')}
                className='w-full text-lg px-6 rounded-2xl py-4 bg-brand-sky/5 border-2 border-transparent transition-all duration-300 focus:border-brand-orange focus:bg-white outline-none'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='phnumber' className='text-sm font-bold text-brand-navy/60 ms-2 uppercase tracking-wider'>
                {t('phone')}
              </label>
              <input
                id='phnumber'
                type='tel'
                name='phnumber'
                value={formData.phnumber}
                onChange={handleChange}
                placeholder={t('placeholderPhone')}
                className='w-full text-lg px-6 rounded-2xl py-4 bg-brand-sky/5 border-2 border-transparent transition-all duration-300 focus:border-brand-orange focus:bg-white outline-none'
                required
              />
            </div>

            <div className='md:col-span-2 space-y-2'>
              <label htmlFor='message' className='text-sm font-bold text-brand-navy/60 ms-2 uppercase tracking-wider'>
                {t('message')}
              </label>
              <textarea
                id='message'
                name='Message'
                rows={5}
                value={formData.Message}
                onChange={handleChange}
                placeholder={t('placeholderMessage')}
                className='w-full text-lg px-6 rounded-2xl py-4 bg-brand-sky/5 border-2 border-transparent transition-all duration-300 focus:border-brand-orange focus:bg-white outline-none resize-none'
                required
              ></textarea>
            </div>

            <div className='md:col-span-2 pt-4'>
              <button
                type='submit'
                disabled={!isFormValid || loader}
                className={`group flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl 
                  ${
                    !isFormValid || loader
                      ? 'bg-brand-sky/20 text-brand-navy/30 cursor-not-allowed shadow-none'
                      : 'bg-brand-orange text-white hover:bg-brand-orange-dark hover:shadow-brand-orange/30 active:scale-95'
                  }`}>
                {loader ? (
                  <Icon icon='line-md:loading-twotone-loop' className='text-2xl' />
                ) : (
                  <>
                    {t('submit')}
                    <Icon icon='solar:send-square-linear' className='text-2xl rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1' />
                  </>
                )}
              </button>
            </div>
          </form>

          {showThanks && (
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-brand-navy text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-fade-in-up border-2 border-white/20 backdrop-blur-sm'>
              <Icon icon='solar:check-circle-bold' className='text-3xl text-brand-orange' />
              <p className='font-bold text-lg'>{t('thanks')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
