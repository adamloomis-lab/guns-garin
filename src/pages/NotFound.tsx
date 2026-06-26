import { Link } from 'wouter'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand-ink)] text-white">
      <img
        src="/images/hero-jet-poster.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        loading="eager"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(8,27,56,0.6), rgba(8,27,56,0.88))' }}
        aria-hidden="true"
      />
      <div className="container-x relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center [text-shadow:0_2px_18px_rgba(8,27,56,0.85)]">
        <span className="eyebrow">Error 404</span>
        <h1 className="h-display mt-4 text-white">Off the radar</h1>
        <p className="mt-5 max-w-md text-white/85">
          We couldn’t find that page. Let’s get you back on course.
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </section>
  )
}
