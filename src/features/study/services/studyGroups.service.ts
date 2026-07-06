// NOTE: Study groups have been unified into the community system.
// This module is intentionally left as a stub to avoid breaking any legacy imports.
// New code should use `src/features/communities/services/communities.service.ts`.

export async function fetchStudyGroups(): Promise<any[]> {
  return [];
}

export async function createStudyGroup(): Promise<any> {
  throw new Error("StudyGroup tables removed; use communities for study groups.");
}

export async function joinStudyGroup(): Promise<void> {
  throw new Error("StudyGroup tables removed; use communities for study groups.");
}

export async function leaveStudyGroup(): Promise<void> {
  throw new Error("StudyGroup tables removed; use communities for study groups.");
}

export async function fetchGroupMembers(): Promise<any[]> {
  return [];
}

