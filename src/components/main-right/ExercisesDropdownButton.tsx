import React, { useEffect, useRef, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MOCK_EXERCISES = ["벤치프레스", "스쿼트", "데드리프트", "숄더프레스", "랫풀다운"];

interface ExercisesDropdownButtonProps {
  completed: boolean;
  onToggleCompleted: () => void;
  onSelectExercise: (exerciseName: string) => void;
}

export default function ExercisesDropdownButton({ completed, onToggleCompleted, onSelectExercise }: ExercisesDropdownButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const PAGE_SIZE = 20;

  const [page, setPage] = useState<number>(0);
  const [items, setItems] = useState<string[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filtered = MOCK_EXERCISES.filter((exercise) =>
    exercise.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = (force = false) => {
    if (isLoading) return;

    setIsLoading(true);

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const next = filtered.slice(start, end);

    setItems((prev) => [...prev, ...next]);
    setPage((prev) => prev + 1);

    if (end >= filtered.length) {
      setHasNext(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!open) return;

    setItems([]);
    setPage(0);
    setHasNext(true);
    setIsLoading(false);

    // 첫 페이지 로드
    setTimeout(() => loadMore(true), 0);
  }, [open, search]);

  useEffect(() => {
    if (!hasNext) return;
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: loadMoreRef.current.parentElement,
        threshold: 1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNext]);

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
            className="w-[var(--radix-popover-trigger-width)] p-1 rounded-xl border shadow-md"
          >
            <input
              autoFocus
              type="text"
              placeholder="운동 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-2 px-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-1 focus:ring-fitlog-500"
            />

            <ul
              className="flex flex-col max-h-28 overflow-y-auto"
            >
              {items.map((exercise) => (
                <li
                  key={exercise}
                  onClick={() => {
                    onSelectExercise(exercise);
                    setSearch("");
                    setOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-sm rounded-lg hover:bg-fitlog-100"
                >
                  {exercise}
                </li>
              ))}

              {hasNext && (
                <div ref={loadMoreRef} className="py-2 text-center text-xs text-gray-400">
                  불러오는 중...
                </div>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      )}

      {/* 수정 하기 버튼 OR 설정 완료 버튼 */}
      {completed ? (
        <ActionButton onClick={onToggleCompleted} className="w-full p-2 color-white text-md">
          수정 하기
        </ActionButton>
      ) : (
        <ActionButton onClick={onToggleCompleted} className="w-full p-2 color-white text-md">
          설정 완료
        </ActionButton>
      )}
    </div>
  );
}
