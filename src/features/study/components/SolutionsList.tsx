import { useState } from "react";
import { ArrowBigUp, BadgeCheck, Plus } from "lucide-react";
import { useSolutions } from "../hooks/useSolutions";

interface Props {
  materialId: string;
}

export function SolutionsList({ materialId }: Props) {
  const { solutions, isLoading, createSolution, isCreating, toggleUpvote } = useSolutions(materialId);
  const [showForm, setShowForm] = useState(false);
  const [questionNumber, setQuestionNumber] = useState("");
  const [solutionText, setSolutionText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionNumber.trim() || !solutionText.trim()) return;
    await createSolution({ questionNumber, solutionText });
    setQuestionNumber("");
    setSolutionText("");
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Solutions</h3>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600"
        >
          <Plus size={14} /> Add solution
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
        >
          <input
            value={questionNumber}
            onChange={(e) => setQuestionNumber(e.target.value)}
            placeholder="Question (e.g. Question 3(b))"
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={solutionText}
            onChange={(e) => setSolutionText(e.target.value)}
            placeholder="Write your step-by-step solution…"
            rows={4}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition-all"
          >
            {isCreating ? "Posting…" : "Post Solution"}
          </button>
        </form>
      )}

      {isLoading && <p className="text-sm text-slate-400 text-center py-4">Loading solutions…</p>}

      {!isLoading && solutions.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-4">No solutions yet — be the first.</p>
      )}

      <div className="flex flex-col gap-2">
        {solutions.map((s) => (
          <div key={s.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
            <div className="flex items-center justify-between mb-1 gap-2">
              <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 min-w-0">
                <span className="truncate">{s.question_number}</span>
                {s.is_lecturer_verified && (
                  <span className="flex items-center gap-0.5 text-emerald-600 text-[10px] font-semibold shrink-0">
                    <BadgeCheck size={12} /> Lecturer verified
                  </span>
                )}
              </p>
              <button
                onClick={() => toggleUpvote(s.id)}
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors shrink-0 ${
                  s.has_upvoted
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600"
                    : "text-slate-400 hover:text-blue-600"
                }`}
              >
                <ArrowBigUp size={14} />
                {s.upvotes_count}
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{s.solution_text}</p>
            <p className="text-[10px] text-slate-400 mt-1">— {s.author_username ?? "Anonymous"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
