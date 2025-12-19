"use client";

import ActionButton from "@/components/ui/ActionButton";

interface RecordHeaderProps {
  selectedDate?: string;
  totalCalories: number;
}

export default function RecordHeader({
  selectedDate,
  totalCalories,
}: RecordHeaderProps) {
  const date = selectedDate ? new Date(selectedDate) : null;

  return (
    <div className="w-full flex flex-col gap-2 px-2">
      {/* 1행 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {date && (
            <h1 className="text-xl font-semibold">
              {date.toLocaleString("ko-KR", {
                month: "long",
                day: "numeric",
              })}
            </h1>
          )}
          <h1 className="text-xl font-semibold">운동 기록</h1>
        </div>

        <div className="flex gap-2">
          <ActionButton disabled>운동 완료!</ActionButton>
          <ActionButton variant="secondary">운동 다시 하기</ActionButton>
        </div>
      </div>

      {/* 2행 */}
      <div className="text-sm text-gray-500">
        총 소모 칼로리{" "}
        <span className="font-semibold text-gray-700">
          {totalCalories} kcal
        </span>
      </div>
    </div>
  );
}
