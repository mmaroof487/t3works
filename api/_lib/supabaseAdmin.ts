import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

type SupabaseAdminClient = ReturnType<typeof createClient<Database>>;

let cachedClient: SupabaseAdminClient | null = null;

export function getSupabaseAdmin(): SupabaseAdminClient {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }

  cachedClient = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

export const RESUME_BUCKET = 'resumes';
export const JD_BUCKET = 'job-descriptions';
