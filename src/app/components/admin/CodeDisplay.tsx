'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'


interface CodeDisplayProps {
  codes?: string[] | string | null
}

export function CodeDisplay({ codes }: CodeDisplayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations('admin')


  const codeList = Array.isArray(codes) 
    ? codes 
    : typeof codes === 'string' 
      ? [codes] 
      : []

  if (codeList.length === 0) {
    return <span className="text-brand-navy/40 dark:text-white/40 font-mono text-xs">---</span>
  }

  return (
    <div className="flex items-start gap-2 pt-1">
      <div className="flex flex-col gap-1">
        {codeList.map((code, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`font-mono text-sm ${isVisible ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400 tracking-widest'}`}>
               {isVisible ? code : '••••••'}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white"
        title={isVisible ? t('hideCode') : t('showCode')}
      >

        <Icon icon={isVisible ? "solar:eye-closed-bold" : "solar:eye-bold"} width={16} />
      </button>
    </div>
  )
}
