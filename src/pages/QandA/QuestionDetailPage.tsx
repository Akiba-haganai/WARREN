import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchAnswers, submitAnswer, voteAnswer, acceptAnswer } from "../../services/questionService";
import { useAuthStore } from "../../store/authStore";
import type { Answer } from "../../services/questionService";
import { ArrowBigUp, ArrowBigDown, Check, Send } from "lucide-react";

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchAnswers(id, user?.id).then((a) => { setAnswers(a); setLoading(false); });
  }, [id, user?.id]);

  const handleSubmit = async () => {
    if (!content.trim() || !id) return;
    await submitAnswer(id, content);
    setContent("");
    const updated = await fetchAnswers(id, user?.id);
    setAnswers(updated);
  };

  const handleVote = async (answerId: string, type: "up" | "down") => {
    await voteAnswer(answerId, type);
    const updated = await fetchAnswers(id!, user?.id);
    setAnswers(updated);
  };

  const handleAccept = async (answerId: string) => {
    if (!id) return;
    await acceptAnswer(answerId, id);
    const updated = await fetchAnswers(id, user?.id);
    setAnswers(updated);
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Answers</h1>

        {loading ? (
          <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />)}</div>
        ) : answers.length === 0 ? (
          <div className="text-center py-12 opacity-60">No answers yet. Be the first to answer!</div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer) => (
              <div key={answer.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-4 border ${answer.is_accepted ? "border-green-500" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm">{answer.author?.username ?? "Anonymous"}</span>
                  {answer.author?.is_senior && <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 px-2 py-0.5 rounded-full">Senior</span>}
                  {answer.is_accepted && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-0.5 rounded-full">Accepted</span>}
                </div>
                <p className="text-sm">{answer.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => handleVote(answer.id, "up")} className={`flex items-center gap-1 text-xs ${answer.userVote === "up" ? "text-emerald-500" : ""}`}>
                    <ArrowBigUp size={16} /> {answer.upvotes}
                  </button>
                  <button onClick={() => handleVote(answer.id, "down")} className={`flex items-center gap-1 text-xs ${answer.userVote === "down" ? "text-red-500" : ""}`}>
                    <ArrowBigDown size={16} /> {answer.downvotes}
                  </button>
                  {!answer.is_accepted && (
                    <button onClick={() => handleAccept(answer.id)} className="text-xs text-green-500 flex items-center gap-1">
                      <Check size={14} /> Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your answer..." className="flex-1 p-3 rounded-xl border" />
          <button onClick={handleSubmit} disabled={!content.trim()} className="bg-blue-600 text-white px-4 py-2 rounded-xl"><Send size={16} /></button>
        </div>
      </div>
    </AppShell>
  );
}