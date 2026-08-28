-- ===============================================================
-- AfroNova — Content Management Extension (003)
-- Adds tables for the admin CMS.
-- ===============================================================

-- ── 1. site_content — all translation strings (replaces LanguageContext)
create table if not exists public.site_content (
  id         uuid        primary key default gen_random_uuid(),
  locale     text        not null check (locale in ('en','am','fr','pt','ar')),
  key        text        not null,
  value      text        not null default '',
  section    text        not null default 'general',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, key)
);
create index if not exists idx_site_content_locale  on public.site_content (locale);
create index if not exists idx_site_content_key     on public.site_content (key);
create index if not exists idx_site_content_section on public.site_content (section);

-- ── 2. admin_users — who can access /admin
create table if not exists public.admin_users (
  id         uuid primary key references auth.users on delete cascade,
  full_name  text,
  role       text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);
create index if not exists idx_admin_users_role on public.admin_users (role);

-- ── 3. news_articles — DB-backed news (replaces src/lib/news.ts)
create table if not exists public.news_articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  locale       text not null default 'en' check (locale in ('en','am','fr','pt','ar')),
  category     text not null default 'event' check (category in ('event','partnership','business','recap','production')),
  article_date text,
  read_time    text,
  title        text not null,
  excerpt      text,
  paragraphs   text[],
  published    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (slug, locale)
);
create index if not exists idx_news_articles_published on public.news_articles (published);
create index if not exists idx_news_articles_locale     on public.news_articles (locale);
create index if not exists idx_news_articles_slug      on public.news_articles (slug);

-- ── 4. partners — DB-backed partners (replaces src/lib/partners.ts)
create table if not exists public.partners (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  initials     text,
  category_key text not null default 'cat_corporate',
  accent       text not null default '#D6A34A',
  logo         text,
  website      text,
  featured      boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_partners_featured on public.partners (featured, sort_order);
create index if not exists idx_partners_category on public.partners (category_key);

-- ── 5. partner_descriptions — per-locale role/description
create table if not exists public.partner_descriptions (
  id          uuid primary key default gen_random_uuid(),
  partner_id  uuid not null references public.partners (id) on delete cascade,
  locale      text not null default 'en' check (locale in ('en','am','fr','pt','ar')),
  description text,
  role        text,
  created_at  timestamptz not null default now(),
  unique (partner_id, locale)
);
create index if not exists idx_partner_descriptions_partner on public.partner_descriptions (partner_id);

-- ── 6. portfolio_items — DB-backed portfolio
create table if not exists public.portfolio_items (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  locale       text not null default 'en' check (locale in ('en','am','fr','pt','ar')),
  category     text not null default 'event' check (category in ('event','recap','production','campaign','publication')),
  title        text not null,
  subtitle     text,
  excerpt      text,
  year         text,
  accent       text,
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_portfolio_items_published on public.portfolio_items (published);
create index if not exists idx_portfolio_items_locale     on public.portfolio_items (locale);

-- ── 7. event_schedule — Africa Celebrates 2026 schedule
create table if not exists public.event_schedule (
  id           uuid primary key default gen_random_uuid(),
  day          text not null,
  locale       text not null default 'en' check (locale in ('en','am','fr','pt','ar')),
  title        text not null,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_event_schedule_sort on public.event_schedule (sort_order);

create table if not exists public.schedule_items (
  id            uuid primary key default gen_random_uuid(),
  schedule_id   uuid not null references public.event_schedule (id) on delete cascade,
  locale        text not null default 'en' check (locale in ('en','am','fr','pt','ar')),
  description   text not null,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);
create index if not exists idx_schedule_items_schedule on public.schedule_items (schedule_id);

-- ── 8. testimonials
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  locale       text not null default 'en' check (locale in ('en','am','fr','pt','ar')),
  quote        text not null,
  author       text not null,
  role         text,
  organisation text,
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_testimonials_published on public.testimonials (published);

-- ===============================================================
-- ROW LEVEL SECURITY
-- Public: read. Admin/editor: full CRUD. Admin: manage admin_users.
-- ===============================================================
alter table public.site_content          enable row level security;
alter table public.admin_users           enable row level security;
alter table public.news_articles         enable row level security;
alter table public.partners              enable row level security;
alter table public.partner_descriptions  enable row level security;
alter table public.portfolio_items       enable row level security;
alter table public.event_schedule        enable row level security;
alter table public.schedule_items        enable row level security;
alter table public.testimonials          enable row level security;

-- Public read
create policy "p_public_read_content" on public.site_content for select using (true);
create policy "p_public_read_news"    on public.news_articles for select using (published = true);
create policy "p_public_read_partners" on public.partners for select using (true);
create policy "p_public_read_descr"   on public.partner_descriptions for select using (true);
create policy "p_public_read_portf"   on public.portfolio_items for select using (published = true);
create policy "p_public_read_sched"   on public.event_schedule for select using (true);
create policy "p_public_read_sched_i" on public.schedule_items for select using (true);
create policy "p_public_read_test"    on public.testimonials for select using (published = true);

-- Admin/editor full CRUD (all content tables)
create policy "p_admin_content" on public.site_content for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_news" on public.news_articles for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_partners" on public.partners for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_descr" on public.partner_descriptions for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_portf" on public.portfolio_items for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_sched" on public.event_schedule for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_sched_i" on public.schedule_items for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));
create policy "p_admin_test" on public.testimonials for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role in ('admin','editor')));

-- Admin-only: manage admin_users table
create policy "p_admin_admins" on public.admin_users for all
  using (exists (select 1 from public.admin_users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.admin_users where id = auth.uid() and role = 'admin'));

-- Users can read their own admin record
create policy "p_self_admin" on public.admin_users for select using (id = auth.uid());
