# Eureka Residential Secondary School Website Architecture

Prepared for a Next.js 16 website deployed on Vercel with Supabase as the database, storage, and authentication backend.

## Source State

- `public/schooldetails.md` now contains structured Eureka details extracted from the local image assets.
- `public/images` contains enough first-party images to build the initial site without stock placeholders.
- The visual reference is `https://pathshala.edu.np/`.
- A desktop reference screenshot was captured locally as `pathshala-reference-full.png` for design analysis.
- Next.js 16 availability and major App Router changes were checked against official Next.js docs on 2026-06-14.
- Supabase Next.js setup and Vercel environment variable behavior were checked against official docs on 2026-06-14.

## Product Brief

Build a public school website for Eureka Residential Secondary School that follows the same layout rhythm, section placement, navigation shape, color usage, and interaction patterns as Pathshala, but with Eureka content, imagery, forms, and admin-managed data.

The site must include:

- Public marketing pages for school discovery, admissions, programs, notices, events, achievements, gallery, results, downloads, and contact.
- Admin panel for managing banners, pages, blogs, notices, news, events, achievements, gallery, downloads, testimonials, FAQs, and site settings.
- Admin inbox views for admission forms, contact forms, inquiry forms, newsletter subscribers, and other submissions.
- Supabase database with row level security.
- Vercel deployment with preview and production environments.

## Reference Design Rules

Match the reference structure and visual behavior closely, while replacing all brand content and assets with Eureka material.

### Global Style

- Palette:
  - Aqua/teal section bands similar to the reference background.
  - Bright orange primary CTAs.
  - Dark navy footer and dark text.
  - White cards and white content sections.
  - Eureka navy/yellow accents from school identity assets.
- Typography:
  - Large, bold, rounded headings for hero and section titles.
  - Compact eyebrow labels in small aqua or orange pills.
  - Body text in readable dark gray with generous line-height.
- Shape:
  - Mostly square or lightly rounded blocks.
  - Buttons use pill or small-radius styles depending on placement.
  - Cards use subtle shadow and white backgrounds.
- Spacing:
  - Wide horizontal desktop layout with centered max-width content.
  - Alternating white and aqua bands.
  - Strong vertical rhythm between major sections.
- Imagery:
  - Use real Eureka photos, not generated placeholders.
  - Hero should use `school building.jpg` or a strong student/campus image.
  - Program cards should use level-specific images.

### Header And Navigation

Pathshala pattern to mirror:

- Thin top admission CTA strip.
- Logo at far left.
- Horizontal nav in orange/white block treatment.
- Dropdowns for programs and resources.
- Right-side "Enquire Now" CTA button.
- Mobile collapses into a menu drawer with the same order.

Eureka nav:

- Top strip: `Admission Open 2083 (2026/27)` or current admission notice.
- Main links:
  - Home
  - About Us
  - Our Programs
  - Admission
  - Resources
  - Life at Eureka
  - News & Notices
  - Contact
- Program dropdown:
  - Pre-Primary
  - Primary Level
  - Basic Level
  - Secondary Level
  - Grade XI-XII
- Resources dropdown:
  - Notices
  - Downloads
  - Results
  - Gallery
  - FAQs
- CTA: Enquire Now

### Homepage Section Order

Use this order to match the reference:

1. Header and admission strip
2. Hero with school intro, search/inquiry block, and two CTAs
3. About + accordion feature block
4. Programs intro and two or three large program cards
5. Testimonials or voices of impact
6. Stats strip
7. Why Eureka section with orange feature card
8. Gallery carousel
9. Scholarship/admission promotional band
10. Documents/downloads section
11. FAQ accordion
12. Contact form section
13. Newsletter strip
14. Dark multi-column footer

## System Architecture

### High-Level Architecture

```txt
Users and Admins
  |
  v
Vercel Edge / Next.js 16 App Router
  |
  |-- Public Server Components
  |-- Admin Server Components
  |-- Server Actions
  |-- Route Handlers
  |-- proxy.ts auth boundary
  |
  v
Supabase
  |
  |-- Postgres database
  |-- Supabase Auth
  |-- Supabase Storage
  |-- Row Level Security
  |-- Realtime optional for admin inbox
```

