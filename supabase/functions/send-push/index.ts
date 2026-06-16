import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
const vapidSubject = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@campussocial.app";

webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

function buildNotification(type: string, payload: any) {
  switch (type) {
    case "new_post":
      return {
        title: `📢 New post from ${payload.username}`,
        body: (payload.content || "").slice(0, 150) || "Tap to view",
        icon: "/pwa-192.png",
        data: { url: "/" },
      };
    case "new_comment":
      return {
        title: `💬 ${payload.username} commented`,
        body: (payload.content || "").slice(0, 150),
        icon: "/pwa-192.png",
        data: { url: `/post/${payload.post_id}` },
      };
    case "new_announcement":
      return {
        title: `📣 ${payload.title || "New Announcement"}`,
        body: (payload.content || "").slice(0, 150),
        icon: "/pwa-192.png",
        data: { url: "/announcements" },
      };
    default:
      return {
        title: "Campus Social",
        body: "Something new!",
        icon: "/pwa-192.png",
        data: { url: "/" },
      };
  }
}

serve(async (req) => {
  try {
    const body = await req.json();
    const { type, payload } = body;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If new post, fetch username
    if (type === "new_post" && payload.user_id) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", payload.user_id)
        .single();
      payload.username = profile?.username || "Someone";
    }

    // Get all subscriptions
    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("*");

    if (error) throw error;

    if (!subscriptions?.length) {
      return new Response(JSON.stringify({ message: "No subscriptions" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const notification = buildNotification(type, payload);

    const results = await Promise.allSettled(
      subscriptions.map((sub) =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              auth: sub.auth,
              p256dh: sub.p256dh,
            },
          },
          JSON.stringify(notification)
        )
      )
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    // Clean up failed subscriptions (optional)
    // ...

    return new Response(
      JSON.stringify({ sent: succeeded, failed }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});