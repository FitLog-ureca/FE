import { apiClient } from "@/lib/interceptor/clientInterceptor";
import { SetUpdatePayload } from "@/types/todoMain";

export async function updateTodoRecordApi(
  todoId: number,
  payload: SetUpdatePayload
) {
  return apiClient.patch(`/todos/record/${todoId}`, payload);
}
