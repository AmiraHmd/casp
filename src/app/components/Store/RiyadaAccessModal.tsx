'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

interface RiyadaAccessModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function RiyadaAccessModal({ isOpen, closeModal }: RiyadaAccessModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('RiyadaBook');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/verify-riyada-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t('welcome'));
        router.push('/store/riyadabook');
        closeModal();
        setCode('');
      } else {
        const errorMsg = data.error === 'expired' ? t('expired') : data.error === 'invalid' ? t('invalid') : t('errorGeneric');
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError(t('errorNetwork'));
      toast.error(t('errorNetwork'));
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide error after 10 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-brand-navy/40 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-[2.5rem] bg-white/90 dark:bg-brand-navy/95 backdrop-blur-xl p-0 text-left align-middle shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all border border-white/20 dark:border-white/10 ring-1 ring-black/5">
                
                {/* Decorative Header Background */}
                <div className="relative h-40 bg-gradient-to-br from-emerald-600 to-emerald-800 overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/20"></div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-10 left-10 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl"></div>
                    
                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none mix-blend-overlay"></div>
                    
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-md border border-white/20 rtl:right-auto rtl:left-6 group"
                    >
                        <Icon icon="solar:close-circle-bold" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-400/40 rounded-3xl blur-xl animate-pulse"></div>
                            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 to-emerald-200 p-0.5 flex items-center justify-center shadow-2xl">
                                <div className="w-full h-full rounded-[1.4rem] bg-emerald-800 flex items-center justify-center text-emerald-400">
                                    <Icon icon="solar:book-bookmark-bold-duotone" className="text-4xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-10 pb-10 pt-6">
                  <div className="text-center mb-8">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-extrabold text-brand-navy dark:text-white mb-3"
                    >
                      {t('title')}
                    </Dialog.Title>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base max-w-sm mx-auto">
                      {t('description')}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 animate-in shake duration-300">
                      <Icon icon="solar:danger-circle-bold" className="text-xl shrink-0" />
                      <span className="text-sm font-bold">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                      {/* Code Field */}
                      <div className="space-y-2">
                        <label htmlFor="code" className="block text-sm font-bold text-brand-navy/70 dark:text-white/70 ml-1 rtl:mr-1 rtl:ml-0">
                          {t('codeLabel')}
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-4 rtl:pl-0 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <Icon icon="solar:key-bold-duotone" className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="code"
                            required
                            className="block w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-white/10 rounded-2xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all outline-none dark:text-white rtl:pl-4 rtl:pr-12 text-base font-medium placeholder:text-gray-400 dark:placeholder:text-white/20"
                            placeholder={t('codePlaceholder')}
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value);
                              if (error) setError(null);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative overflow-hidden group h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-lg transition-all shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <Icon icon="eos-icons:loading" className="w-6 h-6 animate-spin" />
                              {t('sending')}
                            </>
                          ) : (
                            <>
                              {t('verify')}
                              <Icon icon="solar:round-alt-arrow-right-bold" className="w-6 h-6 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Info Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5">
                        <Icon icon="solar:clock-circle-bold" className="text-emerald-500 w-4 h-4" />
                        <span>{t('expiryNote')}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5">
                        <Icon icon="solar:forbidden-circle-bold" className="text-red-400 w-4 h-4" />
                        <span>{t('noDownloads')}</span>
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
