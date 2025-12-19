import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoRecordApi } from "@/api/updateTodoRecord";
import { SetUpdatePayload } from "@/types/todoMain";

export function useUpdateSet(selectedDate: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todoId,
      payload,
    }: {
      todoId: number;
      payload: SetUpdatePayload;
    }) => updateTodoRecordApi(todoId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", selectedDate],
      });
    },
  });
}
