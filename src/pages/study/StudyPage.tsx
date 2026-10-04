import { useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { VaultTab } from "./tabs/VaultTab";
import { WiroTab } from "./tabs/WiroTab";
import { CramTab } from "./tabs/CramTab";
import { BookOpen, Sparkles, Target, Flame } from "lucide-react";
import { MaterialDrawer } from "../../features/study/components/MaterialDrawer";
import type { StudyMaterial } from "../../features/study/services/study.service";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import { BountyBoard } from "../../features/study/components/BountyBoard";

export default function StudyPage() {
  const [tab, setTab] = useState<"vault" | "wiro" | "cram" | "bounties">("vault");
  const [selected, setSelected] = useState<StudyMaterial | null>(null);
  const { toggleSave } = useStudyActions();

  const TABS = [
    { key: "vault", label: "Materials", icon: BookOpen },
    { key: "wiro", label: "Wiro", icon: Flame },
    { key: "cram", label: "Cram", icon: Sparkles },
    { key: "bounties", label: "Bounties", icon: Target },
  ] as const;

  return (
    <AppShell>
      <div className="px-4 pb-28 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4 mt-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Study</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">Past papers, notes & course index</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 mb-5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  active
                    ? "bg-white dark:bg-slate-700 shadow-sm text-orange-500 dark:text-orange-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Views */}
        {tab === "vault" && <VaultTab />}
        {tab === "wiro" && <WiroTab />}
        {tab === "cram" && <CramTab />}
        {tab === "bounties" && <BountyBoard />}

        {selected && (
          <MaterialDrawer
            material={selected}
            saved={false}
            subjectColor="#6366F1"
            meta={{ color: "#6366F1", bg: "rgba(99,102,241,0.15)", border: "#6366F1", icon: "📄", label: selected.paper_type ?? "Material" }}
            onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </AppShell>
  );
}