// Guns Garin 50/50 — operator/admin endpoint (password-gated).
// POST { pass, action }
//   action "summary" -> totals + recent entries + draw status
//   action "draw"    -> picks one random ticket, records + locks it, emails the
//                       winner, returns the winner (idempotent: re-draw returns
//                       the same result once a draw exists)
//   action "export"  -> CSV of all entrants (the 2027 mailing list)

const SB = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const RESEND = process.env.RESEND_API_KEY;
const PASS = process.env.RAFFLE_ADMIN_PASS;
const FROM = "Guns Garin Memorial Foundation <noreply@adamloomis.online>";
const REPLY = process.env.RAFFLE_REPLY_TO || "adam.loomis@gmail.com";

const CAMPAIGN = "gg-2026";
const TICKET_CENTS = 500;
const DRAW_LABEL = "Monday, July 13 at 2:00 PM (ET)";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST,OPTIONS" };
const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...CORS, ...extra } });
const esc = (s = "") => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
const money = (cents) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
async function rest(path, init) { const r = await fetch(`${SB}/rest/v1/${path}`, { headers: H, ...init }); return r.ok ? r.json() : []; }
async function count(path) { const r = await fetch(`${SB}/rest/v1/${path}`, { headers: { ...H, Prefer: "count=exact", Range: "0-0" } }); return Number((r.headers.get("content-range") || "0-0/0").split("/")[1]) || 0; }

async function summary() {
  const tickets = await count(`raffle_tickets?campaign=eq.${CAMPAIGN}&select=ticket_no`);
  const entries = await rest(`raffle_entries?campaign=eq.${CAMPAIGN}&order=created_at.desc&select=name,email,phone,tickets,amount_cents,paid_by,created_at&limit=500`);
  const draws = await rest(`raffle_draws?campaign=eq.${CAMPAIGN}&select=*`);
  const potCents = tickets * TICKET_CENTS;
  const cash = entries.filter((e) => e.paid_by === "cash").reduce((s, e) => s + e.amount_cents, 0);
  const gb = entries.filter((e) => e.paid_by === "givebutter").reduce((s, e) => s + e.amount_cents, 0);
  return { tickets, entrants: entries.length, potCents, payoutCents: Math.round(potCents / 2), cashCents: cash, givebutterCents: gb, drawLabel: DRAW_LABEL, draw: draws[0] || null, entries: entries.slice(0, 100) };
}

