import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api/todos";

export function useDeleteTodo(selectedDate: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", selectedDate],
      });
    },
  });
}
