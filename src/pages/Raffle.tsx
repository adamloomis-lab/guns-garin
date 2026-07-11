import { useEffect, useRef, useState } from 'react'

const TICKET_PRICE = 5
const money = (cents: number) => `$${(cents / 100).toLocaleString('en-US')}`

interface Pot { potCents: number; tickets: number; entrants: number; drawn: boolean }

/* ---------- Animated count-up for the pot ---------- */
function useCountUp(target: number, ms = 900) {
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

/* ---------- Confetti burst (no dependencies, respects reduced motion) ---------- */
function Confetti() {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) return null
  const colors = ['#c0902f', '#e3b85a', '#9b2335', '#1c4f9c', '#ffffff']
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    dur: 2.2 + Math.random() * 1.6,
    size: 6 + Math.random() * 7,
    color: colors[i % colors.length],
    spin: Math.random() > 0.5 ? 1 : -1,
    drift: (Math.random() - 0.5) * 160,
  }))
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: '-4%',
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.55,
            background: p.color,
            borderRadius: 1.5,
            animation: `gg-fall ${p.dur}s ${p.delay}s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
            ['--drift' as string]: `${p.drift}px`,
            ['--spin' as string]: `${p.spin * (540 + Math.random() * 540)}deg`,
          }}
        />
      ))}
    </div>
  )
}

/* Fluid floating-label field (house style, adapted to the foundation brand).
   Lives at module scope so React keeps the input mounted across parent renders
   (defining it inline would remount and drop focus on every keystroke). */
function FluidField({ label, type = 'text', value, onChange, required = false, autoComplete, hint }: {
  readonly label: string; readonly type?: string; readonly value: string; readonly onChange: (v: string) => void
  readonly required?: boolean; readonly autoComplete?: string; readonly hint?: string
}) {
  const [focus, setFocus] = useState(false)
  const up = focus || value.length > 0
  return (
    <div className={`gg-field relative mt-5 rounded-xl border bg-white transition-all duration-200 ${focus ? 'border-[var(--color-brand-bright)] shadow-[0_0_0_4px_rgba(28,79,156,0.12)]' : 'border-[var(--color-line)]'}`}>
      <label className="block cursor-text px-4 pb-2.5 pt-6">
        <span className={`pointer-events-none absolute left-4 transition-all duration-200 ${up ? 'top-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand-bright)]' : 'top-1/2 -translate-y-1/2 text-[16px] text-[var(--color-muted)]'}`}>
          {label}{required ? '' : '  (optional)'}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required={required}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-[16px] font-medium text-[var(--color-ink)] outline-none"
        />
      </label>
      <span className={`pointer-events-none absolute inset-x-4 bottom-0 h-[2px] origin-center rounded bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-soft)] transition-transform duration-300 ${focus ? 'scale-x-100' : 'scale-x-0'}`} />
      {hint && up && <span className="absolute -bottom-5 left-1 text-[11px] text-[var(--color-muted)]">{hint}</span>}
    </div>
  )
}

export default function Raffle() {
  const [pot, setPot] = useState<Pot | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [qty, setQty] = useState(1)
  const [paidBy, setPaidBy] = useState<'givebutter' | 'cash' | ''>('')
  const [optIn, setOptIn] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<{ numbers: number[]; drawLabel: string; firstName: string } | null>(null)
  const [celebrate, setCelebrate] = useState(false)

  const potValue = useCountUp(pot?.potCents ?? 0)
  const payoutValue = useCountUp(Math.round((pot?.potCents ?? 0) / 2))

  // Live pot: refresh on load and every 12s so the number climbs at the table.
  useEffect(() => {
    const load = () => fetch('/.netlify/functions/raffle-enter').then((r) => r.json()).then(setPot).catch(() => {})
    load()
    const iv = setInterval(load, 12000)
    return () => clearInterval(iv)
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/.netlify/functions/raffle-enter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, tickets: qty, paidBy, optIn }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) { setError(data.error || 'Something went wrong. Please try again.'); setBusy(false); return }
      setDone({ numbers: data.numbers, drawLabel: data.drawLabel, firstName: name.trim().split(/\s+/)[0] || 'friend' })
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 4200)
      fetch('/.netlify/functions/raffle-enter').then((r) => r.json()).then(setPot).catch(() => {})
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Network hiccup. Please try again.')
    }
    setBusy(false)
  }

  function reset() {
    setName(''); setEmail(''); setPhone(''); setQty(1); setPaidBy(''); setOptIn(true); setDone(null); setError('')
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  return (
    <section className="min-h-screen bg-[var(--color-brand-ink)] px-4 py-8" style={{ backgroundImage: 'radial-gradient(1200px 500px at 50% -10%, rgba(28,79,156,0.45), transparent 60%)' }}>
      {/* Component-scoped keyframes */}
      <style>{`
        @keyframes gg-fall { to { transform: translate3d(var(--drift), 108vh, 0) rotate(var(--spin)); opacity: 0.9; } }
        @keyframes gg-pop { 0% { opacity: 0; transform: scale(0.4) translateY(10px); } 60% { transform: scale(1.12) translateY(-2px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes gg-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(227,184,90,0); } 50% { box-shadow: 0 0 24px 2px rgba(227,184,90,0.35); } }
        @keyframes gg-sheen { from { transform: translateX(-150%) skewX(-18deg); } to { transform: translateX(280%) skewX(-18deg); } }
        .gg-ticket { animation: gg-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .gg-pot { animation: gg-glow 3.2s ease-in-out infinite; }
        .gg-sheen-btn { position: relative; overflow: hidden; }
        .gg-sheen-btn::after { content: ''; position: absolute; top: 0; bottom: 0; width: 40%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent); animation: gg-sheen 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .gg-ticket, .gg-pot { animation: none; } .gg-sheen-btn::after { display: none; } }
      `}</style>

      <div className="mx-auto w-full max-w-md">
        {celebrate && <Confetti />}

        {/* Header */}
        <div className="text-center">
          <img src="/images/footerlogo.png" alt="Guns Garin Memorial Foundation" className="mx-auto mb-3 h-16 w-auto" />
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/80">Guns Garin Memorial Foundation</div>
          <h1 className="mt-2 font-black leading-none text-white" style={{ fontSize: '48px', textShadow: '0 2px 24px rgba(227,184,90,0.25)' }}>
            <span className="text-[var(--color-gold-soft)]">50/50</span> Raffle
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-white/75">
            All proceeds go directly to our military and veteran families. Winner takes half the pot.
          </p>
        </div>

        {/* Live pot */}
        {pot && (
          <div className="gg-pot mt-6 rounded-2xl border border-[var(--color-gold)]/50 bg-[var(--color-brand)] px-5 py-5 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">The pot so far</div>
            <div className="mt-1 text-[46px] font-black leading-none text-white tabular-nums">{money(potValue)}</div>
            <div className="mt-1.5 text-[13px] text-white/70 tabular-nums">
              Winner takes <span className="font-bold text-[var(--color-gold-soft)]">{money(payoutValue)}</span> &middot; {pot.tickets.toLocaleString()} tickets in
            </div>
            <div className="mx-auto mt-3 h-[3px] w-16 rounded bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-soft)]" />
            <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/50">Live &middot; updates as tickets sell</div>
          </div>
        )}

        {done ? (
          /* ---------- Success: the reveal ---------- */
          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="text-[13px] font-black uppercase tracking-[0.18em] text-[var(--color-success)]">You're in, {done.firstName}!</div>
            <h2 className="mt-2 text-[24px] font-extrabold text-[var(--color-brand)]">Your lucky number{done.numbers.length === 1 ? '' : 's'}</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {done.numbers.map((n, i) => (
                <span key={n} className="gg-ticket rounded-xl border-2 border-[var(--color-gold)] bg-[var(--color-brand)] px-4 py-2.5 text-[22px] font-black tracking-wide text-[var(--color-gold-soft)] shadow-lg" style={{ animationDelay: `${Math.min(i * 0.12, 2)}s` }}>
                  #{n}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-[var(--color-surface-soft)] px-4 py-3.5 text-left text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
              <strong className="text-[var(--color-ink)]">These are on their way to your email too.</strong> Screenshot this screen as a backup.
              <br />Drawing: <strong className="text-[var(--color-ink)]">{done.drawLabel}</strong>
              <br />You do not have to be present to win.
            </div>
            <button onClick={reset} className="gg-sheen-btn mt-6 w-full rounded-xl bg-[var(--color-gold)] px-6 py-4 text-[16px] font-black text-[var(--color-brand-ink)]">
              Buy more tickets, better odds
            </button>
            <p className="mt-3 text-[12px] text-[var(--color-muted)]">Every ticket helps a military family with rent, food, and emergency relief.</p>
          </div>
        ) : (
          /* ---------- Entry form ---------- */
          <form onSubmit={submit} className="mt-6 rounded-2xl bg-white p-6 shadow-2xl">
            <p className="text-center text-[14px] font-semibold text-[var(--color-ink-soft)]">
              Paid by QR code or cash? Enter your info to get your ticket numbers.
            </p>

            <FluidField label="Full name" value={name} onChange={setName} required autoComplete="name" />
            <FluidField label="Email" type="email" value={email} onChange={setEmail} required autoComplete="email" hint="Your ticket numbers land here" />
            <FluidField label="Phone" type="tel" value={phone} onChange={setPhone} autoComplete="tel" />

            {/* Ticket stepper */}
            <div className="mt-7">
              <div className="text-[13px] font-bold text-[var(--color-ink)]">How many tickets? <span className="font-normal text-[var(--color-muted)]">($5 each)</span></div>
              <div className="mt-2.5 flex items-center gap-3">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One fewer ticket" className="grid h-13 w-13 shrink-0 place-items-center rounded-xl border-2 border-[var(--color-line)] text-2xl font-bold text-[var(--color-brand)] transition-transform active:scale-90" style={{ height: 52, width: 52 }}>&minus;</button>
                <input type="number" min={1} max={500} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(500, Math.floor(Number(e.target.value)) || 1)))} className="h-[52px] w-full rounded-xl border border-[var(--color-line)] text-center text-[24px] font-black text-[var(--color-brand)] outline-none focus:border-[var(--color-brand-bright)] focus:ring-2 focus:ring-[var(--color-brand-bright)]/20" />
                <button type="button" onClick={() => setQty((q) => Math.min(500, q + 1))} aria-label="One more ticket" className="grid shrink-0 place-items-center rounded-xl border-2 border-[var(--color-line)] text-2xl font-bold text-[var(--color-brand)] transition-transform active:scale-90" style={{ height: 52, width: 52 }}>+</button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[1, 2, 5, 10, 20].map((n) => (
                  <button key={n} type="button" onClick={() => setQty(n)} className={`rounded-lg px-4 py-2 text-[13px] font-bold transition-all ${qty === n ? 'scale-105 bg-[var(--color-brand)] text-white shadow-md' : 'bg-[var(--color-surface-soft)] text-[var(--color-ink-soft)]'}`}>{n}</button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[var(--color-brand)] px-4 py-3 text-white">
                <span className="text-[14px] font-semibold">{qty} ticket{qty === 1 ? '' : 's'}</span>
                <span className="text-[20px] font-black text-[var(--color-gold-soft)] tabular-nums">${qty * TICKET_PRICE}</span>
              </div>
            </div>

            {/* Paid by */}
            <div className="mt-6">
              <div className="text-[13px] font-bold text-[var(--color-ink)]">How did you pay?</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([['givebutter', 'QR / Card'], ['cash', 'Cash']] as const).map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setPaidBy(val)} className={`rounded-xl border-2 px-4 py-3.5 text-[14px] font-bold transition-all ${paidBy === val ? 'border-[var(--color-gold)] bg-[var(--color-brand)] text-white shadow-md' : 'border-[var(--color-line)] text-[var(--color-ink-soft)]'}`}>
                    {paidBy === val ? '✓ ' : ''}{label}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-6 flex items-start gap-2.5 text-[13px] leading-snug text-[var(--color-ink-soft)]">
              <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand)]" />
              Keep me posted about next year's outing and the foundation.
            </label>

            {error && <div className="mt-4 rounded-xl bg-[var(--color-honor)]/10 px-4 py-3 text-[14px] font-semibold text-[var(--color-honor)]" role="alert">{error}</div>}

            <button type="submit" disabled={busy} className="gg-sheen-btn mt-6 w-full rounded-xl bg-[var(--color-gold)] px-6 py-4 text-[17px] font-black text-[var(--color-brand-ink)] transition-transform active:scale-[0.98] disabled:opacity-60">
              {busy ? 'Getting your numbers…' : `Get my ${qty} ticket number${qty === 1 ? '' : 's'}`}
            </button>
            <p className="mt-3 text-center text-[12px] text-[var(--color-muted)]">Must be 18 or older. Drawing Monday, July 13 at 2:00 PM ET.</p>
          </form>
        )}

        <p className="mt-6 text-center text-[12px] text-white/50">Honor their sacrifice. <span className="text-[var(--color-gold-soft)]">Change their story.</span></p>
      </div>
    </section>
  )
}
