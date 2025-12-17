"use client";

import { ExerciseItem } from "@/types/exercise";

interface RecordListProps {
  exercises: ExerciseItem[];
  totalCalories: number;
}

export default function RecordList({
  exercises,
  totalCalories,
}: RecordListProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        총 소모 칼로리: {totalCalories} kcal
      </h2>

      {exercises.map((item) => (
        <div key={item.todoId} className="rounded-lg border p-4">
          <p className="font-semibold">{item.exerciseName}</p>
          <p>
            {item.setsNumber}세트 · {item.repsTarget}회 ·{" "}
            {item.weight ?? 0}kg
          </p>
          <p className="text-sm text-gray-500">
            소모: {item.burnedCalories ?? 0} kcal
          </p>
        </div>
      ))}
    </div>
  );
}
