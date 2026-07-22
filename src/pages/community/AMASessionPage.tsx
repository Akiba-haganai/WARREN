import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { fetchAMASession, toggleUpvote, submitAMAQuestion } from "../../features/ama/services/amaService";
import { ArrowLeft, ArrowBigUp, Clock, Loader2, Send } from "lucide-react";
import { useToastStore } from "../../store/toastStore";

export default function AMASessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["amaSession", sessionId],
    queryFn: () => fetchAMASession(sessionId!, user?.id ?? null),
    enabled: !!sessionId,
  });

  const session = data?.session;
  const questions = data?.questions ?? [];

  const totalUpvotes = useMemo(
    () => questions.reduce((acc, q: any) => acc + (q.upvotes ?? 0), 0),
    [questions]
  );

  const canAsk = session?.status === "live";

  const handleUpvote = async (questionId: string) => {
    if (!user) return;
    try {
      await toggleUpvote(questionId);
      queryClient.invalidateQueries({ queryKey: ["amaSession", sessionId] });
    } catch (err: any) {
      if (err?.code !== "23505") {
        showToast("Upvote failed", "err");
      }
    }
  };

  const handleAsk = async () => {
    if (!newQuestion.trim() || !user || !sessionId) return;

    setSubmitting(true);
    try {
      await submitAMAQuestion(sessionId, newQuestion.trim());
      setNewQuestion("");
      queryClient.invalidateQueries({ queryKey: ["amaSession", sessionId] });
    } catch (err: any) {
      showToast(err.message || "Failed to ask", "err");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg">
              {session?.lecturer?.username ?? "Lecturer"} AMA
            </h1>
            <p className="text-xs text-slate-500">
              {session ? (
                <>
                  <Clock size={12} className="inline mr-1" />
                  {new Date(session.scheduled_for).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </>
              ) : (
                ""
              )}
            </p>
            {session?.status && (
              <p className="text-xs text-slate-500">Status: {session.status}</p>
            )}
            <p className="text-xs text-slate-500">Total upvotes: {totalUpvotes}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p className="font-semibold">No questions yet</p>
              <p className="text-sm">Be the first to ask!</p>
            </div>
          ) : (
            questions.map((q: any) => (
              <div
                key={q.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleUpvote(q.id)}
                    className={`flex flex-col items-center p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      q.userVote === "up" ? "text-blue-500" : "text-slate-500"
                    }`}
                  >
                    <ArrowBigUp size={18} />
                    <span className="text-xs font-semibold">{q.upvotes ?? 0}</span>
                  </button>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {q.askedByProfile?.username ?? "Anonymous"}
                    </p>
                    <p className="text-sm mt-1">{q.question}</p>
                    {q.answered && (
                      <span className="text-xs text-green-500 mt-1 block">Answered</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {canAsk && (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleAsk()}
                placeholder="Ask a question..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={handleAsk}
                disabled={!newQuestion.trim() || submitting || !user}
                className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
