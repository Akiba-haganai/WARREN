const DB_NAME = "warren-db";
const STORE = "sync-queue";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getQueue() {
  const db = await openDB();

  return new Promise<any[]>((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result || []);
  });
}

export async function addItem(item: any) {
  const db = await openDB();

  return new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");

    tx.objectStore(STORE).put({
      id: item.id || crypto.randomUUID(),
      retries: 0,
      createdAt: Date.now(),
      ...item,
    });

    tx.oncomplete = () => resolve();
  });
}

export async function updateItem(item: any) {
  const db = await openDB();

  return new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(item);

    tx.oncomplete = () => resolve();
  });
}

export async function removeItem(id: string) {
  const db = await openDB();

  return new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);

    tx.oncomplete = () => resolve();
  });
}