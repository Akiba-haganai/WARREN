import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, TrendingUp, Clock, Package } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { useStudyStore } from "../../features/study/store/study.store";
import {
  useStudyMaterials,
  useTrendingMaterials,
} from "../../features/study/hooks/useStudyMaterials";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import { useContinueLearning } from "../../features/study/hooks/useContinueLearning";
import { useStarterPacks } from "../../features/study/hooks/useStarterPacks";
import { useRelatedMaterials } from "../../features/study/hooks/useRelatedMaterials";
import { usePersonalizedFeed } from "../../features/study/hooks/usePersonalizedFeed";
import { StudyGrid } from "../../features/study/components/StudyGrid";
import { MaterialDrawer } from "../../features/study/components/MaterialDrawer";
import { GradeEstimator } from "../../features/study/components/GradeEstimator";
import {
  SearchBar,
  ChipScroll,
  Chip,
  SectionLabel,
} from "../../features/study/components/FilterChips";
import {
  TYPE_META,
  SUBJECT_COLORS,
  MATERIAL_TYPES,
  YEAR_GROUPS,
} from "../../features/study/constants";
import { recordMaterialView } from "../../features/study/services/study.service";
import { useAuthStore } from "../../store/authStore";
import { useMaterialRequests } from "../../features/study/hooks/useMaterialRequests";
import { useLeaderboard } from "../../features/study/hooks/useLeaderboard";
import { RequestForm } from "../../features/study/components/RequestForm";
import type { StudyMaterial } from "../../features/study/services/study.service";
import { StudyGroupsSection } from "../../features/study/components/StudyGroupsSections";

