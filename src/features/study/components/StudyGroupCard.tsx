import type { Database } from "../../../types/database.types";
type StudyGroup = Database["public"]["Tables"]["study_groups"]["Row"];

interface Props {
  group: StudyGroup;
  isMember: boolean;
  onJoin: () => void;
  onLeave: () => void;
  onChat: () => void;
}

export function StudyGroupCard({ group, isMember, onJoin, onLeave, onChat }: Props) {
  return (
    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border">
      <h3 className="font-semibold">{group.name}</h3>
      <p className="text-xs text-slate-500">{group.course}</p>
      {group.description && <p className="text-xs mt-1">{group.description}</p>}
      <div className="flex gap-2 mt-2">
        {isMember ? (
          <>
            <button onClick={onChat} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">Chat</button>
            <button onClick={onLeave} className="text-xs border px-3 py-1 rounded-full">Leave</button>
          </>
        ) : (
          <button onClick={onJoin} className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">Join</button>
        )}
      </div>
    </div>
  );
}