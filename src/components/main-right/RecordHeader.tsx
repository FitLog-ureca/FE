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

      <section className="w-full flex justify-between items-center gap-2 rounded-xl p-4 border border-fitlog-beige bg-white shadow-fitlog-btn-sm relative">
        <div className="flex gap-2">
          <span className="font-semibold">총 소모 칼로리</span>
          <span>-</span>
          <span className="font-semibold text-fitlog-500">{totalCalories.toFixed(1)}</span>
          <span>kcal</span>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">※</span>
            <span className="">{""}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">해당 칼로리는 추정치입니다.</span>
            <span className="text-xs text-gray-400">
              개인의 체중·운동 강도에 따라 차이가 있을 수 있습니다.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
