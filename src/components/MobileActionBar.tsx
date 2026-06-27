import { Link } from 'wouter'
import { Heart, Mail } from 'lucide-react'
import { org } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

// Elevated sticky CTAs for the Guns Garin Memorial Foundation.
//   • Mobile: a floating navy capsule, lifted off the bottom edge with a blurred
//     backdrop and big shadow — glassy Contact + a brass primary Donate.
//   • Desktop: a single floating Donate pill that reveals after the hero.
// Both point Donate at the real GiveButter page (org.give.donate).

export default function MobileActionBar() {
  const show = useScrolled(560)

  return (
    <>
      {/* Mobile floating capsule */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] transition-all duration-300 md:hidden ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/12 bg-[var(--color-brand)]/92 p-2 shadow-[0_18px_44px_-14px_rgba(8,27,56,0.7)] backdrop-blur-md">
          <Link
            href="/contact"
            className="font-display flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/20"
          >
            <Mail size={16} /> Contact
          </Link>
          <a
            href={org.give.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display gg-glow-pulse group relative flex flex-[1.3] items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-gold)] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#1a1303] transition-transform active:scale-95"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-md group-hover:[animation:gg-sheen_0.9s_ease]"
            />
            <Heart size={16} /> Donate
          </a>
        </div>
      </div>

      {/* Desktop floating Donate pill */}
      <a
        href={org.give.donate}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate to the Guns Garin Memorial Foundation"
        className={`font-display gg-glow-pulse group fixed bottom-7 right-7 z-40 hidden items-center gap-2.5 overflow-hidden rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#1a1303] shadow-[0_18px_44px_-14px_rgba(8,27,56,0.7)] transition-all duration-300 active:scale-95 md:inline-flex ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-md group-hover:[animation:gg-sheen_0.9s_ease]"
        />
        <Heart size={17} /> Donate
      </a>
    </>
  )
}
