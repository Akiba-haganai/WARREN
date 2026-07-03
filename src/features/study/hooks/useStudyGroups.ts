import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchStudyGroups,
  createStudyGroup,
  joinStudyGroup,
  leaveStudyGroup,
} from "../services/studyGroups.service";

export function useStudyGroups(course?: string) {
  const queryClient = useQueryClient();

  const groupsQuery = useQuery({
    queryKey: ["studyGroups", course],
    queryFn: () => fetchStudyGroups(course),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; course: string; description?: string; isPrivate?: boolean }) =>
      createStudyGroup(data.name, data.course, data.description, data.isPrivate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["studyGroups"] }),
  });

  const joinMutation = useMutation({
    mutationFn: (groupId: string) => joinStudyGroup(groupId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["studyGroups"] }),
  });

  const leaveMutation = useMutation({
    mutationFn: (groupId: string) => leaveStudyGroup(groupId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["studyGroups"] }),
  });

  return {
    groups: groupsQuery.data ?? [],
    isLoading: groupsQuery.isLoading,
    createGroup: createMutation.mutate,
    join: joinMutation.mutate,
    leave: leaveMutation.mutate,
  };
}