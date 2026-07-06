import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useStudyMaterials } from "../../features/study/hooks/useStudyMaterials";
import { StudyGrid } from "../../features/study/components/StudyGrid";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import PostCardSkeleton from "../../features/posts/components/PostCardSkeleton";

import { useStudyStore } from "../../features/study/store/study.store";

import { useEffect, useMemo } from "react";
import { SUBJECT_COLORS } from "../../features/study/constants";


export default function SubjectPage() {
  const { subject } = useParams<{ subject: string }>();
  const setSubjectFilter = useStudyStore((s) => s.setSubjectFilter);
  const { materials, isLoading } = useStudyMaterials(); // will use the store's subject filter
  const { toggleSave } = useStudyActions();

  const subjectColorMap = useMemo(
    () => Object.fromEntries(materials.map((m) => [m.subject, SUBJECT_COLORS[0]])),
    [materials]
  );

  useEffect(() => {
    if (subject) setSubjectFilter(subject);
    return () => setSubjectFilter("All");
  }, [subject, setSubjectFilter]);

  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{subject}</h1>
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
          </div>
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={new Set()}
            subjectColorMap={subjectColorMap}
            onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}

            onOpen={() => {}}
          />
        )}
      </div>
    </AppShell>
  );
}