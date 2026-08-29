import { useState } from "react";
import { Users } from "lucide-react";
import { useVibeReport } from "../hooks/useVibeReport";
import type { NoiseLevel, CrowdLevel } from "../services/vibe.service";

const NOISE_OPTIONS: { key: NoiseLevel; label: string; emoji: string }[] = [
  { key: "quiet", label: "Quiet", emoji: "🤫" },
  { key: "chatty", label: "Chatty", emoji: "💬" },
  { key: "loud", label: "Loud", emoji: "🔊" },
];

const CROWD_OPTIONS: { key: CrowdLevel; label: string; emoji: string }[] = [
  { key: "empty", label: "Plenty Seats", emoji: "🟢" },
  { key: "moderate", label: "Moderate", emoji: "🟡" },
  { key: "packed", label: "Packed", emoji: "🔴" },
];

interface Props {
  pinId: string;
}

export function VibeReportWidget({ pinId }: Props) {
  const { summary, isLoading, myReport, report, isReporting } = useVibeReport(pinId);
  const [noise, setNoise] = useState<NoiseLevel | null>(myReport?.noise_level ?? null);
  const [crowd, setCrowd] = useState<CrowdLevel | null>(myReport?.crowd_level ?? null);

  const submitIfComplete = async (nextNoise: NoiseLevel | null, nextCrowd: CrowdLevel | null) => {
    const n = nextNoise ?? noise;
    const c = nextCrowd ?? crowd;
    setNoise(n);
    setCrowd(c);
    if (n && c) await report({ noise: n, crowd: c });
  };

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-900 dark:text-white">How is it right now?</p>
        {!isLoading && summary && (
          <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Users size={12} /> {summary.report_count} report{summary.report_count === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {!isLoading && summary && (
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Currently:{" "}
          <span className="font-semibold">
            {CROWD_OPTIONS.find((c) => c.key === summary.crowd_level)?.emoji}{" "}
            {CROWD_OPTIONS.find((c) => c.key === summary.crowd_level)?.label}
          </span>{" "}
          ·{" "}
          <span className="font-semibold">
            {NOISE_OPTIONS.find((n) => n.key === summary.noise_level)?.emoji}{" "}
            {NOISE_OPTIONS.find((n) => n.key === summary.noise_level)?.label}
          </span>
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {CROWD_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            disabled={isReporting}
            onClick={() => submitIfComplete(null, opt.key)}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
              crowd === opt.key
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {opt.emoji} {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {NOISE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            disabled={isReporting}
            onClick={() => submitIfComplete(opt.key, null)}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
              noise === opt.key
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {opt.emoji} {opt.label}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-slate-400">Reports fade out after 90 minutes.</p>
    </div>
  );
}
