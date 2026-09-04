import { ShieldCheck, Clock, HeartHandshake } from 'lucide-react'
import PageHero from '../components/PageHero'
import AidRequestForm from '../components/AidRequestForm'
import { aidForm } from '../data/site'

const assurances = [
  {
    Icon: Clock,
    title: 'We move fast',
    body: 'Our relief program responds in under 24 hours on average once a request is reviewed.',
  },
  {
    Icon: ShieldCheck,
    title: 'Your story stays private',
    body: 'What you write here goes to the foundation and nowhere else. We never sell or share it.',
  },
  {
    Icon: HeartHandshake,
    title: 'A person reads it',
    body: 'Every application is read by someone at the foundation, not sorted by a machine.',
  },
]

export default function ApplyForAid() {
  return (
    <>
      <PageHero
        eyebrow="Veteran Family Relief & Assistance"
        title="Apply for aid"
        intro="If your family has hit an unexpected hardship, tell us what happened. We are committed to standing with veterans and their families in the moments that can’t wait."
        image="/images/flag-waving-poster.webp"
      />

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 reveal-left">
            {/* The foundation's September 2026 statement on service area. It sits
                above the form on purpose: applicants should read it before they
                spend time telling us about the hardest week of their year. */}
            <div className="rounded-lg border border-line bg-surface-soft p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                {aidForm.scNotice.heading}
              </h2>
              <span className="gold-rule mt-4" />
              {aidForm.scNotice.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-8 text-lg text-ink-soft">{aidForm.intro}</p>

            <div className="mt-8">
              <AidRequestForm />
            </div>
          </div>

          <aside className="lg:col-span-5 reveal-right space-y-6 lg:sticky lg:top-28 lg:self-start">
            {assurances.map(({ Icon, title, body }) => (
              <div key={title} className="card p-7">
                <Icon size={24} className="text-brand" />
                <h3 className="font-display mt-4 text-lg font-semibold uppercase tracking-wide text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-ink-soft">{body}</p>
              </div>
            ))}

            <div className="card p-7">
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
                Not sure this is the right form?
              </h3>
              <p className="mt-2 text-ink-soft">
                If you have a question about the foundation, want to partner with us, or know
                another family who needs help, send us a note instead.
              </p>
              <a href="/contact" className="btn btn-outline mt-5 !py-2.5 !text-sm">
                Contact the foundation
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