function winnerEmail({ name, number, potCents, payoutCents }) {
  const first = (name || "").trim().split(/\s+/)[0] || "friend";
  return `<!doctype html><html><body style="margin:0;background:#eef1f5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#14202f;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#16375f;padding:26px 28px;text-align:center;border-bottom:4px solid #2077c8;">
      <img src="https://gunsgarin.com/images/footerlogo.png" alt="Guns Garin Memorial Foundation" height="56" style="height:56px;display:block;margin:0 auto 10px;" />
      <div style="color:#7cc0f4;font-size:30px;font-weight:900;">You Won the 50/50!</div>
    </div>
    <div style="padding:32px 28px;">
      <h1 style="margin:0 0 8px;font-size:24px;color:#16375f;">Congratulations, ${esc(first)}!</h1>
      <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#3c4858;">Your ticket <strong>#${number}</strong> was drawn as the winner of the Guns Garin Memorial Foundation Help Our Heroes 50/50.</p>
      <div style="background:#16375f;color:#ffffff;padding:20px;text-align:center;border-radius:8px;border:2px solid #2077c8;">
        <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#7cc0f4;">Your winnings</div>
        <div style="font-size:38px;font-weight:900;margin-top:4px;">${money(payoutCents)}</div>
        <div style="font-size:13px;color:#aeb9c9;margin-top:4px;">Half of the ${money(potCents)} pot</div>
      </div>
      <p style="margin:22px 0 0;font-size:16px;line-height:1.6;color:#3c4858;"><strong>We will call you within the next 24 hours</strong> to arrange how you would like your winnings sent to you. Thank you for supporting our military and veteran families.</p>
    </div>
    <div style="background:#16375f;color:#aeb9c9;padding:18px 28px;text-align:center;font-size:12px;">Guns Garin Memorial Foundation &middot; Honor their sacrifice. Change their story.</div>
  </div></body></html>`;
}

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!SB || !KEY) return json({ error: "not configured" }, 500);

  let d;
  try { d = await req.json(); } catch { return json({ error: "bad request" }, 400); }
  if (!PASS || d.pass !== PASS) return json({ error: "Wrong passcode." }, 401);

  if (d.action === "summary") return json(await summary());

  // Wipe ALL campaign data (demo runs before launch). Requires confirm: "WIPE".
  if (d.action === "reset") {
    if (d.confirm !== "WIPE") return json({ error: 'Send confirm: "WIPE" to reset.' }, 400);
    await fetch(`${SB}/rest/v1/raffle_draws?campaign=eq.${CAMPAIGN}`, { method: "DELETE", headers: H });
    await fetch(`${SB}/rest/v1/raffle_entries?campaign=eq.${CAMPAIGN}`, { method: "DELETE", headers: H }); // tickets cascade
    return json({ ok: true, reset: true });
  }

  if (d.action === "export") {
    const rows = await rest(`raffle_entries?campaign=eq.${CAMPAIGN}&order=created_at.asc&select=name,email,phone,tickets,amount_cents,paid_by,email_opt_in,created_at`);
    const head = "name,email,phone,tickets,amount,paid_by,opt_in,entered_at";
    const csv = [head, ...rows.map((r) => [r.name, r.email, r.phone || "", r.tickets, (r.amount_cents / 100).toFixed(2), r.paid_by || "", r.email_opt_in ? "yes" : "no", r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": 'attachment; filename="guns-garin-5050-entrants.csv"', ...CORS } });
  }

  if (d.action === "draw") {
    const existing = await rest(`raffle_draws?campaign=eq.${CAMPAIGN}&select=*`);
    if (existing[0]) {
      const e = await rest(`raffle_entries?id=eq.${existing[0].entry_id}&select=name,email,phone`);
      return json({ ok: true, alreadyDrawn: true, winner: { ...existing[0], ...(e[0] || {}) } });
    }
    const total = await count(`raffle_tickets?campaign=eq.${CAMPAIGN}&select=ticket_no`);
    if (total < 1) return json({ error: "No tickets have been sold yet." }, 400);

    const offset = Math.floor(Math.random() * total);
    const picked = await rest(`raffle_tickets?campaign=eq.${CAMPAIGN}&order=ticket_no.asc&limit=1&offset=${offset}&select=ticket_no,entry_id`);
    const ticket = picked[0];
    const buyer = (await rest(`raffle_entries?id=eq.${ticket.entry_id}&select=name,email,phone`))[0] || {};
    const potCents = total * TICKET_CENTS;
    const payoutCents = Math.round(potCents / 2);

    // Record + lock (unique campaign). If two draws race, the second 409s and
    // we return the first, so a winner can never be overwritten.
    const insRes = await fetch(`${SB}/rest/v1/raffle_draws`, {
      method: "POST", headers: { ...H, Prefer: "return=representation" },
      body: JSON.stringify({ campaign: CAMPAIGN, ticket_no: ticket.ticket_no, entry_id: ticket.entry_id, winner_name: buyer.name || null, winner_email: buyer.email || null, pot_cents: potCents, payout_cents: payoutCents }),
    });
    if (!insRes.ok) {
      const again = await rest(`raffle_draws?campaign=eq.${CAMPAIGN}&select=*`);
      const e = again[0] ? (await rest(`raffle_entries?id=eq.${again[0].entry_id}&select=name,email,phone`))[0] : {};
      return json({ ok: true, alreadyDrawn: true, winner: { ...(again[0] || {}), ...(e || {}) } });
    }

    if (buyer.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: FROM, to: [buyer.email], bcc: [REPLY], reply_to: REPLY, subject: "You won the Guns Garin 50/50 raffle!", html: winnerEmail({ name: buyer.name, number: ticket.ticket_no, potCents, payoutCents }) }),
      }).catch(() => {});
    }
    return json({ ok: true, winner: { ...buyer, ticket_no: ticket.ticket_no, pot_cents: potCents, payout_cents: payoutCents } });
  }

  return json({ error: "unknown action" }, 400);
};