### Frontend

- Framework: Next.js 16 App Router.
- Language: TypeScript.
- Styling: Tailwind CSS with CSS variables for theme tokens.
- Component base: shadcn/ui for admin and form primitives; custom public components for Pathshala-style layout.
- Icons: lucide-react.
- Forms: React Hook Form + Zod.
- Rich text: TipTap or Plate for admin editing; render sanitized HTML/MDX on public pages.
- Images: Next Image with Supabase Storage URLs and local `/public/images` seed assets.

### Backend

- Supabase Postgres for structured content.
- Supabase Auth for admin users.
- Supabase Storage for uploaded media and downloadable files.
- Next.js Server Actions for admin CRUD.
- Route handlers only where API endpoints are needed:
  - form submission endpoints
  - webhooks
  - file signing
  - search endpoint if needed
- RLS enabled on every content and form table.

### Rendering And Caching

- Public pages use Server Components.
- Public content is cacheable by slug/type.
- After admin edits, trigger `revalidatePath` and `revalidateTag`.
- Consider enabling Next.js 16 `cacheComponents` after the first stable build.
- Admin routes are dynamic and should never be statically cached.
- Form submissions should be dynamic server actions or route handlers.

### Auth And Authorization

- Supabase Auth handles login.
- `profiles` table maps users to roles:
  - `super_admin`
  - `admin`
  - `editor`
  - `admissions`
  - `viewer`
- `proxy.ts` protects `/admin/*`.
- Admin layout verifies the session server-side.
- Service role key is used only in server-only code for privileged admin tasks.
- Public anon key is safe for browser reads only where RLS allows it.

### Deployment

- Host: Vercel.
- Database/storage/auth: Supabase.
- Required environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_JWT_SECRET` if needed for webhook/auth verification
  - `NEXT_PUBLIC_SITE_URL`
  - `RESEND_API_KEY` or SMTP provider if email notifications are added
- Keep separate Vercel env values for development, preview, and production.
- Run Supabase migrations before promoting production deployments.

## Next.js App Directory Plan

```txt
app/
|-- layout.tsx
|-- globals.css
|-- sitemap.ts
|-- robots.ts
|-- not-found.tsx
|-- error.tsx
|-- loading.tsx
|-- proxy.ts
|
|-- (site)/
|   |-- layout.tsx
|   |-- page.tsx
|   |-- about/
|   |   |-- page.tsx
|   |-- programs/
|   |   |-- page.tsx
|   |   |-- [slug]/
|   |       |-- page.tsx
|   |-- admission/
|   |   |-- page.tsx
|   |   |-- apply/
|   |       |-- page.tsx
|   |-- notices/
|   |   |-- page.tsx
|   |   |-- [slug]/
|   |       |-- page.tsx
|   |-- news/
|   |   |-- page.tsx
|   |   |-- [slug]/
|   |       |-- page.tsx
|   |-- events/
|   |   |-- page.tsx
|   |   |-- [slug]/
|   |       |-- page.tsx
|   |-- achievements/
|   |   |-- page.tsx
|   |   |-- [slug]/
|   |       |-- page.tsx
|   |-- gallery/
|   |   |-- page.tsx
|   |-- results/
|   |   |-- page.tsx
|   |-- downloads/
|   |   |-- page.tsx
|   |-- life-at-eureka/
|   |   |-- page.tsx
|   |-- contact/
|       |-- page.tsx
|
|-- (auth)/
|   |-- login/
|   |   |-- page.tsx
|   |-- auth/
|       |-- callback/
|           |-- route.ts
|
|-- admin/
|   |-- layout.tsx
|   |-- page.tsx
|   |-- banners/
|   |   |-- page.tsx
|   |   |-- new/
|   |   |   |-- page.tsx
|   |   |-- [id]/
|   |       |-- page.tsx
|   |-- pages/
|   |   |-- page.tsx
|   |   |-- [slug]/
|   |       |-- page.tsx
|   |-- posts/
|   |   |-- page.tsx
|   |   |-- new/
|   |   |   |-- page.tsx
|   |   |-- [id]/
|   |       |-- page.tsx
|   |-- notices/
|   |   |-- page.tsx
|   |-- events/
|   |   |-- page.tsx
|   |-- achievements/
|   |   |-- page.tsx
|   |-- media/
|   |   |-- page.tsx
|   |-- forms/
|   |   |-- admissions/
|   |   |   |-- page.tsx
|   |   |-- contacts/
|   |   |   |-- page.tsx
|   |   |-- inquiries/
|   |       |-- page.tsx
|   |-- downloads/
|   |   |-- page.tsx
|   |-- settings/
|       |-- page.tsx
|
|-- api/
    |-- forms/
    |   |-- admission/
    |   |   |-- route.ts
    |   |-- contact/
    |   |   |-- route.ts
    |   |-- inquiry/
    |       |-- route.ts
    |-- newsletter/
        |-- route.ts
