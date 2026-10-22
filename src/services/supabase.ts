import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Provide build-time fallback values to allow static analysis and Docker builds to succeed without live secrets
export const supabase = createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseServiceRoleKey || "placeholder-key"
);
