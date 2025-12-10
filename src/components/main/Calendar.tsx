"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import YearMonthPicker from "@/components/main/YearMonthPicker";
import CalendarCell from "@/components/main/CalendarCell";

// 운동 강도 Mock 데이터
export const workoutIntensity: Record<string, number> = {
  "2025-11-30": 3,
  "2025-12-01": 3,
  "2025-12-02": 2,
  "2025-12-03": 1,
  "2025-12-04": 3,
  "2025-12-05": 2,
  "2025-12-06": 3,
  "2025-12-07": 1,
  "2025-12-09": 3,
};

export function Calendar({ className }: { className?: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  /* 5주 / 6주 판단 */
  const totalCells = startDay + daysInMonth;
  const cellCount = totalCells <= 35 ? 35 : 42;

  const cells = [];

  /* 앞쪽 빈 칸 (이전달) */
  for (let i = 0; i < startDay; i++) {
    const prevDate = new Date(year, month, i - startDay + 1);
    cells.push(
      <CalendarCell
        key={`prev-${i}`}
        date={prevDate}
        isCurrentMonth={false}
        selectedDate={selectedDate}
        today={today}
        onSelect={setSelectedDate}
      />
    );
  }

  /* 이번 달 날짜 */
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push(
      <CalendarCell
        key={day}
        date={date}
        isCurrentMonth={true}
        selectedDate={selectedDate}
        today={today}
        onSelect={setSelectedDate}
      />
    );
  }

  /* 뒤쪽 칸 (다음달) */
  const remaining = cellCount - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = new Date(year, month + 1, i);
    cells.push(
      <CalendarCell
        key={`next-${i}`}
        date={nextDate}
        isCurrentMonth={false}
        selectedDate={selectedDate}
        today={today}
        onSelect={setSelectedDate}
      />
    );
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("w-full rounded-xl bg-white p-6 shadow border border-gray-200", className)}>
      {/* 상단 월 이동 */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
          className={cn(
            "group flex h-10 w-10 items-center justify-center rounded-full",
            "hover:bg-fitlog-100 transition-colors"
          )}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-fitlog-500" />
        </button>

        <YearMonthPicker
          year={year}
          month={month}
          onSelect={(y, m) => setCurrentMonth(new Date(y, m, 1))}
        />

        <button
          onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
          className={cn(
            "group flex h-10 w-10 items-center justify-center rounded-full ",
            "hover:bg-fitlog-100 transition-colors"
          )}
        >
          <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-fitlog-500" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-2">{cells}</div>
    </div>
  );
}
