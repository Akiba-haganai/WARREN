import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyGroupCard } from "./StudyGroupCard";
import { useStudyGroups } from "../hooks/useStudyGroups";

export function StudyGroupsSection() {
  const navigate = useNavigate();
  const [course] = useState<string | undefined>();
  const { groups, isLoading, createGroup, join, leave } = useStudyGroups(course);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [groupCourse, setGroupCourse] = useState("");

  const handleCreate = () => {
    if (!name || !groupCourse) return;
    createGroup({ name, course: groupCourse, description: desc });
    setShowCreate(false);
    setName("");
    setDesc("");
    setGroupCourse("");
  };

  const isMember = (_groupId: string) => true; // placeholder

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">📚 Study Groups</h2>
        <button onClick={() => setShowCreate(!showCreate)} className="text-sm text-blue-600">+ New</button>
      </div>

      {showCreate && (
        <div className="mb-3 space-y-2">
          <input placeholder="Group name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
          <input placeholder="Course" value={groupCourse} onChange={(e) => setGroupCourse(e.target.value)} className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 border rounded" />
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-full">Create</button>
        </div>
      )}

      {isLoading ? (
        <div className="h-20 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {groups.map((group) => (
            <StudyGroupCard
              key={group.id}
              group={group}
              isMember={isMember(group.id)}
              onJoin={() => join(group.id)}
              onLeave={() => leave(group.id)}
              onChat={() => navigate(`/community/${group.id}/chat`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}