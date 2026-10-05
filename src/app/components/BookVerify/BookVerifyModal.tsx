'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';

interface BookVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The book-reader URL to navigate to after verification. Empty = stay on page. */
  redirectUrl: string;
  /** The series slug (e.g. 'mufid', 'garden', 'wafi') — determines the session cookie scope. */
  series: string;
}

type Step = 'email' | 'code' | 'success';

const i18n = {
  ar: {
    title: 'تحقق من بريدك الإلكتروني',
    subtitle: 'للوصول إلى هذه السلسلة، نحتاج إلى التحقق من هويتك عبر بريدك الإلكتروني.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'example@email.com',
    sendCode: 'إرسال الرمز',
    sending: 'جارٍ الإرسال...',
    codeTitle: 'أدخل رمز التحقق',
    codeSubtitle: (email: string) => `أرسلنا رمز مكوّن من 6 أرقام إلى ${email}`,
    codeLabel: 'رمز التحقق',
    codePlaceholder: '• • • • • •',
    verify: 'تحقق ودخول',
    verifying: 'جارٍ التحقق...',
    changeEmail: 'تغيير البريد الإلكتروني',
    resend: 'إعادة الإرسال',
    successTitle: 'تم التحقق!',
    successBody: 'يمكنك الآن الوصول إلى هذه السلسلة...',
    errors: {
      invalid_email: 'البريد الإلكتروني غير صالح.',
      rate_limited: 'تجاوزت الحد المسموح. يرجى الانتظار 15 دقيقة.',
      invalid: 'الرمز غير صحيح أو منتهي الصلاحية.',
      internal_error: 'حدث خطأ. يرجى المحاولة لاحقاً.',
      network: 'خطأ في الاتصال. تحقق من الإنترنت.',
    },
    expiry: 'يصلح الرمز لمدة 15 دقيقة',
    noDownloads: 'لا يمكن تنزيل الكتاب',
    validity: 'الوصول صالح 24 ساعة',
  },
  fr: {
    title: 'Vérifiez votre email',
    subtitle: 'Pour accéder à cette série, nous devons vérifier votre identité par email.',
    emailLabel: 'Adresse email',
    emailPlaceholder: 'exemple@email.com',
    sendCode: 'Envoyer le code',
    sending: 'Envoi en cours...',
    codeTitle: 'Saisissez le code',
    codeSubtitle: (email: string) => `Nous avons envoyé un code à 6 chiffres à ${email}`,
    codeLabel: 'Code de vérification',
    codePlaceholder: '• • • • • •',
    verify: 'Vérifier et accéder',
    verifying: 'Vérification...',
    changeEmail: "Changer d'email",
    resend: 'Renvoyer',
    successTitle: 'Vérifié !',
    successBody: 'Accès à la série accordé...',
    errors: {
      invalid_email: 'Adresse email invalide.',
      rate_limited: 'Trop de tentatives. Attendez 15 minutes.',
      invalid: 'Code incorrect ou expiré.',
      internal_error: 'Une erreur est survenue. Réessayez plus tard.',
      network: 'Erreur réseau. Vérifiez votre connexion.',
    },
    expiry: 'Code valable 15 minutes',
    noDownloads: 'Téléchargement non autorisé',
    validity: 'Accès valide 24 heures',
  },
  en: {
    title: 'Verify your email',
    subtitle: 'To access this series, we need to verify your identity via email.',
    emailLabel: 'Email address',
    emailPlaceholder: 'example@email.com',
    sendCode: 'Send code',
    sending: 'Sending...',
    codeTitle: 'Enter the code',
    codeSubtitle: (email: string) => `We sent a 6-digit code to ${email}`,
    codeLabel: 'Verification code',
    codePlaceholder: '• • • • • •',
    verify: 'Verify & access',
    verifying: 'Verifying...',
    changeEmail: 'Change email',
    resend: 'Resend',
    successTitle: 'Verified!',
    successBody: 'Series access granted...',
    errors: {
      invalid_email: 'Invalid email address.',
      rate_limited: 'Too many attempts. Please wait 15 minutes.',
      invalid: 'Incorrect or expired code.',
      internal_error: 'An error occurred. Please try again later.',
      network: 'Network error. Check your connection.',
    },
    expiry: 'Code valid for 15 minutes',
    noDownloads: 'Downloads not allowed',
    validity: 'Access valid for 24 hours',
  },
};

