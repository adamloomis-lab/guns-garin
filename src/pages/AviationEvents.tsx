import { Link } from 'wouter'
import { Plane, Heart, ArrowRight, Users, GraduationCap, ShieldCheck, Landmark, MessageSquare, Sparkles, Mail } from 'lucide-react'
import PageHero from '../components/PageHero'

const reasons = [
  { icon: Users, text: 'Build relationships within the aviation community' },
  { icon: GraduationCap, text: 'Introduce young people to aviation careers and opportunities' },
  { icon: ShieldCheck, text: 'Connect veterans with fellow aviators' },
  { icon: Landmark, text: 'Celebrate local airports and aviation history' },
  { icon: MessageSquare, text: 'Share stories, knowledge, and experiences' },
  { icon: Sparkles, text: 'Keep the aviation community active, engaged, and growing' },
]

const gallery = [
  { src: '/images/fly-in-family-biplane.webp', alt: 'A family poses in front of a yellow biplane at a fly-in' },
  { src: '/images/fly-in-smoke-pass.webp', alt: 'Children watching a smoke-pass at a fly-in' },
  { src: '/images/fly-in-flyby.webp', alt: 'A spectator photographs a small plane making a low flyby' },
  { src: '/images/fly-in-organizers.webp', alt: 'Two organizers on the grass field at a fly-in' },
]

