// Responsive 16:9 YouTube embed. Uses youtube-nocookie + lazy loading so it
// doesn't drag down initial page load.
export default function YouTubeEmbed({
  id,
  title,
}: {
  readonly id: string
  readonly title: string
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-lift)]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
