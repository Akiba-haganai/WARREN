import { useState } from "react";
import { Plus, Coins, CheckCircle2 } from "lucide-react";
import { useBounties } from "../hooks/useBounties";
import type { BountyStatus } from "../services/bounty.service";

const STATUS_TABS: { key: BountyStatus; label: string }[] = [
  { key: "open", label: "Open" },
  { key: "fulfilled", label: "Fulfilled" },
];

export function BountyBoard() {
  const { bounties, isLoading, status, setStatus, createBounty, isCreating } = useBounties("open");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ course_code: "", academic_year: "", paper_type: "", bounty_karma: 10 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.course_code.trim() || !form.academic_year.trim() || !form.paper_type.trim()) return;
    await createBounty(form);
    setForm({ course_code: "", academic_year: "", paper_type: "", bounty_karma: 10 });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatus(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                status === tab.key
                  ? "bg-white dark:bg-slate-950 text-blue-600 shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm transition-all"
        >
          <Plus size={14} />
          Post Bounty
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
        >
          <input
            value={form.course_code}
            onChange={(e) => setForm((f) => ({ ...f, course_code: e.target.value }))}
            placeholder="Course code (e.g. CS310)"
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            value={form.academic_year}
            onChange={(e) => setForm((f) => ({ ...f, academic_year: e.target.value }))}
            placeholder="Academic year (e.g. 2024/2025)"
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            value={form.paper_type}
            onChange={(e) => setForm((f) => ({ ...f, paper_type: e.target.value }))}
            placeholder="Paper type (e.g. Final Exam)"
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 dark:text-slate-400">Karma reward</label>
            <input
              type="number"
              min={1}
              value={form.bounty_karma}
              onChange={(e) => setForm((f) => ({ ...f, bounty_karma: Number(e.target.value) }))}
              className="w-20 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="mt-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition-all"
          >
            {isCreating ? "Posting…" : "Post Bounty"}
          </button>
        </form>
      )}

      {isLoading && <p className="text-sm text-slate-400 text-center py-6">Loading bounties…</p>}

      {!isLoading && bounties.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">No {status} bounties right now.</p>
      )}

      <div className="flex flex-col gap-2">
        {bounties.map((b) => (
          <div
            key={b.id}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {b.course_code} · {b.paper_type}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {b.academic_year} · requested by {b.creator_username ?? "a student"}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              {b.status === "fulfilled" ? <CheckCircle2 size={14} /> : <Coins size={14} />}
              {b.bounty_karma}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