export default function AviationEvents() {
  return (
    <>
      <PageHero
        eyebrow="Aviation Events"
        title="Bringing the aviation community together"
        intro="Throughout the year, the Guns Garin Memorial Foundation hosts and supports a variety of aviation fly-ins in partnership with the Carolina Aviators Network (CAN)."
        image="/images/fly-in-aerial.webp"
      />

      {/* Intro */}
      <section className="py-20 md:py-24">
        <div className="container-x mx-auto max-w-3xl text-center reveal">
          <span className="eyebrow">Fly-Ins</span>
          <h2 className="h-section mt-3">More than airplanes — it’s about people</h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mt-6 text-lg text-ink-soft">
            These gatherings are not formal fundraisers or large-scale events. They are opportunities
            for pilots, aviation enthusiasts, veterans, students, families, and friends to come
            together around a shared passion for flight.
          </p>
          <p className="mt-4 text-ink-soft">
            Some fly-ins are planned months in advance. Others happen spontaneously when the weather
            is right, the community is available, and there is an opportunity to gather. No matter
            the size, each event reflects the spirit of aviation that inspired our foundation from
            the very beginning.
          </p>
        </div>
      </section>

      {/* Why we host */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Why We Host Fly-Ins</span>
            <h2 className="h-section mt-3">Aviation connects us</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              Aviation has a unique way of connecting people across generations, backgrounds, and
              experiences. Our fly-ins create space to:
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 reveal-group">
            {reasons.map((r) => (
              <div
                key={r.text}
                className="card lift p-7"
                style={{ borderTop: '3px solid var(--color-gold)' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)]">
                  <r.icon size={22} />
                </div>
                <p className="mt-5 text-ink">{r.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-medium text-brand reveal">
            Most importantly, these events remind us that aviation is about more than airplanes — it
            is about people.
          </p>
        </div>
      </section>

      {/* Community built around flight — split image + text */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 reveal-left">
            <img
              src="/images/fly-in-family-biplane.webp"
              alt="A family poses in front of a yellow biplane at a Carolina Aviators Network fly-in"
              className="mx-auto w-full max-w-xs rounded-2xl object-cover shadow-[var(--shadow-lift)]"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-7 reveal-right">
            <span className="eyebrow">A Community Built Around Flight</span>
            <h2 className="h-section mt-3">Every aircraft. Every story. Every neighbor.</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              From vintage aircraft and warbirds to homebuilt airplanes and modern general aviation,
              every fly-in brings together individuals who share a love for aviation and a desire to
              preserve its future.
            </p>
            <p className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-ink">
              Whether you arrive by air or by car — everyone is welcome.
            </p>
          </div>
        </div>
      </section>

      {/* Moments from the ramp — gallery */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Moments From the Ramp</span>
            <h2 className="h-section mt-3">Every fly-in has its own story</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              The aircraft, friendships, conversations, and memories that make these gatherings
              special.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 reveal-group">
            {gallery.map((g) => (
              <div key={g.src} className="group overflow-hidden rounded-xl shadow-[var(--shadow-card)]">
                <img
                  src={g.src}
                  alt={g.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing thank-you */}
      <section className="relative overflow-hidden depth-ink py-20 text-center text-white md:py-24">
        <div className="container-x reveal">
          <p className="mx-auto max-w-3xl text-lg text-white/90">
            We are grateful for our partnership with the Carolina Aviators Network and for the
            pilots, volunteers, airport teams, and supporters who help make these events possible.
          </p>
          <p className="font-display mt-6 text-2xl font-semibold uppercase tracking-wide text-[var(--color-gold-soft)] md:text-3xl">
            Blue skies, safe travels, and we’ll see you at the next fly-in. <span aria-label="airplane">✈️</span>
          </p>
        </div>
      </section>

      {/* Shiflet Fly-In flyer */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Coming Up</span>
            <h2 className="h-section mt-3">Shiflet Fly-In 2026</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              A day of aviation, community, and fun — hosted by the Carolina Aviators Network and
              the Guns Garin Memorial Foundation.
            </p>
          </div>

          {/* Flyer — centerpiece */}
          <div className="mx-auto mt-12 max-w-2xl reveal-scale">
            <img
              src="/images/shiflet-fly-in-flyer.webp"
              alt="Shiflet Fly-In 2026 flyer — hosted by Carolina Aviators Network and Guns Garin Memorial Foundation"
              className="mx-auto w-full rounded-2xl border border-line shadow-[var(--shadow-lift)]"
              loading="lazy"
            />
          </div>

          {/* Headline benefits below the flyer */}
          <div className="mx-auto mt-12 max-w-3xl text-center reveal">
            <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
              Help us make the 2026 Shiflet Fly-In even bigger
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
              The Shiflet Fly-In brings together pilots, aviation enthusiasts, families, and local
              communities for a full day of aviation, connection, and fun.
            </p>
            <ul className="mx-auto mt-7 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {['300+ attendees', '50 aircraft', 'Food trucks', 'Live music'].map((x) => (
                <li
                  key={x}
                  className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white p-3 text-sm font-medium text-ink"
                >
                  <Plane size={16} className="text-[var(--color-gold)]" /> {x}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Plus aircraft displays, food, music, raffles, and more.
            </p>
          </div>

          {/* Sponsorship opportunities */}
          <div className="mx-auto mt-16 max-w-4xl reveal">
            <div
              className="card p-8 md:p-10"
              style={{ borderTop: '3px solid var(--color-gold)' }}
            >
              <span className="eyebrow">Sponsorship Opportunities</span>
              <h3 className="font-display mt-3 text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
                No set fee. Just give what feels fair.
              </h3>
              <p className="mt-4 text-ink-soft">
                We are not requiring a set sponsorship fee. We simply ask businesses to contribute
                in whatever way works best for them:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-surface-soft p-5">
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-brand">
                    Any monetary amount
                  </p>
                  <p className="mt-1 text-ink">
                    Whatever feels fair for your business.
                  </p>
                </div>
                <div className="rounded-xl bg-surface-soft p-5">
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-brand">
                    A raffle item
                  </p>
                  <p className="mt-1 text-ink">
                    Gift card, service, product, or experience for our raffle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What sponsors receive */}
          <div className="mt-14">
            <div className="mx-auto max-w-2xl text-center reveal">
              <span className="eyebrow">What Sponsors Receive</span>
              <h3 className="font-display mt-3 text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
                More than a logo on a banner
              </h3>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3 reveal-group">
              {[
                {
                  icon: Users,
                  title: 'Community Exposure',
                  body: 'Your business will be promoted to pilots, aviation enthusiasts, families, and aviation enthusiasts from across the region.',
                },
                {
                  icon: Sparkles,
                  title: 'Sponsor Recognition',
                  body: 'Sponsors may receive social media recognition, logo placement on event materials, and recognition during raffle announcements.',
                },
                {
                  icon: Heart,
                  title: 'Support a Meaningful Mission',
                  body: 'Support the mission of CAN and GGMF and help strengthen aviation education, youth programs, and community outreach.',
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="card lift p-7"
                  style={{ borderTop: '3px solid var(--color-gold)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)]">
                    <b.icon size={22} />
                  </div>
                  <h4 className="font-display mt-5 text-lg font-semibold uppercase tracking-wide text-ink">
                    {b.title}
                  </h4>
                  <p className="mt-3 text-ink-soft">{b.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mx-auto mt-14 max-w-3xl text-center reveal">
            <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink md:text-xl">
              Interested in partnering with us?
            </p>
            <a href="mailto:contact@flyCAN.org" className="btn btn-gold mt-5">
              <Mail size={18} /> contact@flyCAN.org
            </a>
            <p className="mt-6 text-sm text-muted">
              Thank you for helping us continue growing one of the Carolinas’ most exciting aviation
              events.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="depth-brand py-20 text-center text-white">
        <div className="container-x reveal">
          <h2 className="h-section text-white">Support the mission that fuels these moments</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Every gift to the Guns Garin Memorial Foundation keeps us standing with our veterans —
            and keeps the aviation community we love thriving.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn btn-gold">
              <Heart size={18} /> Donate Now
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Get in Touch <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
