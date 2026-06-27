import { Link } from 'wouter'
import { Heart, ArrowRight, ShieldCheck, Plane, HandHeart, Check } from 'lucide-react'
import { org, stats, programs } from '../data/site'
import VideoBg from '../components/VideoBg'
import Partners from '../components/Partners'
import YouTubeEmbed from '../components/YouTubeEmbed'
import CountUp from '../components/CountUp'

const programIcons = [ShieldCheck, Plane, HandHeart]
const programImages = [
  '/images/impact-1.webp',
  '/images/cockpit-poster.webp',
  '/images/flag-trees-poster.webp',
]
const programImagePositions = ['center 22%', 'center', 'center']

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-brand-ink)] text-white">
        <VideoBg src="/videos/hero-jet.mp4" poster="/images/hero-jet-poster.webp" className="opacity-95" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,27,56,0.30) 0%, rgba(8,27,56,0.45) 55%, rgba(8,27,56,0.72) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="container-x relative py-24 md:py-36">
          <div className="max-w-3xl reveal [text-shadow:0_2px_18px_rgba(8,27,56,0.85)]">
            <span className="eyebrow text-[var(--color-gold-soft)]! text-sm! md:text-base!">
              {org.tagline}
            </span>
            <h1 className="h-display mt-4 text-white">
              No veteran left behind, on the battlefield or at home.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              The Guns Garin Memorial Foundation delivers fast, direct relief to military families in
              crisis and inspires the next generation of aviators, honoring the legacy of Major
              Richard “GUNS” Garin.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/donate" className="btn btn-gold">
                <Heart size={18} /> Donate Now
              </Link>
              <Link href="/about" className="btn btn-ghost-light">
                Our Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Remembering Garin — story + video right under the hero */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center reveal">
            <span className="eyebrow">Why We Exist</span>
            <h2 className="h-section mt-3">Remembering Major Rick “Guns” Garin</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>

          <div className="mx-auto mt-12 max-w-4xl reveal-scale">
            <YouTubeEmbed id="-LktA-N5H_Y" title="The story of Major Rick “Guns” Garin" />
          </div>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 reveal-left">
              <img
                src="/images/garin-portrait.webp"
                alt="Major Rick “Guns” Garin"
                className="mx-auto w-full max-w-xs rounded-2xl object-cover shadow-[var(--shadow-card)] lg:max-w-none"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-8 reveal-right">
              <p className="text-xl text-ink">
                Major Richard Charles “Guns” Garin was a loving, dedicated, and accomplished person
                who made the world a better place wherever he went.
              </p>
              <p className="mt-4 text-ink-soft">
                A pilot at heart, he carried a deep love of country and an even deeper love for the
                people around him. The Guns Garin Memorial Foundation was founded in 2020 to preserve
                his legacy, standing beside the military families he cared so much about, and
                inspiring the next generation of aviators to chase the sky the way he did.
              </p>
              <p className="mt-4 text-ink-soft">
                Every family we help and every young pilot we encourage carries his name, and his
                spirit of service, forward.
              </p>
              <Link href="/about" className="btn btn-outline mt-7">
                Read His Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="depth-brand text-white">
        <div className="container-x grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 reveal-group">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--color-gold-soft)] md:text-5xl">
                <CountUp prefix={s.prefix} target={s.target} suffix={s.suffix} />
              </div>
              <div className="mx-auto mt-2 max-w-[12rem] text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal-left">
            <span className="eyebrow">Our Mission</span>
            <h2 className="h-section mt-3">Two missions. One legacy.</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              We exist to stand with the families of those who serve, and to keep Major Garin’s love
              of flight alive in the young people who dream of the sky.
            </p>
            <p className="mt-4 text-ink-soft">
              When a military family faces crisis, we respond in under 24 hours with real, direct
              help. And through our partnership with E3 Aviation, we open the door to a career in
              aviation, providing premium educational content, completely free, to future pilots.
            </p>
            <Link href="/impact" className="btn btn-outline mt-8">
              See Our Impact <ArrowRight size={18} />
            </Link>
          </div>
          <div className="reveal-right grid grid-cols-2 gap-4">
            <img
              src="/images/impact-6.webp"
              alt="A veteran family supported by the foundation"
              className="aspect-square w-full rounded-xl object-cover shadow-[var(--shadow-card)]"
              loading="lazy"
              data-parallax="0.05"
            />
            <img
              src="/images/impact-5.webp"
              alt="Foundation aid recipient"
              className="mt-8 aspect-square w-full rounded-xl object-cover shadow-[var(--shadow-card)]"
              loading="lazy"
              data-parallax="-0.05"
            />
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">What We Do</span>
            <h2 className="h-section mt-3">How we serve</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              Three promises we keep: to the families who served, and to those who dream of flying.
            </p>
          </div>
          <div className="mt-16 grid gap-7 md:grid-cols-3 reveal-group">
            {programs.map((p, i) => {
              const Icon = programIcons[i] ?? ShieldCheck
              return (
                <article key={p.id} className="card lift group flex flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={programImages[i]}
                      alt={p.title}
                      style={{ objectPosition: programImagePositions[i] }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(8,27,56,0) 45%, rgba(8,27,56,0.45) 100%)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col p-7 pt-9">
                    <div className="absolute -top-7 left-7 flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)] shadow-[var(--shadow-lift)] ring-4 ring-[var(--color-surface)]">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-ink-soft">{p.summary}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm text-ink">
                          <Check size={17} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="mt-12 text-center reveal">
            <Link href="/impact" className="btn btn-outline">
              See the Impact <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Golf teaser */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="overflow-hidden rounded-2xl depth-ink text-white reveal-scale">
            <div className="grid items-center gap-8 p-10 md:grid-cols-2 md:p-14">
              <div>
                <span className="eyebrow">Play for a Purpose</span>
                <h2 className="h-section mt-3 text-white">The 2026 Golf Series</h2>
                <p className="mt-5 text-white/85">
                  Multiple tournaments. One mission. Join us on the course to support veterans and
                  military families in crisis. The Ohio tournament tees off July 13, 2026.
                </p>
                <Link href="/golf-tournament" className="btn btn-gold mt-7">
                  Tournament Details <ArrowRight size={18} />
                </Link>
              </div>
              <img
                src="/images/michael-thompson.webp"
                alt="PGA Tour player Michael Thompson, tournament host"
                className="mx-auto max-h-80 rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="depth-soft py-16">
        <div className="container-x">
          <Partners />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[var(--color-brand-ink)] py-20 text-center text-white md:py-24">
        <VideoBg src="/videos/flag-waving.mp4" poster="/images/flag-waving-poster.webp" className="opacity-85" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.5), rgba(8,27,56,0.68))' }}
          aria-hidden="true"
        />
        <div className="container-x relative reveal">
          <h2 className="h-section text-white">Stand with our veterans</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            100% of your donation goes to the veterans and military families we serve. Give once, or
            join the Flight Crew with a monthly gift.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn btn-gold">
              <Heart size={18} /> Donate Now
            </Link>
            <Link href="/flight-crew" className="btn btn-ghost-light">
              Join the Flight Crew <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
