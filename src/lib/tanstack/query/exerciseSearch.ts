import { getExercisesSearchApi } from "@/api/exerciseSearch";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useExerciseSearch(keyword?: string) {
  return useInfiniteQuery({
    queryKey: ["exerciseList", keyword],
    queryFn: ({ pageParam }) =>
      getExercisesSearchApi({
        keyword,
        page: pageParam,
        size: 20,
      }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });
}
