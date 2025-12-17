import { apiClient } from "@/lib/interceptor/clientInterceptor";

export async function patchRestTimeApi(todoId: number, restTime: number) {
  return apiClient.patch(`/todos/rest/${todoId}`, { restTime });
}

export async function deleteRestTimeApi(todoId: number) {
  return apiClient.delete(`/todos/rest/reset/${todoId}`);
}
