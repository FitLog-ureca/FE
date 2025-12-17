import { apiClient } from "@/lib/interceptor/clientInterceptor";
import { ExerciseResponse } from "@/types/exercise";

/**
 * 특정 날짜의 운동 계획 / 기록 조회
 * GET /exercises?date=YYYY-MM-DD
 */
export async function getExercisesByDate(
  date: string
): Promise<ExerciseResponse> {
  const res = await apiClient.get<ExerciseResponse>("/exercises", {
    params: { date },
  });

  if (!res.data) {
    throw new Error("운동 조회 실패");
  }

  return res.data;
}
