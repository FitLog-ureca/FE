import { getProfileApi } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,
  });
}
