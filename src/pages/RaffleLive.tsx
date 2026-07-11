import { useEffect, useRef, useState } from 'react'

const money = (cents: number) => `$${(cents / 100).toLocaleString('en-US')}`

interface Pot { potCents: number; tickets: number; entrants: number; drawn: boolean }

function useCountUp(target: number, ms = 1400) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || fromRef.current === target) { fromRef.current = target; setValue(target); return }
    const from = fromRef.current
    fromRef.current = target
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return value
}

/* Big-screen live board for the event table: TV / tablet, hands-off.
   Polls every 6 seconds; flashes gold when the pot climbs. */
export default function RaffleLive() {
  const [pot, setPot] = useState<Pot | null>(null)
  const [flash, setFlash] = useState(false)
  const prevPot = useRef(0)

  useEffect(() => {
    const load = () =>
      fetch('/.netlify/functions/raffle-enter')
        .then((r) => r.json())
        .then((p: Pot) => {
          if (p.potCents > prevPot.current && prevPot.current > 0) {
            setFlash(true)
            setTimeout(() => setFlash(false), 2600)
          }
          prevPot.current = p.potCents
          setPot(p)
        })
        .catch(() => {})
    load()
    const iv = setInterval(load, 6000)
    return () => clearInterval(iv)
  }, [])

  const potValue = useCountUp(pot?.potCents ?? 0)
  const payoutValue = useCountUp(Math.round((pot?.potCents ?? 0) / 2))

  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-brand-ink)] px-6 py-10 text-center"
      style={{ backgroundImage: 'radial-gradient(1400px 700px at 50% -10%, rgba(28,79,156,0.5), transparent 65%)' }}
    >
      <style>{`
        @keyframes ggl-flash { 0%,100% { text-shadow: 0 4px 60px rgba(227,184,90,0.25); } 40% { text-shadow: 0 0 90px rgba(227,184,90,0.95), 0 0 30px rgba(227,184,90,0.8); } }
        @keyframes ggl-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        .ggl-flash { animation: ggl-flash 1.3s ease-in-out 2; }
        .ggl-live { animation: ggl-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ggl-flash, .ggl-live { animation: none; } }
      `}</style>

      <div className="text-[clamp(14px,2vw,22px)] font-bold uppercase tracking-[0.3em] text-white/80">
        Guns Garin Memorial Foundation
      </div>
      <h1 className="mt-2 font-black leading-none text-white" style={{ fontSize: 'clamp(44px,7vw,96px)' }}>
        <span className="text-[var(--color-gold-soft)]">50/50</span> Raffle
      </h1>

      {pot?.drawn ? (
        <div className="mt-10">
          <div className="text-[clamp(20px,3vw,36px)] font-black uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">Winner drawn!</div>
          <div className="mt-4 text-[clamp(16px,2vw,26px)] text-white/80">Thank you for supporting our military and veteran families.</div>
        </div>
      ) : (
        <>
          {/* The pot */}
          <div className="mt-8">
            <div className="text-[clamp(14px,2vw,24px)] font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-soft)]">The pot right now</div>
            <div className={`mt-1 font-black leading-none text-white tabular-nums ${flash ? 'ggl-flash' : ''}`} style={{ fontSize: 'clamp(88px,17vw,240px)', textShadow: '0 4px 60px rgba(227,184,90,0.25)' }}>
              {money(potValue)}
            </div>
          </div>

          {/* Payout */}
          <div className="mt-6 rounded-2xl border-2 border-[var(--color-gold)] bg-[var(--color-brand)] px-10 py-5">
            <div className="text-[clamp(12px,1.6vw,18px)] font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">Winner takes home</div>
            <div className="mt-1 font-black leading-none text-white tabular-nums" style={{ fontSize: 'clamp(40px,7vw,96px)' }}>{money(payoutValue)}</div>
          </div>

          {/* Stats */}
          {pot && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[clamp(14px,1.8vw,22px)] text-white/75 tabular-nums">
              <span><strong className="text-white">{pot.tickets.toLocaleString()}</strong> tickets in</span>
              <span><strong className="text-white">{pot.entrants.toLocaleString()}</strong> players</span>
              <span className="ggl-live text-[var(--color-gold-soft)]">● LIVE</span>
            </div>
          )}

          {/* Call to action */}
          <div className="mt-10 rounded-2xl bg-white px-8 py-5">
            <div className="text-[clamp(14px,1.8vw,20px)] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">Get in before the drawing</div>
            <div className="mt-1 text-[clamp(20px,3vw,34px)] font-black text-[var(--color-honor)]">$5 = 1 ticket &middot; gunsgarin.com/5050</div>
            <div className="mt-1 text-[clamp(12px,1.5vw,16px)] font-semibold text-[var(--color-ink-soft)]">Drawing Monday, July 13 at 2:00 PM &middot; you do not have to be present to win</div>
          </div>
        </>
      )}

      <div className="mt-8 text-[clamp(11px,1.4vw,15px)] uppercase tracking-[0.2em] text-white/40">
        Honor their sacrifice. <span className="text-[var(--color-gold-soft)]">Change their story.</span>
      </div>
    </section>
  )
}
