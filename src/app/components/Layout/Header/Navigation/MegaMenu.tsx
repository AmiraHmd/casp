'use client'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from '@/i18n/routing'
import { HeaderItem } from '../../../../types/menu'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

type Props = {
    item: HeaderItem
    onBookAccessClick?: () => void
    onBookVerifyClick?: (redirectUrl: string, series: string) => void
    onClose: () => void
}

const EDGE_MARGIN = 16

const isSeriesVerified = (seriesId?: string) => {
    if (!seriesId) return true;
    if (typeof document === 'undefined') return false;
    const cookieName = `book_otp_verified_${seriesId}`;
    return document.cookie.split(';').some(c => c.trim().startsWith(`${cookieName}=true`));
}

const expandFirst = (items?: HeaderItem[]): HeaderItem[] => {
    const first = items?.[0]
    if (!first) return [];
    if (!isSeriesVerified(first.seriesId)) {
        return [first];
    }
    return [first, ...expandFirst(first.submenu)]
}

const depth = (items?: HeaderItem[]): number =>
    items?.length ? 1 + Math.max(...items.map((i) => depth(i.submenu))) : 0

export default function MegaMenu({ item, onBookAccessClick, onBookVerifyClick, onClose }: Props) {
    const panelRef = useRef<HTMLDivElement>(null)
    const [activePath, setActivePath] = useState<HeaderItem[]>(() => item.isCurricula ? (item.submenu?.[0] ? [item.submenu[0]] : []) : expandFirst(item.submenu))
    const [shiftX, setShiftX] = useState(0)

    useEffect(() => {
        setActivePath(item.isCurricula ? (item.submenu?.[0] ? [item.submenu[0]] : []) : expandFirst(item.submenu))
    }, [item])

    useLayoutEffect(() => {
        const fit = () => {
            const panel = panelRef.current
            const anchor = panel?.offsetParent as HTMLElement | null
            const firstColumn = panel?.firstElementChild as HTMLElement | null
            if (!panel || !anchor || !firstColumn) return

            const screenWidth = document.documentElement.clientWidth
            const fullWidth = Math.min(
                firstColumn.offsetWidth * depth(item.submenu),
                screenWidth - EDGE_MARGIN * 2,
            )
            const rect = anchor.getBoundingClientRect()
            const isRtl = getComputedStyle(panel).direction === 'rtl'

            const naturalLeft = isRtl ? rect.right - fullWidth : rect.left
            const left = Math.max(
                EDGE_MARGIN,
                Math.min(naturalLeft, screenWidth - fullWidth - EDGE_MARGIN),
            )
            setShiftX(left - naturalLeft)
        }

        fit()
        window.addEventListener('resize', fit)
        return () => window.removeEventListener('resize', fit)
    }, [item])

    const handleHover = (level: number, subItem: HeaderItem, isClickContext = false) => {
        if (item.isCurricula) {
            // Only allow interaction if it's explicitly clicked for Curricula.
            // When hovered, do not expand.
            if (!isClickContext) return;
        }

        setActivePath((prev) => {
            if (prev[level] === subItem) return prev;
            const shouldExpand = isSeriesVerified(subItem.seriesId);
            const expanded = shouldExpand ? (item.isCurricula ? [] : expandFirst(subItem.submenu)) : [];
            return [...prev.slice(0, level), subItem, ...expanded];
        })
    }

    if (!item.submenu?.length) return null

    const columns: HeaderItem[][] = [item.submenu]
    activePath.forEach((activeItem) => {
        if (activeItem.submenu?.length) {
            const shouldPush = isSeriesVerified(activeItem.seriesId)
            if (shouldPush) {
                columns.push(activeItem.submenu)
            }
        }
    })

    const dense = columns.some((col) => col.length > 6)

    return (
        <motion.div
            ref={panelRef}
            style={{ x: shiftX }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute start-0 mt-2 w-max max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden bg-white/95 dark:bg-brand-navy-dark/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-navy/10 border border-brand-sky/20 dark:border-white/10 z-50 flex flex-row"
            role="menu"
            onClick={(e) => e.stopPropagation()}
        >
            {columns.map((colItems, colIndex) => (
                <div
                    key={colIndex}
                    className="w-60 md:w-64 border-e border-brand-sky/10 dark:border-white/5 last:border-0 px-2.5 py-2.5 pb-4 flex flex-col gap-1 bg-gradient-to-b from-transparent to-brand-sky/5 dark:to-white/5"
                >
                    {colItems.map((child, childIndex) => {
                        const isActive = activePath[colIndex] === child
                        const hasSubmenu = !!child.submenu?.length

                        const locked = child.seriesId ? !isSeriesVerified(child.seriesId) : false

                        const handleClick = (e: React.MouseEvent) => {
                            if (child.href === '/book-access' && onBookAccessClick) {
                                e.preventDefault()
                                onBookAccessClick()
                                onClose()
                            } else if (child.seriesId && onBookVerifyClick) {
                                // ── SERIES CLICK: gate behind OTP ──────────────────────
                                if (!isSeriesVerified(child.seriesId)) {
                                    e.preventDefault()
                                    // Open modal for this series (no redirect needed — user stays in menu)
                                    onBookVerifyClick('', child.seriesId)
                                    onClose()
                                } else if (item.isCurricula) {
                                    if (child.href === '#') e.preventDefault();
                                    handleHover(colIndex, child, true);
                                }
                                // If verified: let the submenu expand naturally (no e.preventDefault)
                            } else if (!hasSubmenu) {
                                if (item.isCurricula) {
                                    // If the href is a real destination, close menu and let Link navigate.
                                    // If it's a placeholder ('#' or '/'), block navigation.
                                    if (child.href === '#' || child.href === '/') {
                                        e.preventDefault();
                                    } else {
                                        onClose();
                                    }
                                } else {
                                    onClose()
                                }
                            } else {
                                if (child.href === '#') {
                                    e.preventDefault()
                                }
                                if (item.isCurricula) {
                                    handleHover(colIndex, child, true);
                                }
                            }
                        }

                        return (
                            <Link
                                key={`${child.href}-${childIndex}`}
                                href={child.href || '#'}
                                onClick={handleClick}
                                onMouseEnter={() => handleHover(colIndex, child)}
                                className={`px-3.5 ${dense ? 'py-1' : 'py-2'} rounded-xl text-start flex items-center justify-between transition-all duration-200 ${isActive
                                    ? (colIndex > 0
                                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 scale-[1.02]'
                                        : 'bg-brand-orange text-white font-semibold shadow-md shadow-brand-orange/30 scale-[1.02]')
                                    : (colIndex > 0
                                        ? 'text-brand-navy dark:text-white/90 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                                        : 'text-brand-navy dark:text-white/90 hover:bg-brand-sky/15 dark:hover:bg-white/10 hover:text-brand-orange dark:hover:text-brand-gold')
                                    }`}
                                role="menuitem"
                                aria-haspopup={hasSubmenu || undefined}
                                aria-expanded={isActive}
                            >
                                <span className="text-[1.1rem] font-medium leading-snug">{child.label}</span>
                                {hasSubmenu && (
                                    locked ? (
                                        <Icon 
                                            icon="solar:lock-keyhole-bold-duotone" 
                                            className={`opacity-70 ${isActive ? 'text-white' : 'text-brand-orange'}`} 
                                            width="0.9em" 
                                            height="0.9em" 
                                        />
                                    ) : (
                                        <svg
                                            width="0.9em"
                                            height="0.9em"
                                            className={`rtl:rotate-180 opacity-70 transition-transform ${isActive ? 'text-white' : ''}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m9 18l6-6l-6-6" />
                                        </svg>
                                    )
                                )}
                            </Link>
                        )
                    })}
                </div>
            ))}
        </motion.div>
    )
}