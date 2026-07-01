export const YEAR_GROUPS = ["All", "Year 1", "Year 2", "Year 3", "Year 4", "Postgrad"];

export const MATERIAL_TYPES = [
  { value: "All",        label: "All",         icon: "📚" },
  { value: "notes",      label: "Notes",       icon: "📝" },
  { value: "slides",     label: "Slides",      icon: "🖼️" },
  { value: "past_paper", label: "Past Papers", icon: "📄" },
  { value: "assignment", label: "Assignments", icon: "✏️" },
  { value: "resource",   label: "Resources",   icon: "🔗" },
  { value: "video",      label: "Videos",      icon: "🎬" },
];

export const TYPE_META: Record<string, { color: string; bg: string; border: string; icon: string; label: string }> = {
  notes:      { color: "#818CF8", bg: "rgba(99,102,241,0.15)",  border: "#6366F1", icon: "📝", label: "Notes"      },
  slides:     { color: "#34D399", bg: "rgba(52,211,153,0.15)",  border: "#10B981", icon: "🖼️", label: "Slides"     },
  past_paper: { color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "#F59E0B", icon: "📄", label: "Past Paper" },
  assignment: { color: "#F87171", bg: "rgba(248,113,113,0.15)",border: "#EF4444", icon: "✏️", label: "Assignment" },
  resource:   { color: "#60A5FA", bg: "rgba(96,165,250,0.15)", border: "#3B82F6", icon: "🔗", label: "Resource"   },
  video:      { color: "#C084FC", bg: "rgba(192,132,252,0.15)",border: "#A855F7", icon: "🎬", label: "Video"      },
};

export const SUBJECT_COLORS = [
  "#6366F1","#10B981","#F59E0B","#EF4444","#3B82F6",
  "#A855F7","#EC4899","#14B8A6","#F97316","#06B6D4",
];
