import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { AnimatePresence, motion } from 'motion/react'
import { X, Trophy, CalendarDays, MapPin } from 'lucide-react'

// One-time golf-tournament promo. Appears ~4s after the visitor lands on any
// page except /ohio + /golf-tournament. Dismissal is persisted to localStorage
// so it won't pester returning visitors. Bump the KEY to re-open it next year.
const KEY = 'gg-golf-popup-dismissed-2026'
const DELAY_MS = 4000

export default function GolfPopup() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()

  // Auto-open once per visitor, never on pages that already promote the event.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (location === '/ohio' || location === '/golf-tournament') return
    if (localStorage.getItem(KEY)) return
    const t = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [location])

  // Close + remember.
  const close = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // ignore (private mode, etc.)
    }
    setOpen(false)
  }

  // Esc to close.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close popup"
            onClick={close}
            className="absolute inset-0 bg-[var(--color-brand-ink)]/70 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="2026 Ohio GGMF Golf Tournament"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_0_80px_rgba(8,27,56,0.45)]"
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
            >
              <X size={18} />
            </button>

            {/* Image header */}
            <div className="relative h-44 overflow-hidden sm:h-52">
              <img
                src="/images/golf-carts.webp"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,27,56,0.15) 0%, rgba(8,27,56,0.85) 100%)',
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-display inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1a1303]">
                  <Trophy size={13} /> Play with PGA Tour pro Michael Thompson
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink sm:text-3xl">
                2026 Ohio GGMF Golf Tournament
              </h2>
              <ul className="mt-4 space-y-2 text-ink-soft">
                <li className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-brand" /> Monday, July 13, 2026
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={17} className="text-brand" /> Turkeyfoot Lake Golf Links, Akron OH
                </li>
              </ul>
              <p className="mt-3 text-sm font-medium text-brand">
                $120 per player · $480 per foursome
              </p>
              <p className="mt-1 text-sm text-muted">
                97¢ of every dollar raised goes directly to veterans and their families.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                <button type="button" onClick={close} className="btn btn-outline sm:flex-1">
                  Maybe later
                </button>
                <Link href="/ohio" onClick={close} className="btn btn-gold sm:flex-1">
                  <Trophy size={18} /> Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
