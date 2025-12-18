import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/todos";

export function useCreateTodo(selectedDate: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", selectedDate],
      });
    },
  });
}
