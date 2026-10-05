import { getRiyadaAccessCodes, deleteRiyadaAccessCode } from '@/actions/admin'
import { RiyadaCodeGenerator } from '@/app/components/admin/RiyadaCodeGenerator'
import { CodeDisplay } from '@/app/components/admin/CodeDisplay'
import AdminCard from '@/app/components/admin/AdminCard'
import { Icon } from '@iconify/react'
import { getTranslations } from 'next-intl/server'

import { Pagination } from '@/app/components/admin/Pagination'

interface AccessCodeWithUser {
  id: string
  code: string | null
  codeHash: string
  userId: string | null
  email: string | null
  validityDays: number
  expiresAt: Date
  used: boolean
  createdAt: Date
}

export default async function AdminRiyadaCodesPage({
  searchParams,
}: {
  searchParams: Promise<{
    cursor?: string
    direction?: 'next' | 'prev'
    limit?: string
  }>
}) {
  const resolvedSearchParams = await searchParams
  const cursor = resolvedSearchParams.cursor
  const direction = resolvedSearchParams.direction || 'next'
  const limit = Number(resolvedSearchParams.limit) || 10

  const data = await getRiyadaAccessCodes(limit, cursor, direction as 'next' | 'prev')
  const codes = data.codes as AccessCodeWithUser[]
  const { total, nextCursor, prevCursor } = data
  const t = await getTranslations('admin')

  function getStatus(code: AccessCodeWithUser) {
    if (code.used) return { label: t('used'), class: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', icon: 'solar:check-circle-bold' }
    if (new Date(code.expiresAt) < new Date()) return { label: t('expired'), class: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400', icon: 'solar:close-circle-bold' }
    return { label: t('active'), class: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400', icon: 'solar:shield-check-bold' }
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold font-display text-brand-navy dark:text-white">{t('riyadaCodesTitle')}</h2>
            <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 rounded font-bold uppercase">{t('specialAccess')}</span>
        </div>
        <p className="text-brand-navy/60 dark:text-white/60 text-sm">{t('riyadaCodesDesc')}</p>
      </div>
      
      <RiyadaCodeGenerator />

      <AdminCard className="overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
            <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('accessCode')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('validity')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('expires')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('status')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-end">{t('actions')}</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {codes.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                            {t('noRiyadaCodes')}
                        </td>
                    </tr>
                ) : null}
                {codes.map((code) => {
                const status = getStatus(code)
                return (
                    <tr key={code.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-start">
                        <CodeDisplay codes={code.code} />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium text-start">
                        {code.validityDays} {t('days')}
                    </td>
                    <td className="px-6 py-4 text-slate-400 dark:text-slate-500 font-mono text-xs text-start">
                        {new Date(code.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-start">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg w-fit text-xs font-bold ${status.class}`}>
                            <Icon icon={status.icon} width={14} />
                            {status.label}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-end">
                        <form action={async () => {
                        'use server'
                        await deleteRiyadaAccessCode(code.id)
                        }} className="inline opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors" title={t('deleteCode')}>
                            <Icon icon="solar:trash-bin-trash-bold-duotone" width={18} />
                        </button>
                        </form>
                    </td>
                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>
        <Pagination total={total} currentPageSize={limit} nextCursor={nextCursor} prevCursor={prevCursor} />
      </AdminCard>
    </div>
  )
}
