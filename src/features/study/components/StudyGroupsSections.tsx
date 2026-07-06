import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyGroupCard } from "./StudyGroupCard";
import { useStudyGroups } from "../hooks/useStudyGroups";
import { useToastStore } from "../../../store/toastStore";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import type { Community } from "../../../types/community";

export function StudyGroupsSection() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { groups, isLoading, createGroup, join, leave, deleteGroup } = useStudyGroups();
  const { showToast } = useToastStore();

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [groupCourse, setGroupCourse] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || !groupCourse.trim()) {
      showToast("Please fill in the group name and course.", "err");
      return;
    }
    setCreating(true);
    try {
      await createGroup({
        name: name.trim(),
        course: groupCourse.trim(),
        description: desc.trim(),
      });
      setName("");
      setDesc("");
      setGroupCourse("");
      setShowCreate(false);
      showToast("Study group created! Invite your classmates.", "ok");
    } catch (err: any) {
      const message = err?.message || "Failed to create study group. Try again.";
      showToast(message, "err");
    } finally {
      setCreating(false);
    }
  };

  const isMember = (_groupId: string) => true; // placeholder – will be updated with real membership check later

  const currentUserId = user?.id;
  const isAdmin = user?.role === "admin";
  const canDelete = (group: Community) => {
    return !!currentUserId && (group.created_by === currentUserId || isAdmin);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">📚 Study Groups</h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="text-sm text-blue-600 font-semibold"
        >
          {showCreate ? "Cancel" : "+ New"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-4 space-y-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border">
          <input
            placeholder="Group name (e.g., Physics 101)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800"
          />
          <input
            placeholder="Course (e.g., PHY 101)"
            value={groupCourse}
            onChange={(e) => setGroupCourse(e.target.value)}
            className="w-full p-3 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800"
          />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-3 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800 resize-none"
            rows={2}
          />
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {creating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-6">
          No study groups yet. Create one to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {groups.map((group) => (
            <StudyGroupCard
              key={group.id}
              group={group}
              isMember={isMember(group.id)}
              canDelete={canDelete(group)}
              onJoin={() => join(group.id)}
              onLeave={() => leave(group.id)}
              onChat={() => navigate(`/community/${group.id}/chat`)}
              onDelete={() => deleteGroup(group.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

