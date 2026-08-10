import { useEffect, useState } from "react";

const REBRAND_KEY = "app_rebrand_seen_v1"; // bump the version suffix if you rebrand again later

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // private browsing / storage-blocked contexts throw, not just no-op
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable — banner just reappears next session. Harmless.
  }
}

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false; // SSR guard
  const mql = window.matchMedia?.("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as any).standalone === true;
  return Boolean(mql || iosStandalone);
}

export function useRebrandNotice() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!isStandaloneDisplay()) return;
    if (safeGetItem(REBRAND_KEY)) return;
    setShowBanner(true);
  }, []);

  const dismiss = () => {
    safeSetItem(REBRAND_KEY, "true");
    setShowBanner(false);
  };

  return { showBanner, dismiss };
}
