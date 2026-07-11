import { useState } from 'react'

const money = (cents: number) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

interface Entry { name: string; email: string; phone: string | null; tickets: number; amount_cents: number; paid_by: string | null; created_at: string }
interface Draw { ticket_no: number; winner_name?: string; winner_email?: string; email?: string; phone?: string; name?: string; pot_cents: number; payout_cents: number }
interface Summary {
  tickets: number; entrants: number; potCents: number; payoutCents: number
  cashCents: number; givebutterCents: number; drawLabel: string
  draw: Draw | null; entries: Entry[]
}

export default function RaffleManage() {
  const [pass, setPass] = useState('')
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<Summary | null>(null)
  const [winner, setWinner] = useState<Draw | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function call(action: string) {
    const res = await fetch('/.netlify/functions/raffle-admin', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pass, action }),
    })
    return res
  }

  async function load(e?: React.FormEvent) {
    e?.preventDefault()
    setErr(''); setBusy(true)
    const res = await call('summary')
    const j = await res.json()
    if (!res.ok) { setErr(j.error || 'Could not load.'); setBusy(false); return }
    setData(j); setAuthed(true)
    if (j.draw) setWinner({ ...j.draw })
    setBusy(false)
  }

  async function draw() {
    if (!confirm('Draw the winner now? This picks one random ticket, locks the raffle, and emails the winner. It cannot be undone.')) return
    setBusy(true); setErr('')
    const res = await call('draw')
    const j = await res.json()
    if (!res.ok) { setErr(j.error || 'Could not draw.'); setBusy(false); return }
    setWinner(j.winner)
    await load()
    setBusy(false)
  }

  async function exportCsv() {
    const res = await call('export')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'guns-garin-5050-entrants.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <section className="grid min-h-screen place-items-center bg-[var(--color-brand-ink)] px-4">
        <form onSubmit={load} className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
          <img src="/images/logo.png" alt="Guns Garin Memorial Foundation" className="mx-auto mb-3 h-14 w-auto" />
          <h1 className="text-center text-[18px] font-extrabold text-[var(--color-brand)]">50/50 Command Center</h1>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Passcode" className="mt-4 w-full rounded-xl border border-[var(--color-line)] px-4 py-3 text-[16px] outline-none focus:border-[var(--color-brand-bright)]" autoFocus />
          {err && <div className="mt-3 text-center text-[13px] font-semibold text-[var(--color-honor)]">{err}</div>}
          <button disabled={busy} className="mt-4 w-full rounded-xl bg-[var(--color-brand)] px-6 py-3 text-[15px] font-bold text-white disabled:opacity-60">{busy ? 'Checking…' : 'Enter'}</button>
        </form>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[var(--color-canvas)] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-extrabold text-[var(--color-brand)]">50/50 Command Center</h1>
          <button onClick={() => load()} className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-[13px] font-semibold text-[var(--color-ink)]">Refresh</button>
        </div>

        {/* Pot headline */}
        <div className="mt-4 rounded-2xl bg-[var(--color-brand)] p-6 text-center text-white">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold-soft)]">Current pot</div>
          <div className="mt-1 text-[46px] font-black leading-none">{money(data!.potCents)}</div>
          <div className="mt-1 text-[14px] text-white/75">Winner takes {money(data!.payoutCents)}</div>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[['Tickets', data!.tickets.toLocaleString()], ['Entrants', data!.entrants.toLocaleString()], ['Cash', money(data!.cashCents)], ['QR / Card', money(data!.givebutterCents)]].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-[var(--color-line)] bg-white p-3 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">{l}</div>
              <div className="mt-0.5 text-[18px] font-bold text-[var(--color-ink)]">{v}</div>
            </div>
          ))}
        </div>

        {/* Winner / draw */}
        {winner ? (
          <div className="mt-5 rounded-2xl border-2 border-[var(--color-gold)] bg-white p-6 text-center">
            <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">Winner drawn</div>
            <div className="mt-1 text-[28px] font-black text-[var(--color-brand)]">{winner.winner_name || winner.name}</div>
            <div className="mt-1 text-[15px] text-[var(--color-ink-soft)]">Ticket #{winner.ticket_no} &middot; wins {money(winner.payout_cents)}</div>
            <div className="mt-2 text-[14px] text-[var(--color-ink-soft)]">{winner.winner_email || winner.email}{winner.phone ? ` · ${winner.phone}` : ''}</div>
            <div className="mt-3 rounded-xl bg-[var(--color-surface-soft)] px-4 py-3 text-[13px] text-[var(--color-ink-soft)]">Winner has been emailed. Call within 24 hours to arrange payment.</div>
          </div>
        ) : (
          <button onClick={draw} disabled={busy || data!.tickets < 1} className="mt-5 w-full rounded-2xl bg-[var(--color-honor)] px-6 py-4 text-[17px] font-black text-white disabled:opacity-50">
            {busy ? 'Drawing…' : 'Close sales & draw the winner'}
          </button>
        )}
        {err && <div className="mt-3 text-center text-[14px] font-semibold text-[var(--color-honor)]">{err}</div>}

        <button onClick={exportCsv} className="mt-4 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[14px] font-semibold text-[var(--color-ink)]">Export entrant list (CSV)</button>

        {/* Recent entries */}
        <h2 className="mt-6 text-[14px] font-bold text-[var(--color-ink)]">Recent entries</h2>
        <div className="mt-2 overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
          {data!.entries.length === 0 && <div className="p-4 text-center text-[13px] text-[var(--color-muted)]">No entries yet.</div>}
          {data!.entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-2.5 last:border-0">
              <div className="min-w-0">
                <div className="truncate text-[14px] font-semibold text-[var(--color-ink)]">{e.name}</div>
                <div className="truncate text-[12px] text-[var(--color-muted)]">{e.email}{e.paid_by ? ` · ${e.paid_by === 'cash' ? 'Cash' : 'QR/Card'}` : ''}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[14px] font-bold text-[var(--color-brand)]">{e.tickets} tkt</div>
                <div className="text-[12px] text-[var(--color-muted)]">{money(e.amount_cents)}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[12px] text-[var(--color-muted)]">Drawing: {data!.drawLabel}</p>
      </div>
    </section>
  )
}
