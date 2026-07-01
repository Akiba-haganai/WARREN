import { useNavigate } from "react-router-dom";
import {
  Send, UserX, UserPlus, Moon, Bell, BellOff,
} from "lucide-react";
import { usePushNotifications } from "../../../hooks/usePushNotifications";
import { useThemeStore } from "../../../store/themeStore";
import { ProfileItem } from "./ProfileItem";

interface Props {
  profile: {
    username: string | null;
    role: string;
    created_at: string | null;
    bio?: string | null;
    id: string;
  };
  isOwn: boolean;
  blocked: boolean;
  onMessage: () => void;
  onToggleBlock: () => void;
}

export function ProfileInfo({ profile, isOwn, blocked, onMessage, onToggleBlock }: Props) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();
  const darkMode = theme === "dark";

  return (
    <div className="pt-12">
      <h1 className="text-2xl font-bold">{profile.username ?? "Anonymous"}</h1>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs text-white ${
            profile.role === "admin" ? "bg-red-500" : profile.role === "moderator" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {profile.role === "admin" ? "🛡 Admin" : profile.role === "moderator" ? "🛠 Moderator" : "🎓 Student"}
        </span>
        <span className="text-sm opacity-70">Member since {new Date(profile.created_at!).getFullYear()}</span>
      </div>
      {profile.bio && <p className="mt-4 text-slate-600 dark:text-slate-300">{profile.bio}</p>}

      {isOwn ? (
        <div className="mt-4 space-y-2">
          <button onClick={() => navigate("/profile/edit")} className="rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm min-h-[44px] w-full font-semibold shadow-sm transition-all duration-200 motion-safe:active:scale-[0.98]">
            Edit Profile
          </button>
          <ProfileItem icon={<Moon size={20} />} label={darkMode ? "Dark Mode ON" : "Dark Mode OFF"} onClick={toggleTheme} />
          <ProfileItem
            icon={subscribed ? <Bell size={20} /> : <BellOff size={20} />}
            label={subscribed ? "Notifications ON" : "Enable Notifications"}
            onClick={subscribed ? unsubscribe : requestPermission}
          />
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onMessage}
            className="flex-1 rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2 min-h-[44px] font-semibold shadow-sm transition-all duration-200 motion-safe:active:scale-[0.98]"
          >
            <Send size={20} /> Message
          </button>
          <button
            onClick={onToggleBlock}
            className={`rounded-2xl px-4 py-2 text-sm flex items-center justify-center gap-2 border min-h-[44px] font-semibold transition-all duration-200 motion-safe:active:scale-[0.98] ${
              blocked ? "border-red-500 text-red-500 hover:bg-red-50" : "border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {blocked ? <UserX size={20} /> : <UserPlus size={20} />}
            {blocked ? "Unblock" : "Block"}
          </button>
        </div>
      )}
    </div>
  );
}