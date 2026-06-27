import { Link } from 'wouter'
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Plane,
  Trophy,
  HeartPulse,
  CalendarCheck,
  Building2,
  Church,
  Award,
  Check,
} from 'lucide-react'
import { stats } from '../data/site'
import PageHero from '../components/PageHero'
import Partners from '../components/Partners'
import CountUp from '../components/CountUp'

const aboutPrograms = [
  {
    icon: ShieldCheck,
    title: 'Veteran Family Relief & Assistance',
    body: 'We believe every veteran is unique and should be cared for that way. With an average response time of less than 24 hours, and more than 300 veterans helped to date, we mobilize aid quickly and effectively for our service members and their families when they need it most.',
    cta: null,
  },
  {
    icon: Plane,
    title: 'Aviation Education',
    body: 'Our partnership with E3 Aviation lets us educate and empower future aviators by providing exclusive access to thousands of hours of premium aviation educational content, completely free for students.',
    cta: null,
  },
  {
    icon: Trophy,
    title: 'Annual Golf Tournament',
    body: 'The Annual Guns Garin Memorial Golf Tournament is hosted by PGA Tour Player Michael Thompson and benefits veterans and their families around the country.',
    cta: { label: 'Learn More', href: '/golf-tournament' as const },
  },
  {
    icon: HeartPulse,
    title: 'Veteran Mental Health Initiative',
    body: '1 in 3 veterans is actively dealing with a known mental health issue, including PTSD, depression, anxiety, substance abuse, and TBI. GGMF is committed to helping provide in-person and group therapy for veterans who need it.',
    cta: null,
  },
]

