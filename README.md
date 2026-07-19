# I Miss You, Fatouma

A small Next.js app with a NestJS API, Prisma ORM, and Supabase Postgres storage.

- `/` is the page for her. Pressing **I miss you too** saves the response and shows only: `Message sent, hope we meet again.`
- `/responses` is the private response dashboard.
- `server/miss-you/miss-you.controller.ts` is the NestJS controller for sending and listing responses.
- `prisma/schema.prisma` maps Prisma to the Supabase `miss_you_responses` table.

## 1. Create The Supabase Table

In Supabase, open SQL Editor, paste `supabase/schema.sql`, and run it.

## 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?sslmode=require"
NEST_API_URL=http://localhost:4000
WEB_ORIGIN=http://localhost:3000
PORT=4000
```

For the optional Next/Supabase fallback, also set:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Run Locally

Run the Nest API:

```bash
npm run api:dev
```

Run the Next frontend in another terminal:

```bash
npm run dev
```

Open `http://localhost:3000`.

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
