import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface MissYouResponse {
  id: string;
  created_at: string;
  device: string | null;
  user_agent: string | null;
}

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client. Uses the service role key, so it must never
 * be imported from a client component — only from route handlers.
 */
export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local and fill in your Supabase project credentials."
    );
  }

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return client;
}
