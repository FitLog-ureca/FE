import { todoCompleteApi } from "@/api/todoComplete";
import { useMutation } from "@tanstack/react-query";

export function useTodoComplete() {
  return useMutation({
    mutationFn: todoCompleteApi,
  });
}
