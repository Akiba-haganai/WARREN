import { useState } from "react";
import { X, Search, Sparkles, Loader2, BookOpen } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import type { StudyMaterial } from "../services/study.service";

type Mode = "explain" | "find";

interface FindResult {
  id: string;
  title: string;
  course_code: string | null;
  paper_type: string | null;
  topics: string[] | null;
  summary: string | null;
  academic_year: string | null;
}

interface Props {
  material: StudyMaterial | null;   // null = vault-wide, find-only
  onClose: () => void;
  onOpenMaterial: (m: { id: string }) => void;
}

export function AskSheet({ material, onClose, onOpenMaterial }: Props) {
  const [mode, setMode] = useState<Mode>(material ? "explain" : "find");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [pagesUsed, setPagesUsed] = useState<number[]>([]);
  const [results, setResults] = useState<FindResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    setPagesUsed([]);
    setResults([]);

    try {
      const { data, error: fnErr } = await supabase.functions.invoke("ask-paper", {
        body: {
          mode,
          question: query.trim(),
          material_id: mode === "explain" ? material?.id : undefined,
        },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);

      if (mode === "explain") {
        setAnswer(data.answer);
        setPagesUsed(data.pages_used ?? []);
      } else {
        setResults(data.results ?? []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl flex flex-col shadow-2xl"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-blue-600" />
            <h2 className="font-bold text-sm">Ask 515</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mode toggle — only when a paper is selected */}
        {material && (
          <div className="flex gap-1 mx-4 mt-3 bg-slate-100 dark:bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setMode("explain")}
              className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition ${
                mode === "explain"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
                  : "text-slate-500"
              }`}
            >
              Explain this paper
            </button>
            <button
              onClick={() => setMode("find")}
              className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition ${
                mode === "find"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
                  : "text-slate-500"
              }`}
            >
              Find in vault
            </button>
          </div>
        )}

        {material && mode === "explain" && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 px-4 mt-2 truncate">
            📄 {material.title}
          </p>
        )}

        {/* Response area */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {loading && (
            <div className="flex items-center justify-center py-8 text-slate-400">
              <Loader2 size={20} className="animate-spin mr-2" />
              <span className="text-sm">Thinking…</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {answer && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-sm leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>
              {pagesUsed.length > 0 && (
                <p className="text-[11px] text-slate-400">
                  Sources: pages {pagesUsed.join(", ")}
                </p>
              )}
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onOpenMaterial({ id: r.id });
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen size={12} className="text-blue-600 shrink-0" />
                    <p className="text-sm font-semibold truncate">{r.title}</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {[r.course_code, r.paper_type, r.academic_year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {r.summary && (
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {r.summary}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}

          {!loading && !answer && !error && results.length === 0 && (
            <div className="text-center text-slate-400 py-8 text-sm">
              {mode === "explain"
                ? "Ask anything about this paper. Try: \"explain question 4b\""
                : "Search the vault. Try: \"papers about pipelining\""}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={mode === "explain" ? "Ask about this paper…" : "Search the vault…"}
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 text-sm outline-none"
            autoFocus
          />
          <button
            onClick={submit}
            disabled={!query.trim() || loading}
            className="p-3 bg-blue-600 text-white rounded-full disabled:opacity-50"
            aria-label="Ask"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}