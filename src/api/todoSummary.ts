import { apiClient } from "@/lib/interceptor/clientInterceptor";

export interface TodoDailySummary {
  date: string;     // yyyy-mm-dd
  totalSets: number;
  completedSets: number;
}

export interface TodoMonthlySummaryResponse {
  year: number;
  month: number;
  summaries: TodoDailySummary[];
}

export async function getTodoMonthlySummary(
  year: number,
  month: number
): Promise<TodoMonthlySummaryResponse> {
  const res = await apiClient.get("/todos/summary", {
    params: { year, month },
  });

  return res.data;
}
