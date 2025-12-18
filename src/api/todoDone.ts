import { apiClient } from "@/lib/interceptor/clientInterceptor";

export async function todosDoneApi(date: string) {
  return apiClient.patch(`/todos/done/${date}`);
}
