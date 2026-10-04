import { useState } from "react";
import { CramPlannerSheet } from "../../../features/cram/components/CramPlannerSheet";
import { CramPlanView } from "../../../features/cram/components/CramPlanView";
import { useCramPlans } from "../../../features/cram/hooks/useCramPlans";
import { Calendar } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { supabase } from "../../../lib/supabase";
import { MaterialDrawer } from "../../../features/study/components/MaterialDrawer";
import type { StudyMaterial } from "../../../features/study/services/study.service";
import { useStudyActions } from "../../../features/study/hooks/useStudyActions";
import { recordMaterialView } from "../../../features/study/services/study.service";

export function CramTab() {
  const user = useAuthStore((s) => s.user);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const { data: plans = [], isLoading } = useCramPlans();
  const [selectedMat, setSelectedMat] = useState<StudyMaterial | null>(null);
  const { toggleSave } = useStudyActions();

  const handleOpenMaterial = async (id: string) => {
    const { data } = await supabase.from("study_materials").select("*").eq("id", id).single();
    if (data) {
      setSelectedMat(data as StudyMaterial);
      if (user) recordMaterialView(user.id, data.id);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!activePlanId && (
        <div className="mb-4 flex flex-col gap-2">
          <button
            onClick={() => setPlannerOpen(true)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Plan a cram
          </button>
          
          {isLoading ? (
            <div className="space-y-2 mt-3">
              <div className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
            </div>
          ) : plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-gradient-to-b from-blue-50/50 to-indigo-50/30 dark:from-slate-900/60 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 mt-4">
              <h2 className="text-sm font-bold mb-2">No active plans</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Generate a structured revision schedule tailored to your course past papers.</p>
            </div>
          ) : (
            plans.filter((p) => p.status === "active").map((p) => (
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
            ))
          )}
        </div>
      )}

      {activePlanId && (
        <CramPlanView
          planId={activePlanId}
          planTitle={plans.find((p) => p.id === activePlanId)?.subject ?? "Cram"}
          examDate={plans.find((p) => p.id === activePlanId)?.exam_date ?? ""}
          onBack={() => setActivePlanId(null)}
          onOpenMaterial={handleOpenMaterial}
        />
      )}

      <CramPlannerSheet
        open={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        onGenerated={(planId) => {
          setActivePlanId(planId);
        }}
      />

      {selectedMat && (
        <MaterialDrawer
          material={selectedMat}
          saved={false}
          subjectColor="#6366F1"
          meta={{ color: "#6366F1", bg: "rgba(99,102,241,0.15)", border: "#6366F1", icon: "📄", label: selectedMat.paper_type ?? "Material" }}
          onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}
          onOpen={(m) => handleOpenMaterial(m.id)}
          onClose={() => setSelectedMat(null)}
        />
      )}
    </div>
  );
}
