import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;

  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, username: string) => Promise<any>;
  logout: () => Promise<void>;
}

// Store the full subscription object so we can call .data.subscription.unsubscribe()
let authSubscription: { data: { subscription: { unsubscribe: () => void } } } | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      set({ loading: true });

      // Clean up previous listener (important for HMR + PWA reloads)
      authSubscription?.data?.subscription?.unsubscribe();
      authSubscription = null;

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // If the session is invalid (e.g., expired refresh token), force sign out
      if (error || !session) {
        console.warn("[AuthStore] Session invalid or expired. Signing out.");
        await supabase.auth.signOut();
        set({ user: null, loading: false });
        return;
      }

      set({ user: session.user ?? null, loading: false });

      // Store the full subscription object
      authSubscription = supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      });
    } catch (err) {
      console.error("[AuthStore] initialize error:", err);
      await supabase.auth.signOut();
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  },

  register: async (email, password, username) => {
    const result = await supabase.auth.signUp({ email, password });
    if (result.error) throw result.error;

    const user = result.data.user;
    if (!user) throw new Error("Failed to create account");

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: username.trim(), role: "student" });
    if (profileError) throw profileError;

    const { error: notifError } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "welcome",
        title: "🎉 Welcome to Campus Social!",
        body: "Connect with students, share ideas, and stay updated with campus life.",
      });
    if (notifError) {
      console.warn("[AuthStore] Welcome notification could not be created. The user can still log in.", notifError.message);
    }

    return result;
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      authSubscription?.data?.subscription?.unsubscribe();
      authSubscription = null;
      set({ user: null, loading: false });
    }
  },
}));