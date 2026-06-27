import { CalendarDays, MapPin, Clock, Trophy, Check, Phone, Star } from 'lucide-react'
import VideoBg from '../components/VideoBg'

const REGISTER = 'https://givebutter.com/ggmf-ohio-golf-tournament-july-13-2026-nix7as'

const schedule = [
  { time: '7:00 AM', label: 'Check-In' },
  { time: '8:00 AM', label: 'Shotgun Start with Tour Pro Michael Thompson' },
  { time: '12:30 PM', label: 'Lunch, Awards & After Party' },
]

const registrationIncludes = [
  '18 holes of championship golf',
  'Greens fees and shared cart',
  'Lunch and awards reception',
  'On-course refreshments',
  'Longest Drive and Closest to the Pin contests',
  'Player swag bag',
  'Direct support of veterans in crisis',
]

const pricing = [
  { price: '$175', label: 'Individual Golfer' },
  { price: '$700', label: 'Foursome', featured: true },
]

const sponsorships = [
  {
    name: 'Presenting Sponsor',
    price: '$7,500',
    featured: true,
    perks: [
      '3 Foursomes',
      'Exclusive presenting rights',
      'Premier logo placement across all materials',
      'Opening remarks opportunity',
      'Veteran Impact Partner recognition',
      'Premium on-course activation',
    ],
  },
  {
    name: 'Premier Sponsor',
    price: '$5,000',
    perks: [
      '2 Foursomes',
      'Prominent brand placement',
      'Branded hole activation',
      'Contest signage',
      'Veteran Support Sponsor recognition',
    ],
  },
  {
    name: 'Supporting Sponsor',
    price: '$2,500',
    perks: ['1 Foursome', 'Branded hole', 'Swag bag inclusion', 'Website and social recognition'],
  },
  {
    name: 'Swag Bag Sponsor',
    price: '$1,000',
    perks: ['Exclusive logo on official player swag bag', 'Brand item in every gift bag'],
  },
  {
    name: 'Hole Sponsor',
    price: '$500',
    perks: ['Professionally printed hole signage', 'On-site engagement opportunity'],
  },
]

function RegisterButton({ className = '' }: { readonly className?: string }) {
  return (
    <a href={REGISTER} target="_blank" rel="noopener noreferrer" className={`btn btn-gold ${className}`}>
      <Trophy size={18} /> Register Now
    </a>
  )
}

