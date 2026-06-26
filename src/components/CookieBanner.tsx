import { useEffect, useState } from 'react'
import { Link } from 'wouter'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(timer)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-2xl rounded-lg border border-white/10 bg-[var(--color-brand-ink)] px-5 py-4 shadow-2xl"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/80">
          This site uses cookies to keep things running smoothly. We never sell your data.{' '}
          <Link href="/privacy" className="text-[var(--color-gold-soft)] underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded border border-white/25 px-4 py-1.5 text-sm font-medium text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            No Thanks
          </button>
          <button
            onClick={accept}
            className="rounded bg-[var(--color-gold)] px-4 py-1.5 text-sm font-semibold text-[var(--color-brand-ink)] transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
