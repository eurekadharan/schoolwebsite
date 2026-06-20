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
  role text not null check (
    role in ('super_admin', 'admin', 'editor', 'admissions', 'viewer')
  ),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id bigint primary key generated always as identity,
  key text unique not null,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  alt_text text,
  caption text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket, path)
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb not null default '{}',
  seo jsonb not null default '{}',
  status text not null default 'draft' check (
    status in ('draft', 'published', 'archived')
  ),
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_id uuid references public.media_assets(id) on delete set null,
  cta_label text,
  cta_href text,
  placement text not null default 'home_hero',
  sort_order int not null default 0,
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('blog', 'notice', 'news')),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb not null default '{}',
  cover_image_id uuid references public.media_assets(id) on delete set null,
  status text not null default 'draft' check (
    status in ('draft', 'published', 'archived')
  ),
  pinned boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb not null default '{}',
  cover_image_id uuid references public.media_assets(id) on delete set null,
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'draft' check (
    status in ('draft', 'published', 'archived')
  ),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  body jsonb not null default '{}',
  image_id uuid references public.media_assets(id) on delete set null,
  achievement_date date,
  status text not null default 'draft' check (
    status in ('draft', 'published', 'archived')
  ),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text,
  summary text,
  body jsonb not null default '{}',
  image_id uuid references public.media_assets(id) on delete set null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_id uuid references public.media_assets(id) on delete set null,
  album text,
  sort_order int not null default 0,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_id uuid references public.media_assets(id) on delete set null,
  type text not null,
  sort_order int not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text,
  video_url text,
  image_id uuid references public.media_assets(id) on delete set null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admission_submissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  guardian_name text not null,
  phone text not null,
  email text,
  applying_for text not null,
  message text,
  status text not null default 'new' check (
    status in ('new', 'contacted', 'scheduled', 'admitted', 'rejected', 'archived')
  ),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  status text not null default 'new' check (
    status in ('new', 'replied', 'archived')
  ),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inquiry_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  interest text,
  message text,
  status text not null default 'new' check (
    status in ('new', 'contacted', 'follow_up', 'closed', 'archived')
  ),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active' check (
    status in ('active', 'unsubscribed', 'bounced')
  ),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger media_assets_set_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

create trigger pages_set_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

create trigger banners_set_updated_at
before update on public.banners
for each row execute function public.set_updated_at();

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger achievements_set_updated_at
before update on public.achievements
for each row execute function public.set_updated_at();

create trigger programs_set_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

create trigger gallery_items_set_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();

create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

create trigger faq_items_set_updated_at
before update on public.faq_items
for each row execute function public.set_updated_at();

create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

create trigger admission_submissions_set_updated_at
before update on public.admission_submissions
for each row execute function public.set_updated_at();

create trigger contact_submissions_set_updated_at
before update on public.contact_submissions
for each row execute function public.set_updated_at();

create trigger inquiry_submissions_set_updated_at
before update on public.inquiry_submissions
for each row execute function public.set_updated_at();

create trigger newsletter_subscribers_set_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_updated_at();

create index profiles_role_idx on public.profiles(role);
create index pages_status_published_at_idx on public.pages(status, published_at);
create index posts_type_status_published_at_idx on public.posts(type, status, published_at);
create index posts_pinned_idx on public.posts(pinned) where pinned = true;
create index events_status_starts_at_idx on public.events(status, starts_at);
create index achievements_status_date_idx on public.achievements(status, achievement_date);
create index programs_active_sort_idx on public.programs(is_active, sort_order);
create index gallery_featured_sort_idx on public.gallery_items(is_featured, sort_order);
create index documents_public_type_idx on public.documents(is_public, type);
create index faq_active_sort_idx on public.faq_items(is_active, sort_order);
create index testimonials_active_sort_idx on public.testimonials(is_active, sort_order);
create index admission_status_created_idx on public.admission_submissions(status, created_at desc);
create index admission_applying_for_idx on public.admission_submissions(applying_for);
create index contact_status_created_idx on public.contact_submissions(status, created_at desc);
create index inquiry_status_created_idx on public.inquiry_submissions(status, created_at desc);
create index inquiry_interest_idx on public.inquiry_submissions(interest);
create index newsletter_status_created_idx on public.newsletter_subscribers(status, created_at desc);
create index audit_actor_created_idx on public.audit_logs(actor_id, created_at desc);
create index audit_entity_idx on public.audit_logs(entity_type, entity_id);

create or replace function public.current_user_role()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.has_role(roles text[])
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(public.current_user_role() = any(roles), false)
$$;

grant usage on schema public to anon, authenticated;
grant select on
  public.site_settings,
  public.media_assets,
  public.pages,
  public.banners,
  public.posts,
  public.events,
  public.achievements,
  public.programs,
  public.gallery_items,
  public.documents,
  public.faq_items,
  public.testimonials
to anon, authenticated;

grant insert on
  public.admission_submissions,
  public.contact_submissions,
  public.inquiry_submissions,
  public.newsletter_subscribers
to anon, authenticated;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

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

create policy "Profiles are visible to their owner"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Admins can read profiles"
on public.profiles for select
to authenticated
using (public.has_role(array['super_admin', 'admin']));

