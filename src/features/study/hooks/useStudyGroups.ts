import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommunities,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
  getUserMemberships,
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
    staleTime: 0,
    queryFn: async () => {
      const all = await fetchCommunities("study");
      if (!course) return all;
      // Fix #6: removed `|| c.year === null` which was always true for study
      // groups (they're created with year: null), making the filter return
      // every group regardless of the course parameter.
      const lower = course.toLowerCase();
      return all.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.description?.toLowerCase().includes(lower)
      );
    },
  });

  // Fix #5: fetch real membership data so each group card knows whether the
  // current user has already joined. Previously this was a hardcoded `true`
  // placeholder in StudyGroupsSection.
  const membershipsQuery = useQuery({
    queryKey: ["userMemberships", user?.id],
    queryFn: () => getUserMemberships(user!.id),
    enabled: !!user,
    staleTime: 0,
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateStudyGroupInput) =>
      createCommunity({
        name: `${data.name} - ${data.course}`,
        description: data.description ?? "",
        type: "study",
        year: null,
        cover_color: "from-blue-600 via-cyan-600 to-teal-500",
        icon: "📚",
        parent_id: null,
        archived: false,
      } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
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
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
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
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
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
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      showToast("Study group deleted.", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to delete group", "err");
    },
  });

  const memberships = membershipsQuery.data ?? new Set<string>();

  return {
    // Fix #5: each group now carries a real `isJoined` flag derived from
    // the userMemberships query instead of the hardcoded placeholder.
    groups: (groupsQuery.data ?? []).map((g) => ({
      ...(g as Community),
      isJoined: memberships.has(g.id),
    })),
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
