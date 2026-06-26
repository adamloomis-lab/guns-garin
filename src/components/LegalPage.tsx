import type { ReactNode } from 'react'

export default function LegalPage({
  title,
  updated,
  children,
}: {
  readonly title: string
  readonly updated: string
  readonly children: ReactNode
}) {
  return (
    <section className="py-14 md:py-20">
      <div className="container-x mx-auto max-w-3xl">
        <h1 className="h-section">{title}</h1>
        <span className="gold-rule mt-5" />
        <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        <div className="legal-body mt-8 space-y-5 text-ink-soft">{children}</div>
      </div>
    </section>
  )
}
