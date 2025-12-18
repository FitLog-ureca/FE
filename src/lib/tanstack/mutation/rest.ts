import { deleteRestTimeApi, patchRestTimeApi } from "@/api/rest";
import { RestTimeParams } from "@/types/timer";
import { useMutation } from "@tanstack/react-query";

export function useRestTimeRecord() {
  return useMutation({
    mutationFn: ({ todoId, restTime }: RestTimeParams) =>
      patchRestTimeApi(todoId, restTime),
  });
}

export function useRestTimeReset() {
  return useMutation({
    mutationFn: (todoId: number) => deleteRestTimeApi(todoId),
  });
}
