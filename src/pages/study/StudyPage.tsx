import { useState, useEffect } from "react";
import AppShell from "../../components/layout/AppShell";
import { VaultTab } from "./tabs/VaultTab";
import { CoursesTab } from "./tabs/CoursesTab";
import { CramTab } from "./tabs/CramTab";
import { HelpTab } from "./tabs/HelpTab";
import { BookOpen, FolderGit2, Sparkles, HelpCircle, Calendar } from "lucide-react";
import { CramPlannerSheet } from "../../features/cram/components/CramPlannerSheet";
import { CramPlanView } from "../../features/cram/components/CramPlanView";
import { fetchUserPlans, type CramPlan } from "../../features/cram/services/cram.service";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";
import { MaterialDrawer } from "../../features/study/components/MaterialDrawer";
import type { StudyMaterial } from "../../features/study/services/study.service";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";

export default function StudyPage() {
  const [tab, setTab] = useState<"vault" | "courses" | "cram" | "help">("vault");
  const user = useAuthStore((s) => s.user);

  const [plannerOpen, setPlannerOpen] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [plans, setPlans] = useState<CramPlan[]>([]);
  const [selected, setSelected] = useState<StudyMaterial | null>(null);
  const { toggleSave } = useStudyActions();

  useEffect(() => {
    if (!user) return;
    fetchUserPlans(user.id).then(setPlans).catch(() => {});
  }, [user]);

  const TABS = [
    { key: "vault", label: "Vault", icon: BookOpen },
    { key: "courses", label: "Courses", icon: FolderGit2 },
    { key: "cram", label: "Cram", icon: Sparkles },
    { key: "help", label: "Help", icon: HelpCircle },
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

        {/* Cram planner entry */}
        {!activePlanId && (
          <div className="mb-4 flex flex-col gap-2">
            <button
              onClick={() => setPlannerOpen(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Plan a cram
            </button>
            {plans
              .filter((p) => p.status === "active")
              .slice(0, 2)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlanId(p.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left"
                >
                  <Calendar size={16} className="text-blue-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{p.subject} cram</p>
                    <p className="text-[11px] text-slate-500">
                      Exam {new Date(p.exam_date).toLocaleDateString()} · {p.days_total} days
                    </p>
                  </div>
                </button>
              ))}
          </div>
        )}

        {!activePlanId && (
          <>
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
                        ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-cyan-400"
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
            {tab === "courses" && <CoursesTab onSelectCourse={() => setTab("vault")} />}
            {tab === "cram" && <CramTab />}
            {tab === "help" && <HelpTab />}
          </>
        )}

        {activePlanId && (
          <CramPlanView
            planId={activePlanId}
            planTitle={plans.find((p) => p.id === activePlanId)?.subject ?? "Cram"}
            examDate={plans.find((p) => p.id === activePlanId)?.exam_date ?? ""}
            onBack={() => setActivePlanId(null)}
            onOpenMaterial={async (id) => {
              const { data } = await supabase.from("study_materials").select("*").eq("id", id).single();
              if (data) setSelected(data as StudyMaterial);
            }}
          />
        )}

        <CramPlannerSheet
          open={plannerOpen}
          onClose={() => setPlannerOpen(false)}
          onGenerated={async (planId) => {
            if (!user) return;
            const refreshed = await fetchUserPlans(user.id);
            setPlans(refreshed);
            setActivePlanId(planId);
          }}
        />

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