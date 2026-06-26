import { Heart, Repeat, ShieldCheck, Plane, Home as HomeIcon, Utensils, Navigation } from 'lucide-react'
import { org, impactAreas } from '../data/site'
import PageHero from '../components/PageHero'
import VideoBg from '../components/VideoBg'

const areaIcons = [HomeIcon, Utensils, Navigation]

const benefits = [
  {
    icon: Repeat,
    title: 'Steady, reliable support',
    body: 'Recurring gifts let us say “yes” the moment a family needs us — no waiting, no red tape.',
  },
  {
    icon: ShieldCheck,
    title: '100% to veterans',
    body: 'Every dollar of your monthly gift goes directly to the veterans and families we serve.',
  },
  {
    icon: Plane,
    title: 'Honor a legacy',
    body: 'You keep Major Garin’s mission flying — caring for military families and future aviators.',
  },
]

export default function FlightCrew() {
  return (
    <>
      <PageHero
        eyebrow="Monthly Giving"
        title="Join the Flight Crew"
        intro="And ensure no veteran is left behind — on the battlefield or at home. Flight Crew is our monthly donor program that empowers you to help those who protect us all."
        image="/images/cockpit-poster.webp"
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3 reveal-group">
            {benefits.map((b) => (
              <div key={b.title} className="card lift p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand text-[var(--color-gold-soft)]">
                  <b.icon size={24} />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold uppercase tracking-wide text-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl bg-[var(--color-brand-ink)] p-10 text-center text-white reveal-scale md:p-14">
            <VideoBg src="/videos/jet-taxi.mp4" poster="/images/jet-taxi-poster.webp" className="opacity-80" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.55), rgba(8,27,56,0.72))' }}
              aria-hidden="true"
            />
            <h2 className="h-section relative text-white">Become a monthly member</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-white/85">
              Choose your monthly amount and join a community of supporters who make sure help is
              always ready when a military family needs it.
            </p>
            <a
              href={org.give.flightCrew}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold relative mt-8"
            >
              <Heart size={18} /> Join the Flight Crew
            </a>
            <p className="relative mt-4 text-xs text-white/60">Securely processed by GiveButter.</p>
          </div>
        </div>
      </section>

      <section className="depth-soft py-20 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center reveal">
            <span className="eyebrow">Your Monthly Gift Provides</span>
            <h2 className="h-section mt-3">Help that’s always ready</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 reveal-group">
            {impactAreas.slice(0, 3).map((a, i) => {
              const Icon = areaIcons[i] ?? HomeIcon
              return (
                <div
                  key={a.title}
                  className="card lift p-7"
                  style={{ borderTop: '3px solid var(--color-gold)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand">
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

      {/* Closing CTA */}
      <section className="relative overflow-hidden depth-brand py-20 text-center text-white">
        <div className="container-x relative reveal">
          <h2 className="h-section text-white">Ready to join the crew?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            A few dollars a month keeps help ready the moment a veteran family needs it. Become a
            member of the Flight Crew today.
          </p>
          <a
            href={org.give.flightCrew}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold mt-9"
          >
            <Heart size={18} /> Join the Flight Crew
          </a>
        </div>
      </section>
    </>
  )
}
