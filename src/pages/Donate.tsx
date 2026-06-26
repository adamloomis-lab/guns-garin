import { Link } from 'wouter'
import { Heart, Mail, ShieldCheck, Repeat } from 'lucide-react'
import { org, stats, faqs } from '../data/site'
import PageHero from '../components/PageHero'
import CountUp from '../components/CountUp'

export default function Donate() {
  return (
    <>
      <PageHero
        eyebrow="Make a Donation"
        title="Support America's veterans & future aviators"
        intro="The Guns Garin Memorial Foundation is a registered 501(c)(3) tax-exempt organization. Every gift goes directly to the veterans and military families we serve."
        image="/images/hero-jet-poster.webp"
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Give online */}
          <div className="lg:col-span-7 reveal-left">
            <div className="card p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand text-[var(--color-gold-soft)]">
                <Heart size={24} />
              </div>
              <h2 className="font-display mt-5 text-3xl font-semibold uppercase tracking-wide text-ink">
                Give online
              </h2>
              <p className="mt-4 text-ink-soft">
                Make a fast, secure donation through our GiveButter page. Give a one-time gift or set
                up a recurring donation in just a few clicks.
              </p>
              <a
                href={org.give.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold mt-7"
              >
                <Heart size={18} /> Donate Online
              </a>
              <p className="mt-3 text-xs text-muted">Securely processed by GiveButter.</p>

              <div className="mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold text-brand">
                      <CountUp prefix={s.prefix} target={s.target} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other ways */}
          <div className="lg:col-span-5 reveal-right space-y-6">
            <div className="card p-7">
              <div className="flex items-center gap-3">
                <Repeat size={20} className="text-brand" />
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                  Give monthly
                </h3>
              </div>
              <p className="mt-3 text-ink-soft">
                Join the Flight Crew with a recurring gift and keep help ready year-round.
              </p>
              <Link href="/flight-crew" className="btn btn-outline mt-5">
                Join the Flight Crew
              </Link>
            </div>

            <div className="card p-7">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-brand" />
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                  Give by mail
                </h3>
              </div>
              <p className="mt-3 text-ink-soft">Send a check to:</p>
              <address className="mt-2 not-italic text-ink">
                {org.name}
                <br />
                {org.address.street}
                <br />
                {org.address.city}, {org.address.state} {org.address.zip}
              </address>
            </div>

            <div className="card p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[var(--color-success)]" />
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                  Tax-deductible
                </h3>
              </div>
              <p className="mt-3 text-ink-soft">
                We are a registered 501(c)(3) nonprofit. Your donation may be tax-deductible to the
                extent allowed by law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="depth-soft py-20 md:py-24">
        <div className="container-x mx-auto max-w-3xl">
          <div className="text-center reveal">
            <span className="eyebrow">Questions</span>
            <h2 className="h-section mt-3">Good to know</h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-10 space-y-3 reveal-group">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium uppercase tracking-wide text-ink">
                  {f.q}
                  <span className="text-[var(--color-gold)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
