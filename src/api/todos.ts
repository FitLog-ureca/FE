import { apiClient } from "@/lib/interceptor/clientInterceptor";

export interface CreateTodoPayload {
  date: string;        // YYYY-MM-DD
  exerciseId: number;
}

export async function createTodo(payload: CreateTodoPayload) {
  const res = await apiClient.post("/todos", payload);
  return res.data;
}

export async function addSet(todoId: number) {
  const res = await apiClient.post(`/todos/${todoId}/sets`);
  return res.data;
}

export async function deleteTodo(todoId: number) {
  const res = await apiClient.delete(`/todos/${todoId}`);
  return res.data;
}
