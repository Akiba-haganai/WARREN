import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchQuestions, askQuestion } from "../../services/questionService";
import type { Question } from "../../services/questionService";
import { Plus, MessageCircle } from "lucide-react";

export default function AskSeniorPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAsk, setShowAsk] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchQuestions().then((q) => { setQuestions(q); setLoading(false); });
  }, []);

  const handleAsk = async () => {
    if (!title.trim()) return;
    await askQuestion(title, body);
    setShowAsk(false);
    setTitle("");
    setBody("");
    const updated = await fetchQuestions();
    setQuestions(updated);
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black">Ask a Senior</h1>
            <p className="text-xs text-slate-500 mt-0.5">Get advice from experienced students</p>
          </div>
          <button onClick={() => setShowAsk(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5">
            <Plus size={16} /> Ask
          </button>
        </div>

        {showAsk && (
          <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Question title..." className="w-full p-2 rounded-xl border mb-2" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="More details (optional)..." rows={3} className="w-full p-2 rounded-xl border mb-3 resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAsk(false)} className="px-4 py-2 rounded-xl border">Cancel</button>
              <button onClick={handleAsk} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Post Question</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />)}</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 opacity-60">No questions yet. Be the first to ask!</div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => (
              <button key={q.id} onClick={() => navigate(`/ask-senior/${q.id}`)} className="w-full text-left bg-white dark:bg-slate-900 rounded-2xl p-4 border">
                <h3 className="font-semibold">{q.title}</h3>
                {q.body && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{q.body}</p>}
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span>{q.author?.username ?? "Anonymous"}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12} />{q.answers_count ?? 0}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}