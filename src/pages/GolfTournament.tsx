import { Link } from 'wouter'
import { CalendarDays, MapPin, ArrowRight, Trophy, Heart, Award, Check } from 'lucide-react'
import { golf } from '../data/site'
import PageHero from '../components/PageHero'
import VideoBg from '../components/VideoBg'

export default function GolfTournament() {
  return (
    <>
      <PageHero
        eyebrow="Play for a Purpose"
        title="The 2026 Golf Series"
        intro={golf.intro}
        image="/images/golf-carts.webp"
      />

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
              Tee it up with PGA Tour pro{' '}
              <span className="text-[var(--color-gold-soft)]">Michael Thompson</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Every Guns Garin tournament is personally hosted by PGA Tour winner Michael Thompson.
              Play a round alongside a pro, and put every dollar to work funding fast, direct relief
              for veteran families in crisis.
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
              <Link href="/ohio" className="btn btn-gold">
                <Trophy size={18} /> Register to Play
              </Link>
              <Link href="/about" className="btn btn-ghost-light">
                His Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Multiple Tournaments · One Mission</span>
            <h2 className="h-section mt-3">Tee off for our troops</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              Every foursome, sponsorship, and swing helps fund fast, direct relief for veterans and
              military families in crisis. Grab your clubs and join us on the course.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2 reveal-group">
            {golf.events.map((e) => (
              <div key={e.name} className="card lift flex flex-col p-8" style={{ borderTop: '3px solid var(--color-gold)' }}>
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-[var(--color-gold)]" />
                  <span className="font-display text-sm font-medium uppercase tracking-wider text-muted">
                    {e.location}
                  </span>
                  {e.status === 'soon' && (
                    <span className="ml-auto rounded-full bg-surface-soft px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-4 text-2xl font-semibold uppercase tracking-wide text-ink">
                  {e.name}
                </h3>
                <ul className="mt-4 space-y-2 text-ink-soft">
                  <li className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-brand" /> {e.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={17} className="text-brand" /> {e.location}
                  </li>
                </ul>
                <div className="mt-auto pt-7">
                  {e.status === 'open' ? (
                    'detailsPath' in e && e.detailsPath ? (
                      <Link href={e.detailsPath} className="btn btn-gold w-full">
                        View Details &amp; Register <ArrowRight size={18} />
                      </Link>
                    ) : (
                      <a
                        href={e.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold w-full"
                      >
                        Register Today <ArrowRight size={18} />
                      </a>
                    )
                  ) : (
                    <button type="button" disabled className="btn btn-outline w-full opacity-60">
                      Details Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted reveal">
            Interested in sponsoring a tournament?{' '}
            <a className="font-medium text-brand-bright underline" href="/contact">
              Get in touch
            </a>
            {'. '}Sponsorships directly fund veteran relief.
          </p>
        </div>
      </section>

      {/* Tournament highlights */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">From the Course</span>
            <h2 className="h-section mt-3">Tournament highlights</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              Hundreds of supporters, a PGA Tour pro, and one mission: a day that turns birdies into
              real relief for veteran families.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 reveal-group">
            <figure className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] md:col-span-2">
              <img
                src="/images/golf-group.webp"
                alt="The full field of golfers and supporters with PGA Tour pro Michael Thompson at the GGMF tournament"
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
                alt="A foursome with PGA Tour pro Michael Thompson at the tournament"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
              />
            </figure>
            <figure className="group overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <img
                src="/images/golf-tee.webp"
                alt="A golfer teeing off at the GGMF tournament"
                className="h-72 w-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
              />
            </figure>
          </div>
          <div className="mt-10 text-center reveal">
            <Link href="/ohio" className="btn btn-gold">
              <Trophy size={18} /> Register for the 2026 Tournament
            </Link>
          </div>
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
          <h2 className="h-section text-white">Can’t make it to the course?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            You can still drive our mission forward. Every gift fuels fast, direct relief for the
            military families who need it most.
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
