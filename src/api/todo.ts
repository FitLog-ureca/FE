import { apiClient } from "@/lib/interceptor/clientInterceptor";
import { TodoResponse } from "@/types/todos";

export async function getTodoByDateApi(date: string): Promise<TodoResponse> {
  const res = await apiClient.get(`/exercises?date=${date}`);
  if (!res.data) {
    throw new Error("todo 조회 실패");
  }
  return res.data;
}
