import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface Props {
  pinId: string;
  pinTitle: string;
}

export function MeetMeHereButton({ pinId, pinTitle }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?pin=${pinId}`;
    const text = `Meet me at ${pinTitle}: ${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: pinTitle, text, url });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // user cancelled the share sheet or clipboard was blocked — no-op
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
    >
      {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
      {copied ? "Copied!" : "Meet me here"}
    </button>
  );
}
