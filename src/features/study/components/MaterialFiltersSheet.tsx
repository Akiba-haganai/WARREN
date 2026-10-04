import { Sheet } from "../../../components/ui/Sheet";
import { useStudyStore } from "../store/study.store";
import { BookOpen, Calendar, GraduationCap, X } from "lucide-react";
import { useStudyMaterials } from "../hooks/useStudyMaterials";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MaterialFiltersSheet({ open, onClose }: Props) {
  const { 
    typeFilter, setTypeFilter,
    yearFilter, setYearFilter,
    subjectFilter, setSubjectFilter,
    programmeFilter, setProgrammeFilter,
  } = useStudyStore();
  
  const { subjects } = useStudyMaterials();

  // Deduplicate and extract filter options based on available subjects
  const availableCourses = Array.from(new Set(subjects)).sort();
  const availableYears = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
  const availableTypes = ["Past Paper", "Notes", "Assignment", "Summary"];

  const handleClear = () => {
    setTypeFilter("All");
    setYearFilter("All");
    setSubjectFilter("All");
    setProgrammeFilter("All");
  };

  const isFiltered = typeFilter !== "All" || yearFilter !== "All" || subjectFilter !== "All" || programmeFilter !== "All";

  return (
    <Sheet open={open} onClose={onClose} title="Filter Materials" description="Narrow down documents by course, year, or type.">
      <div className="flex flex-col gap-6 pb-6 mt-2">
        {/* Course Filter */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <BookOpen size={16} className="text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Course</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSubjectFilter("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                subjectFilter === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Courses
            </button>
            {availableCourses.map(course => (
              <button
                key={course}
                onClick={() => setSubjectFilter(course)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  subjectFilter === course
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Document Type Filter */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <GraduationCap size={16} className="text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Material Type</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTypeFilter("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                typeFilter === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Types
            </button>
            {availableTypes.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  typeFilter === type
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Year Filter */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Calendar size={16} className="text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Academic Year</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setYearFilter("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                yearFilter === "All"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Years
            </button>
            {availableYears.map(year => (
              <button
                key={year}
                onClick={() => setYearFilter(year)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  yearFilter === year
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleClear}
            disabled={!isFiltered}
            className={`flex items-center gap-1 text-sm font-semibold transition-opacity ${isFiltered ? "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" : "opacity-0 pointer-events-none"}`}
          >
            <X size={16} />
            Clear all
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl shadow-sm transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Sheet>
  );
}
