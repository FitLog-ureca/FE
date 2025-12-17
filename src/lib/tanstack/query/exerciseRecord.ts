import { useQuery } from "@tanstack/react-query";
import { getExercisesByDate } from "@/api/exerciseRecord";
import { ExerciseResponse } from "@/types/exercise";

export function useExercisesByDate(date: string | null) {
  return useQuery<ExerciseResponse>({
    queryKey: ["exercises", date],
    queryFn: () => getExercisesByDate(date as string),
    enabled: !!date, // 날짜 선택 전에는 요청 안 함
  });
}
