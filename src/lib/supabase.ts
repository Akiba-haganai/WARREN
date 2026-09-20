// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Enforce fail-fast 8s timeout to prevent hanging requests on slow/flaky networks
const timeoutFetch = (url: RequestInfo | URL, options: RequestInit = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);
  return fetch(url, { ...options, signal: options.signal || controller.signal })
    .finally(() => clearTimeout(id));
};

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    global: {
      fetch: timeoutFetch,
    },

    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },

    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);