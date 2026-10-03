import { useQuery } from "@tanstack/react-query";
import { fetchCourses, type CourseAggregate } from "../services/study.service";

export function useCourses() {
  return useQuery<CourseAggregate[]>({
    queryKey: ["courses-list"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
