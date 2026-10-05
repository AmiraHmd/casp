'use client';
import { useState } from 'react'
import { generateRiyadaAccessCode } from '@/actions/admin'
import AdminCard from './AdminCard'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

export function RiyadaCodeGenerator() {
  const [validityDays, setValidityDays] = useState(1)
  const [rawCode, setRawCode] = useState('')
  const [loading, setLoading] = useState(false)
  const t = useTranslations('admin')

  async function handleGenerate() {
    setLoading(true)
    try {
      const res = await generateRiyadaAccessCode({ validityDays })
      setRawCode(res.rawCode)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminCard className="p-6 mb-8 border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Icon icon="solar:magic-stick-3-bold-duotone" width={24} />
          </div>
          <div>
              <h3 className="text-lg font-bold font-display flex items-center gap-2 text-slate-800 dark:text-white">
                {t('riyadaGeneratorTitle')}
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 px-2 flex items-center rounded text-center tracking-widest font-black uppercase">{t('special')}</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('riyadaGeneratorDesc')}</p>
          </div>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ps-1">{t('validityPeriod')}</label>
          <div className="relative">
            <select 
                value={validityDays} 
                onChange={(e) => setValidityDays(Number(e.target.value))}
                className="w-full appearance-none p-3 ps-4 pe-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-slate-800 dark:text-white font-medium transition-all"
            >
                <option value={1}>{t('duration1Day')}</option>
                <option value={2}>{t('duration2Days')}</option>
                <option value={7}>{t('duration1Week')}</option>
                <option value={10}>{t('duration10Days')}</option>
                <option value={30}>{t('duration30Days')}</option>
                <option value={365}>{t('duration1Year')}</option>
            </select>
            <div className="absolute inset-inline-end-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Icon icon="solar:alt-arrow-down-bold" />
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="h-[46px] px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 whitespace-nowrap"
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
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md shrink-0">
                  <Icon icon="solar:key-bold" width={20} />
              </div>
              <div>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-0.5">{t('newCodeGenerated')}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{t('riyadaCodeDistributeDesc')}</p>
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
