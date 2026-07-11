import { useEffect, useState } from 'react'

const TICKET_PRICE = 5
const money = (cents: number) => `$${(cents / 100).toLocaleString('en-US')}`

interface Pot { potCents: number; tickets: number; entrants: number; drawn: boolean }

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
  const [done, setDone] = useState<{ numbers: number[]; drawLabel: string } | null>(null)

  const loadPot = () =>
    fetch('/.netlify/functions/raffle-enter').then((r) => r.json()).then(setPot).catch(() => {})
  useEffect(() => { loadPot() }, [])

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
      setDone({ numbers: data.numbers, drawLabel: data.drawLabel })
      loadPot()
    } catch {
      setError('Network hiccup. Please try again.')
    }
    setBusy(false)
  }

  function reset() {
    setName(''); setEmail(''); setPhone(''); setQty(1); setPaidBy(''); setOptIn(true); setDone(null); setError('')
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  const field = 'w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-[16px] text-[var(--color-ink)] outline-none focus:border-[var(--color-brand-bright)] focus:ring-2 focus:ring-[var(--color-brand-bright)]/25'

  return (
    <section className="min-h-screen bg-[var(--color-brand-ink)] px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">Guns Garin Memorial Foundation</div>
          <h1 className="mt-2 font-black leading-none text-white" style={{ fontSize: '46px' }}>
            <span className="text-[var(--color-gold-soft)]">50/50</span> Raffle
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-white/75">
            All proceeds go directly to our military and veteran families. Winner takes half the pot.
          </p>
        </div>

        {/* Live pot */}
        {pot && (
          <div className="mt-6 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-brand)] px-5 py-4 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">The pot so far</div>
            <div className="mt-1 text-[40px] font-black leading-none text-white">{money(pot.potCents)}</div>
            <div className="mt-1 text-[13px] text-white/70">Winner takes {money(Math.round(pot.potCents / 2))} &middot; {pot.tickets.toLocaleString()} tickets in</div>
          </div>
        )}

        {done ? (
          /* ---- Success ---- */
          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-success)]">You're in. Good luck!</div>
            <h2 className="mt-2 text-[22px] font-extrabold text-[var(--color-brand)]">Your ticket number{done.numbers.length === 1 ? '' : 's'}</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {done.numbers.map((n) => (
                <span key={n} className="rounded-lg border border-[var(--color-gold)] bg-[var(--color-brand)] px-3.5 py-2 text-[20px] font-black text-[var(--color-gold-soft)]">#{n}</span>
              ))}
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
              We just emailed these to you. <strong>Screenshot this screen</strong> so you have them handy.
              <br /><br />Drawing: <strong>{done.drawLabel}</strong>. You do not have to be present to win.
            </p>
            <button onClick={reset} className="mt-6 w-full rounded-xl bg-[var(--color-gold)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-brand-ink)]">
              Enter more tickets
            </button>
          </div>
        ) : (
          /* ---- Form ---- */
          <form onSubmit={submit} className="mt-6 rounded-2xl bg-white p-6 shadow-xl">
            <p className="mb-4 text-center text-[14px] font-semibold text-[var(--color-ink-soft)]">
              Paid by QR code or cash? Enter your info below to get your ticket numbers.
            </p>

            <label className="block text-[13px] font-semibold text-[var(--color-ink)]">Full name
              <input className={`mt-1.5 ${field}`} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
            <label className="mt-4 block text-[13px] font-semibold text-[var(--color-ink)]">Email
              <input type="email" className={`mt-1.5 ${field}`} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="We send your numbers here" />
            </label>
            <label className="mt-4 block text-[13px] font-semibold text-[var(--color-ink)]">Phone <span className="font-normal text-[var(--color-muted)]">(optional)</span>
              <input type="tel" className={`mt-1.5 ${field}`} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </label>

            {/* Ticket stepper */}
            <div className="mt-5">
              <div className="text-[13px] font-semibold text-[var(--color-ink)]">How many tickets? <span className="font-normal text-[var(--color-muted)]">($5 each)</span></div>
              <div className="mt-2 flex items-center gap-3">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One fewer ticket" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-[var(--color-line)] text-2xl font-bold text-[var(--color-brand)]">&minus;</button>
                <input type="number" min={1} max={500} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(500, Math.floor(Number(e.target.value)) || 1)))} className="h-12 w-full rounded-xl border border-[var(--color-line)] text-center text-[22px] font-black text-[var(--color-brand)] outline-none focus:border-[var(--color-brand-bright)]" />
                <button type="button" onClick={() => setQty((q) => Math.min(500, q + 1))} aria-label="One more ticket" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-[var(--color-line)] text-2xl font-bold text-[var(--color-brand)]">+</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[1, 2, 5, 10, 20].map((n) => (
                  <button key={n} type="button" onClick={() => setQty(n)} className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold ${qty === n ? 'bg-[var(--color-brand)] text-white' : 'bg-[var(--color-surface-soft)] text-[var(--color-ink-soft)]'}`}>{n}</button>
                ))}
              </div>
              <div className="mt-3 rounded-xl bg-[var(--color-surface-soft)] px-4 py-3 text-center text-[15px] font-bold text-[var(--color-brand)]">
                {qty} ticket{qty === 1 ? '' : 's'} = <span className="text-[var(--color-honor)]">${qty * TICKET_PRICE}</span>
              </div>
            </div>

            {/* Paid by */}
            <div className="mt-5">
              <div className="text-[13px] font-semibold text-[var(--color-ink)]">How did you pay?</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([['givebutter', 'QR / Card'], ['cash', 'Cash']] as const).map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setPaidBy(val)} className={`rounded-xl border-2 px-4 py-3 text-[14px] font-bold ${paidBy === val ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white' : 'border-[var(--color-line)] text-[var(--color-ink-soft)]'}`}>{label}</button>
                ))}
              </div>
            </div>

            <label className="mt-5 flex items-start gap-2.5 text-[13px] text-[var(--color-ink-soft)]">
              <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand)]" />
              Keep me posted about next year's outing and the foundation.
            </label>

            {error && <div className="mt-4 rounded-xl bg-[var(--color-honor)]/10 px-4 py-3 text-[14px] font-semibold text-[var(--color-honor)]">{error}</div>}

            <button type="submit" disabled={busy} className="mt-5 w-full rounded-xl bg-[var(--color-gold)] px-6 py-4 text-[16px] font-black text-[var(--color-brand-ink)] disabled:opacity-60">
              {busy ? 'Getting your numbers…' : `Get my ${qty} ticket number${qty === 1 ? '' : 's'}`}
            </button>
            <p className="mt-3 text-center text-[12px] text-[var(--color-muted)]">Must be 18 or older. Drawing Monday, July 13 at 2:00 PM ET.</p>
          </form>
        )}

        <p className="mt-6 text-center text-[12px] text-white/50">Guns Garin Memorial Foundation &middot; Honor their sacrifice. Change their story.</p>
      </div>
    </section>
  )
}
