'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

import { Suspense } from 'react'

interface PaginationProps {
  total: number
  currentPageSize: number
  nextCursor?: string
  prevCursor?: string
}

function PaginationContent({ total, currentPageSize, nextCursor, prevCursor }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('admin')

  const createCursorURL = (cursor: string, direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('cursor', cursor)
    params.set('direction', direction)
    return `${pathname}?${params.toString()}`
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', e.target.value)
    params.delete('cursor')
    params.delete('direction')
    router.push(`${pathname}?${params.toString()}`)
  }

  if (total <= 0) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700 gap-4">
      <div className="flex flex-1 justify-between sm:hidden w-full">
        <button
          onClick={() => prevCursor && router.push(createCursorURL(prevCursor, 'prev'))}
          disabled={!prevCursor}
          className="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('previous') || 'Previous'}
        </button>
        <button
          onClick={() => nextCursor && router.push(createCursorURL(nextCursor, 'next'))}
          disabled={!nextCursor}
          className="relative ms-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('next') || 'Next'}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row flex-1 items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-700 dark:text-slate-400">
            {t('total') || 'Total'}: <span className="font-semibold text-slate-900 dark:text-white">{total}</span>
          </p>
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4">
             <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{t('itemsPerPage') || 'Items per page:'}</span>
             <select 
                value={currentPageSize} 
                onChange={handleSizeChange}
                className="bg-white border text-sm rounded-lg focus:ring-brand-navy focus:border-brand-navy block p-2 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-brand-navy dark:focus:border-brand-navy text-slate-900 shadow-sm"
             >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
             </select>
          </div>
        </div>
        <div>
          <nav className="isolate inline-flex flex-row-reverse sm:flex-row -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => prevCursor && router.push(createCursorURL(prevCursor, 'prev'))}
              disabled={!prevCursor}
              className="relative inline-flex items-center rounded-s-md px-3 py-2 text-slate-700 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium gap-2"
            >
              <Icon icon="solar:alt-arrow-left-line-duotone" className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {t('previous') || 'Previous'}
            </button>
            <button
              onClick={() => nextCursor && router.push(createCursorURL(nextCursor, 'next'))}
              disabled={!nextCursor}
              className="relative inline-flex items-center rounded-e-md px-3 py-2 text-slate-700 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium gap-2 rtl:border-r-0 border-l-0 rtl:border-l"
            >
              {t('next') || 'Next'}
              <Icon icon="solar:alt-arrow-right-line-duotone" className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-[73px] flex items-center justify-center px-6 py-4 border-t border-slate-200 dark:border-slate-700">Loading pagination...</div>}>
      <PaginationContent {...props} />
    </Suspense>
  )
}