```

## Supporting Directory Plan

```txt
components/
|-- site/
|   |-- top-admission-strip.tsx
|   |-- header.tsx
|   |-- nav-dropdown.tsx
|   |-- hero.tsx
|   |-- about-accordion.tsx
|   |-- program-card.tsx
|   |-- stats-band.tsx
|   |-- gallery-carousel.tsx
|   |-- faq-accordion.tsx
|   |-- contact-form.tsx
|   |-- newsletter-strip.tsx
|   |-- footer.tsx
|-- admin/
|   |-- admin-shell.tsx
|   |-- admin-sidebar.tsx
|   |-- data-table.tsx
|   |-- content-editor.tsx
|   |-- media-picker.tsx
|   |-- status-badge.tsx
|-- forms/
|   |-- admission-form.tsx
|   |-- contact-form-fields.tsx
|   |-- inquiry-form.tsx
|-- ui/
    |-- shadcn components

lib/
|-- supabase/
|   |-- client.ts
|   |-- server.ts
|   |-- admin.ts
|   |-- middleware.ts
|-- content/
|   |-- queries.ts
|   |-- mutations.ts
|   |-- serializers.ts
|-- validations/
|   |-- admission.ts
|   |-- contact.ts
|   |-- content.ts
|-- constants/
|   |-- nav.ts
|   |-- school.ts
|-- utils.ts

supabase/
|-- migrations/
|-- seed.sql
|-- storage-policies.sql
```

## Supabase Data Model

### Core Tables

```sql
profiles (
  id uuid primary key references auth.users(id),
  full_name text not null,
  role text not null check (role in ('super_admin', 'admin', 'editor', 'admissions', 'viewer')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)

site_settings (
  id bigint primary key generated always as identity,
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz default now()
)

media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  alt_text text,
  caption text,
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
)
```

### Content Tables

```sql
pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb,
  seo jsonb,
  status text not null default 'draft',
  published_at timestamptz,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)

banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_id uuid references media_assets(id),
  cta_label text,
  cta_href text,
  placement text not null default 'home_hero',
  sort_order int default 0,
  is_active boolean default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now()
)

posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('blog', 'notice', 'news')),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb,
  cover_image_id uuid references media_assets(id),
  status text not null default 'draft',
  pinned boolean default false,
  published_at timestamptz,
  created_by uuid references profiles(id),
  updated_at timestamptz default now()
)

events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb,
  cover_image_id uuid references media_assets(id),
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'draft',
  published_at timestamptz
)

achievements (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  body jsonb,
  image_id uuid references media_assets(id),
  achievement_date date,
  status text not null default 'draft',
  published_at timestamptz
)

programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text,
  summary text,
  body jsonb,
  image_id uuid references media_assets(id),
  sort_order int default 0,
  is_active boolean default true
)

gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_id uuid references media_assets(id),
  album text,
  sort_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default now()
)

documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_id uuid references media_assets(id),
  type text not null,
  sort_order int default 0,
  is_public boolean default true,
  created_at timestamptz default now()
)

faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int default 0,
  is_active boolean default true
)

testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text,
  video_url text,
  image_id uuid references media_assets(id),
  sort_order int default 0,
  is_active boolean default true
)
```

### Form Tables

```sql
admission_submissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  guardian_name text not null,
  phone text not null,
  email text,
  applying_for text not null,
  message text,
  status text not null default 'new',
  metadata jsonb default '{}',
  created_at timestamptz default now()
)

contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz default now()
)

inquiry_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  interest text,
  message text,
  status text not null default 'new',
  created_at timestamptz default now()
)

newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active',
  created_at timestamptz default now()
)

audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
)
```

## RLS Policy Plan

- Public users can read only records where:
  - `status = 'published'`
  - `is_active = true`
  - `published_at <= now()`
- Public users can insert into submission tables only.
- Public users cannot select form submissions.
- Admin users can manage content based on role.
- `super_admin` can manage users and settings.
- `admissions` can view and update form submission statuses but cannot edit public pages.
- Storage buckets:
  - `public-media`: public read, admin write.
  - `documents`: public read only for public files, admin write.
  - `private-uploads`: admin only.

## Admin Panel Plan

### Admin Dashboard

- Summary cards:
  - New admission forms
  - New inquiries
  - New contact messages
  - Published notices
  - Upcoming events
- Quick actions:
  - Add notice
  - Add banner
  - Upload media
  - View admissions

### Content Management

- Banners:
  - Create hero banners, admission popups, and section promos.
  - Fields: title, subtitle, image, CTA, active dates, placement.
- Pages:
  - About, programs, life at Eureka, admission, downloads, contact static content.
- Posts:
  - Blog, notice, news in one editor with `type`.
- Events:
  - Start/end date, location, image, content.
- Achievements:
  - SEE results, GPA achievers, competitions, awards.
- Gallery:
  - Albums and featured images.
- Downloads:
  - Prospectus, calendar, admission forms, policies.
- FAQs:
  - Admission, programs, transport, hostel, results.
- Testimonials:
  - Parent/student/alumni quotes or videos.

### Form Inbox

- Admission submissions:
  - Filter by status and applying class.
  - Statuses: new, contacted, scheduled, admitted, rejected, archived.
- Contact submissions:
  - Statuses: new, replied, archived.
- Inquiry submissions:
  - Statuses: new, contacted, follow_up, closed.
- Newsletter:
  - Export CSV and unsubscribe controls.

## Page Content Plan

### Home

- Hero:
  - Eyebrow: Eureka Residential Secondary School, established 2050/1994.
  - Heading: Helping students pursue excellence with discipline and confidence.
  - Copy: Use the disciplined environment and excellent results positioning.
  - CTAs: Discover Us, Enroll Now.
  - Image: `school building.jpg` or student/campus hero.
- About:
  - Title: Pave your path forward with Eureka Residential Secondary School.
  - Mention PG to Grade XII, Dharan-1, values, results, PBL, technology.
- Accordion cards:
  - Our Programs
  - Eureka Life
  - News & Notices
- Programs:
  - Pre-Primary and Primary
  - Basic and Secondary
  - Grade XI-XII
- Testimonials:
  - Use placeholders until real quotes are supplied.
- Stats:
  - 30+ years since 1994
  - 106 SEE candidates
  - 100% SEE result
  - 3 GPA 4.0 achievers
- Why Eureka:
  - PBL, discipline, technology, CAS, clubs, labs.
- Gallery:
  - Use local event and student images.
- Documents:
  - Admission form
  - School prospectus
  - Academic calendar
- FAQ:
  - Admission process, grades, facilities, location, contact.
- Contact:
  - Form and quick contact.

### About Us

- Intro hero with campus image.
- History: established 2050 BS / 1994 AD.
- Mission and values.
- Principal message.
- Coordinators.
- Infrastructure.
- Academic approach.
- School statistics.

### Our Programs

- Overview of PG to Grade XII.
- Program cards:
  - Montessori / Pre-Primary
  - Primary Level
  - Basic Level
  - Secondary Level
  - Grade XI-XII
- Each detail page:
  - Hero
  - Learning approach
  - Facilities
  - Activities
  - Admission CTA

### Admission

- Admission open banner.
- Form distribution and entrance exam schedule.
- Process:
  - Inquiry
  - Form submission
  - Entrance / interaction
  - Document verification
  - Admission confirmation
- Online admission form.
- Required documents.
- FAQ.

### Life At Eureka

- Clubs.
- Sports.
- Yoga and wellness.
- Assembly and discipline.
- Celebrations.
- Field visits.
- Community and environment activities.

### News, Notices, Blogs

- Filter tabs.
- Pinned admission notice.
- Detail pages with related content.

### Events

- Upcoming and past events.
- Event detail with date, location, gallery, CTA.

### Achievements And Results

- SEE Results 2082.
- 100% result highlight.
- GPA 4.0 achievers.
- Student result gallery.
- Awards and competitions.

### Gallery

- Albums:
  - Campus
  - Academics
  - Sports
  - Celebrations
  - Clubs
  - Results

### Downloads

- Prospectus.
- Academic calendar.
- Admission form.
- Policies.
- Result documents.

### Contact

- Contact form.
- Inquiry CTA.
- Address and phone.
- Map embed after official map link is confirmed.
- Office hours if provided later.

## Seed Content Mapping

Use existing assets like this:

```txt
Hero: public/images/school building.jpg
About: public/images/students with smart board.jpg
Pre-primary: public/images/pre primary.jpg
Primary: public/images/primary kids.jpg
Secondary: public/images/secondary level.jpg
Staff: public/images/staffs.jpg
Results: public/images/4 gpa.jpg and public/images/see results 2082.jpg
Sports: public/images/volleyball.jpg, public/images/table tennis.jpg
Wellness: public/images/yoga programmes.jpg
Gallery: all student/event images
```

## Build Prompt

Use this prompt for the implementation agent or next coding pass:

```txt
Build a production-ready Next.js 16 App Router website for Eureka Residential Secondary School in the current repository.

