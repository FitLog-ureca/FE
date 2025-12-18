import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout } from "@/api/workouts";

export function useDeleteWorkout(selectedDate: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", selectedDate],
      });
    },
  });
}
