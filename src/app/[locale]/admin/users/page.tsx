import { getUsers, deleteUser, updateUserRole } from '@/actions/admin'
import { AssignCodeDropdown } from '@/app/components/admin/AssignCodeDropdown'
import { CodeDisplay } from '@/app/components/admin/CodeDisplay'
import AdminCard from '@/app/components/admin/AdminCard'
import { Icon } from '@iconify/react'
import { getTranslations } from 'next-intl/server'

import { Pagination } from '@/app/components/admin/Pagination'
import { TableSearch } from '@/app/components/admin/TableSearch'
import { AddUserButton } from '@/app/components/admin/AddUserButton'
import { UserDetailsButton } from '@/app/components/admin/UserDetailsButton'

export default async function AdminUsersPage({
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
  
  const { users, total, nextCursor, prevCursor } = await getUsers(limit, searchStr, cursor, direction as 'next' | 'prev')
  const t = await getTranslations('admin')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold font-display text-brand-navy dark:text-white">{t('userManagement')}</h2>
            <p className="text-brand-navy/60 dark:text-white/60 text-sm">{t('manageUsersDesc')}</p>
        </div>

        <div className="flex gap-3">
             <AddUserButton label={t('addUser')} />
        </div>
      </div>

      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <TableSearch />
      </div>

      <AdminCard className="overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
            <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('name')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('email')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('role')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('accessCode')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-s border-slate-200 dark:border-slate-700 text-start">{t('assignNew')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">{t('created')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-end">{t('actions')}</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-6 py-4 text-start">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-400">
                                {user.firstName.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-white">{user.firstName} {user.lastName}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium text-start">
                    {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        user.role === 'ADMIN' 
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800' 
                        : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                    }`}>
                        {user.role}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-start">
                    <CodeDisplay codes={user.accessCodes?.map(c => c.code).filter(Boolean) as string[]} />
                    </td>
                    <td className="px-6 py-4 text-sm border-s border-slate-200 dark:border-slate-700 text-start">
                    <AssignCodeDropdown userId={user.id} />
                    </td>

                    <td className="px-6 py-4 text-slate-400 dark:text-slate-500 font-mono text-xs text-start">
                    {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-end space-x-2">

                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <UserDetailsButton user={user} />
                            <form action={async () => {
                                'use server'
                                await updateUserRole(user.id, user.role === 'ADMIN' ? 'USER' : 'ADMIN')
                            }} className="inline">
                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-white transition-colors" title={user.role === 'ADMIN' ? t('demote') : t('promote')}>
                                    <Icon icon={user.role === 'ADMIN' ? "solar:user-minus-bold-duotone" : "solar:user-id-bold-duotone"} width={18} />
                                </button>

                            </form>
                            <form action={async () => {
                                'use server'
                                await deleteUser(user.id)
                            }} className="inline">
                                <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors" title={t('deleteUser')}>
                                    <Icon icon="solar:trash-bin-trash-bold-duotone" width={18} />
                                </button>

                            </form>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <Pagination total={total} currentPageSize={limit} nextCursor={nextCursor} prevCursor={prevCursor} />
      </AdminCard>
    </div>
  )
}
