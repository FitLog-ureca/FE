import { logoutApi } from "@/api/logout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}
