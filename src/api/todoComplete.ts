import { apiClient } from "@/lib/interceptor/clientInterceptor";

export async function todoCompleteApi(id: number) {
  return apiClient.patch(`/todos/complete/${id}`);
}
