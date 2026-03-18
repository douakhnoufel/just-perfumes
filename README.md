# parfume BADOU

Luxury perfume storefront for Badou built with Next.js, Supabase, Vercel, and Capacitor.

## Project Docs Map

- App setup and deployment: `README.md`
- Supabase schema and reward trigger: `supabase/schema.sql`
- Environment variables template: `.env.example`
- Vercel config: `vercel.json`
- Android wrapper config: `capacitor.config.ts`

## Features Included

- Animated premium storefront UI/UX
- Supabase email/password authentication
- Admin promotion and reduction manager
- Referral points flow
- Loyalty rule: buy 5 items, get the 6th free
- Android packaging support via Capacitor

## Prerequisites

- Node.js 20+
- npm 10+
- GitHub account
- Supabase account
- Vercel account
- Android Studio (for APK build)

## Step-by-Step Launch Checklist

Use this as your execution checklist. Mark each item when done.

### 1) Get the project running locally

- [ ] Open terminal in this folder.
- [ ] Install dependencies:
  ```bash
  npm install
  ```
- [ ] Create env file from template:
  ```bash
  copy .env.example .env.local
  ```
  If `copy` fails in your shell, create `.env.local` manually.

### 2) Create and configure Supabase

- [ ] Create a new Supabase project.
- [ ] In Supabase dashboard, go to `Project Settings > API`.
- [ ] Copy:
  - `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public key` -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role key` -> `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local dev.
- [ ] Open `SQL Editor` and run `supabase/schema.sql`.

Screenshot checklist:
- [ ] Screenshot A: Supabase API page showing URL + anon key.
- [ ] Screenshot B: SQL editor success message after running schema.

### 3) Start the app locally

- [ ] Run:
  ```bash
  npm run dev
  ```
- [ ] Open `http://localhost:3000`.
- [ ] Visit:
  - `/auth` (signup/signin)
  - `/shop` (products + reward-aware cart)
  - `/account` (points and loyalty status)
  - `/admin` (promotion management)

Screenshot checklist:
- [ ] Screenshot C: Homepage hero.
- [ ] Screenshot D: Shop page with cart totals.
- [ ] Screenshot E: Admin page with promotion form.

### 4) Make your admin user

By default, all users are non-admin. Promote one account in Supabase:

- [ ] Create a user from `/auth` in the app.
- [ ] In Supabase Table Editor -> `profiles`, set `is_admin = true` for that user.
- [ ] Re-login and confirm `/admin` can save promotions.

### 5) Deploy to Vercel

- [ ] Push repository to GitHub.
- [ ] In Vercel, click `Add New Project` and import this repo.
- [ ] Set these environment variables in Vercel Project Settings:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL` (your production URL)
- [ ] Deploy.
- [ ] After first deploy, copy production URL and update `NEXT_PUBLIC_SITE_URL` if needed, then redeploy.

Screenshot checklist:
- [ ] Screenshot F: Vercel env vars screen.
- [ ] Screenshot G: Successful production deployment screen.

### 6) Build Android APK (small app wrapper)

This app uses Capacitor to wrap your web app into Android.

- [ ] Build web app:
  ```bash
  npm run build
  ```
- [ ] Ensure `capacitor.config.ts` points to the correct web output folder.
- [ ] Add Android platform:
  ```bash
  npx cap add android
  ```
- [ ] Sync web assets:
  ```bash
  npx cap sync android
  ```
- [ ] Open Android project:
  ```bash
  npx cap open android
  ```
- [ ] In Android Studio:
  - Build -> Build Bundle(s)/APK(s) -> Build APK(s)
  - Locate generated APK and test on a device.

Screenshot checklist:
- [ ] Screenshot H: Android Studio build success.
- [ ] Screenshot I: Installed app on Android device.

## Production QA Checklist

- [ ] Signup works.
- [ ] Signin works.
- [ ] Admin can create promotion.
- [ ] Promotion discount appears in shop prices.
- [ ] Referral points update after paid order flow.
- [ ] Loyalty counter updates correctly.
- [ ] When customer reaches 5 previous purchased items, next cart applies 1 free item.

## Common Issues

- `Invalid API key`:
  check `.env.local` and Vercel env keys.
- `Admin access required`:
  set `profiles.is_admin = true` for your account.
- No data visible:
  run `supabase/schema.sql` and ensure tables exist.
- APK opens blank page:
  verify Capacitor `webDir` and run `npx cap sync android` again.
# JUST-perfume
