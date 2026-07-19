# I Miss You, Fatouma 💌

A little Next.js app with two sides:

- **`/`** — the page for her: a "I miss you" message with an **"I miss you too"** button. Every press is saved to Supabase with the exact date and time.
- **`/responses`** — the page for you: a private dashboard showing every time she pressed the button — total count, most recent, first time, and a full timeline with date, time, and the device she used.

## Setup

### 1. Create the Supabase table

In your [Supabase](https://supabase.com) project, open **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and run it.

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values from **Supabase Dashboard → Project Settings → API**:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> The service role key is only ever used server-side (in `app/api/miss-you/route.ts`). Never commit `.env.local` — it's already gitignored.

When deploying (e.g. Vercel), add the same two variables in the project's environment settings.

### 3. Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for her page, and [http://localhost:3000/responses](http://localhost:3000/responses) for yours.

## How it works

- `app/api/miss-you/route.ts` — the controller. `POST` records a press (timestamp + device), `GET` returns all presses newest-first.
- `lib/supabase.ts` — server-only Supabase client.
- `supabase/schema.sql` — the `miss_you_responses` table definition.
