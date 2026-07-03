import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, username: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

let authSubscription: { data: { subscription: { unsubscribe: () => void } } } | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      set({ loading: true });
      authSubscription?.data?.subscription?.unsubscribe();
      authSubscription = null;

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.warn("[AuthStore] No valid session.");
        set({ user: null, loading: false });
        return;
      }

      set({ user: session.user ?? null, loading: false });

      authSubscription = supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      });
    } catch (err) {
      console.error("[AuthStore] initialize error:", err);
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Map Supabase error codes to user‑friendly messages
      const message =
        error.message === "Invalid login credentials"
          ? "Invalid email or password."
          : error.message || "Login failed. Please try again.";
      return { error: message };
    }
    // Immediately set the user so ProtectedRoute doesn't bounce the user back
    set({ user: data.user ?? null });
    return {};
  },

  register: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      const message =
        error.message === "User already registered"
          ? "An account with this email already exists."
          : error.message || "Registration failed. Please try again.";
      return { error: message };
    }

    const user = data.user;
    if (!user) return { error: "Failed to create account." };

    // Create profile
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: username.trim(), role: "student" });
    if (profileError) {
      return { error: "Account created but failed to save profile. Contact support." };
    }

    // Welcome notification (optional)
    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: user.id,
      type: "welcome",
      title: "🎉 Welcome to Warren!",
      body: "Connect with students, share ideas, and stay updated with campus life.",
    });
    if (notifError) console.warn("[AuthStore] Welcome notification error:", notifError);

    // Immediately set the user
    set({ user });
    return {};
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