import { useQuery } from "@tanstack/react-query";
import { getTodoMonthlySummary } from "@/api/todoSummary";

export function useTodoMonthlySummary(year: number, month: number) {
  return useQuery({
    queryKey: ["todos", "summary", year, month],
    queryFn: async () => {
      const res = await getTodoMonthlySummary(year, month);
      return res.summaries;
    },
    enabled: !!year && month >= 0,
  });
}
