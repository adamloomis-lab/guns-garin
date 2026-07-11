// Guns Garin 50/50 — public entry endpoint.
// GET  -> { potCents, tickets, entrants, drawn }  (for the live pot display)
// POST { name, phone, email, tickets, paidBy, optIn }
//   -> creates the entry, mints that many sequential ticket numbers, emails the
//      buyer their numbers, returns { numbers, potCents }.
// Storage: ALM Supabase (service role). Email: Resend (verified domain).

const SB = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const RESEND = process.env.RESEND_API_KEY;
const FROM = "Guns Garin Memorial Foundation <noreply@adamloomis.online>";
const REPLY = process.env.RAFFLE_REPLY_TO || "adam.loomis@gmail.com";

const CAMPAIGN = "gg-2026";
const TICKET_CENTS = 500; // $5 = 1 ticket
const DRAW_LABEL = "Monday, July 13 at 2:00 PM (ET)";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,POST,OPTIONS" };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...CORS } });
const esc = (s = "") => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
const dollars = (cents) => `$${(cents / 100).toLocaleString("en-US")}`;
const money = (cents) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

async function counts() {
  const t = await fetch(`${SB}/rest/v1/raffle_tickets?campaign=eq.${CAMPAIGN}&select=ticket_no`, { headers: { ...H, Prefer: "count=exact", Range: "0-0" } });
  const tickets = Number((t.headers.get("content-range") || "0-0/0").split("/")[1]) || 0;
  const e = await fetch(`${SB}/rest/v1/raffle_entries?campaign=eq.${CAMPAIGN}&select=id`, { headers: { ...H, Prefer: "count=exact", Range: "0-0" } });
  const entrants = Number((e.headers.get("content-range") || "0-0/0").split("/")[1]) || 0;
  const d = await fetch(`${SB}/rest/v1/raffle_draws?campaign=eq.${CAMPAIGN}&select=ticket_no`, { headers: H });
  const drawn = (await d.json().catch(() => [])).length > 0;
  return { tickets, entrants, potCents: tickets * TICKET_CENTS, drawn };
}

function confirmationEmail({ name, numbers, potCents }) {
  const first = (name || "").trim().split(/\s+/)[0] || "friend";
  const chips = numbers.map((n) => `<span style="display:inline-block;background:#0e2a52;color:#e3b85a;border:1px solid #c0902f;border-radius:6px;padding:8px 12px;margin:0 8px 8px 0;font-size:18px;font-weight:800;letter-spacing:.02em;">#${n}</span>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#eef1f5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#14202f;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0e2a52;padding:26px 28px;text-align:center;border-bottom:4px solid #c0902f;">
      <div style="color:#ffffff;font-size:13px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;">Guns Garin Memorial Foundation</div>
      <div style="color:#e3b85a;font-size:30px;font-weight:900;letter-spacing:.04em;margin-top:6px;">Help Our Heroes 50/50</div>
    </div>
    <div style="padding:32px 28px;">
      <h1 style="margin:0 0 6px;font-size:24px;color:#0e2a52;">You're in, ${esc(first)}. Thank you.</h1>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#3c4858;">Every ticket supports military and veteran families with rent, food, and emergency relief. Here ${numbers.length === 1 ? "is your ticket number" : "are your ticket numbers"}:</p>
      <div style="margin:0 0 22px;">${chips}</div>
      <div style="background:#f4f5f7;border-left:4px solid #c0902f;padding:16px 18px;font-size:15px;line-height:1.7;color:#14202f;">
        <strong>Drawing:</strong> ${DRAW_LABEL}<br/>
        <strong>Current pot:</strong> ${money(potCents)} &middot; winner takes half<br/>
        <strong>You do not have to be present to win.</strong> We announce the winner by email and follow up by phone.
      </div>
      <p style="margin:22px 0 0;font-size:14px;line-height:1.6;color:#5f6b7a;">Want better odds? More tickets, more chances. Reply to this email with any questions.</p>
    </div>
    <div style="background:#0e2a52;color:#aeb9c9;padding:18px 28px;text-align:center;font-size:12px;line-height:1.6;">
      Guns Garin Memorial Foundation &middot; Honor their sacrifice. Change their story.<br/>
      You are receiving this because you entered our 50/50 raffle. We may send occasional foundation updates; reply STOP to opt out.
    </div>
  </div></body></html>`;
}

async function sendEmail({ to, subject, html, bcc }) {
  if (!RESEND || !to) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: REPLY, subject, html, ...(bcc ? { bcc: [bcc] } : {}) }),
  });
  return r.ok;
}

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("", { headers: CORS });
  if (!SB || !KEY) return json({ error: "not configured" }, 500);

  if (req.method === "GET") return json(await counts());
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let d;
  try { d = await req.json(); } catch { return json({ error: "bad request" }, 400); }

  const name = String(d.name || "").trim();
  const email = String(d.email || "").trim();
  const phone = String(d.phone || "").trim();
  const qty = Math.floor(Number(d.tickets));
  if (!name) return json({ error: "Please enter a name." }, 400);
  if (!/.+@.+\..+/.test(email)) return json({ error: "Please enter a valid email." }, 400);
  if (!Number.isFinite(qty) || qty < 1 || qty > 500) return json({ error: "Tickets must be between 1 and 500." }, 400);

  const amount = qty * TICKET_CENTS;
  const entryRes = await fetch(`${SB}/rest/v1/raffle_entries`, {
    method: "POST", headers: { ...H, Prefer: "return=representation" },
    body: JSON.stringify({ campaign: CAMPAIGN, name, phone: phone || null, email, tickets: qty, amount_cents: amount, paid_by: d.paidBy || null, email_opt_in: d.optIn !== false }),
  });
  if (!entryRes.ok) return json({ error: "Could not save the entry. Please try again." }, 502);
  const entry = (await entryRes.json())[0];

  const rows = Array.from({ length: qty }, () => ({ campaign: CAMPAIGN, entry_id: entry.id }));
  const tRes = await fetch(`${SB}/rest/v1/raffle_tickets`, {
    method: "POST", headers: { ...H, Prefer: "return=representation" },
    body: JSON.stringify(rows),
  });
  if (!tRes.ok) return json({ error: "Could not issue ticket numbers. Please try again." }, 502);
  const numbers = (await tRes.json()).map((t) => t.ticket_no).sort((a, b) => a - b);

  const { potCents } = await counts();
  await sendEmail({
    to: email,
    subject: `Your Guns Garin 50/50 ticket number${numbers.length === 1 ? "" : "s"}`,
    html: confirmationEmail({ name, numbers, potCents }),
  }).catch(() => {});

  return json({ ok: true, numbers, potCents, drawLabel: DRAW_LABEL });
};
