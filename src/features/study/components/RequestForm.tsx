import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToastStore } from "../../../store/toastStore";

interface Props {
  onSubmit: (data: { title: string; description?: string; subject?: string }) => Promise<void>;
}

export function RequestForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { showToast } = useToastStore();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Please enter what you're looking for.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), subject: subject.trim() });
      setTitle("");
      setDescription("");
      setSubject("");
      setSuccess(true);
      showToast("Request submitted successfully!", "ok");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const message = err?.message || "Something went wrong. Please try again.";
      setError(message);
      showToast(message, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/70 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <Send size={14} />
          Request a Material
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {/* Success banner */}
        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
            <CheckCircle size={14} />
            Your request has been posted. Someone will upload it soon!
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
            What do you need? *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            placeholder="e.g. Past paper for CSC 201, thermodynamics notes…"
            maxLength={150}
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-400">{title.length}/150</span>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
            Subject (optional)
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Mathematics, Physics…"
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
            Description (optional)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any additional details…"
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle size={12} />
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send size={16} />
              Send Request
            </>
          )}
        </button>
      </div>
    </div>
  );
}