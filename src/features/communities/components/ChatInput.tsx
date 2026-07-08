import { useRef } from "react";
import { Send, Image as ImageIcon, BookOpen, BarChart3, Loader2, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  sending: boolean;
  onShareMaterial: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPoll: () => void;
  replyingTo: { id: string; username: string } | null;
  onCancelReply: () => void;
  mentionDropdown: React.ReactNode;
  isAnnouncement: boolean;
  onToggleAnnouncement: () => void;
  canAnnounce: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  sending,
  onShareMaterial,
  onImageUpload,
  onPoll,
  replyingTo,
  onCancelReply,
  mentionDropdown,
  isAnnouncement,
  onToggleAnnouncement,
  canAnnounce,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 max-w-lg mx-auto w-full">
      {replyingTo && (
        <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-xs flex items-center gap-2">
          <span>Replying to {replyingTo.username}</span>
          <button onClick={onCancelReply} className="ml-auto text-red-500"><X size={14} /></button>
        </div>
      )}
      <div className="flex items-end gap-1 px-2 py-2">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 text-sm resize-none outline-none max-h-24"
          style={{ minHeight: "36px" }}
        />
        <button onClick={onShareMaterial} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Share material">
          <BookOpen size={18} />
        </button>
        <label className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label="Upload image">
          <ImageIcon size={18} />
          <input type="file" accept="image/*" hidden onChange={onImageUpload} />
        </label>
        <button onClick={onPoll} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Create poll">
          <BarChart3 size={18} />
        </button>
        <button
          onClick={onSend}
          disabled={!value.trim() || sending}
          className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
          aria-label="Send message"
        >
          {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
      {mentionDropdown}
      {canAnnounce && (
        <label className="flex items-center gap-1 px-2 pb-2 text-xs">
          <input type="checkbox" checked={isAnnouncement} onChange={onToggleAnnouncement} />
          Post as announcement
        </label>
      )}
    </div>
  );
}