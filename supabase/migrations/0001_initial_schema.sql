create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('super_admin', 'admin', 'editor', 'admissions', 'viewer')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.site_settings (
  id bigint primary key generated always as identity,
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  alt_text text,
  caption text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  unique(bucket, path)
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb,
  seo jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_id uuid references public.media_assets(id),
  cta_label text,
  cta_href text,
  placement text not null default 'home_hero',
  sort_order int default 0,
  is_active boolean default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('blog', 'notice', 'news')),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb,
  cover_image_id uuid references public.media_assets(id),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  pinned boolean default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb,
  cover_image_id uuid references public.media_assets(id),
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  body jsonb,
  image_id uuid references public.media_assets(id),
  achievement_date date,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text,
  summary text,
  body jsonb,
  image_id uuid references public.media_assets(id),
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_id uuid references public.media_assets(id),
  album text,
  sort_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_id uuid references public.media_assets(id),
  type text not null,
  sort_order int default 0,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text,
  video_url text,
  image_id uuid references public.media_assets(id),
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.admission_submissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  guardian_name text not null,
  phone text not null,
  email text,
  applying_for text not null,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'admitted', 'rejected', 'archived')),
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'replied', 'archived')),
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.inquiry_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  interest text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'follow_up', 'closed', 'archived')),
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index pages_public_idx on public.pages(status, published_at);
create index posts_public_idx on public.posts(type, status, pinned, published_at);
create index events_public_idx on public.events(status, starts_at, published_at);
create index achievements_public_idx on public.achievements(status, achievement_date, published_at);
create index programs_active_idx on public.programs(is_active, sort_order);
create index gallery_featured_idx on public.gallery_items(is_featured, album, sort_order);
create index documents_public_idx on public.documents(is_public, type, sort_order);
create index faq_active_idx on public.faq_items(is_active, category, sort_order);
create index admission_status_idx on public.admission_submissions(status, created_at);
create index contact_status_idx on public.contact_submissions(status, created_at);
create index inquiry_status_idx on public.inquiry_submissions(status, created_at);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create trigger pages_updated_at before update on public.pages for each row execute function public.set_updated_at();
create trigger banners_updated_at before update on public.banners for each row execute function public.set_updated_at();
create trigger posts_updated_at before update on public.posts for each row execute function public.set_updated_at();
create trigger events_updated_at before update on public.events for each row execute function public.set_updated_at();
create trigger achievements_updated_at before update on public.achievements for each row execute function public.set_updated_at();
create trigger programs_updated_at before update on public.programs for each row execute function public.set_updated_at();
create trigger gallery_items_updated_at before update on public.gallery_items for each row execute function public.set_updated_at();
create trigger documents_updated_at before update on public.documents for each row execute function public.set_updated_at();
create trigger faq_items_updated_at before update on public.faq_items for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
create trigger admission_submissions_updated_at before update on public.admission_submissions for each row execute function public.set_updated_at();
create trigger contact_submissions_updated_at before update on public.contact_submissions for each row execute function public.set_updated_at();
create trigger inquiry_submissions_updated_at before update on public.inquiry_submissions for each row execute function public.set_updated_at();
create trigger newsletter_subscribers_updated_at before update on public.newsletter_subscribers for each row execute function public.set_updated_at();

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('super_admin', 'admin', 'editor'), false)
$$;

create or replace function public.can_manage_forms()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('super_admin', 'admin', 'admissions'), false)
$$;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;
alter table public.pages enable row level security;
alter table public.banners enable row level security;
alter table public.posts enable row level security;
alter table public.events enable row level security;
alter table public.achievements enable row level security;
alter table public.programs enable row level security;
alter table public.gallery_items enable row level security;
alter table public.documents enable row level security;
alter table public.faq_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.admission_submissions enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.inquiry_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles can read self" on public.profiles for select using (auth.uid() = id or public.current_profile_role() = 'super_admin');
create policy "super admins manage profiles" on public.profiles for all using (public.current_profile_role() = 'super_admin') with check (public.current_profile_role() = 'super_admin');

create policy "admins manage settings" on public.site_settings for all using (public.current_profile_role() in ('super_admin', 'admin')) with check (public.current_profile_role() in ('super_admin', 'admin'));
create policy "public read site settings" on public.site_settings for select using (true);

create policy "public read media" on public.media_assets for select using (bucket in ('public-media', 'documents'));
create policy "admins manage media" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published pages" on public.pages for select using (status = 'published' and published_at <= now());
create policy "admins manage pages" on public.pages for all using (public.is_admin()) with check (public.is_admin());

create policy "public read active banners" on public.banners for select using (is_active = true and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at >= now()));
create policy "admins manage banners" on public.banners for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published posts" on public.posts for select using (status = 'published' and published_at <= now());
create policy "admins manage posts" on public.posts for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published events" on public.events for select using (status = 'published' and published_at <= now());
create policy "admins manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published achievements" on public.achievements for select using (status = 'published' and published_at <= now());
create policy "admins manage achievements" on public.achievements for all using (public.is_admin()) with check (public.is_admin());

create policy "public read active programs" on public.programs for select using (is_active = true);
create policy "admins manage programs" on public.programs for all using (public.is_admin()) with check (public.is_admin());

create policy "public read gallery" on public.gallery_items for select using (true);
create policy "admins manage gallery" on public.gallery_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read documents" on public.documents for select using (is_public = true);
create policy "admins manage documents" on public.documents for all using (public.is_admin()) with check (public.is_admin());

create policy "public read faqs" on public.faq_items for select using (is_active = true);
create policy "admins manage faqs" on public.faq_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public read testimonials" on public.testimonials for select using (is_active = true);
create policy "admins manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

create policy "public insert admissions" on public.admission_submissions for insert with check (true);
create policy "admissions team manage admissions" on public.admission_submissions for all using (public.can_manage_forms()) with check (public.can_manage_forms());

create policy "public insert contacts" on public.contact_submissions for insert with check (true);
create policy "admissions team manage contacts" on public.contact_submissions for all using (public.can_manage_forms()) with check (public.can_manage_forms());

create policy "public insert inquiries" on public.inquiry_submissions for insert with check (true);
create policy "admissions team manage inquiries" on public.inquiry_submissions for all using (public.can_manage_forms()) with check (public.can_manage_forms());

create policy "public insert newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "admins manage newsletter" on public.newsletter_subscribers for all using (public.can_manage_forms()) with check (public.can_manage_forms());

create policy "admins read audit logs" on public.audit_logs for select using (public.current_profile_role() in ('super_admin', 'admin'));
create policy "admins insert audit logs" on public.audit_logs for insert with check (public.is_admin() or public.can_manage_forms());

insert into storage.buckets (id, name, public)
values
  ('public-media', 'public-media', true),
  ('documents', 'documents', true),
  ('private-uploads', 'private-uploads', false)
on conflict (id) do nothing;
