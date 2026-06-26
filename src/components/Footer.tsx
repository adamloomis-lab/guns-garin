import { Link } from 'wouter'
import { MapPin, Facebook, Instagram, Youtube, Heart } from 'lucide-react'
import { org } from '../data/site'

const explore = [
  { href: '/about', label: 'About' },
  { href: '/impact', label: 'Impact' },
  { href: '/golf-tournament', label: 'Golf Tournament' },
  { href: '/flight-crew', label: 'Flight Crew' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-[var(--color-brand-ink)] text-white/75">
      <img
        src="/images/jet-taxi-poster.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.86) 0%, rgba(8,27,56,0.94) 100%)' }}
        aria-hidden="true"
      />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src="/images/logo.png"
            alt={`${org.name} logo`}
            className="h-16 w-auto"
            width={241}
            height={128}
          />
          <p className="mt-5 max-w-md text-[15px] leading-relaxed">{org.shortBlurb}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={org.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-soft)]"
              aria-label={`${org.name} on Facebook`}
            >
              <Facebook size={18} />
            </a>
            <a
              href={org.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-soft)]"
              aria-label={`${org.name} on Instagram`}
            >
              <Instagram size={18} />
            </a>
            <a
              href={org.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold-soft)]"
              aria-label={`${org.name} on YouTube`}
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        <div className="md:col-span-4">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-[15px]">
            <li>
              <a
                href={org.mapsDir}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white"
              >
                <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-gold-soft)]" />
                <span>
                  {org.address.street}
                  <br />
                  {org.address.city}, {org.address.state} {org.address.zip}
                </span>
              </a>
            </li>
          </ul>
          <Link href="/donate" className="btn btn-gold mt-6 !py-2.5 !text-sm">
            <Heart size={15} /> Donate
          </Link>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-white/55 sm:flex-row">
          <span>
            © {year} {org.name}. A registered 501(c)(3) nonprofit. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
          <span>
            Website by{' '}
            <a
              href="https://adamloomis.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-[var(--color-gold-soft)]"
            >
              AdamLoomis.online
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
