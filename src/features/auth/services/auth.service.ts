import { supabase } from "../../../lib/supabase";
import type { AuthResponse } from "@supabase/supabase-js";

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signUp({ email, password });
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function resetPassword(email: string): Promise<void> {
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });
}