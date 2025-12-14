import React, { useState } from "react";
import ActionButton from "../ui/ActionButton";
import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const MOCK_EXERCISES = ["벤치프레스", "스쿼트", "데드리프트", "숄더프레스", "랫풀다운"];

interface ButtonsProps {
  completed: boolean;
  onToggleCompleted: () => void;
  onSelectExercise: (exerciseName: string) => void;
}

export default function Buttons({ completed, onToggleCompleted, onSelectExercise }: ButtonsProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

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
            className="
    w-[var(--radix-popover-trigger-width)]
    p-1
    rounded-xl
    border
    shadow-md
  "
          >
            <input
              autoFocus
              type="text"
              placeholder="운동 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
      w-full
      mb-2
      px-4
      py-2
      text-sm
      rounded-md
      border
      focus:outline-none
      focus:ring-1
      focus:ring-fitlog-500
    "
            />

            <ul
              className="
      flex flex-col
      max-h-28
      overflow-y-auto
    "
            >
              {MOCK_EXERCISES.filter((exercise) =>
                exercise.toLowerCase().includes(search.toLowerCase())
              ).map((exercise) => (
                <li
                  key={exercise}
                  onClick={() => {
                    onSelectExercise(exercise);
                    setSearch("");
                    setOpen(false);
                  }}
                  className="
          cursor-pointer
          px-4 py-2
          text-sm
          rounded-lg
          hover:bg-fitlog-100
        "
                >
                  {exercise}
                </li>
              ))}
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