export default function BookVerifyModal({ isOpen, onClose, redirectUrl, series }: BookVerifyModalProps) {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const t = i18n[locale] ?? i18n.ar;
  const router = useRouter();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset on open/close
  useEffect(() => {
    if (!isOpen) {
      setStep('email');
      setEmail('');
      setCode('');
      setError(null);
      setResendCooldown(0);
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    }
  }, [isOpen]);

  // Error auto-dismiss
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 8000);
    return () => clearTimeout(t);
  }, [error]);

  const startCooldown = () => {
    setResendCooldown(60);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) { clearInterval(cooldownRef.current!); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  const handleSendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book-otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, series }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('code');
        startCooldown();
      } else {
        setError(t.errors[data.error as keyof typeof t.errors] ?? t.errors.internal_error);
      }
    } catch {
      setError(t.errors.network);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book-otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, series }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('success');
        setTimeout(() => {
          onClose();
          if (redirectUrl) {
            router.push(redirectUrl as Parameters<typeof router.push>[0]);
          }
        }, 1200);
      } else {
        setError(t.errors[data.error as keyof typeof t.errors] ?? t.errors.internal_error);
      }
    } catch {
      setError(t.errors.network);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={loading ? () => {} : onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-brand-navy/50 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white/90 dark:bg-brand-navy/95 backdrop-blur-xl p-0 text-left align-middle shadow-[0_20px_60px_rgba(0,0,0,.25)] transition-all border border-white/20 dark:border-white/10">

                {/* Decorative header */}
                <div className="relative h-36 bg-gradient-to-br from-brand-navy via-blue-900 to-brand-navy-light overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-6 left-10 w-20 h-20 bg-brand-sky/20 rounded-full blur-2xl" />
                  {/* Close button */}
                  {!loading && (
                    <button
                      onClick={onClose}
                      className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all backdrop-blur-md border border-white/20"
                    >
                      <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                    </button>
                  )}
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {step === 'success' ? (
                      <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center shadow-2xl animate-bounce">
                        <Icon icon="solar:check-circle-bold" className="text-white text-4xl" />
                      </div>
                    ) : (
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-brand-sky p-0.5 flex items-center justify-center shadow-2xl">
                        <div className="w-full h-full rounded-[1.1rem] bg-brand-navy flex items-center justify-center text-blue-400">
                          <Icon icon={step === 'email' ? 'solar:letter-bold-duotone' : 'solar:shield-keyhole-bold-duotone'} className="text-3xl" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-8 pb-8 pt-6">
                  {/* Error */}
                  {error && (
                    <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                      <Icon icon="solar:danger-circle-bold" className="text-lg shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* ── STEP: EMAIL ── */}
                  {step === 'email' && (
                    <>
                      <div className="text-center mb-6">
                        <Dialog.Title as="h3" className="text-2xl font-extrabold text-brand-navy dark:text-white mb-2">
                          {t.title}
                        </Dialog.Title>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.subtitle}</p>
                      </div>
                      <form onSubmit={handleSendCode} className="space-y-5">
                        <div className="space-y-1.5">
                          <label htmlFor="bv-email" className="block text-sm font-bold text-brand-navy/70 dark:text-white/70">
                            {t.emailLabel}
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                              <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                            </div>
                            <input
                              id="bv-email"
                              type="email"
                              required
                              dir="ltr"
                              className="block w-full ps-12 pe-4 py-3.5 border border-gray-200 dark:border-white/10 rounded-2xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 outline-none dark:text-white text-base font-medium placeholder:text-gray-400 transition-all"
                              placeholder={t.emailPlaceholder}
                              value={email}
                              onChange={(e) => { setEmail(e.target.value); setError(null); }}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <><Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />{t.sending}</>
                          ) : (
                            <><Icon icon="solar:letter-send-bold" className="w-5 h-5" />{t.sendCode}</>
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  {/* ── STEP: CODE ── */}
                  {step === 'code' && (
                    <>
                      <div className="text-center mb-6">
                        <Dialog.Title as="h3" className="text-2xl font-extrabold text-brand-navy dark:text-white mb-2">
                          {t.codeTitle}
                        </Dialog.Title>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.codeSubtitle(email)}</p>
                      </div>
                      <form onSubmit={handleVerifyCode} className="space-y-5">
                        <div className="space-y-1.5">
                          <label htmlFor="bv-code" className="block text-sm font-bold text-brand-navy/70 dark:text-white/70">
                            {t.codeLabel}
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                              <Icon icon="solar:key-bold-duotone" className="w-5 h-5" />
                            </div>
                            <input
                              id="bv-code"
                              type="text"
                              required
                              inputMode="numeric"
                              maxLength={6}
                              autoFocus
                              dir="ltr"
                              className="block w-full ps-12 pe-4 py-3.5 border border-gray-200 dark:border-white/10 rounded-2xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 outline-none dark:text-white text-2xl font-mono tracking-widest text-center placeholder:text-gray-400 transition-all"
                              placeholder={t.codePlaceholder}
                              value={code}
                              onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(null); }}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={loading || code.length < 6}
                          className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <><Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />{t.verifying}</>
                          ) : (
                            <><Icon icon="solar:shield-check-bold" className="w-5 h-5" />{t.verify}</>
                          )}
                        </button>
                        {/* Change email / resend */}
                        <div className="flex items-center justify-between text-sm pt-1">
                          <button type="button" onClick={() => { setStep('email'); setCode(''); setError(null); }} className="text-gray-500 hover:text-brand-navy dark:hover:text-white transition-colors font-medium">
                            ← {t.changeEmail}
                          </button>
                          <button
                            type="button"
                            disabled={resendCooldown > 0 || loading}
                            onClick={() => handleSendCode()}
                            className="text-blue-500 hover:text-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {resendCooldown > 0 ? `${t.resend} (${resendCooldown}s)` : t.resend}
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  {/* ── STEP: SUCCESS ── */}
                  {step === 'success' && (
                    <div className="text-center py-4">
                      <h3 className="text-2xl font-extrabold text-green-600 dark:text-green-400 mb-2">{t.successTitle}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
                        <Icon icon="eos-icons:loading" className="w-4 h-4 animate-spin" />
                        {t.successBody}
                      </p>
                    </div>
                  )}

                  {/* Info badges (not on success) */}
                  {step !== 'success' && (
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5">
                        <Icon icon="solar:clock-circle-bold" className="text-blue-400 w-3.5 h-3.5" />
                        <span>{t.expiry}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5">
                        <Icon icon="solar:shield-check-bold" className="text-green-400 w-3.5 h-3.5" />
                        <span>{t.validity}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/5">
                        <Icon icon="solar:forbidden-circle-bold" className="text-red-400 w-3.5 h-3.5" />
                        <span>{t.noDownloads}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
