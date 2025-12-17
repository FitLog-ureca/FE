import { getTodoByDateApi } from "@/api/todo";
import { useQuery } from "@tanstack/react-query";

export function useTodosByDate(date: string) {
  return useQuery({
    queryKey: ["todos", date],
    queryFn: () => getTodoByDateApi(date),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,
  });
}
