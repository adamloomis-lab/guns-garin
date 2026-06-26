import VideoBg from './VideoBg'

export default function PageHero({
  eyebrow,
  title,
  intro,
  video,
  poster,
  image,
}: {
  readonly eyebrow: string
  readonly title: string
  readonly intro?: string
  readonly video?: string
  readonly poster?: string
  readonly image?: string
}) {
  const hasMedia = (video && poster) || image
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand-ink)] text-white">
      {video && poster && <VideoBg src={video} poster={poster} className="opacity-35" />}
      {!video && image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          loading="eager"
        />
      )}
      {hasMedia && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,27,56,0.55) 0%, rgba(8,27,56,0.82) 100%)',
          }}
          aria-hidden="true"
        />
      )}
      <div
        className={`container-x relative py-20 md:py-28 ${hasMedia ? '[text-shadow:0_2px_18px_rgba(8,27,56,0.85)]' : ''}`}
      >
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h-display mt-4 text-white">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-white/85">{intro}</p>}
      </div>
    </section>
  )
}
