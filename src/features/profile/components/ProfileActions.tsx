import { useNavigate } from "react-router-dom";
import {
  Bookmark, MessageSquare, Users, Trophy, Lock, Settings,

} from "lucide-react";
import { ProfileItem } from "./ProfileItem";

interface Props {
  isOwn: boolean;
  userId: string | undefined;
}

export function ProfileActions({ isOwn, userId }: Props) {
  const navigate = useNavigate();
  const target = userId ? `/profile/${userId}` : "/profile";

  const links = [
    { icon: <Bookmark size={20} />, label: "Saved Posts", path: "/profile/saved", ownOnly: true },
    { icon: <MessageSquare size={20} />, label: "My Discussions", path: `${target}/discussions` },
    { icon: <Users size={20} />, label: "Campus Groups", path: `${target}/groups` },
    { icon: <Trophy size={20} />, label: "Achievements", path: `${target}/achievements` },
    { icon: <Lock size={20} />, label: "Privacy & Security", path: `${target}/privacy`, ownOnly: true },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings", ownOnly: true },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm">
      {links
        .filter((l) => !l.ownOnly || isOwn)
        .map(({ icon, label, path }) => (
          <ProfileItem key={label} icon={icon} label={label} onClick={() => navigate(path)} />
        ))}
    </div>
  );
}