import { MaterialCard } from "./MaterialCard";
import type { StudyMaterial } from "../services/study.service";

interface Props {
  materials: StudyMaterial[];
  savedIds: Set<string>;
  subjectColorMap: Record<string, string>;
  onToggleSave: (materialId: string, saved: boolean) => void;
  onOpen: (material: StudyMaterial) => void;
}

export function StudyGrid({ materials, savedIds, subjectColorMap, onToggleSave, onOpen }: Props) {
  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <span className="text-5xl">📚</span>
        <p className="text-base font-bold text-slate-500">No materials found</p>
      </div>
    );
  }

  const uniqueMaterials = Array.from(new Map(materials.map((m) => [m.id, m])).values());

  return (
    <div className="flex flex-col gap-2.5">
      {uniqueMaterials.map((m) => (
        <MaterialCard
          key={m.id}
          material={m}
          saved={savedIds.has(m.id)}
          subjectColor={subjectColorMap[m.subject] ?? "#6366F1"}
          onToggleSave={onToggleSave}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}