create policy "Super admins manage profiles"
on public.profiles for all
to authenticated
using (public.has_role(array['super_admin']))
with check (public.has_role(array['super_admin']));

create policy "Public can read site settings"
on public.site_settings for select
to anon, authenticated
using (true);

create policy "Super admins manage site settings"
on public.site_settings for all
to authenticated
using (public.has_role(array['super_admin']))
with check (public.has_role(array['super_admin']));

create policy "Public can read public media metadata"
on public.media_assets for select
to anon, authenticated
using (bucket in ('public-media', 'documents'));

create policy "Content admins manage media metadata"
on public.media_assets for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read published pages"
on public.pages for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy "Admins can read all pages"
on public.pages for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'viewer']));

create policy "Content editors manage pages"
on public.pages for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read active banners"
on public.banners for select
to anon, authenticated
using (
  is_active = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

create policy "Content editors manage banners"
on public.banners for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read published posts"
on public.posts for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy "Admins can read all posts"
on public.posts for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'viewer']));

create policy "Content editors manage posts"
on public.posts for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read published events"
on public.events for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy "Admins can read all events"
on public.events for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'viewer']));

create policy "Content editors manage events"
on public.events for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read published achievements"
on public.achievements for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy "Admins can read all achievements"
on public.achievements for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'viewer']));

create policy "Content editors manage achievements"
on public.achievements for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read active programs"
on public.programs for select
to anon, authenticated
using (is_active = true);

create policy "Content editors manage programs"
on public.programs for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read active gallery items"
on public.gallery_items for select
to anon, authenticated
using (is_active = true);

create policy "Content editors manage gallery items"
on public.gallery_items for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read public documents"
on public.documents for select
to anon, authenticated
using (is_public = true);

create policy "Content editors manage documents"
on public.documents for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read active FAQs"
on public.faq_items for select
to anon, authenticated
using (is_active = true);

create policy "Content editors manage FAQs"
on public.faq_items for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can read active testimonials"
on public.testimonials for select
to anon, authenticated
using (is_active = true);

create policy "Content editors manage testimonials"
on public.testimonials for all
to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor']))
with check (public.has_role(array['super_admin', 'admin', 'editor']));

create policy "Public can create admission submissions"
on public.admission_submissions for insert
to anon, authenticated
with check (status = 'new');

create policy "Admissions team can read admission submissions"
on public.admission_submissions for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'admissions']));

create policy "Admissions team can update admission submissions"
on public.admission_submissions for update
to authenticated
using (public.has_role(array['super_admin', 'admin', 'admissions']))
with check (public.has_role(array['super_admin', 'admin', 'admissions']));

create policy "Public can create contact submissions"
on public.contact_submissions for insert
to anon, authenticated
with check (status = 'new');

create policy "Admissions team can read contact submissions"
on public.contact_submissions for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'admissions']));

create policy "Admissions team can update contact submissions"
on public.contact_submissions for update
to authenticated
using (public.has_role(array['super_admin', 'admin', 'admissions']))
with check (public.has_role(array['super_admin', 'admin', 'admissions']));

create policy "Public can create inquiry submissions"
on public.inquiry_submissions for insert
to anon, authenticated
with check (status = 'new');

create policy "Admissions team can read inquiry submissions"
on public.inquiry_submissions for select
to authenticated
using (public.has_role(array['super_admin', 'admin', 'admissions']));

create policy "Admissions team can update inquiry submissions"
on public.inquiry_submissions for update
to authenticated
using (public.has_role(array['super_admin', 'admin', 'admissions']))
with check (public.has_role(array['super_admin', 'admin', 'admissions']));

create policy "Public can subscribe to newsletter"
on public.newsletter_subscribers for insert
to anon, authenticated
with check (status = 'active');

create policy "Admins can manage newsletter subscribers"
on public.newsletter_subscribers for all
to authenticated
using (public.has_role(array['super_admin', 'admin']))
with check (public.has_role(array['super_admin', 'admin']));

create policy "Admins can read audit logs"
on public.audit_logs for select
to authenticated
using (public.has_role(array['super_admin', 'admin']));

create policy "Admins can create audit logs"
on public.audit_logs for insert
to authenticated
with check (public.has_role(array['super_admin', 'admin', 'editor', 'admissions']));

insert into storage.buckets (id, name, public)
values
  ('public-media', 'public-media', true),
  ('documents', 'documents', true),
  ('private-uploads', 'private-uploads', false)
on conflict (id) do nothing;

create policy "Public can read public media objects"
on storage.objects for select
to anon, authenticated
using (bucket_id in ('public-media', 'documents'));

create policy "Content admins manage public media objects"
on storage.objects for all
to authenticated
using (
  bucket_id in ('public-media', 'documents')
  and public.has_role(array['super_admin', 'admin', 'editor'])
)
with check (
  bucket_id in ('public-media', 'documents')
  and public.has_role(array['super_admin', 'admin', 'editor'])
);

create policy "Admins manage private upload objects"
on storage.objects for all
to authenticated
using (
  bucket_id = 'private-uploads'
  and public.has_role(array['super_admin', 'admin'])
)
with check (
  bucket_id = 'private-uploads'
  and public.has_role(array['super_admin', 'admin'])
);
