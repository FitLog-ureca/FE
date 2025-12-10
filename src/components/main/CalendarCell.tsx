"use client";

import { cn } from "@/lib/cn";
import { workoutIntensity } from "@/components/main/Calendar"; // intensity 데이터 가져오기

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  selectedDate: Date | null;
  today: Date;
  onSelect: (date: Date) => void;
}

export default function CalendarCell({
  date,
  isCurrentMonth,
  selectedDate,
  today,
  onSelect,
}: CalendarCellProps) {
  const dateKey =
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, "0")}-` +
    `${String(date.getDate()).padStart(2, "0")}`;

  const intensity = workoutIntensity[dateKey] || 0;

  const isToday = date.toDateString() === today.toDateString();
  const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();

  return (
    <button
      onClick={() => onSelect(date)}
      className={cn(
        "aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative transition-all cursor-pointer",

        // 🔹 현재 달 vs 이전/다음 달
        isCurrentMonth
          ? "bg-gray-200 text-gray-700 hover:bg-fitlog-200/40"
          : "bg-gray-100 text-gray-400 opacity-80 hover:bg-fitlog-200/40",

        // 🔹 운동 강도 색상
        intensity === 1 && "bg-fitlog-200 text-white",
        intensity === 2 && "bg-fitlog-400 text-white",
        intensity === 3 && "bg-fitlog-500 text-white",

        // 🔹 선택 날짜
        isSelected && "ring-2 ring-fitlog-500 bg-fitlog-100",

        // 🔹 오늘
        isToday && "border-2 border-fitlog-500"
      )}
    >
      {date.getDate()}

      {/* 🔹 오늘 날짜 dot */}
      {/* 🔹 오늘 날짜 dot */}
      {isToday && (
        <div
          className={cn(
            "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
            intensity > 0 ? "bg-white" : "bg-fitlog-500"
          )}
        />
      )}

      {/* 🔹 운동 완료 체크 표시 */}
      {intensity > 0 && (
        <div className="absolute top-1 right-1 text-[10px] font-bold text-white">✔</div>
      )}
    </button>
  );
}
