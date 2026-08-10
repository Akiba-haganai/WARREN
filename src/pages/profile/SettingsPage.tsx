import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import {
  User,
  Moon,
  Bell,
  Lock,
  Shield,
  LogOut,
  ChevronRight,
  Download,
  CheckCircle,
} from "lucide-react";
import { AccessibilityPanel } from "../../features/profile/components/AccessibilityPanel";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { ForceRefreshButton } from "../../components/pwa/ForceRefreshButton";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();
  const logout = useAuthStore((s) => s.logout);
  const darkMode = theme === "dark";

  // PWA install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    // Get deferred prompt if already stored
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
    }
    // Listen for future prompts
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPrompt = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback for iOS or unsupported browsers
      alert(
        "To install this app on your iPhone, tap the Share button and then 'Add to Home Screen'."
      );
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstalled(true);
    }
  };

  const items = [
    {
      icon: isInstalled ? (
        <CheckCircle size={20} className="text-green-500" />
      ) : (
        <Download size={20} className="text-blue-500" />
      ),
      label: isInstalled ? "App Installed" : "Install App",
      onClick: handleInstall,
      disabled: isInstalled,
    },
    {
      icon: <User size={20} />,
      label: "Edit Profile",
      onClick: () => navigate("/profile/edit"),
    },
    {
      icon: <Moon size={20} />,
      label: darkMode ? "Dark Mode ON" : "Dark Mode OFF",
      onClick: toggleTheme,
    },
    {
      icon: <Bell size={20} />,
      label: subscribed ? "Notifications ON" : "Enable Notifications",
      onClick: subscribed ? unsubscribe : requestPermission,
    },
    {
      icon: <Lock size={20} />,
      label: "Privacy & Security",
      onClick: () => navigate("/profile/privacy"),
    },
    {
      icon: <Shield size={20} />,
      label: "Blocked Users",
      onClick: () => navigate("/profile/blocked"),
    },
    {
      icon: <LogOut size={20} />,
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/login");
      },
      danger: true,
    },
  ];

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
          {items.map(({ icon, label, onClick, danger, disabled }) => (
            <button
              key={label}
              onClick={onClick}
              disabled={disabled}
              className={`w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                danger ? "text-red-500" : ""
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </div>
              {!disabled && <ChevronRight size={18} />}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <AccessibilityPanel />
        </div>
        <div className="mt-6">
          <ForceRefreshButton />
        </div>
      </div>
    </AppShell>
  );
}