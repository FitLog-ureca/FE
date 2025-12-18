import { apiClient } from "@/lib/interceptor/clientInterceptor";

export async function deleteWorkout(workoutId: number) {
  const res = await apiClient.delete(`/todos/workouts/${workoutId}`);
  return res.data; // { message: string }
}
