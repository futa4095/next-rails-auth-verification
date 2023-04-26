import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

export const createServerClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export const createAdminAuthClient = () => {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const supabase = createServerComponentSupabaseClient<Database>({
    supabaseKey,
    headers,
    cookies,
  });
  return supabase.auth.admin;
};
