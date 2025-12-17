import { apiClient } from "@/lib/interceptor/clientInterceptor";

export interface CreateTodoPayload {
  date: string;        // YYYY-MM-DD
  exerciseId: number;
  repsTarget?: number;
  weight?: number;
}

export async function createTodo(payload: CreateTodoPayload) {
  const res = await apiClient.post("/todos/create", payload);
  return res.data;
}
