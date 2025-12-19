"use client";

import RecordSetItem from "@/components/main-right/RecordSetItem";
import { ExerciseRecord } from "@/types/exercise";
import { RecordWorkout } from "@/types/record";

interface RecordSetListProps {
  exercise: ExerciseRecord;
}

export default function RecordSetList({ record  }:  { record: RecordWorkout }) {
  return (
    <section className="w-full rounded-xl p-4 border border-fitlog-beige flex flex-col gap-2 bg-white shadow">
      {/* 운동 제목 + 칼로리 */}
      <div className="flex justify-between items-center">
        <h1 className="text-md font-semibold">{record.exerciseName}</h1>
        <span className="text-sm text-gray-500">
          {record.burnedCalories ?? 0} kcal
        </span>
      </div>

      {/* 세트 목록 */}
      {record.sets.map((set) => (
        <RecordSetItem key={set.todoId} set={set} />
      ))}
    </section>
  );
}
