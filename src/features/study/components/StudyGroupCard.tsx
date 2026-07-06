import type { Community } from "../../../types/community";

interface Props {
  group: Community;
  isMember: boolean;
  canDelete: boolean;
  onJoin: () => void;
  onLeave: () => void;
  onChat: () => void;
  onDelete: () => void;
}

export function StudyGroupCard({
  group,
  isMember,
  canDelete,
  onJoin,
  onLeave,
  onChat,
  onDelete,
}: Props) {
  return (
    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] active:scale-[0.985] transition-all duration-200 motion-safe:active:scale-[0.985]">


      <h3 className="font-semibold">{group.name}</h3>
      {/* Course used to be a dedicated column in study_groups; community stores it in name/description for now. */}
      <p className="text-xs text-slate-500">
        {group.description ? group.description : group.year ? `Year: ${group.year}` : ""}
      </p>
      {group.description && <p className="text-xs mt-1">{group.description}</p>}
      <div className="flex gap-2 mt-2">
        {isMember ? (
          <>
            <button onClick={onChat} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
              Chat
            </button>
            <button onClick={onLeave} className="text-xs border px-3 py-1 rounded-full">
              Leave
            </button>
          </>
        ) : (
          <button onClick={onJoin} className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
            Join
          </button>
        )}
      </div>

      {canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-xs text-red-500 mt-2 hover:underline"
        >
          Delete Group
        </button>
      )}
    </div>
  );
}

