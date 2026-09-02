import { createClient } from "@supabase/supabase-js";

// This client uses the Supabase *service role* key, which bypasses row
// level security. It must only ever run on the server (API routes, server
// components) and must never be imported from a "use client" file, because
// that would ship the key to the browser.
let cachedClient;

export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase server config. Set SUPABASE_SERVICE_ROLE_KEY in .env.local (Supabase dashboard -> Project settings -> API -> service_role key)."
    );
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return cachedClient;
}
