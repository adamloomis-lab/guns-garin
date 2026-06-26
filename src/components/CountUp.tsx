import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// SSR renders the final value (correct for crawlers / no-JS). On the client we
// reset to 0 before paint, then animate up when the number scrolls into view.
// Honors prefers-reduced-motion by skipping the animation entirely.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function CountUp({
  target,
  prefix = '',
  suffix = '',
  duration = 1700,
}: {
  readonly target: number
  readonly prefix?: string
  readonly suffix?: string
  readonly duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(target)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return

    setN(0) // pre-paint reset — no flicker
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const start = performance.now()
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3)
              setN(Math.round(target * eased))
              if (p < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
            io.disconnect()
          }
        }
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
