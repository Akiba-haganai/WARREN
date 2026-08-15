import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration missing (Supabase keys)" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Auth Header Bearer Token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Verify calling user's JWT
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid session token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if caller has admin role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || (profile.role !== "admin" && profile.role !== "moderator")) {
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin or Moderator role required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { requestId, action } = await req.json();

    if (!requestId) {
      return new Response(
        JSON.stringify({ error: "Missing requestId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch recovery request row
    const { data: recReq, error: recError } = await supabaseAdmin
      .from("password_recovery_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (recError || !recReq) {
      return new Response(
        JSON.stringify({ error: "Recovery request not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "reject") {
      await supabaseAdmin
        .from("password_recovery_requests")
        .update({
          status: "rejected",
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
        })
        .eq("id", requestId);

      return new Response(
        JSON.stringify({ success: true, message: "Request rejected" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate recovery reset link via Supabase Auth Admin
    const origin = req.headers.get("origin") || "https://warren-connect.vercel.app";
    const redirectTo = `${origin}/update-password`;

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: recReq.email,
      options: { redirectTo },
    });

    if (linkError || !linkData?.properties?.action_link) {
      return new Response(
        JSON.stringify({ error: "Failed to generate recovery link: " + (linkError?.message || "Unknown") }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resetUrl = linkData.properties.action_link;

    // Send email via Resend API if key is available
    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Wave <onboarding@resend.dev>",
          to: [recReq.email],
          subject: "Password Reset Request Approved - Wave",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 16px;">
              <h2 style="color: #2563eb;">Password Reset Approved</h2>
              <p>Hello,</p>
              <p>Your password recovery identity verification was approved by a Wave administrator.</p>
              <p>Click the button below to set a new password for your account:</p>
              <p style="margin: 24px 0;">
                <a href="${resetUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">Reset Password Now</a>
              </p>
              <p style="font-size: 12px; color: #64748b;">If you did not request this, please contact support immediately.</p>
            </div>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.warn("Resend API warning:", errText);
      }
    }

    // Update request status to approved
    await supabaseAdmin
      .from("password_recovery_requests")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq("id", requestId);

    return new Response(
      JSON.stringify({ success: true, resetUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
