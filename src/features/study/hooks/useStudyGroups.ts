import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommunities,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
} from "../../communities/services/communities.service";
import { useAuthStore } from "../../../store/authStore";
import { useToastStore } from "../../../store/toastStore";
import type { Community } from "../../../types/community";

type CreateStudyGroupInput = {
  name: string;
  course: string;
  description?: string;
  isPrivate?: boolean;
};

export function useStudyGroups(course?: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();

  const groupsQuery = useQuery({
    queryKey: ["studyGroups", course],
    queryFn: async () => {
      const all = await fetchCommunities("study");
      if (!course) return all;
      return all.filter(
        (c) =>
          c.name.includes(course) ||
          c.description?.includes(course) ||
          c.year === null
      );
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateStudyGroupInput) =>
      createCommunity({
        // supabase insert typing sometimes lags behind schema; keep runtime fields only
        name: `${data.name} - ${data.course}`,
        description: data.description ?? "",
        type: "study",
        year: null,
        cover_color: "#93c5fd",
        icon: "📚",
        parent_id: null,
        archived: false,
      } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("Study group created!", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to create study group", "err");
    },
  });

  const joinMutation = useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("You joined the group!", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to join group", "err");
    },
  });

  const leaveMutation = useMutation({
    mutationFn: (communityId: string) => leaveCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("You left the group.", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to leave group", "err");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (communityId: string) => deleteCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("Study group deleted.", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to delete group", "err");
    },
  });

  return {
    groups: (groupsQuery.data ?? []) as Community[],
    isLoading: groupsQuery.isLoading,
    createGroup: async (data: CreateStudyGroupInput) => {
      if (!user) throw new Error("Not authenticated");
      return createMutation.mutateAsync(data);
    },
    join: (communityId: string) => {
      if (!user) throw new Error("Not authenticated");
      joinMutation.mutate(communityId);
    },
    leave: (communityId: string) => {
      if (!user) throw new Error("Not authenticated");
      leaveMutation.mutate(communityId);
    },
    deleteGroup: (communityId: string) => {
      if (!user) throw new Error("Not authenticated");
      if (!confirm("Delete this study group? This cannot be undone.")) return;
      deleteMutation.mutate(communityId);
    },
  };
}

