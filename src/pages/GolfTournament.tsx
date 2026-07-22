import { useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, Heart, Award, Check, Mail, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import VideoBg from '../components/VideoBg'

// Simple Netlify Forms email signup for tournament announcements. A matching
// hidden static form lives in index.html so the build-time bot detects it.
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)
    if (data['bot-field']) return
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', ...(data as Record<string, string>) }).toString(),
      })
      setStatus('sent')
      form.reset()
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success)] text-white">
          <CheckCircle2 size={26} />
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold uppercase tracking-wide text-ink">
          You’re on the list
        </h3>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          We’ll send the announcement the moment we lock in dates, venue, and registration.
        </p>
      </div>
    )
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <input type="hidden" name="context" value="Golf tournament announcements" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-gold disabled:opacity-70"
        >
          <Mail size={17} /> {status === 'sending' ? 'Adding you…' : 'Notify Me'}
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">
        We’ll only email you about the tournament. Unsubscribe any time.
      </p>
      {status === 'error' && (
        <p className="mt-3 text-center text-sm text-[var(--color-honor)]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

export default function GolfTournament() {
  return (
    <>
      <PageHero
        eyebrow="Coming Soon"
        title="The next tournament heads to Texas"
        intro="The next Guns Garin Memorial Foundation Golf Tournament is heading to Texas. Details will be announced soon."
        image="/images/golf-carts.webp"
      />

      {/* Announcement + newsletter signup */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center reveal">
            <span className="eyebrow">Save the Date · Texas</span>
            <h2 className="h-section mt-3">Big things are coming to the Lone Star State</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              We’re bringing the Guns Garin Memorial Golf Tournament to Texas. Course, date, and
              registration details are being finalized now. Stay tuned to our email list — we’ll be
              sending out more information as details become available.
            </p>
          </div>

          <div
            className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)] reveal-scale md:p-10"
            style={{ borderTop: '3px solid var(--color-gold)' }}
          >
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)]">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                  Be the first to know
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Join the email list for tournament announcements.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Michael Thompson — the hook */}
      <section className="relative overflow-hidden depth-ink py-20 text-white md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 reveal-left">
            <div className="relative mx-auto max-w-sm">
              <img
                src="/images/michael-thompson.webp"
                alt="Michael Thompson, PGA Tour Professional and tournament host"
                className="w-full rounded-2xl object-cover shadow-[var(--shadow-lift)]"
                loading="lazy"
              />
              <span className="absolute -bottom-4 left-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-[#1a1303] shadow-[var(--shadow-card)]">
                <Award size={16} /> PGA Tour Professional
              </span>
            </div>
          </div>
          <div className="lg:col-span-7 reveal-right">
            <span className="eyebrow">Your Host</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
              Hosted by PGA Tour pro{' '}
              <span className="text-[var(--color-gold-soft)]">Michael Thompson</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Every Guns Garin tournament is personally hosted by PGA Tour winner Michael Thompson.
              When registration opens in Texas, you’ll have the chance to play a round alongside a
              pro — and put every dollar to work funding fast, direct relief for veteran families in
              crisis.
            </p>
            <ul className="mt-7 flex flex-wrap gap-3">
              {['2020 3M Open Champion', '2013 Honda Classic Champion', '2012 U.S. Open Runner-Up'].map(
                (x) => (
                  <li
                    key={x}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white"
                  >
                    <Check size={15} className="text-[var(--color-gold-soft)]" /> {x}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/about" className="btn btn-ghost-light">
                His Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament highlights */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">From the Course</span>
            <h2 className="h-section mt-3">A look back — and ahead</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              Hundreds of supporters, a PGA Tour pro, and one mission. Here’s a taste of what the
              GGMF golf community looks like — and what we’re bringing to Texas.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 reveal-group">
            <figure className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] md:col-span-2">
              <img
                src="/images/golf-group.webp"
                alt="Golfers and supporters with PGA Tour pro Michael Thompson at a GGMF tournament"
                className="h-72 w-full object-cover object-[center_58%] transition-transform duration-500 group-hover:scale-105 md:h-96"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(8,27,56,0.85)] to-transparent p-5 text-left font-display text-sm font-medium uppercase tracking-wide text-white">
                One course. One mission. Hundreds standing with our veterans.
              </figcaption>
            </figure>
            <figure className="group overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <img
                src="/images/golf-team.webp"
                alt="A foursome with PGA Tour pro Michael Thompson"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
              />
            </figure>
            <figure className="group overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <img
                src="/images/golf-tee.webp"
                alt="A golfer teeing off at a GGMF tournament"
                className="h-72 w-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
              />
            </figure>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted reveal">
            Interested in sponsoring the Texas tournament?{' '}
            <a className="font-medium text-brand-bright underline" href="/contact">
              Get in touch
            </a>
            {'. '}Sponsorships directly fund veteran relief.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[var(--color-brand-ink)] py-20 text-center text-white md:py-24">
        <VideoBg src="/videos/flag-waving.mp4" poster="/images/flag-waving-poster.webp" className="opacity-35" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.78), rgba(8,27,56,0.9))' }}
          aria-hidden="true"
        />
        <div className="container-x relative reveal">
          <h2 className="h-section text-white">Support the mission while we tee it up</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            You don’t have to wait for the tournament to make an impact. Every gift fuels fast,
            direct relief for the military families who need it most.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn btn-gold">
              <Heart size={18} /> Donate Now
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Become a Sponsor <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
