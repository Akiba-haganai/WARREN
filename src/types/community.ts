export type CommunityType = "social" | "educational";

export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;            // emoji or image URL
  cover_color: string;     // gradient class
  type: CommunityType;
  parent_id: string | null;
  year: string | null;     // "1st","2nd","3rd","4th","all" etc.
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunityMember {
  community_id: string;
  user_id: string;
  joined_at: string;
}