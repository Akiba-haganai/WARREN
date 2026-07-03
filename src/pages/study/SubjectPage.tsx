import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useStudyMaterials } from "../../features/study/hooks/useStudyMaterials";
import { StudyGrid } from "../../features/study/components/StudyGrid";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import { useStudyStore } from "../../features/study/store/study.store";
import { useEffect } from "react";

export default function SubjectPage() {
  const { subject } = useParams<{ subject: string }>();
  const setSubjectFilter = useStudyStore((s) => s.setSubjectFilter);
  const { materials, isLoading } = useStudyMaterials(); // will use the store's subject filter
  const { toggleSave } = useStudyActions();

  useEffect(() => {
    if (subject) setSubjectFilter(subject);
    return () => setSubjectFilter("All");
  }, [subject, setSubjectFilter]);

  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{subject}</h1>
        {isLoading ? (
          <div className="h-20 animate-pulse bg-slate-200 rounded-2xl" />
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={new Set()}
            subjectColorMap={{}}
            onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}
            onOpen={() => {}}
          />
        )}
      </div>
    </AppShell>
  );
}