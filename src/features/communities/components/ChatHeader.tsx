import { ArrowLeft, Search, Download, Link, Phone, Calendar } from "lucide-react";

interface Props {
  communityName: string;
  onBack: () => void;
  onToggleSearch: () => void;
  onExport: () => void;
  onToggleAnnouncements: () => void;
  showAnnouncementsOnly: boolean;
  onCopyInvite: () => void;
  onVoiceRoom: () => void;
  onSchedule: () => void;
}

export function ChatHeader({
  communityName,
  onBack,
  onToggleSearch,
  onExport,
  onToggleAnnouncements,
  showAnnouncementsOnly,
  onCopyInvite,
  onVoiceRoom,
  onSchedule,
}: Props) {
  return (
    <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-1 px-2 py-1.5 max-w-lg mx-auto">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-semibold text-base truncate flex-1">{communityName}</h1>
        <button
          onClick={onToggleSearch}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Search messages"
        >
          <Search size={18} />
        </button>
        <button
          onClick={onExport}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Export chat"
        >
          <Download size={18} />
        </button>
        <button
          onClick={onToggleAnnouncements}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle announcements"
        >
          <span className={`text-xs font-semibold ${showAnnouncementsOnly ? "text-blue-600" : ""}`}>📢</span>
        </button>
        <button
          onClick={onCopyInvite}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Copy invite link"
        >
          <Link size={18} />
        </button>
        <button
          onClick={onVoiceRoom}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Study room"
        >
          <Phone size={18} />
        </button>
        <button
          onClick={onSchedule}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Schedule session"
        >
          <Calendar size={18} />
        </button>
      </div>
    </div>
  );
}