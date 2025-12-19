import { apiClient } from "@/lib/interceptor/clientInterceptor";
import {
  ExerciseSearchParams,
  ExerciseSearchResponse,
} from "@/types/exerciseSearch";

export async function getExercisesSearchApi({
  keyword,
  page = 0,
  size = 20,
}: ExerciseSearchParams): Promise<ExerciseSearchResponse> {
  const res = await apiClient.get<ExerciseSearchResponse>("/exercises/search", {
    params: {
      keyword,
      page,
      size,
    },
  });
  return res.data;
}
