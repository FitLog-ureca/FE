"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

// 운동 강도 Mock 데이터
const workoutIntensity: Record<string, number> = {
  "2025-01-15": 3,
  "2025-01-16": 2,
  "2025-01-17": 1,
  "2025-01-18": 3,
  "2025-01-20": 2,
  "2025-01-22": 3,
  "2025-01-23": 1,
  "2025-01-25": 2,
  "2025-01-27": 3,
  "2025-01-28": 2,
};

export function Calendar({ className }: { className?: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay(); // 1일이 무슨 요일인지 (0~6)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

//   const days: JSX.Element[] = [];
  const days = [];

  /** 🔹 앞 빈칸 렌더링 */
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  /** 🔹 달 날짜 렌더링 */
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = date.toISOString().split("T")[0];

    const intensity = workoutIntensity[dateKey] || 0;
    const isToday = date.toDateString() === today.toDateString();
    const isSelected =
      selectedDate && date.toDateString() === selectedDate.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(date)}
        className={cn(
          "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all relative shadow-sm",

          // 기본 색상
          "bg-gray-100 text-gray-600 hover:bg-fitlog-200/40",

          // 운동 강도 색상
          intensity === 1 && "bg-fitlog-200 text-white",
          intensity === 2 && "bg-fitlog-400 text-white",
          intensity === 3 && "bg-fitlog-500 text-white",

          // 선택 날짜 강조
          isSelected && "ring-2 ring-fitlog-500 bg-fitlog-100",

          // 오늘 날짜 강조
          isToday && "border-2 border-fitlog-second-500"
        )}
      >
        {day}

        {/* 오늘 날짜 dot 표시 */}
        {isToday && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-fitlog-second-500 rounded-full" />
        )}
      </button>
    );
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("w-full bg-white rounded-xl p-6 shadow border border-gray-200,  overflow-y-auto", className)}>
      {/* 🔥 상단 월 이동 UI */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() =>
            setCurrentMonth(new Date(year, month - 1, 1))
          }
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 hover:text-fitlog-500" />
        </button>

        <p className="text-lg font-semibold text-gray-800">
          {year}년 {month + 1}월
        </p>

        <button
          onClick={() =>
            setCurrentMonth(new Date(year, month + 1, 1))
          }
        >
          <ChevronRight className="h-5 w-5 text-gray-600 hover:text-fitlog-500" />
        </button>
      </div>

      {/* 🔥 요일 라벨 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 🔥 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  );
}
