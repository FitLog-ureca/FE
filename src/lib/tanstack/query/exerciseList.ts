import { useQuery } from "@tanstack/react-query";
import { getExerciseList } from "@/api/exerciseList";

export function useExerciseList(keyword?: string) {
  return useQuery({
    queryKey: ["exerciseList", keyword],
    queryFn: () => getExerciseList({ keyword }),
  });
}
