"use client";

import { Auth } from "@supabase/auth-ui-react";
import { useSupabase } from "../providers/supabase-provider";
import { ThemeMinimal, ThemeSupa, darkThemes } from "@supabase/auth-ui-shared";
import * as ja from './localization/jananese/ja.json'

export default function ClientAuth() {
  const { supabase } = useSupabase();
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeMinimal }}
      providers={[]}
      localization={{ variables: ja }}
    />
  );
}
