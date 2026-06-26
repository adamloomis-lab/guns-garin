import { Link } from 'wouter'
import { Heart, ArrowRight, Home as HomeIcon, Utensils, Navigation, Plane, HandHeart, Users } from 'lucide-react'
import { stats, impactAreas } from '../data/site'
import PageHero from '../components/PageHero'
import CountUp from '../components/CountUp'

const areaIcons = [HomeIcon, Utensils, Navigation, Plane, HandHeart, Users]

const gallery = [
  '/images/impact-1.webp',
  '/images/impact-3.webp',
  '/images/impact-4.webp',
  '/images/impact-6.webp',
  '/images/impact-7.webp',
  '/images/impact-2.webp',
]

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Real help, delivered fast"
        intro="Thanks to our donors and partners, the Guns Garin Memorial Foundation has supported veteran families and inspired future pilots since 2020 — and we’re just getting started."
        video="/videos/flag-trees.mp4"
        poster="/images/flag-trees-poster.webp"
      />

      {/* Stats */}
      <section className="depth-brand text-white">
        <div className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 reveal-group">
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

      {/* Narrative */}
      <section className="py-20 md:py-28">
        <div className="container-x max-w-3xl text-center reveal">
          <span className="eyebrow">Since 2020</span>
          <h2 className="h-section mt-3">Standing with those who served</h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mt-6 text-lg text-ink-soft">
            To date, we have had the honor of supporting over 350 veterans and their families in
            their time of need — and we remain committed to inspiring the next generation of amazing
            pilots. Our partnership with E3 Aviation lets us provide premium educational content to
            young men and women pursuing a career in aviation, completely free.
          </p>
        </div>
      </section>

      {/* E3 Aviation feature video */}
      <section className="depth-ink py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Future Aviators</span>
            <h2 className="h-section mt-3 text-white">Empowering and educating</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-white/85">
              Our partnership with E3 Aviation lets us provide premium educational content to young
              men and women pursuing a career in aviation — completely free.
            </p>
            <img
              src="/images/e3-partnership-banner.webp"
              alt="In partnership with E3 Aviation Association"
              className="mx-auto mt-8 w-full max-w-md"
              loading="lazy"
            />
          </div>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl shadow-[var(--shadow-lift)] reveal-scale">
            <video
              className="aspect-video w-full bg-black"
              src="/videos/e3-aviation.mp4"
              poster="/images/e3-aviation-poster.webp"
              controls
              playsInline
              preload="none"
            />
          </div>
        </div>
      </section>

      {/* Impact areas */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">What Your Support Provides</span>
            <h2 className="h-section mt-3">Where the help goes</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3 reveal-group">
            {impactAreas.map((a, i) => {
              const Icon = areaIcons[i] ?? HandHeart
              return (
                <div
                  key={a.title}
                  className="card lift overflow-hidden p-7"
                  style={{ borderTop: '3px solid var(--color-gold)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-soft text-brand">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold uppercase tracking-wide text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-ink-soft">{a.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Meet Our Heroes</span>
            <h2 className="h-section mt-3">The faces of our mission</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 reveal-group">
            {gallery.map((src, i) => (
              <div key={src} className="group overflow-hidden rounded-xl shadow-[var(--shadow-card)]">
                <img
                  src={src}
                  alt={`Foundation aid recipient ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="depth-brand py-20 text-center text-white">
        <div className="container-x reveal">
          <h2 className="h-section text-white">Be part of the next 350</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Every gift becomes direct help for a military family — and hope for a future aviator.
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
