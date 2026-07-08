import { Suspense, memo } from "react";
import type { ReactNode } from "react";
import MobileNavbar from "./MobileNavbar";
import BottomNavigation from "./BottomNavigation";
import { useToastStore } from "../../store/toastStore";
import { Toast } from "../common/Toast";

interface AppShellProps {
  children: ReactNode;
  hideTopNav?: boolean;
  hideBottomNav?: boolean;
}

const AppShell = memo(function AppShell({
  children,
  hideTopNav = false,
  hideBottomNav = false,
}: AppShellProps) {
  const { toast, hideToast } = useToastStore();
  return (
    <div
      className="
        min-h-screen
        bg-blue-50
        dark:bg-slate-950
        text-slate-900
        dark:text-white
        overflow-x-hidden
        flex flex-col
      "
    >
      {/* Fixed top navigation */}
      {!hideTopNav && (
        <header className="fixed top-0 left-0 right-0 z-50">
          <MobileNavbar />
        </header>
      )}


      {/* Main content */}
      <main
        className={
          "mx-auto w-full max-w-lg px-3 animate-in fade-in slide-in-from-bottom-4 duration-300 flex-1 " +
          (hideTopNav ? "" : "pt-[var(--appshell-header-h)] ") +
          (hideBottomNav
            ? "pb-[env(safe-area-inset-bottom)]"
            : "pb-[var(--appshell-bottomnav-h)]")
        }
        style={
          {
            // Named constants so chat pages and the generic chrome stay aligned if heights change.
            // Tailwind can't read these dynamically at build-time, so we set them via CSS variables.
            ['--appshell-header-h' as any]: '5rem',
            ['--appshell-bottomnav-h' as any]: '8rem',
          } as React.CSSProperties
        }
      >

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div
                className="
                  h-8
                  w-8
                  rounded-full
                  border-2
                  border-blue-500
                  border-t-transparent
                  animate-spin
                "
              />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      {/* Fixed bottom navigation */}
      {!hideBottomNav && (
        <footer className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation />
        </footer>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
});

export default AppShell;