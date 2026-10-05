'use client'
import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { HeaderItem } from '../../../../types/menu'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

type Props = {
  item: HeaderItem
  depth?: number
  onClick?: () => void
  onBookAccessClick?: () => void
  onBookVerifyClick?: (redirectUrl: string, series: string) => void
}

const MobileHeaderLink = ({ item, depth = 0, onClick, onBookAccessClick, onBookVerifyClick }: Props) => {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const hasSubmenu = !!item.submenu?.length

  const [isVerified, setIsVerified] = useState(!item.seriesId)

  useEffect(() => {
    if (!item.seriesId) {
      setIsVerified(true)
      return
    }
    const cookieName = `book_otp_verified_${item.seriesId}`
    setIsVerified(document.cookie.split(';').some(c => c.trim().startsWith(`${cookieName}=true`)))
  }, [item.seriesId])

  const isActive = path === item.href || (item.href !== '/' && path.startsWith(`${item.href}/`))

  return (
    <div className="w-full">
      <Link
        href={item.href || '#'}
        onClick={(e) => {
          if (hasSubmenu && !item.seriesId) {
            // Normal submenu toggle (no series gating)
            e.preventDefault()
            setOpen(!open)
          } else if (item.href === '/book-access' && onBookAccessClick) {
            e.preventDefault()
            onBookAccessClick()
            if (onClick) onClick()
          } else if (item.seriesId && onBookVerifyClick) {
            // ── SERIES CLICK: gate behind series-specific OTP ──
            const cookieName = `book_otp_verified_${item.seriesId}`;
            const isVerified = typeof document !== 'undefined' &&
              document.cookie.split(';').some(c => c.trim().startsWith(`${cookieName}=true`));

            if (isVerified) {
              // Verified: expand the submenu
              e.preventDefault()
              setOpen(!open)
            } else {
              // Not verified: open OTP modal
              e.preventDefault()
              onBookVerifyClick('', item.seriesId)
              if (onClick) onClick()
            }
          } else if (onClick) {
            onClick()
          }
        }}
        className={`flex items-center justify-between py-3 px-4 rounded-xl font-black ${
          isActive
            ? 'text-brand-orange bg-brand-orange/10'
            : 'text-brand-navy dark:text-white hover:bg-brand-sky/10'
        }`}
        aria-expanded={hasSubmenu ? open : undefined}
      >
        <span>{item.label}</span>
        {hasSubmenu && (
          isVerified ? (
            <Icon
              icon="solar:alt-arrow-down-linear"
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          ) : (
            <Icon
              icon="solar:lock-keyhole-bold-duotone"
              className={`opacity-70 ${isActive ? 'text-white' : 'text-brand-orange'}`}
              width="0.9em"
              height="0.9em"
            />
          )
        )}
      </Link>

      <AnimatePresence>
        {open && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ps-4"
          >
            {item.submenu!.map((child, index) => (
              <MobileHeaderLink
                key={`${child.href}-${index}`}
                item={child}
                depth={depth + 1}
                onClick={onClick}
                onBookAccessClick={onBookAccessClick}
                onBookVerifyClick={onBookVerifyClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileHeaderLink
