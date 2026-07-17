import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  communityId: string;
}

export function ExamCountdown({ communityId }: Props) {
  const navigate = useNavigate();

  const { data: nearestExam } = useQuery({
    queryKey: ["nearestExam", communityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, event_date")
        .eq("community_id", communityId)
        .eq("event_type", "exam")
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(1)
        .single();

      if (error || !data) return null;
      return data;
    },
    enabled: !!communityId,
  });

  if (!nearestExam) return null;

  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (new Date(nearestExam.event_date).getTime() - Date.now()) / 86400000
    )
  );

  return (
    <button
      onClick={() => navigate(`/events?community_id=${communityId}`)}
      className="w-full p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
    >
      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
        <Clock size={20} className="text-amber-600 dark:text-amber-400" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
          Upcoming Exam
        </p>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
          {nearestExam.title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {daysRemaining === 0
            ? "Today!"
            : `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`}
        </p>
      </div>
      <ChevronRight size={18} className="text-slate-400 shrink-0" />
    </button>
  );
}