export default function StudyPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  // Study store (all values at once)
  const {
    search,
    setSearch,
    yearFilter,
    setYearFilter,
    typeFilter,
    setTypeFilter,
    programmeFilter,
    setProgrammeFilter,
  } = useStudyStore();

  // Data hooks
  const { materials, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStudyMaterials();
  const { data: trendingPages } = useTrendingMaterials();
  const trending = trendingPages?.pages.flatMap((p) => p.data) ?? [];
  const { data: continueLearning } = useContinueLearning();
  const { packs, packMaterials } = useStarterPacks();
  const { toggleSave } = useStudyActions();
  const { personalizedMaterials } = usePersonalizedFeed();
  const { requests, createRequest } = useMaterialRequests();
  const { data: leaderboard } = useLeaderboard();

  const [selected, setSelected] = useState<StudyMaterial | null>(null);
  const { data: related = [] } = useRelatedMaterials(selected);
  const [showExamBank, setShowExamBank] = useState(false);

  const subjectColorMap = Object.fromEntries(
    trending.concat(materials).map((m) => [m.subject, SUBJECT_COLORS[0]])
  );

  const programmeOptions = useMemo(() => {
    const programmes = new Set<string>();
    materials.forEach((m) => {
      const programme = (m as any).programme as string | null | undefined;
      if (programme) programmes.add(programme);
    });
    return ["All", ...Array.from(programmes).sort()];
  }, [materials]);

  const handleToggleSave = (materialId: string, saved: boolean) =>
    toggleSave({ materialId, saved });

  const handleOpen = (material: StudyMaterial) => {
    setSelected(material);
    if (user) recordMaterialView(user.id, material.id);
  };

  // Infinite scroll observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || !hasNextPage || isFetchingNextPage) return;
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      });
      observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
    <AppShell>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                <BookOpen size={15} className="text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Study</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-10">
              Lecturer materials & resources
            </p>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
          >
            <Calendar size={12} /> Events
          </button>
        </div>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />

        {/* Exam Question Bank toggle */}
        <button
          onClick={() => setShowExamBank(!showExamBank)}
          className="flex items-center gap-2 text-sm font-semibold bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full mb-4"
        >
          📝 Exam Question Bank
        </button>
        {showExamBank && (
          <StudyGrid
            materials={materials.filter((m) => m.material_type === "past_paper")}
            savedIds={new Set()}
            subjectColorMap={{}}
            onToggleSave={handleToggleSave}
            onOpen={handleOpen}
          />
        )}

        {/* Personalized feed */}
        {personalizedMaterials.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-4 mb-2">✨ For You</h2>
            <StudyGrid
              materials={personalizedMaterials}
              savedIds={new Set()}
              subjectColorMap={subjectColorMap}
              onToggleSave={handleToggleSave}
              onOpen={handleOpen}
            />
          </>
        )}

        {/* Grade Estimator */}
        <GradeEstimator />

        {/* Material Requests */}
        <div className="mb-6">
          <RequestForm onSubmit={createRequest} />
          {requests.length > 0 && (
            <div className="mt-3 space-y-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-2 bg-white dark:bg-slate-900 rounded-xl border text-sm"
                >
                  <span className="font-medium">{req.title}</span> –{" "}
                  <span className="text-slate-500">
                    {req.profiles?.username}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard */}
        {leaderboard && leaderboard.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">🏆 Top Contributors</h2>
            <div className="flex gap-2 overflow-x-auto">
              {leaderboard.slice(0, 10).map((u) => (
                <div key={u.id} className="text-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold mx-auto">
                    {u.avatar_url ? (
                      <img
                        src={u.avatar_url}
                        alt={u.username ?? ""}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      u.username?.[0]?.toUpperCase()
                    )}
                  </div>
                  <p className="text-xs mt-1">{u.username}</p>
                  <p className="text-[10px] text-slate-500">{u.karma} pts</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <ChipScroll>
          {MATERIAL_TYPES.map(({ value, label, icon }) => {
            const active = value === typeFilter;
            const meta = TYPE_META[value];
            return (
              <Chip
                key={value}
                active={active}
                accent={active && meta ? meta.color : undefined}
                onClick={() => setTypeFilter(value)}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Chip>
            );
          })}
        </ChipScroll>

        <SectionLabel>Year Group</SectionLabel>
        <ChipScroll>
          {YEAR_GROUPS.map((y) => (
            <Chip
              key={y}
              active={y === yearFilter}
              onClick={() => setYearFilter(y)}
            >
              {y}
            </Chip>
          ))}
        </ChipScroll>

        {/* Programme filter */}
        {programmeOptions.length > 1 && (
          <>
            <SectionLabel>Programme</SectionLabel>
            <ChipScroll>
              {programmeOptions.map((p) => (
                <Chip
                  key={p}
                  active={p === programmeFilter}
                  onClick={() => setProgrammeFilter(p)}
                >
                  {p}
                </Chip>
              ))}
            </ChipScroll>
          </>
        )}

        {/* Continue Learning */}
        {continueLearning && continueLearning.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-1">
              <Clock size={18} /> Continue Learning
            </h2>
            <StudyGrid
              materials={continueLearning.slice(0, 5)}
              savedIds={new Set()}
              subjectColorMap={subjectColorMap}
              onToggleSave={handleToggleSave}
              onOpen={handleOpen}
            />
          </>
        )}

        {/* Starter Packs */}
        {packs.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-1">
              <Package size={18} /> Starter Packs
            </h2>
            {packs.map((pack, index) => (
              <div key={pack.id} className="mb-4">
                <h3 className="font-semibold text-sm mb-2">{pack.name}</h3>
                <StudyGrid
                  materials={packMaterials[index] ?? []}
                  savedIds={new Set()}
                  subjectColorMap={subjectColorMap}
                  onToggleSave={handleToggleSave}
                  onOpen={handleOpen}
                />
              </div>
            ))}
          </>
        )}

        {/* Trending */}
        {trending.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-1">
              <TrendingUp size={18} /> Trending This Week
            </h2>
            <StudyGrid
              materials={trending.slice(0, 5)}
              savedIds={new Set()}
              subjectColorMap={subjectColorMap}
              onToggleSave={handleToggleSave}
              onOpen={handleOpen}
            />
          </>
        )}

        <StudyGroupsSection />

        {/* All Materials */}
        <h2 className="text-lg font-bold mt-6 mb-2">All Materials</h2>
        {isLoading ? (
          <div className="flex flex-col gap-2.5">Loading...</div>
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={new Set()}
            subjectColorMap={subjectColorMap}
            onToggleSave={handleToggleSave}
            onOpen={handleOpen}
          />
        )}
        {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
        {isFetchingNextPage && (
          <p className="text-center text-sm">Loading more...</p>
        )}

        {/* Drawer */}
        {selected && (
          <MaterialDrawer
            material={selected}
            saved={false}
            subjectColor={subjectColorMap[selected.subject] ?? "#6366F1"}
            meta={TYPE_META[selected.material_type] ?? TYPE_META.resource}
            onToggleSave={handleToggleSave}
            onClose={() => setSelected(null)}
            relatedMaterials={related}
          />
        )}
      </div>
      
      <a
        href="https://www.buymeacoffee.com/warren"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-pink-600 dark:text-pink-400 hover:underline px-4 pb-4"
      >
        ☕ Support
        Buy me a coffee plz
      </a>
    </AppShell>
  );
}