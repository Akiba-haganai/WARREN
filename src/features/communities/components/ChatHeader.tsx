import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search, Download, Link, Phone, Calendar, MoreVertical } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 relative">
      <div className="flex items-center gap-1 px-2 py-1.5 max-w-lg mx-auto">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Go back"
          title="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-semibold text-base truncate flex-1">{communityName}</h1>
        <button
          onClick={onToggleSearch}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Search messages"
          title="Search messages"
        >
          <Search size={18} />
        </button>
        <button
          onClick={onVoiceRoom}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Study room"
          title="Study room"
        >
          <Phone size={18} />
        </button>
        <button
          onClick={onToggleAnnouncements}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle announcements"
          title="Toggle announcements"
        >
          <span className={`text-xs font-semibold ${showAnnouncementsOnly ? "text-blue-600" : ""}`}>📢</span>
        </button>
        
        {/* More Actions Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="More options"
            title="More options"
          >
            <MoreVertical size={18} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden py-1">
              <button
                onClick={() => { onCopyInvite(); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
              >
                <Link size={16} className="text-slate-500" />
                <span>Copy Invite Link</span>
              </button>
              <button
                onClick={() => { onSchedule(); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
              >
                <Calendar size={16} className="text-slate-500" />
                <span>Schedule Session</span>
              </button>
              <button
                onClick={() => { onExport(); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
              >
                <Download size={16} className="text-slate-500" />
                <span>Export Chat</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}