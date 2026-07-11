-- Guns Garin 50/50 raffle store. Run once in the ALM Supabase SQL editor.
-- Each ticket is its own row with an auto-incrementing number, so ticket
-- numbers are always unique with no race conditions, even under load.

create table if not exists public.raffle_entries (
  id uuid primary key default gen_random_uuid(),
  campaign text not null default 'gg-2026',
  name text not null,
  phone text,
  email text not null,
  tickets int not null check (tickets between 1 and 500),
  amount_cents int not null default 0,
  paid_by text,                     -- 'givebutter' | 'cash' | null
  email_opt_in boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists raffle_entries_campaign_idx on raffle_entries(campaign, created_at);

-- One row per ticket. ticket_no starts at 1000 so the numbers look like real
-- raffle tickets rather than "you are buyer #1".
create sequence if not exists raffle_ticket_no_seq start 1000;
create table if not exists public.raffle_tickets (
  ticket_no bigint primary key default nextval('raffle_ticket_no_seq'),
  entry_id uuid not null references public.raffle_entries(id) on delete cascade,
  campaign text not null default 'gg-2026',
  created_at timestamptz not null default now()
);
create index if not exists raffle_tickets_campaign_idx on raffle_tickets(campaign, ticket_no);

create table if not exists public.raffle_draws (
  id uuid primary key default gen_random_uuid(),
  campaign text not null unique,    -- one draw per campaign (lock)
  ticket_no bigint not null,
  entry_id uuid not null,
  winner_name text,
  winner_email text,
  pot_cents int not null,
  payout_cents int not null,
  created_at timestamptz not null default now()
);

-- Service role (used by the Netlify functions) bypasses RLS. Enable RLS with
-- no anon policy so nothing is publicly readable/writable except through us.
alter table raffle_entries enable row level security;
alter table raffle_tickets enable row level security;
alter table raffle_draws  enable row level security;
