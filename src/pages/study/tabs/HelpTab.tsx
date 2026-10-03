// src/pages/study/tabs/HelpTab.tsx
import { Link } from "react-router-dom";
import { MessageCircleQuestion, Trophy, HelpCircle } from "lucide-react";
import { RequestForm } from "../../../features/study/components/RequestForm";
import { BountyBoard } from "../../../features/study/components/BountyBoard";
import { useMaterialRequests } from "../../../features/study/hooks/useMaterialRequests";
import { useLeaderboard } from "../../../features/study/hooks/useLeaderboard";

export function HelpTab() {
  const { requests, createRequest } = useMaterialRequests();
  const { data: leaderboard } = useLeaderboard();

  return (
    <div className="flex flex-col gap-6">
      {/* Ask a Senior Shortcut Banner */}
      <Link
        to="/ask-senior"
        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md active:scale-[0.99] transition"
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <MessageCircleQuestion size={22} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Ask a Senior</p>
          <p className="text-xs text-white/80">Get guidance, solutions, and answers from students who took your course</p>
        </div>
        <span className="text-xl opacity-75">›</span>
      </Link>

      {/* Paper Bounties */}
      <section>
        <BountyBoard />
      </section>

      {/* Material Requests Form */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
          <HelpCircle size={15} /> Request Material
        </h2>
        <RequestForm onSubmit={createRequest} />

        {requests.length > 0 && (
          <div className="mt-3 space-y-2">
            {requests.slice(0, 5).map((req) => (
              <div
                key={req.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{req.title}</span>
                  <span className="text-slate-400 block text-[11px]">{req.subject}</span>
                </div>
                <span className="text-slate-400 text-[10px]">by {req.profiles?.username ?? "student"}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top Contributors Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
            <Trophy size={15} className="text-amber-500" /> Top Contributors
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {leaderboard.slice(0, 10).map((u) => (
              <div key={u.id} className="text-center shrink-0 w-16">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold mx-auto overflow-hidden shadow-sm">
                  {u.avatar_url ? (
                    <img
                      src={u.avatar_url}
                      alt={u.username ?? ""}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    u.username?.[0]?.toUpperCase() ?? "U"
                  )}
                </div>
                <p className="text-xs font-semibold mt-1.5 truncate text-slate-800 dark:text-slate-200">{u.username}</p>
                <p className="text-[10px] text-slate-400">{u.karma} pts</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
