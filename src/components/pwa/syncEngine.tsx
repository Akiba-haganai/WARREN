import { getQueue, removeItem, updateItem } from "./syncQueue";

const MAX_RETRIES = 6;
let running = false;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function send(item: any) {
  return fetch(item.url, {
    method: item.method || "POST",
    headers: {
      "Content-Type": "application/json",
      ...(item.headers || {}),
    },
    body: item.body ? JSON.stringify(item.body) : undefined,
  });
}

async function processOnce() {
  const queue = await getQueue();
  if (!queue.length) return;

  for (const item of queue) {
    try {
      const res = await send(item);

      if (res.ok) {
        await removeItem(item.id);
        continue;
      }

      throw new Error("Request failed");
    } catch {
      item.retries = (item.retries || 0) + 1;

      if (item.retries >= MAX_RETRIES) {
        await removeItem(item.id);
        continue;
      }

      await updateItem(item);

      const backoff = Math.min(1000 * 2 ** item.retries, 30000);
      await sleep(backoff);
    }
  }
}

export async function processQueue() {
  if (running) return;

  running = true;

  try {
    await processOnce();
  } finally {
    running = false;
  }
}

// 🔥 PRODUCTION TRIGGERS (IMPORTANT)
export function initSyncEngine() {
  window.addEventListener("online", () => {
    processQueue();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      processQueue();
    }
  });

  // startup flush
  if (navigator.onLine) {
    processQueue();
  }
}