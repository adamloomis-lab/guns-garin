import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Adapted from cult-ui's logo-carousel: instead of SVG components per logo,
// we render <img> elements from a list of {name, src} entries (matches our
// partners data shape). Same staggered column cycling + spring entry / blur exit.

type LogoItem = { name: string; src: string }

const shuffleArray = <T,>(arr: readonly T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Distribute logos evenly across N columns; pad shorter columns so each cycles
// the same number of slots (avoids unequal cadence per column).
function distributeLogos(logos: LogoItem[], columnCount: number): LogoItem[][] {
  const shuffled = shuffleArray(logos)
  const columns: LogoItem[][] = Array.from({ length: columnCount }, () => [])
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })
  const maxLength = Math.max(...columns.map((c) => c.length))
  columns.forEach((col) => {
    while (col.length < maxLength) col.push(shuffled[col.length % shuffled.length])
  })
  return columns
}

interface LogoColumnProps {
  readonly logos: LogoItem[]
  readonly index: number
  readonly currentTime: number
}

const LogoColumn = React.memo(({ logos, index, currentTime }: LogoColumnProps) => {
  const cycleInterval = 2200
  const columnDelay = index * 220
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
  const currentIndex = Math.floor(adjustedTime / cycleInterval)
  const current = logos[currentIndex]

  return (
    <motion.div
      className="relative h-20 w-28 overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-card)] sm:h-24 sm:w-36 md:h-28 md:w-44"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${current.name}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center px-5"
          initial={{ y: '10%', opacity: 0, filter: 'blur(8px)' }}
          animate={{
            y: '0%',
            opacity: 1,
            filter: 'blur(0px)',
            transition: { type: 'spring', stiffness: 300, damping: 20, mass: 1, bounce: 0.2, duration: 0.5 },
          }}
          exit={{
            y: '-20%',
            opacity: 0,
            filter: 'blur(6px)',
            transition: { type: 'tween', ease: 'easeIn', duration: 0.3 },
          }}
        >
          <img
            src={current.src}
            alt={`${current.name} logo`}
            className="max-h-12 w-auto max-w-full object-contain"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})
LogoColumn.displayName = 'LogoColumn'

export default function LogoCarousel({
  logos,
  columnCount = 5,
}: {
  readonly logos: readonly LogoItem[]
  readonly columnCount?: number
}) {
  const [logoSets, setLogoSets] = useState<LogoItem[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const allLogos = useMemo(() => [...logos], [logos])

  useEffect(() => {
    setLogoSets(distributeLogos(allLogos, columnCount))
  }, [allLogos, columnCount])

  const updateTime = useCallback(() => {
    setCurrentTime((t) => t + 100)
  }, [])

  useEffect(() => {
    const id = setInterval(updateTime, 100)
    return () => clearInterval(id)
  }, [updateTime])

  if (logoSets.length === 0) {
    // Pre-hydration / no-JS fallback: render a static row so the sponsor area
    // never appears empty.
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {logos.slice(0, 6).map((l) => (
          <div
            key={l.name}
            className="flex h-20 w-28 items-center justify-center rounded-xl border border-line bg-white px-5 shadow-[var(--shadow-card)] sm:h-24 sm:w-36 md:h-28 md:w-44"
          >
            <img src={l.src} alt={`${l.name} logo`} className="max-h-12 w-auto max-w-full object-contain" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {logoSets.map((cols, i) => (
        <LogoColumn key={i} logos={cols} index={i} currentTime={currentTime} />
      ))}
    </div>
  )
}
