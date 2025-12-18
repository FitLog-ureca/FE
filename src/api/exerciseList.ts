import { apiClient } from "@/lib/interceptor/clientInterceptor";

export interface ExerciseCatalogItem {
  exerciseId: number;
  name: string;
  defaultCaloriesPerSet: number;
  unit: string;
}

export async function getExerciseList(params?: {
  keyword?: string;
  page?: number;
  size?: number;
}) {
  const res = await apiClient.get("/exercises/search", {
    params: {
      keyword: params?.keyword,
      page: params?.page ?? 0,
      size: params?.size ?? 20,
    },
  });

  return res.data.exercises;
}
