import { useEffect, useState } from "react";
import { Check, Loader2, Calendar, ChevronLeft, Share2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { supabase } from "../../../lib/supabase";
import {
  fetchPlanItems,
  toggleItemCompleted,
  type CramItem,
} from "../services/cram.service";

interface Props {
  planId: string;
  planTitle: string;
  examDate: string;
  onBack: () => void;
  onOpenMaterial: (materialId: string) => void;
}

export function CramPlanView({
  planId,
  planTitle,
  examDate,
  onBack,
  onOpenMaterial,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const [items, setItems] = useState<CramItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchPlanItems(planId, user.id)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [planId, user]);

  const toggle = async (item: CramItem) => {
    if (!user) return;
    const next = !item.completed;
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, completed: next } : i)),
    );
    await toggleItemCompleted(item.id, user.id, next);
  };

  const share = async () => {
    if (!user) return;
    const { data: planRow } = await supabase
      .from("cram_plans")
      .select("share_slug, share_enabled, subject")
      .eq("id", planId)
      .single();

    let slug = planRow?.share_slug;
    if (!slug || !planRow?.share_enabled) {
      slug = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
      await supabase
        .from("cram_plans")
        .update({ share_slug: slug, share_enabled: true })
        .eq("id", planId);
    }

    const url = `https://515.vercel.app/cram/${slug}`;
    const text = `${planTitle} — ${items.length}-item cram plan on 515`;
    if (navigator.share) {
      try { await navigator.share({ title: planTitle, text, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000),
  );

  const grouped = items.reduce<Record<number, CramItem[]>>((acc, item) => {
    (acc[item.day_offset] ??= []).push(item);
    return acc;
  }, {});

  const total = items.length;
  const done = items.filter((i) => i.completed).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 size={24} className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
      >
        <ChevronLeft size={14} /> Back
      </button>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <p className="text-xs opacity-80">Cram plan</p>
        <h2 className="text-xl font-bold mt-1">{planTitle}</h2>
        <p className="text-sm opacity-90 mt-1">
          Exam in {daysLeft} {daysLeft === 1 ? "day" : "days"}
        </p>
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs mt-2 opacity-90">
          {done} of {total} done ({pct}%)
        </p>

        <button
          onClick={share}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-xs font-semibold"
        >
          <Share2 size={13} /> Share this plan
        </button>
      </div>

      {Object.entries(grouped)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([day, dayItems]) => (
          <div key={day} className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Day {Number(day) + 1}
              </h3>
            </div>
            {dayItems.map((item) => (
              <div
                key={item.id}
                className={`w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition ${
                  item.completed
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                }`}
              >
                <button
                  onClick={() => toggle(item)}
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                    item.completed
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {item.completed && <Check size={12} className="text-white" />}
                </button>
                <button
                  onClick={() => item.material_id && onOpenMaterial(item.material_id)}
                  className="flex-1 min-w-0 text-left"
                >
                  <p
                    className={`text-sm font-semibold truncate ${
                      item.completed ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {item.material?.title ?? "Material"}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {[item.material?.course_code, item.material?.paper_type]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
