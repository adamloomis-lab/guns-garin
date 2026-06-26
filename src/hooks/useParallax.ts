import { useEffect } from 'react'

// Gentle parallax: any element with [data-parallax="<speed>"] drifts vertically
// as it scrolls through the viewport. Speed is a small factor (e.g. 0.12 = subtle,
// negative = opposite direction). rAF-throttled and disabled for reduced motion.
export function useParallax(deps: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (els.length === 0) return

    let ticking = false
    const update = () => {
      const vh = window.innerHeight
      for (const el of els) {
        const speed = parseFloat(el.dataset.parallax || '0')
        const rect = el.getBoundingClientRect()
        // Offset from viewport center, scaled by speed.
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [deps])
}
