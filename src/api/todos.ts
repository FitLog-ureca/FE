import { apiClient } from "@/lib/interceptor/clientInterceptor";

export interface CreateTodoPayload {
  date: string;        // YYYY-MM-DD
  exerciseId: number;
}

export async function createTodo(payload: CreateTodoPayload) {
  const res = await apiClient.post("/todos", payload);
  return res.data;
}
