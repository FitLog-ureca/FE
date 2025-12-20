"use client";

import ActionButton from "@/components/ui/ActionButton";

interface RecordHeaderProps {
  selectedDate?: string;
  totalCalories: number;
  isDone: boolean;
}

export default function RecordHeader({ selectedDate, totalCalories, isDone }: RecordHeaderProps) {
  const date = selectedDate ? new Date(selectedDate) : null;

  return (
    <div className="flex justify-between flex-col gap-6">
      <section className="flex justify-between items-center px-2">
        <div className="flex justify-center items-center gap-4">
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

        <div className="flex gap-4">
          <ActionButton
            className={`p-3 text-md  cursor-pointer pointer-events-none ${isDone ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
          >
            운동 완료!
          </ActionButton>
          {/* <ActionButton className="p-3 text-md bg-white text-fitlog-500 hover:bg-fitlog-500 hover:text-white border-fitlog-500">
            운동 다시 하기
          </ActionButton> */}
        </div>
      </section>

      <section className="w-full flex gap-2 rounded-xl p-4 border border-fitlog-beige bg-white shadow-fitlog-btn-sm">
        <span className="font-semibold">총 소모 칼로리</span>
        <span>-</span>
        <span className="font-semibold text-fitlog-500">{totalCalories}</span>
        <span>kcal</span>
      </section>
    </div>
  );
}
