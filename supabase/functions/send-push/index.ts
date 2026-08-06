// supabase/functions/send-push/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const vapidSubject = "mailto:admin@warren.app";
const vapidPublicKey = Deno.env.get("VITE_VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

serve(async (req: Request) => {
  const { notification_id } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Fetch the notification
  const { data: notification, error: notifError } = await supabase
    .from("notifications")
    .select("*")
    .eq("id", notification_id)
    .single();

  if (notifError || !notification) {
    return new Response(JSON.stringify({ error: "Notification not found" }), { status: 404 });
  }

  // Fetch push subscriptions for this user
  const { data: subscriptions, error: subError } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("user_id", notification.user_id);

  if (subError || !subscriptions?.length) {
    return new Response(JSON.stringify({ skipped: "No subscriptions" }), { status: 200 });
  }

  const payload = JSON.stringify({
    title: notification.title,
    body: notification.body ?? "",
    icon: "/pwa-192.png",
    badge: "/pwa-192.png",
    data: notification.data ?? {},
    requireInteraction: true,
  });

  const results = await Promise.allSettled(
    subscriptions.map(async (sub) => {
      const encodedVapidPrivateKey = urlBase64ToUint8Array(vapidPrivateKey);

      const vapidHeader = await crypto.subtle.importKey(
        "raw",
        encodedVapidPrivateKey,
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign"]
      );

      const aud = new URL(sub.endpoint).origin;
      const jwtHeader = { alg: "ES256", typ: "JWT" };
      const jwtPayload = {
        sub: vapidSubject,
        aud,
        exp: Math.floor(Date.now() / 1000) + 86400,
      };

      const encoder = new TextEncoder();
      const jwtToken =
        btoa(JSON.stringify(jwtHeader)) +
        "." +
        btoa(JSON.stringify(jwtPayload));

      const signature = await crypto.subtle.sign(
        { name: "ECDSA", hash: "SHA-256" },
        vapidHeader,
        encoder.encode(jwtToken)
      );

      const signatureBase64 = btoa(
        String.fromCharCode(...new Uint8Array(signature))
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      const authorizationHeader = `vapid t=${jwtToken}.${signatureBase64}, k=${vapidPublicKey}`;

      const res = await fetch(sub.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Authorization": authorizationHeader,
          "Content-Encoding": "aes128gcm",
        },
        body: payload,
      });

      if (!res.ok) {
        // If subscription is gone, remove it
        if (res.status === 410 || res.status === 404) {
          await supabase
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", sub.endpoint);
        }
        throw new Error(`Push failed: ${res.status}`);
      }

      return res.status;
    })
  );

  return new Response(JSON.stringify({ success: true, results }), { status: 200 });
});