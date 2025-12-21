"use client";

import RecordHeader from "@/components/main-right/RecordHeader";
import RecordSetList from "@/components/main-right/RecordSetList";
import { RecordWorkout } from "@/types/record";

interface RecordListProps {
  records: RecordWorkout[];
  totalCalories: number;
  selectedDate?: string;
  isDone: boolean;
}

export default function RecordList({
  records,
  totalCalories,
  selectedDate,
  isDone,
}: RecordListProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <RecordHeader selectedDate={selectedDate} totalCalories={totalCalories} isDone={isDone} />

      {records.map((record) => (
        <RecordSetList key={record.workoutId} record={record} />
      ))}
    </div>
  );
}
