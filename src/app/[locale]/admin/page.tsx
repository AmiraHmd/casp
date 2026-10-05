import prisma from '@/lib/prisma'
import StatCard from '@/app/components/admin/StatCard'
import AdminCard from '@/app/components/admin/AdminCard'
import { Icon } from '@iconify/react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { AddUserQuickAction } from '@/app/components/admin/AddUserQuickAction'

export default async function AdminDashboard() {
  const t = await getTranslations('admin')
  try {
    const userCount = await prisma.user.count()
    const codeCount = await prisma.accessCode.count()
    const activeCodeCount = await prisma.accessCode.count({ where: { expiresAt: { gt: new Date() } } })

    return (
      <div className="space-y-8">
        <div>
           <h2 className="text-3xl font-bold font-display text-brand-navy dark:text-white mb-2">{t('overview')}</h2>
           <p className="text-brand-navy/60 dark:text-white/60">{t('welcome')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title={t('totalUsers')} 
            value={userCount} 
            icon="solar:users-group-rounded-bold-duotone" 
            color="blue"
            trend={{ value: 12, label: t('vsLastMonth'), isPositive: true }}
          />
          
          <StatCard 
            title={t('totalCodes')} 
            value={codeCount} 
            icon="solar:key-square-bold-duotone" 
            color="purple"
            trend={{ value: 5, label: t('newThisWeek'), isPositive: true }}
          />

          <StatCard 
            title={t('activeCodes')} 
            value={activeCodeCount} 
            icon="solar:shield-check-bold-duotone" 
            color="green"
            trend={{ value: 98, label: t('activeRate'), isPositive: true }}
          />
        </div>

        {/* Recent Activity / Quick Actions Section Placeholder */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('quickActions')}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <AddUserQuickAction label={t('addUser')} />
                    <Link href="/admin/codes" className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors flex flex-col items-center justify-center gap-2 group border border-orange-100 dark:border-orange-800">
                         <div className="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                             <Icon icon="solar:ticket-sale-bold-duotone" width={20} />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-white text-sm">{t('generateCode')}</span>
                    </Link>
                </div>
            </AdminCard>

             <AdminCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('systemStatus')}</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                         <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                             <span className="font-medium text-green-700 dark:text-green-400">{t('dbOptimized')}</span>
                         </div>
                         <Icon icon="solar:check-circle-bold" className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                         <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <span className="font-medium text-blue-700 dark:text-blue-400">{t('backupsActive')}</span>
                         </div>
                         <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{t('every24h')}</span>
                    </div>
                </div>
            </AdminCard>
         </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to load admin dashboard:', error)
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-xl">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Dashboard</h2>
        <p className="text-red-600">There was an issue fetching the dashboard data. Please check your database connection.</p>
        <div className="mt-6 flex gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
             <h3 className="text-gray-500 font-medium text-sm">Total Users</h3>
             <p className="text-2xl font-bold mt-1">--</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
             <h3 className="text-gray-500 font-medium text-sm">Access Codes</h3>
             <p className="text-2xl font-bold mt-1">--</p>
          </div>
        </div>
      </div>
    )
  }
}
