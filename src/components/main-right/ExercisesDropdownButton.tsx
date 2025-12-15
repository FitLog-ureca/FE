import React, { useEffect, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Exercise } from "@/types/todoMain";

const BASE_EXERCISES = ["벤치프레스", "스쿼트", "데드리프트", "숄더프레스", "랫풀다운"];

const MOCK_EXERCISES: Exercise[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `${BASE_EXERCISES[i % BASE_EXERCISES.length]} ${Math.floor(i / BASE_EXERCISES.length) + 1}`,
}));

interface ExercisesDropdownButtonProps {
  completed: boolean;
  onToggleCompleted: () => void;
  onSelectExercise: (exerciseName: string) => void;
}

export default function ExercisesDropdownButton({
  completed,
  onToggleCompleted,
  onSelectExercise,
}: ExercisesDropdownButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const PAGE_SIZE = 20;

  const getFilteredExercises = (keyword: string) =>
    MOCK_EXERCISES.filter((exercise) =>
      exercise.name.toLowerCase().includes(keyword.toLowerCase())
    );

  // const initializePagination = (keyword: string) => {
  //   isLoadingRef.current = false;

  //   const filtered = getFilteredExercises(keyword);
  //   const firstPage = filtered.slice(0, PAGE_SIZE);

  //   setItems(firstPage);
  //   setHasNext(filtered.length > PAGE_SIZE);
  // };

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const items = open ? getFilteredExercises(debouncedSearch).slice(0, PAGE_SIZE) : [];

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

            <ul className="flex flex-col max-h-96 overflow-y-auto">
              {items.map((exercise) => (
                <li
                  key={exercise.id}
                  onClick={() => {
                    onSelectExercise(exercise.name);
                    setSearch("");
                    setOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-sm rounded-lg hover:bg-fitlog-100"
                >
                  {exercise.name}
                </li>
              ))}

              {items.length === 0 && (
                <li className="py-3 text-center text-xs text-gray-400">검색 결과가 없습니다</li>
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
