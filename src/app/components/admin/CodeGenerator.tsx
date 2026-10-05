"use client";
import { useState } from 'react'
import { generateAccessCode } from '@/actions/admin'
import AdminCard from './AdminCard'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'


export function CodeGenerator() {
  const [validityDays, setValidityDays] = useState(1)
  const [email, setEmail] = useState('')
  const [rawCode, setRawCode] = useState('')
  const [loading, setLoading] = useState(false)
  const t = useTranslations('admin')


  async function handleGenerate() {
    setLoading(true)
    try {
      const res = await generateAccessCode({ validityDays, email })
      setRawCode(res.rawCode)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminCard className="p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-white flex items-center justify-center text-white dark:text-brand-navy shadow-md">
              <Icon icon="solar:magic-stick-3-bold-duotone" width={24} />
          </div>
          <div>
              <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">{t('generateAccessCode')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('createTokensDesc')}</p>
          </div>

      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ps-1">{t('validityPeriod')}</label>

          <div className="relative">
            <select 
                value={validityDays} 
                onChange={(e) => setValidityDays(Number(e.target.value))}
                className="w-full appearance-none p-3 ps-4 pe-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-navy/10 outline-none text-slate-800 dark:text-white font-medium transition-all"
            >
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={7}>1 Week</option>
                <option value={10}>10 Days</option>
                <option value={30}>30 Days</option>
                <option value={365}>1 Year</option>
            </select>
            <div className="absolute inset-inline-end-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Icon icon="solar:alt-arrow-down-bold" />
            </div>
          </div>
        </div>
        
        <div className="flex-2 min-w-[250px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ps-1">{t('assignToEmail')}</label>

          <div className="relative">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full p-3 ps-8 pe-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-navy/10 outline-none text-slate-800 dark:text-white placeholder:text-slate-400 transition-all"
            />

            <div className="absolute mx-2 inset-inline-end-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center">
              <Icon icon="solar:letter-bold" width={18} />
            </div>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="h-[46px] px-6 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-brand-navy font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? (
              <>
                <Icon icon="svg-spinners:ring-resize" />
                <span>{t('generating')}</span>
              </>
          ) : (
              <>
                <Icon icon="solar:bolt-bold" />
                <span>{t('generateCode')}</span>
              </>
          )}

        </button>
      </div>

      {rawCode && (
        <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md shrink-0">
                  <Icon icon="solar:key-bold" width={20} />
              </div>
              <div>
                  <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider mb-0.5">{t('newCodeGenerated')}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{t('saveCodeWarning')}</p>
              </div>

          </div>
          <code className="px-4 py-2 rounded-lg bg-white dark:bg-black/20 text-xl font-mono text-slate-800 dark:text-white font-bold tracking-widest border border-slate-200 dark:border-slate-700 shadow-inner">
              {rawCode}
          </code>
        </div>
      )}
    </AdminCard>
  )
}
