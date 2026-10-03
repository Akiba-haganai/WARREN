import { useEffect, useState } from "react";
import { X, Loader2, Calendar, GraduationCap } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuthStore } from "../../../store/authStore";
import { generatePlan } from "../services/cram.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onGenerated: (planId: string) => void;
}

export function CramPlannerSheet({ open, onClose, onGenerated }: Props) {
  const user = useAuthStore((s) => s.user);
  const [courses, setCourses] = useState<{ key: string; count: number }[]>([]);
  const [course, setCourse] = useState("");
  const [examDate, setExamDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    supabase
      .rpc("list_courses" as any)
      .then(({ data }) => {
        setCourses(
          ((data as any[]) ?? []).map((c: any) => ({
            key: c.course_key,
            count: Number(c.materials),
          })),
        );
      });
  }, [open]);

  const submit = async () => {
    if (!user || !course || !examDate) return;
    setLoading(true);
    setError("");
    try {
      const planId = await generatePlan(user.id, course, examDate);
      onGenerated(planId);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build plan");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-600" />
            <h2 className="font-bold text-base">Plan a cram</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            >
              <option value="">Select a course…</option>
              {courses.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.key} ({c.count} materials)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Exam date
            </label>
            <input
              type="date"
              value={examDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading || !course || !examDate}
            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <GraduationCap size={16} />}
            {loading ? "Building plan…" : "Build my plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
