import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;

  initialize: () => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<any>;

  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;

  logout: () => Promise<void>;
}

let authSubscription: {
  unsubscribe: () => void;
} | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      set({ loading: true });

      // cleanup previous listener (important for HMR + PWA reloads)
      authSubscription?.unsubscribe?.();
      authSubscription = null;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      set({
        user: session?.user ?? null,
        loading: false,
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          set({
            user: session?.user ?? null,
            loading: false,
          });
        }
      );

      authSubscription = subscription;
    } catch (error) {
      console.error("[AuthStore] initialize error:", error);

      set({
        user: null,
        loading: false,
      });
    }
  },

  login: async (email, password) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  register: async (email, password, username) => {
    const result = await supabase.auth.signUp({
      email,
      password,
    });

    if (result.error) throw result.error;

    const user = result.data.user;

    if (!user) {
      throw new Error("Failed to create account");
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        username: username.trim(),
        role: "student",
      });

    if (profileError) throw profileError;

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "welcome",
        title: "🎉 Welcome to Campus Social!",
        body:
          "Connect with students, share ideas, and stay updated with campus life.",
      });

    if (notificationError) {
      console.error(
        "[AuthStore] Welcome notification error:",
        notificationError
      );
    }

    return result;
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      authSubscription?.unsubscribe?.();
      authSubscription = null;

      set({
        user: null,
        loading: false,
      });
    }
  },
}));