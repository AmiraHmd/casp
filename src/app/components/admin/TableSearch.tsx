'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useTransition, useState, useEffect, Suspense } from 'react'
import { useDebounce } from 'use-debounce'

function TableSearchContent({ placeholder }: { placeholder?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('admin')

  const initialSearch = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm)
      params.delete('cursor')
      params.delete('direction')
    } else {
      params.delete('search')
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [debouncedSearchTerm, pathname, router, searchParams])

  return (
    <div className="relative flex flex-1 max-w-sm">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Icon icon="solar:magnifer-linear" className="w-5 h-5 text-slate-400 dark:text-slate-500" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full p-2.5 ps-10 text-sm text-slate-900 border border-slate-300 rounded-xl bg-white focus:ring-brand-navy focus:border-brand-navy dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-brand-gold dark:focus:border-brand-gold outline-none transition-colors shadow-sm"
        placeholder={placeholder || t('searchCodeOrEmail') || 'Search by name or email...'}
      />
      {isPending && (
         <div className="absolute inset-y-0 end-0 flex items-center pe-3">
             <Icon icon="solar:spinner-linear" className="w-5 h-5 text-brand-navy dark:text-brand-gold animate-spin" />
         </div>
      )}
    </div>
  )
}

export function TableSearch(props: { placeholder?: string }) {
  return (
    <Suspense fallback={<div className="h-10 w-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
      <TableSearchContent {...props} />
    </Suspense>
  )
}
