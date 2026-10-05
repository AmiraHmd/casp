'use client'
import { useState, useRef, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { HeaderItem } from '../../../../types/menu'
import { motion, AnimatePresence } from 'framer-motion'
import MegaMenu from './MegaMenu'

type Props = {
  item: HeaderItem
  depth?: number
  onBookAccessClick?: () => void
  onBookVerifyClick?: (redirectUrl: string, series: string) => void
}

const HeaderLink = ({ item, depth = 0, onBookAccessClick, onBookVerifyClick }: Props) => {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const path = usePathname()
  const hasSubmenu = !!item.submenu?.length

  // Conditionally trigger mega menu logic only on top level nav items that have submenus.
  const useMegaMenu = depth === 0 && hasSubmenu

  useEffect(() => {
    if (pinned) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setPinned(false)
          setOpen(false)
        }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
    }
  }, [pinned])

  const handleClick = (e: React.MouseEvent) => {
    if (item.href === '/book-access' && onBookAccessClick) {
      e.preventDefault()
      onBookAccessClick()
      setOpen(false)
    } else if (item.isCurricula) {
      e.preventDefault()
      setPinned(true)
      setOpen(true)
    }
  }

  const isActive = path === item.href || (item.href !== '/' && path.startsWith(`${item.href}/`))

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => hasSubmenu && setOpen(true)}
      onMouseLeave={() => {
        if (hasSubmenu && !pinned) setOpen(false)
      }}
    >
      <Link
        href={item.href}
        onClick={handleClick}
        className={`text-lg flex items-center gap-0.5 font-semibold rounded-lg px-3 py-2 transition-colors ${isActive
          ? 'text-brand-orange bg-brand-orange/10'
          : 'text-brand-navy dark:text-white/90 hover:text-brand-orange hover:bg-brand-sky/10'
          }`}
        aria-haspopup={hasSubmenu || undefined}
        aria-expanded={hasSubmenu ? open : undefined}
      >
        {item.label}
        {hasSubmenu && (
          <svg
            width="1em"
            height="1em"
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      <AnimatePresence>
        {open && hasSubmenu && (
          useMegaMenu ? (
            <MegaMenu
              item={item}
              onClose={() => setOpen(false)}
              onBookAccessClick={onBookAccessClick}
              onBookVerifyClick={onBookVerifyClick}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className={`absolute ${depth > 0 ? 'start-full top-0' : 'start-0 mt-2'
                } w-64 bg-white dark:bg-brand-navy-dark rounded-xl shadow-soft-lg border border-brand-sky/20 z-50`}
              role="menu"
            >
              {item.submenu!.map((child, index) => (
                <HeaderLink
                  key={`${child.href}-${index}`}
                  item={child}
                  depth={depth + 1}
                  onBookAccessClick={onBookAccessClick}
                />
              ))}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeaderLink
