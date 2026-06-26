import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Heart, Menu, X } from 'lucide-react'
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
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <ul className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display uppercase tracking-wide block rounded px-3 py-3 text-base font-medium text-ink hover:bg-surface-soft"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-1">
              <Link href="/donate" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                <Heart size={16} /> Donate
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
