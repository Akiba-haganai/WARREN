import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { useStudyStore } from "../../features/study/store/study.store";
import { useStudyMaterials } from "../../features/study/hooks/useStudyMaterials";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import { StudyGrid } from "../../features/study/components/StudyGrid";
import { MaterialDrawer } from "../../features/study/components/MaterialDrawer";
import type { StudyMaterial } from "../../features/study/services/study.service";
import { SearchBar, ChipScroll, Chip, SectionLabel } from "../../features/study/components/FilterChips";
import { TYPE_META, SUBJECT_COLORS, MATERIAL_TYPES, YEAR_GROUPS } from "../../features/study/constants";

export default function StudyPage() {
  const navigate = useNavigate();
  const store = useStudyStore();
  const { materials, subjects, savedIds, isLoading } = useStudyMaterials();
  const { toggleSave } = useStudyActions();
  const [selected, setSelected] = useState<StudyMaterial | null>(null);

  const subjectColorMap = Object.fromEntries(subjects.map((s, i) => [s, SUBJECT_COLORS[i % SUBJECT_COLORS.length]]));

  const handleToggleSave = (materialId: string, saved: boolean) => toggleSave({ materialId, saved });

  return (
    <AppShell>
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                <BookOpen size={15} className="text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Study</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-10">Lecturer materials & resources</p>
          </div>
          <button onClick={() => navigate("/events")} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Calendar size={12} /> Events
          </button>
        </div>

        <SearchBar value={store.search} onChange={store.setSearch} onClear={() => store.setSearch("")} />

        <ChipScroll>
          {MATERIAL_TYPES.map(({ value, label, icon }) => {
            const active = value === store.typeFilter;
            const meta = TYPE_META[value];
            return (
              <Chip key={value} active={active} accent={active && meta ? meta.color : undefined} onClick={() => store.setTypeFilter(value)}>
                <span>{icon}</span><span>{label}</span>
              </Chip>
            );
          })}
        </ChipScroll>

        <SectionLabel>Year Group</SectionLabel>
        <ChipScroll>
          {YEAR_GROUPS.map((y) => (
            <Chip key={y} active={y === store.yearFilter} onClick={() => store.setYearFilter(y)}>{y}</Chip>
          ))}
        </ChipScroll>

        {subjects.length > 0 && (
          <>
            <SectionLabel>Subject</SectionLabel>
            <ChipScroll>
              {["All", ...subjects].map((s) => (
                <Chip key={s} active={s === store.subjectFilter} accent={s !== "All" && s === store.subjectFilter ? subjectColorMap[s] : undefined} onClick={() => store.setSubjectFilter(s)}>{s}</Chip>
              ))}
            </ChipScroll>
          </>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-2.5">Loading skeletons...</div>
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={savedIds}
            subjectColorMap={subjectColorMap}
            onToggleSave={handleToggleSave}
            onOpen={setSelected}
          />
        )}

        {selected && (
          <MaterialDrawer
            material={selected}
            saved={savedIds.has(selected.id)}
            subjectColor={subjectColorMap[selected.subject] ?? "#6366F1"}
            meta={TYPE_META[selected.material_type] ?? TYPE_META.resource}
            onToggleSave={handleToggleSave}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </AppShell>
  );
}