const partnershipTypes = [
  {
    icon: CalendarCheck,
    title: 'Event Sponsorships',
    body: 'Sponsor a Guns Garin event and publicly show your support for our military.',
  },
  {
    icon: Building2,
    title: 'Corporate Sponsorships',
    body: 'Make a monthly pledge, a one-time donation, or run an employee action campaign.',
  },
  {
    icon: Church,
    title: 'Church Partners',
    body: 'Make supporting our veterans part of your missions program and tell your congregation you stand with our military.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Foundation"
        title="Our mission & the man behind it"
        intro="We exist to support local military families during times of hardship, and to inspire the next generation to explore a career in aviation, honoring the life and legacy of Major Rick “GUNS” Garin."
        video="/videos/cockpit.mp4"
        poster="/images/cockpit-poster.webp"
      />

      {/* Foundation overview */}
      <section className="py-20 md:py-24">
        <div className="container-x mx-auto max-w-3xl text-center reveal">
          <span className="eyebrow">Foundation Overview</span>
          <h2 className="h-section mt-3">A twofold mission</h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mt-6 text-lg text-ink-soft">
            First, we stand with local military families during times of hardship, mobilizing fast,
            direct relief when they need it most. Second, we educate and encourage young people to
            explore a career in aviation, opening the cockpit through free, premium educational
            content with our partner E3 Aviation.
          </p>
        </div>
      </section>

      {/* Garin bio */}
      <section className="depth-soft py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 reveal-left">
            <img
              src="/images/garin-cockpit.webp"
              alt="Major Rick “GUNS” Garin in the cockpit of an F-16"
              className="w-full rounded-2xl object-cover shadow-[var(--shadow-lift)]"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6 reveal-right">
            <span className="eyebrow">In Memory Of</span>
            <h2 className="h-section mt-3">Major Rick “Guns” Garin</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-lg text-ink">
              Major Richard Charles “GUNS” Garin (Rick) was a loving, dedicated, and accomplished
              person who made the world a better place wherever he went.
            </p>
            <p className="mt-4 text-ink-soft">
              He was an incredible husband, father, brother, son, friend, and pilot. This
              organization was founded to honor his life and to inspire other young aspiring pilots
              to follow in his footsteps. The members of our board see the importance of preserving
              his memory through the efforts of the Foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Programs & events */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Programs & Events</span>
            <h2 className="h-section mt-3">How the foundation serves</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 reveal-group">
            {aboutPrograms.map((p) => (
              <div
                key={p.title}
                className="card lift flex flex-col p-8"
                style={{ borderTop: '3px solid var(--color-gold)' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-[var(--color-gold-soft)]">
                  <p.icon size={24} />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold uppercase tracking-wide text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-ink-soft">{p.body}</p>
                {p.cta && (
                  <Link href={p.cta.href} className="btn btn-outline mt-6 self-start">
                    {p.cta.label} <ArrowRight size={17} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Squadron banner */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[440px] overflow-hidden md:h-[66vh]">
          <img
            src="/images/squadron.webp"
            alt="Major Garin’s fighter squadron in front of an F-16"
            className="h-full w-full object-cover object-[center_50%]"
            loading="lazy"
          />
          <div
            className="absolute inset-0 flex items-end"
            style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0) 45%, rgba(8,27,56,0.82) 100%)' }}
          >
            <div className="container-x pb-10">
              <p className="font-display max-w-2xl text-2xl font-semibold uppercase tracking-wide text-white [text-shadow:0_2px_18px_rgba(8,27,56,0.85)] md:text-3xl">
                Standing in the gap for those who stood for us.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Organizational partnerships */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Become a Partner</span>
            <h2 className="h-section mt-3">Partners make an even bigger impact</h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mt-6 text-lg text-ink-soft">
              Corporate, event, and church partnerships reach more veterans and create more impact.
              Align your organization with a mission that delivers help within 24 hours.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3 reveal-group">
            {partnershipTypes.map((p) => (
              <div key={p.title} className="card lift p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-soft text-brand">
                  <p.icon size={26} />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold uppercase tracking-wide text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal">
            <Link href="/contact" className="btn btn-primary">
              Become a Partner <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors & partners logos */}
      <section className="depth-soft py-20 md:py-24">
        <div className="container-x">
          <Partners />
        </div>
      </section>

      {/* Michael Thompson */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 reveal-left">
            <div className="relative">
              <img
                src="/images/michael-thompson.webp"
                alt="Michael Thompson, PGA Tour Professional"
                className="w-full rounded-2xl object-cover shadow-[var(--shadow-lift)]"
                loading="lazy"
              />
              <span className="absolute -bottom-4 left-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-[#1a1303] shadow-[var(--shadow-card)]">
                <Award size={16} /> PGA Tour Professional
              </span>
            </div>
          </div>
          <div className="lg:col-span-7 reveal-right">
            <span className="eyebrow">PGA Tour Partnership</span>
            <h2 className="h-section mt-3">Michael Thompson</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-ink-soft">
              We are deeply grateful to Michael Thompson for his generous support of our foundation.
              Michael is an 11-year veteran member of the PGA Tour, winner of the 2020 3M Open and
              the 2013 Honda Classic, and runner-up at the 2012 U.S. Open.
            </p>
            <p className="mt-4 text-ink-soft">
              A graduate of the University of Alabama, Michael has been a consummate professional and
              volunteer ever since attaining the rank of Eagle Scout in the Boy Scouts of America.
              He is committed to helping veterans and their families in partnership with our
              foundation.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {['2020 3M Open Champion', '2013 Honda Classic Champion', '2012 U.S. Open Runner-Up'].map(
                (x) => (
                  <li key={x} className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Check size={16} className="text-[var(--color-gold)]" /> {x}
                  </li>
                ),
              )}
            </ul>
            <Link href="/ohio" className="btn btn-gold mt-8">
              <Trophy size={18} /> Play in the 2026 Tournament
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="depth-brand py-20 text-center text-white">
        <div className="container-x reveal">
          <h2 className="h-section text-white">Help us carry the legacy forward</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Your gift puts real help in the hands of military families, and keeps the dream of
            flight within reach for the next generation.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn btn-gold">
              <Heart size={18} /> Donate Now
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Become a Partner <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
