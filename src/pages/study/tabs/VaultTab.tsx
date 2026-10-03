// src/pages/study/tabs/VaultTab.tsx
import { useState } from "react";
import { useStudyMaterials, useTrendingMaterials } from "../../../features/study/hooks/useStudyMaterials";
import { StudyGrid } from "../../../features/study/components/StudyGrid";
import { SearchBar } from "../../../components/common/SearchBar";
import { MaterialDrawer } from "../../../features/study/components/MaterialDrawer";
import type { StudyMaterial } from "../../../features/study/services/study.service";
import { useStudyStore } from "../../../features/study/store/study.store";
import { useStudyActions } from "../../../features/study/hooks/useStudyActions";
import { recordMaterialView } from "../../../features/study/services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function VaultTab() {
  const user = useAuthStore((s) => s.user);
  const { search, setSearch, subjectFilter, setSubjectFilter } = useStudyStore();
  const { materials, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useStudyMaterials();
  const { data: trendingPages } = useTrendingMaterials();
  const trending = trendingPages?.pages.flatMap((p) => p.data) ?? [];
  const { toggleSave } = useStudyActions();

  const [selected, setSelected] = useState<StudyMaterial | null>(null);

  const handleOpen = (m: StudyMaterial) => {
    setSelected(m);
    if (user) recordMaterialView(user.id, m.id);
  };

  const isFiltered = Boolean(search || (subjectFilter && subjectFilter !== "All"));

  return (
    <div className="flex flex-col gap-4">
      <SearchBar value={search} onChange={setSearch} onClear={() => setSearch("")} />

      {subjectFilter && subjectFilter !== "All" && (
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-400 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <span>Filtering by course: <strong>{subjectFilter}</strong></span>
          <button
            onClick={() => setSubjectFilter("All")}
            className="ml-auto underline hover:opacity-75"
          >
            Clear
          </button>
        </div>
      )}

      {trending.length > 0 && !isFiltered && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">
            Trending this week
          </h2>
          <StudyGrid
            materials={trending.slice(0, 5)}
            savedIds={new Set()}
            subjectColorMap={{}}
            onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}
            onOpen={handleOpen}
          />
        </section>
      )}

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">
          {search ? `Results for "${search}"` : subjectFilter !== "All" ? `${subjectFilter} Materials` : "All materials"}
        </h2>
        {isLoading ? (
          <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
        ) : materials.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            {search ? "No matches. Try a course code or topic." : "No materials yet."}
          </p>
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={new Set()}
            subjectColorMap={{}}
            onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}
            onOpen={handleOpen}
          />
        )}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full py-3 mt-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold active:scale-[0.99] transition"
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        )}
      </section>

      {selected && (
        <MaterialDrawer
          material={selected}
          saved={false}
          subjectColor="#6366F1"
          meta={{ color: "#6366F1", bg: "rgba(99,102,241,0.15)", border: "#6366F1", icon: "📄", label: selected.paper_type ?? "Material" }}
          onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}
          onOpen={handleOpen}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
