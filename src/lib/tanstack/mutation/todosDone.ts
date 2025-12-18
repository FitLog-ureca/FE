import { todosDoneApi } from "@/api/todoDone";
import { useMutation } from "@tanstack/react-query";

export function useTodosDone() {
  return useMutation({
    mutationFn: (date: string) => todosDoneApi(date),
  });
}
