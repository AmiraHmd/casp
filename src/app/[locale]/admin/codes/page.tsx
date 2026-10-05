import { getAccessCodes, deleteAccessCode } from '@/actions/admin'
import { CodeGenerator } from '@/app/components/admin/CodeGenerator'
import { CodeDisplay } from '@/app/components/admin/CodeDisplay'
import AdminCard from '@/app/components/admin/AdminCard'
import { Icon } from '@iconify/react'
import { getTranslations } from 'next-intl/server'

import { Pagination } from '@/app/components/admin/Pagination'
import { TableSearch } from '@/app/components/admin/TableSearch'

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
  user: {
    firstName: string
    lastName: string
    email: string
  } | null
}

export default async function AdminCodesPage({
  searchParams,
}: {
  searchParams: Promise<{
    cursor?: string
    direction?: 'next' | 'prev'
    limit?: string
    search?: string
  }>
}) {
  const resolvedSearchParams = await searchParams
  const cursor = resolvedSearchParams.cursor
  const direction = resolvedSearchParams.direction || 'next'
  const limit = Number(resolvedSearchParams.limit) || 5
  const searchStr = resolvedSearchParams.search || ''

  const data = await getAccessCodes(limit, searchStr, cursor, direction as 'next' | 'prev')
  const codes = data.codes as AccessCodeWithUser[]
  const { total, nextCursor, prevCursor } = data
  const t = await getTranslations('admin')

  function getStatus(code: AccessCodeWithUser) {
    if (code.used) return { label: t('used'), class: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', icon: 'solar:check-circle-bold' }
    if (new Date(code.expiresAt) < new Date()) return { label: t('expired'), class: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400', icon: 'solar:close-circle-bold' }
    return { label: t('active'), class: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400', icon: 'solar:shield-check-bold' }
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-display text-brand-navy dark:text-white mb-1">{t('accessCodes')}</h2>
        <p className="text-brand-navy/60 dark:text-white/60 text-sm">{t('accessCodesDesc')}</p>
      </div>

      
      <CodeGenerator />

      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <TableSearch placeholder={t('searchCodeOrEmail') || 'Search access code, email, name...'} />
      </div>

      <AdminCard className="overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
            <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('accessCode')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('assignedTo')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('validity')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('expires')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('status')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-end">{t('actions')}</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {codes.map((code) => {
                const status = getStatus(code)
                return (
                    <tr key={code.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-start">
                        <CodeDisplay codes={code.code} />
                    </td>
                    <td className="px-6 py-4 text-sm text-start">
                        {code.user ? (
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-800 dark:text-white">{code.user.firstName} {code.user.lastName}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{code.user.email}</span>
                            </div>
                        ) : (
                            <span className={`text-xs px-2 py-0.5 rounded-lg ${code.email ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                {code.email || t('unassigned')}
                            </span>
                        )}
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
                        await deleteAccessCode(code.id)
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
