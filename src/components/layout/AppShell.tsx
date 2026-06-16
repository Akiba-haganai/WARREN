import MobileNavbar from "./MobileNavbar";
import BottomNavigation from "./BottomNavigation";
import InstallBanner from "../pwa/InstallBanner";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <MobileNavbar />

      <main className="pb-24 pt-20 max-w-lg mx-auto">
        {children}
      <InstallBanner />
      </main>

      <BottomNavigation />
    </div>
  );
}
