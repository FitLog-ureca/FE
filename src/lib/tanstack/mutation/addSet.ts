import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSet } from "@/api/todos";

export function useAddSet(selectedDate: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => addSet(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", selectedDate],
      });
    },
  });
}
