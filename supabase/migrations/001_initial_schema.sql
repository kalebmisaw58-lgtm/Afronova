-- ================================================================
-- AfroNova — Supabase Initial Schema
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- Or via CLI: supabase db push
-- ================================================================

-- ── Enable UUID generation ─────────────────────────────────────
create extension if not exists "pgcrypto";

-- ================================================================
-- TABLE 1: contact_submissions
-- Stores every general contact form submission
-- ================================================================
create table if not exists public.contact_submissions (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  name        text        not null,
  email       text        not null,
  phone       text,
  inquiry     text,
  message     text        not null,
  status      text        not null    default 'new'
                check (status in ('new', 'reviewed', 'accepted', 'rejected')),
  ip          text
);

-- Index for admin queries
create index if not exists idx_contact_status    on public.contact_submissions (status);
create index if not exists idx_contact_email     on public.contact_submissions (email);
create index if not exists idx_contact_created   on public.contact_submissions (created_at desc);

-- ================================================================
-- TABLE 2: newsletter_subscribers
-- Stores newsletter signups (also synced to Mailchimp)
-- ================================================================
create table if not exists public.newsletter_subscribers (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  email       text        not null    unique,
  confirmed   boolean     not null    default true,
  source      text        default 'website'
);

create index if not exists idx_newsletter_email     on public.newsletter_subscribers (email);
create index if not exists idx_newsletter_created   on public.newsletter_subscribers (created_at desc);

-- ================================================================
-- ROW LEVEL SECURITY
-- API routes use the service role key (bypasses RLS).
-- Anon/public users get zero read access.
-- ================================================================
alter table public.contact_submissions      enable row level security;
alter table public.newsletter_subscribers   enable row level security;

-- No public SELECT/INSERT/UPDATE/DELETE — only service role can touch these
-- (Service role bypasses RLS by design in Supabase)

-- ================================================================
-- ADMIN HELPER VIEWS
-- security_invoker = true means the view runs with the CALLER's
-- privileges, so RLS on the underlying tables is respected.
-- We also explicitly revoke anon/authenticated access as belt-and-braces.
-- ================================================================
create or replace view public.v_new_contacts
  with (security_invoker = true) as
  select id, created_at, name, email, phone, inquiry,
         left(message, 120) as message_preview, status
  from   public.contact_submissions
  where  status = 'new'
  order  by created_at desc;

create or replace view public.v_subscriber_count
  with (security_invoker = true) as
  select
    count(*)                                             as total,
    count(*) filter (where confirmed = true)             as confirmed,
    count(*) filter (where created_at > now() - interval '7 days') as last_7_days,
    count(*) filter (where created_at > now() - interval '30 days') as last_30_days
  from public.newsletter_subscribers;

-- Revoke all public access to views and tables
revoke all on public.v_new_contacts,
              public.v_subscriber_count
  from anon, authenticated;

revoke all on public.contact_submissions,
              public.newsletter_subscribers
  from anon, authenticated;

-- ================================================================
-- DONE
-- ================================================================
