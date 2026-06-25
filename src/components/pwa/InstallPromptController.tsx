import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "warren-install-ux";

type State = {
  dismissed: boolean;
  shownCount: number;
  lastShown: number;
  visits: number;
};

function getState(): State {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}
    );
  } catch {
    return {
      dismissed: false,
      shownCount: 0,
      lastShown: 0,
      visits: 0,
    };
  }
}

function setState(state: State) {
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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  const engagement = useRef({
    startTime: Date.now(),
    scrolled: false,
    pageVisits: 1,
  });

  // ─────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (isStandalone()) return;

    const state = getState();

    if (state.dismissed) return;

    // update visits
    const updated: State = {
      ...state,
      visits: (state.visits || 0) + 1,
    };
    setState(updated);

    // install event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // ─────────────────────────────────────────────
  // ENGAGEMENT TRACKING (scroll + time)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

      if (scrollPercent > 0.4) {
        engagement.current.scrolled = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─────────────────────────────────────────────
  // DECISION ENGINE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      const state = getState();

      if (state.dismissed) return;
      if (!deferredPrompt) return;

      const timeSpent = Date.now() - engagement.current.startTime;
      const scrolled = engagement.current.scrolled;
      const visits = state.visits;

      const recentlyShown =
        Date.now() - state.lastShown < 1000 * 60 * 60 * 24; // 24h cooldown

      const alreadyMax = state.shownCount >= 3;

      const engaged =
        timeSpent > 12000 || scrolled || visits >= 2;

      if (recentlyShown || alreadyMax) return;

      if (engaged) {
        setShow(true);

        setState({
          ...state,
          shownCount: state.shownCount + 1,
          lastShown: Date.now(),
        });

        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [deferredPrompt]);

  // ─────────────────────────────────────────────
  // INSTALL ACTION
  // ─────────────────────────────────────────────
  const install = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShow(false);
    }

    setDeferredPrompt(null);
  };

  const dismiss = () => {
    const state = getState();

    setState({
      ...state,
      dismissed: true, // permanent suppression
    });

    setShow(false);
  };

  if (!show) return <>{children}</>;

  return (
    <>
      {children}

      <div className="fixed bottom-6 left-4 right-4 z-50">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl p-4 flex items-center justify-between animate-pulse">
          <div>
            <p className="font-bold text-sm">
              Install Warren App
            </p>
            <p className="text-xs opacity-90">
              Faster • Offline • Native experience
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={dismiss}
              className="text-xs px-3 py-2 rounded-xl bg-white/20"
            >
              Not now
            </button>

            <button
              onClick={install}
              className="text-xs px-3 py-2 rounded-xl bg-white text-blue-600 font-bold"
            >
              Install
            </button>
          </div>
        </div>
      </div>
    </>
  );
}