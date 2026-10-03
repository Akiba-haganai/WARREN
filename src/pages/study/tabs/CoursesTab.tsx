// src/pages/study/tabs/CoursesTab.tsx
import { useCourses } from "../../../features/study/hooks/useCourses";
import { useStudyStore } from "../../../features/study/store/study.store";

interface CoursesTabProps {
  onSelectCourse: (courseKey: string) => void;
}

export function CoursesTab({ onSelectCourse }: CoursesTabProps) {
  const { data: courses = [], isLoading } = useCourses();

  if (isLoading) {
    return <p className="text-sm text-slate-400 py-8 text-center">Loading courses…</p>;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-2xl mb-2">📚</p>
        <p className="text-sm font-semibold">No courses indexed yet.</p>
        <p className="text-xs">Once study materials are processed, courses will show up here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {courses.map((c) => (
        <button
          key={c.course_key}
          onClick={() => {
            useStudyStore.getState().setSubjectFilter(c.course_key);
            onSelectCourse(c.course_key);
          }}
          className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left active:scale-[0.99] transition hover:border-blue-400 dark:hover:border-cyan-500"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-xs font-black text-blue-600 dark:text-cyan-400 shrink-0">
            {c.course_key.replace(/\s+/g, "").slice(0, 4).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {c.display_name}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {Number(c.materials)} materials · {Number(c.exams)} exams · {Number(c.notes)} notes
              {c.latest_year && ` · up to ${c.latest_year}`}
            </p>
            {c.all_topics && c.all_topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {c.all_topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="text-slate-300 dark:text-slate-600 text-lg self-center">›</span>
        </button>
      ))}
    </div>
  );
}
