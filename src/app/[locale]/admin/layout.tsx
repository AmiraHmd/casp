import { ReactNode } from 'react'
import { redirect } from '@/i18n/routing'
import { getSession } from '@/lib/auth'
import AdminSidebar from '@/app/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession()
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect({ href: '/', locale: 'ar' })
    return null
  }

  return (
    <div className="flex min-h-screen mt-20 mb-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      <AdminSidebar />
      
      <main className="flex-1 relative z-10 flex flex-col min-w-0">
        <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </div>
        </div>
      </main>
    </div>
  )
}
