import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import ScholarshipForm from '../components/ScholarshipForm'
import { scholarshipForm } from '../data/site'

export default function FlightScholarship() {
  return (
    <>
      <PageHero
        eyebrow="Flight Scholarships"
        title="Flight scholarship application"
        intro="Major Garin loved the sky. We keep that love alive by helping young pilots pay for the hours that get them to a license and a career."
        image="/images/jet-taxi-poster.webp"
      />

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 reveal-left">
            <p className="text-lg text-ink-soft">{scholarshipForm.intro}</p>
            <div className="mt-8">
              <ScholarshipForm />
            </div>
          </div>

          <aside className="lg:col-span-5 reveal-right space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-7">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
                Before you apply
              </h2>
              <ul className="mt-4 space-y-3">
                {scholarshipForm.requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-ink-soft">
                    <Check size={18} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
                About the essay
              </h2>
              <p className="mt-2 text-ink-soft">
                The essay carries real weight in our review. Write it in your own voice and take the
                space you need. We are looking for a plan, not a performance.
              </p>
            </div>

            <div className="card p-7">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
                Questions first?
              </h2>
              <p className="mt-2 text-ink-soft">
                If something about the scholarship is unclear, ask us before you start. We would
                rather answer a question than have you guess.
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
