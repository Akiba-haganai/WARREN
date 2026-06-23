export type PinCategory =
  | "registration"
  | "academics"
  | "finance"
  | "student_union"
  | "health"
  | "library"
  | "dining"
  | "transport"
  | "general";

export interface MapPin {
  id: string;
  title: string;
  description: string;
  category: PinCategory;
  x_percent: number;
  y_percent: number;
  photos: string[];
  floor?: string;
  hours?: string;
  contact?: string;
  created_by: string;
  created_at: string;
}