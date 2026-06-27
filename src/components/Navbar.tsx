import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Heart, Menu, X, Mail, ArrowRight, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import Logo from './Logo'
import { org } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/impact', label: 'Impact' },
  { href: '/golf-tournament', label: 'Golf' },
  { href: '/aviation-events', label: 'Aviation Events' },
  { href: '/flight-crew', label: 'Flight Crew' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(20)

  // Scroll lock + Esc to close while the full-screen menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-surface/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-[0_4px_20px_-12px_rgba(8,27,56,0.45)]' : ''
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center" aria-label={`${org.name} home`}>
          <Logo
            className={`transition-all duration-300 ease-out ${
              scrolled ? 'h-12 md:h-14' : 'h-16 md:h-20'
            }`}
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = location === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`font-display uppercase tracking-wide rounded px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    active ? 'text-brand' : 'text-ink-soft hover:text-brand'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/donate" className="btn btn-gold !px-5 !py-3 !text-sm">
            <Heart size={16} /> Donate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Full-screen slide-in mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* Blurred navy backdrop */}
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[var(--color-brand-ink)]/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right slide-in panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={`depth-brand absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col text-white shadow-[0_0_60px_rgba(8,27,56,0.6)] transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/12 px-6 py-4">
            <Logo className="h-12 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-soft)]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Trust badge */}
          <div className="px-6 pt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/12 px-3.5 py-1.5">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[var(--color-gold-soft)] [animation:gg-pulse-dot_2s_ease-in-out_infinite]"
              />
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
                Honoring Service. Inspiring Flight.
              </span>
            </span>
          </div>

          {/* Nav links */}
          <ul className="flex-1 overflow-y-auto px-6 py-6">
            {links.map((l, i) => {
              const active = location === l.href
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
                    className={`group flex items-center justify-between border-b border-white/10 py-3.5 transition-all duration-300 ${
                      open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <span
                      className={`font-display text-2xl font-semibold uppercase tracking-wide transition-colors ${
                        active ? 'text-[var(--color-gold-soft)]' : 'text-white group-hover:text-[var(--color-gold-soft)]'
                      }`}
                    >
                      {l.label}
                    </span>
                    <ArrowRight
                      size={18}
                      className="-translate-x-1 text-white/40 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-[var(--color-gold-soft)] group-hover:opacity-100"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Primary actions */}
          <div className="space-y-3 px-6">
            <Link href="/donate" onClick={() => setOpen(false)} className="btn btn-gold w-full">
              <Heart size={16} /> Donate
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-ghost-light w-full">
              <Mail size={16} /> Contact Us
            </Link>
          </div>

          {/* Footer: contact + social */}
          <div className="mt-6 border-t border-white/12 px-6 py-5">
            <a
              href={org.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-sm text-white/75 transition-colors hover:text-white"
            >
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold-soft)]" />
              <span>{org.addressOneLine}</span>
            </a>
            <div className="mt-4 flex gap-3">
              <a
                href={org.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[var(--color-gold-soft)] transition-colors hover:border-[var(--color-gold-soft)] hover:bg-white/10"
              >
                <Facebook size={18} />
              </a>
              <a
                href={org.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[var(--color-gold-soft)] transition-colors hover:border-[var(--color-gold-soft)] hover:bg-white/10"
              >
                <Instagram size={18} />
              </a>
              <a
                href={org.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[var(--color-gold-soft)] transition-colors hover:border-[var(--color-gold-soft)] hover:bg-white/10"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
