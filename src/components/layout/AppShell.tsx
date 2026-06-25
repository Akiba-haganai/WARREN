import { Suspense, memo } from "react";
import type { ReactNode } from "react";
import MobileNavbar from "./MobileNavbar";
import BottomNavigation from "./BottomNavigation";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = memo(function AppShell({
  children,
}: AppShellProps) {
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
      <header className="fixed top-0 left-0 right-0 z-50">
        <MobileNavbar />
      </header>

      {/* Main content */}
      <main
        className="
          mx-auto
          w-full
          max-w-lg
          px-3
          pt-20
          pb-28
          animate-in
          fade-in
          duration-200
          flex-1
        "
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
      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </footer>
    </div>
  );
});

export default AppShell;