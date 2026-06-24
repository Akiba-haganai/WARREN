import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import {
  User, Moon, Bell, Lock, Shield, LogOut, ChevronRight,
} from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { usePushNotifications } from "../../hooks/usePushNotifications";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();
  const logout = useAuthStore((s) => s.logout);
  const darkMode = theme === "dark";

  const items = [
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
      onClick: () => { logout(); navigate("/login"); },
      danger: true,
    },
  ];

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
          {items.map(({ icon, label, onClick, danger }) => (
            <button
              key={label}
              onClick={onClick}
              className={`w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                danger ? "text-red-500" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}