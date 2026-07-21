# I Miss You, Fatouma

A small Next.js app with a NestJS API, Prisma ORM, and Supabase Postgres storage.

- `/` is the page for her. Pressing **I miss you too** saves the response (with an optional note she can write) and shows: `Sent. Hope we meet again.`
- `/responses` is the private response dashboard: stats plus a day-by-day timeline of every press and note.
- `server/miss-you/miss-you.controller.ts` is the NestJS controller for sending and listing responses.
- `prisma/schema.prisma` maps Prisma to the Supabase `miss_you_responses` table.

## 1. Create The Supabase Project + Table

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it.
   (Alternatively, after step 2 below, run `npx prisma db push`.)

## 2. Configure Environment

Edit `.env` and replace the `DATABASE_URL` placeholder with the real connection
string from **Supabase → Project Settings → Database → Connection string**:

```bash
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?sslmode=require"
NEST_API_URL=http://localhost:4000
WEB_ORIGIN=http://localhost:3000
PORT=4000
```

`[password]` and `[project-ref]` must be replaced with your project's values —
the app cannot send anything until this is real.

For the optional Next/Supabase fallback (used if the Nest API is unreachable),
also set:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Run Locally

One command runs both the Next frontend and the Nest API:

```bash
npm run dev
```

Open `http://localhost:3000`. (To run them separately: `npm run dev:web` and
`npm run api:dev`.)

## Hosting Notes

Use Supabase for the database, deploy the Nest API to any Node.js host, and deploy the Next frontend to any Node.js-capable Next host.

Backend build/start:

```bash
npm run api:build
npm run api:start
```

Frontend build/start:

```bash
npm run build
npm run start
```

Set `DATABASE_URL`, `WEB_ORIGIN`, and `PORT` on the backend host. Set `NEST_API_URL` on the frontend host to the deployed backend URL.
