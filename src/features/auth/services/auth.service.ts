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

// Password Recovery via Admin Queue (Bypasses free-tier email quotas)
export async function requestReset(email: string): Promise<{ success: boolean; message?: string }> {
  const { data, error } = await (supabase.rpc as any)("request_password_reset", {
    p_email: email.trim(),
  });
  if (error) throw error;
  return data as { success: boolean; message?: string };
}

export async function getRecoveryRequests() {
  const { data, error } = await supabase
    .from("password_recovery_requests")
    .select("*, profiles:user_id(username, email)")
    .eq("status", "verified_pending_admin")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function adminApproveReset(requestId: string) {
  // A. Fetch email from queue
  const { data: req, error: fetchErr } = await supabase
    .from("password_recovery_requests")
    .select("id, email, status")
    .eq("id", requestId)
    .single();

  if (fetchErr || !req?.email) {
    throw new Error("Could not find recovery request email.");
  }

  // B. Trigger Native Supabase Auth Mailer with dynamic redirect
  const siteUrl = window.location.origin;
  const { error: resetErr } = await supabase.auth.resetPasswordForEmail(req.email as string, {
    redirectTo: `${siteUrl}/update-password`,
  });

  if (resetErr) {
    const msg = resetErr.message || JSON.stringify(resetErr);
    throw new Error(`Supabase Auth Mailer: ${msg}`);
  }

  // C. Update queue status
  const { error: updateErr } = await supabase
    .from("password_recovery_requests")
    .update({ status: "approved", reviewed_at: new Date().toISOString() })
    .eq("id", requestId);

  if (updateErr) throw updateErr;

  return { success: true };
}

export async function adminRejectReset(requestId: string) {
  const { error: updateErr } = await supabase
    .from("password_recovery_requests")
    .update({ status: "rejected", reviewed_at: new Date().toISOString() })
    .eq("id", requestId);

  if (updateErr) throw updateErr;

  return { success: true };
}