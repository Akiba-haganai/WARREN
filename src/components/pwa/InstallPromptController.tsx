import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "warren-install-state-v3";

type State = {
  dismissed: boolean;
  shownCount: number;
  lastShown: number;
};

function load(): State {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {
      dismissed: false,
      shownCount: 0,
      lastShown: 0,
    };
  }
}

function save(state: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
}

export default function InstallPromptController({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prompt, setPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  const engagement = useRef({
    start: Date.now(),
    scroll: false,
  });

  const triggered = useRef(false);

  // ─────────────────────────────
  // CAPTURE INSTALL EVENT (ONLY ONCE)
  // ─────────────────────────────
  useEffect(() => {
    if (isStandalone()) return;

    const state = load();
    if (state.dismissed) return;

    const handler = (e: any) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // ─────────────────────────────
  // ENGAGEMENT TRACKING
  // ─────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 250) {
        engagement.current.scroll = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─────────────────────────────
  // SINGLE DECISION ENGINE (NO INTERVALS)
  // ─────────────────────────────
  useEffect(() => {
    if (!prompt) return;
    if (triggered.current) return;

    const state = load();

    if (state.dismissed) return;
    if (state.shownCount >= 2) return;

    const timeSpent = Date.now() - engagement.current.start;
    const engaged = timeSpent > 10000 || engagement.current.scroll;

    const cooldown =
      Date.now() - state.lastShown > 1000 * 60 * 60 * 24;

    if (!engaged || !cooldown) return;

    triggered.current = true;

    setVisible(true);

    save({
      dismissed: state.dismissed,
      shownCount: state.shownCount + 1,
      lastShown: Date.now(),
    });
  }, [prompt]);

  // ─────────────────────────────
  // INSTALL ACTION
  // ─────────────────────────────
  const install = async () => {
    if (!prompt) return;

    prompt.prompt();

    const { outcome } = await prompt.userChoice;

    if (outcome === "accepted") {
      setVisible(false);
    }

    setPrompt(null);
  };

  const dismiss = () => {
    const state = load();

    save({
      ...state,
      dismissed: true,
    });

    setVisible(false);
  };

  // ─────────────────────────────
  // RENDER
  // ─────────────────────────────
  return (
    <>
      {children}

      {visible && (
        <div className="fixed bottom-6 left-4 right-4 z-50">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl p-4 flex items-center justify-between animate-fade-in">
            <div>
              <p className="font-bold text-sm">Install Warren</p>
              <p className="text-xs opacity-90">
                Offline • Fast • Native experience
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={dismiss}
                className="px-3 py-2 text-xs bg-white/20 rounded-xl"
              >
                Not now
              </button>

              <button
                onClick={install}
                className="px-3 py-2 text-xs bg-white text-blue-600 rounded-xl font-bold"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}