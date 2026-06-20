source visual truth path: pathshala-reference-full.png
implementation: Next.js app homepage at `app/(site)/page.tsx`
primary component: `components/site/site-home.tsx`
local dev URL: http://127.0.0.1:3001
viewport target: responsive desktop and mobile layouts

**Current Result**
- The old static homepage prototype has been converted into a Next.js 16 App Router implementation using TypeScript React, Tailwind CSS utilities, and `lucide-react` icons.
- The public homepage, header, footer, generic public pages, admin shell, forms, sitemap, and Supabase schema scaffolding are implemented.
- The layout follows the Pathshala reference structure and rhythm while using Eureka branding, copy, and local assets.

**Verification**
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed with webpack.
- Build note: Next falls back to WASM SWC because the native `@next/swc-win32-x64-msvc` binding fails on this Windows setup with "not a valid Win32 application". The production build still completes successfully.

**Runtime Checks**
- Home page returns 200 and contains Eureka hero content.
- Admin dashboard returns 200 and contains Eureka dashboard content.
- Sitemap returns 200 and includes public routes.
- Form APIs return a Supabase configuration error until `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and server-side Supabase credentials are configured.

**Visual QA Status**
- Earlier screenshots exist for the static prototype: `eureka-qa-desktop.png` and `eureka-qa-mobile.png`.
- Final screenshot recapture for the Next/Tailwind implementation is blocked because the Chrome DevTools MCP transport closed during QA.
- Browser-independent build and HTTP checks passed.

**Remaining Deployment Inputs**
- Configure Supabase project URL, anon key, service role key, and database password in `.env.local` and Vercel environment variables.
- Apply `supabase/migrations/0001_initial_schema.sql`.
- Load optional seed data from `supabase/seed.sql`.
- Replace temporary/local media with final school-approved assets when available.