Use TypeScript, Tailwind CSS, shadcn/ui for admin primitives, lucide-react icons, React Hook Form, Zod, Supabase Auth, Supabase Postgres, and Supabase Storage. Deploy target is Vercel.

The public site must closely match the layout, section order, visual rhythm, teal/orange/dark footer palette, navigation shape, accordions, cards, FAQ, forms, newsletter strip, and footer structure of https://pathshala.edu.np/, but all content and imagery must be Eureka-specific. Do not copy Pathshala text or assets. Use the local images in public/images and the details in public/schooldetails.md.

Create:
- Public site routes for home, about, programs, admission, notices, news, events, achievements, gallery, results, downloads, life-at-eureka, and contact.
- Admin routes under /admin for banners, pages, posts, notices, events, achievements, media, forms, downloads, FAQs, testimonials, and settings.
- Supabase schema migrations for content, forms, profiles, media, settings, and audit logs.
- RLS policies so public users can read only published active content and insert only public form submissions.
- Supabase server/client/admin helpers.
- Protected admin auth with Supabase cookie-based auth and Next.js 16 proxy.ts.
- Server Actions for admin CRUD and form status updates.
- Public form handlers for admission, contact, inquiry, and newsletter.
- Seed content using Eureka details and local images.

Design constraints:
- Match the Pathshala-style header: admission strip, logo left, horizontal nav, dropdowns, Enquire Now CTA, mobile drawer.
- Match the homepage order: hero, about accordion, programs, testimonials, stats, why section, gallery, scholarship/admission band, documents, FAQ, contact, newsletter, footer.
- Use real images, not placeholder blocks.
- Keep cards lightly rounded and clean.
- Avoid nested cards and oversized marketing sections outside the reference pattern.
- Make all forms accessible and responsive.