export default function Ohio() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-brand-ink)] text-white">
        <VideoBg src="/videos/flag-waving.mp4" poster="/images/flag-waving-poster.webp" className="opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.7) 0%, rgba(8,27,56,0.92) 100%)' }}
          aria-hidden="true"
        />
        <div className="container-x relative py-20 text-center md:py-28 [text-shadow:0_2px_18px_rgba(8,27,56,0.85)]">
          <span className="eyebrow">Play with PGA Tour Pro Michael Thompson</span>
          <h1 className="h-display mx-auto mt-4 max-w-4xl text-white">2026 Ohio GGMF Golf Tournament</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-lg text-white/90">
            <span className="flex items-center gap-2">
              <CalendarDays size={20} className="text-[var(--color-gold-soft)]" /> Monday, July 13, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={20} className="text-[var(--color-gold-soft)]" /> Turkeyfoot Lake Golf Links, Akron, Ohio
            </span>
          </div>
          <RegisterButton className="mt-9" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-24">
        <div className="container-x mx-auto max-w-3xl text-center reveal">
          <span className="eyebrow">A Day on the Course. A Lifeline at Home.</span>
          <h2 className="h-section mt-3">More than a round of golf</h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mt-6 text-lg text-ink-soft">
            Join us for the first-ever Ohio Golf Tournament benefiting the Guns Garin Memorial
            Foundation. This is more than a day on the course. It is a direct investment in veterans
            and military families facing urgent financial hardship.
          </p>
          <p className="mt-4 text-xl font-semibold text-brand">
            97 cents of every dollar raised goes directly to veterans and their families.
          </p>
          <RegisterButton className="mt-8" />
        </div>
      </section>

      {/* Event details */}
      <section className="depth-soft py-20 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Event Details</span>
            <h2 className="h-section mt-3">What to expect</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2 reveal-group">
            <div className="card lift p-8" style={{ borderTop: '3px solid var(--color-gold)' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)]">
                <MapPin size={22} />
              </div>
              <h3 className="font-display mt-5 text-xl font-semibold uppercase tracking-wide text-ink">
                The Course
              </h3>
              <p className="mt-1 font-semibold text-ink">Turkeyfoot Lake Golf Links</p>
              <p className="mt-3 text-ink-soft">
                A 4-Star Golf Digest rated course known for tree-lined fairways and premier course
                conditions.
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold)]">
                <Star size={15} className="fill-current" /> 4-Star Golf Digest Rated
              </p>
            </div>
            <div className="card lift p-8" style={{ borderTop: '3px solid var(--color-gold)' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)]">
                <Clock size={22} />
              </div>
              <h3 className="font-display mt-5 text-xl font-semibold uppercase tracking-wide text-ink">
                Schedule
              </h3>
              <ul className="mt-4 space-y-3">
                {schedule.map((s) => (
                  <li key={s.time} className="flex gap-3">
                    <span className="font-display w-20 shrink-0 font-semibold text-brand">{s.time}</span>
                    <span className="text-ink-soft">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-ink-soft reveal">
            Whether you are a seasoned golfer or just want to support the mission, this will be a
            professionally executed tournament experience with competition, networking, and community
            impact.
          </p>
        </div>
      </section>

      {/* Michael Thompson */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 reveal-left">
            <img
              src="/images/michael-thompson.webp"
              alt="Michael Thompson, PGA Tour Professional"
              className="mx-auto w-full max-w-sm rounded-2xl object-cover shadow-[var(--shadow-card)]"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-8 reveal-right">
            <span className="eyebrow">Your Host</span>
            <h2 className="h-section mt-3">Play alongside Michael Thompson</h2>
            <span className="gold-rule mt-5" />
            <blockquote className="mt-6 space-y-4 text-ink-soft">
              <p>
                “I am honored to host the first GGMF Golf Tournament here in Ohio. The Guns Garin
                Memorial Foundation was co-founded by my brother, an F-16 pilot in the United States
                Air Force, with one clear mission: support veterans and service members in their time
                of need.”
              </p>
              <p>
                “This tournament brings our Ohio community together to stand in the gap for those who
                stood for us. On average, GGMF responds to needs within 24 hours, and 97 cents of
                every dollar raised goes directly to supporting veterans and their families. The needs
                are real. The impact is immediate. I look forward to seeing you on the course.”
              </p>
            </blockquote>
            <p className="font-display mt-5 font-semibold uppercase tracking-wide text-ink">
              Michael Thompson <span className="text-muted">PGA Tour Professional</span>
            </p>
            <div className="mt-6 rounded-xl border border-line bg-surface-soft p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink">
                We assist military families facing:
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {['Unexpected relocation costs', 'Funeral expenses', 'Urgent financial hardship'].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-ink-soft">
                    <Check size={16} className="text-[var(--color-gold)]" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Player registration */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Player Registration</span>
            <h2 className="h-section mt-3">Claim your spot</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-2 reveal-group">
            {pricing.map((p) => (
              <div
                key={p.label}
                className={`card lift flex flex-col items-center p-10 text-center ${
                  p.featured ? 'ring-2 ring-[var(--color-gold)]' : ''
                }`}
              >
                <span className="font-display text-5xl font-bold text-brand">{p.price}</span>
                <span className="font-display mt-2 text-lg font-semibold uppercase tracking-wide text-ink">
                  {p.label}
                </span>
                {p.featured && (
                  <span className="mt-2 rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1a1303]">
                    Best Value
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)] reveal">
            <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
              Registration Includes
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {registrationIncludes.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-ink-soft">
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 text-center reveal">
            <p className="font-display mb-4 text-lg font-semibold uppercase tracking-wide text-honor">
              Spots are limited
            </p>
            <RegisterButton />
          </div>
        </div>
      </section>

      {/* Sponsorships */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Sponsorship Opportunities</span>
            <h2 className="h-section mt-3">Align your brand with real impact</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 reveal-group">
            {sponsorships.map((s) => (
              <div
                key={s.name}
                className={`card lift flex flex-col p-8 ${s.featured ? 'ring-2 ring-[var(--color-gold)]' : ''}`}
              >
                {s.featured && (
                  <span className="mb-3 self-start rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1a1303]">
                    Most Impact
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                  {s.name}
                </h3>
                <p className="font-display mt-1 text-3xl font-bold text-brand">{s.price}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {s.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[var(--color-brand-ink)] py-20 text-center text-white md:py-24">
        <VideoBg src="/videos/jet-taxi.mp4" poster="/images/jet-taxi-poster.webp" className="opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.8), rgba(8,27,56,0.92))' }}
          aria-hidden="true"
        />
        <div className="container-x relative reveal">
          <span className="eyebrow">Join Us</span>
          <h2 className="h-section mt-3 text-white">Golf. Network. Make a difference.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Monday, July 13, 2026 · Turkeyfoot Lake Golf Links. Support veterans, elevate your brand,
            and make an impact that reaches a family within 24 hours.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RegisterButton />
            <a href="tel:+18502810806" className="btn btn-ghost-light">
              <Phone size={18} /> Sponsor: Sarah Bush, 850-281-0806
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
