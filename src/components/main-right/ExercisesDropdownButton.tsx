"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { Loader2, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExerciseSearchResponse } from "@/types/exerciseSearch";
import { useExerciseSearch } from "@/lib/tanstack/query/exerciseSearch";

interface ExercisesDropdownButtonProps {
  completed: boolean;
  onToggleCompleted: () => void;
  onSelectExercise: (exerciseId: number) => void;
}

export default function ExercisesDropdownButton({
  completed,
  onToggleCompleted,
  onSelectExercise,
}: ExercisesDropdownButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const observerTarget = useRef<IntersectionObserver | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useExerciseSearch(debouncedSearch);

  const exercises = (data?.pages ?? []).flatMap(
    (page: ExerciseSearchResponse) => page.exercises
  );

  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return;
      if (isFetchingNextPage) return;

      if (observerTarget.current) {
        observerTarget.current.disconnect();
      }
      observerTarget.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );

      if (node) {
        observerTarget.current.observe(node);
      }
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    return () => {
      if (observerTarget.current) {
        observerTarget.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* 운동 종목 선택 버튼 */}
      {!completed && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <ActionButton
              className="w-full p-2 flex justify-center items-center gap-2 text-md"
              variant="secondary"
            >
              <Plus className="w-5 h-5" />
              운동 종목 선택
            </ActionButton>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={-44}
            className="w-[var(--radix-popover-trigger-width)] p-1 rounded-xl border border-fitlog-beige shadow-md"
          >
            <input
              autoFocus
              type="text"
              placeholder="운동 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-2 px-4 py-2 text-sm rounded-md border border-fitlog-beige focus:outline-none focus:border-fitlog-500"
            />

            <ul className="flex flex-col max-h-64 overflow-y-auto">
              {isLoading ? (
                <li className="py-3 text-center text-xs text-gray-400">
                  검색 중...
                </li>
              ) : exercises.length > 0 ? (
                <>
                  {exercises.map((exercise, index) => (
                    <li
                      key={exercise.exerciseId}
                      ref={
                        index === exercises.length - 1 ? lastElementRef : null
                      }
                      onClick={() => {
                        onSelectExercise(exercise.exerciseId);
                        setSearch("");
                        setOpen(false);
                      }}
                      className="cursor-pointer px-4 py-2 text-sm rounded-lg hover:bg-fitlog-100"
                    >
                      {exercise.name}
                    </li>
                  ))}

                  {isFetchingNextPage && (
                    <li className="py-1 flex justify-center">
                      <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                    </li>
                  )}
                </>
              ) : (
                <li className="py-3 text-center text-xs text-gray-400">
                  검색 결과가 없습니다
                </li>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      )}

      {/* 수정 하기 버튼 OR 설정 완료 버튼 */}
      {completed ? (
        <ActionButton
          onClick={onToggleCompleted}
          className="w-full p-2 color-white text-md"
        >
          수정 하기
        </ActionButton>
      ) : (
        <ActionButton
          onClick={onToggleCompleted}
          className="w-full p-2 color-white text-md"
        >
          설정 완료
        </ActionButton>
      )}
    </div>
  );
}