Verification:
- Run lint, typecheck, and build.
- Start the dev server and inspect desktop and mobile layouts.
- Compare against the saved reference screenshot pathshala-reference-full.png for visible layout differences.
- Confirm admin auth guards, form inserts, and RLS behavior.
```

## Database Prompt

```txt
Create Supabase SQL migrations for the Eureka school website using the data model in EUREKA_SYSTEM_ARCHITECTURE.md.

Requirements:
- Enable pgcrypto if needed for gen_random_uuid().
- Create profiles, site_settings, media_assets, pages, banners, posts, events, achievements, programs, gallery_items, documents, faq_items, testimonials, admission_submissions, contact_submissions, inquiry_submissions, newsletter_subscribers, and audit_logs.
- Add updated_at triggers.
- Add indexes for slugs, published status, content type, pinned status, dates, and form status.
- Enable RLS on every table.
- Public anon role can select published public content only.
- Public anon role can insert into submission tables and newsletter_subscribers only.
- Authenticated admin/editor roles can manage assigned content.
- admissions role can read/update form submission statuses.
- Only super_admin can manage profiles and site_settings.
- Add seed rows for Eureka programs, FAQs, stats, and initial documents.
```

## Frontend Prompt

```txt
Implement the Eureka frontend to visually follow Pathshala's public site.

Use these exact section patterns:
- admission strip above navbar
- logo-left navigation with orange active blocks and dropdowns
- hero with large text on the left and real campus/student image on the right
- search/inquiry micro block in hero area
- aqua about band with two-column layout and accordion cards
- white programs section with large image cards
- aqua testimonials band
- centered stats
- why section with orange feature panel
- aqua gallery band
- white documents row
- FAQ accordion
- contact form
- aqua newsletter strip
- dark navy footer with columns

Use content from public/schooldetails.md. Use local assets from public/images. Keep responsive behavior polished at 375px, 768px, 1024px, and 1440px.
```

## Execution Roadmap

### Phase 1: Project Setup

- Scaffold Next.js 16 with TypeScript and Tailwind.
- Install UI, form, validation, Supabase, and icon dependencies.
- Add environment schema validation.
- Configure `next.config.ts`, `app/globals.css`, and theme tokens.

### Phase 2: Supabase

- Create migrations and storage buckets.
- Add RLS policies.
- Seed school content.
- Create first super admin user manually in Supabase Auth and map it in `profiles`.

### Phase 3: Public Frontend

- Build global header, mobile nav, footer, newsletter strip.
- Build homepage sections in the exact reference order.
- Build listing/detail page templates.
- Add SEO metadata, sitemap, and robots.

### Phase 4: Forms

- Build inquiry, admission, contact, and newsletter forms.
- Add Zod validation.
- Insert submissions into Supabase.
- Add spam controls: honeypot, rate limiting, and server-side validation.

### Phase 5: Admin

- Build login.
- Build protected admin layout.
- Build CRUD screens.
- Build media upload/picker.
- Build forms inbox.
- Add audit logs.

### Phase 6: QA

- Desktop/mobile visual comparison with the Pathshala reference screenshot.
- Accessibility pass.
- RLS tests.
- Form submission tests.
- Vercel preview deploy.

### Phase 7: Production

- Add production env vars in Vercel.
- Run Supabase migrations on production.
- Deploy Vercel production.
- Verify sitemap, forms, admin auth, and content editing.

## Open Items To Confirm

- Official Eureka logo file in transparent PNG/SVG.
- Official map link for Dharan-1, Laxmi Sadak, Sunsari.
- Official email address.
- Current admission dates for 2083.
- Exact program naming for Grade XI-XII.
- Whether hostel and transport require dedicated pages.
- Whether online payments are needed for admission forms.
- Final testimonial quotes/videos.

## References

- Pathshala reference site: https://pathshala.edu.np/
- Next.js 16 release: https://nextjs.org/blog/next-16
- Next.js 16 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- Supabase Next.js guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Vercel environment variables: https://vercel.com/docs/environment-variables
