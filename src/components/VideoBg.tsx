// Decorative autoplaying background video. Muted + loop + playsInline so it
// autoplays on mobile; poster shows instantly and is the fallback if the video
// can't load or autoplay. Always paired with a color overlay for text contrast.
export default function VideoBg({
  src,
  poster,
  className = '',
}: {
  readonly src: string
  readonly poster: string
  readonly className?: string
}) {
  return (
    <video
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
