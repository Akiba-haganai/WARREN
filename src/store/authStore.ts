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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, loading: false });

      supabase.auth.onAuthStateChange((_, session) => {
        set({ user: session?.user ?? null });
      });
    } catch (error) {
      console.error(error);
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),

  register: async (
  email,
  password,
  username
) => {
  const result =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (result.error) {
    throw result.error;
  }

  const user =
    result.data.user;

  if (!user) {
    throw new Error(
      "Failed to create account"
    );
  }

  const {
    error: profileError,
  } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      username: username.trim(),
      role: "student",
    });

  if (profileError) {
    throw profileError;
  }

  const {
    error: notificationError,
  } = await supabase
    .from("notifications")
    .insert({
      user_id: user.id,
      type: "welcome",
      title:
        "🎉 Welcome to Campus Social!",
      body:
        "Connect with students, share ideas, and stay updated with campus life.",
    });

  if (notificationError) {
    console.error(
      notificationError
    );
  }

  return result;
},

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));