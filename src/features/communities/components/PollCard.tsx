import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuthStore } from "../../../store/authStore";

interface PollData {
  id: string;
  question: string;
  options: { id: string; option_text: string; votes: number }[];
  totalVotes: number;
  userVote?: string;
}

export function PollCard({ poll }: { poll: PollData }) {
  const user = useAuthStore((s) => s.user);
  const [selected, setSelected] = useState<string | undefined>(poll.userVote);

  const handleVote = async (optionId: string) => {
    if (!user || selected) return;
    const { error } = await supabase.from("chat_poll_votes").insert({
      user_id: user.id,
      option_id: optionId,
    });
    if (!error) setSelected(optionId);
  };

  return (
    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border">
      <h4 className="font-semibold text-sm mb-2">{poll.question}</h4>
      <div className="space-y-1.5">
        {poll.options.map((opt) => {
          const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={!!selected}
              className="w-full text-left relative"
            >
              <div className="flex justify-between text-xs mb-0.5">
                <span>{opt.option_text}</span>
                <span className="text-slate-400">{pct}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400 mt-2">{poll.totalVotes} vote{poll.totalVotes !== 1 && "s"}</p>
    </div>
  );
}