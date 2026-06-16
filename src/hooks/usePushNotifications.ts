import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotifications() {
  const user = useAuthStore((s) => s.user);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [subscribed, setSubscribed] = useState(false);

  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  useEffect(() => {
    if (!user) return;
    setPermission(Notification.permission);
    if (Notification.permission === "granted") {
      checkExistingSubscription();
    }
  }, [user]);

  const checkExistingSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      setSubscribed(true);
    }
  };

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      await subscribe();
    }
    return result;
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }

      const parsed = subscription.toJSON();
      if (!parsed.keys?.p256dh || !parsed.keys?.auth) {
        throw new Error("Invalid subscription keys");
      }

      // Store in Supabase
      const { error } = await supabase.from("push_subscriptions").upsert(
        {
          user_id: user!.id,
          endpoint: parsed.endpoint!,
          p256dh: parsed.keys.p256dh,
          auth: parsed.keys.auth,
        },
        { onConflict: "endpoint" }
      );

      if (error) throw error;
      setSubscribed(true);
    } catch (err) {
      console.error("Push subscribe failed:", err);
      throw err;
    }
  };

  const unsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await supabase
          .from("push_subscriptions")
          .delete()
          .eq("endpoint", subscription.endpoint);
        setSubscribed(false);
      }
    } catch (err) {
      console.error("Unsubscribe failed:", err);
    }
  };

  return { permission, subscribed, requestPermission, unsubscribe };
}