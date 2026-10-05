'use client'

import { useState, useEffect } from 'react'
import { getUnassignedCodes, assignCode } from '@/actions/admin'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'


interface Code {
  id: string
  code: string | null
}

export function AssignCodeDropdown({ userId }: { userId: string }) {
  const [codes, setCodes] = useState<Code[]>([])
  const [selectedCodeId, setSelectedCodeId] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  const t = useTranslations('admin')


  useEffect(() => {
    async function loadCodes() {
      setLoading(true)
      try {
        const data = await getUnassignedCodes()
        setCodes(data as unknown as Code[])
      } catch (error) {
        console.error('Failed to load unassigned codes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCodes()
  }, [])

  async function handleAssign() {
    if (!selectedCodeId) return
    setIsAssigning(true)
    try {
      await assignCode(selectedCodeId, userId)
      // Refresh the list after assignment
      const data = await getUnassignedCodes()
      setCodes(data as unknown as Code[])
      setSelectedCodeId('')
    } catch (error) {
      console.error('Failed to assign code:', error)
    } finally {
      setIsAssigning(false)
    }
  }

  if (loading) return <div className="flex items-center gap-2 text-xs text-brand-navy/40 dark:text-white/40"><Icon icon="svg-spinners:ring-resize" /> {t('loading')}</div>

  if (codes.length === 0) return <span className="text-xs text-brand-navy/40 dark:text-white/40 italic">{t('noAvailableCodes')}</span>


  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={selectedCodeId}
          onChange={(e) => setSelectedCodeId(e.target.value)}
          className="appearance-none ps-3 pe-8 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-navy/10 outline-none w-36 text-slate-800 dark:text-white transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
          disabled={isAssigning}
        >
          <option value="" className="bg-white dark:bg-brand-navy-dark">{t('assignCode')}</option>
          {codes.map((code) => (
            <option key={code.id} value={code.id} className="bg-white dark:bg-brand-navy-dark">
              {code.code || t('noRawCode')}
            </option>
          ))}

        </select>
        <div className="absolute inset-inline-end-2 top-1/2 -translate-y-1/2 pointer-events-none text-brand-navy/40 dark:text-white/40">
            <Icon icon="solar:alt-arrow-down-bold" width={12} />
        </div>
      </div>
      
      <button
        onClick={handleAssign}
        disabled={!selectedCodeId || isAssigning}
        className="w-8 h-8 flex items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-brand-gold/10 disabled:hover:text-brand-gold"
      >
        {isAssigning ? <Icon icon="svg-spinners:ring-resize" width={16} /> : <Icon icon="solar:check-read-bold" width={16} />}
      </button>
    </div>
  )
}
