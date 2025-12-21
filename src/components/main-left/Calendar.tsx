"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import YearMonthPicker from "@/components/main-left/YearMonthPicker";
import CalendarCell from "@/components/main-left/CalendarCell";
import { CalendarProps } from "@/types/calendar";
import { useTodoMonthlySummary } from "@/lib/tanstack/query/todoMonthlySummary";
import { calcIntensity } from "@/lib/calendarIntensity";

export function Calendar({ className, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth(); // 0~11 (UI / Date 계산용)
  const apiMonth = monthIndex + 1; // 1~12 (API 요청용)

  const { data: summary } = useTodoMonthlySummary(year, apiMonth);

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // dateKey → intensity 맵
  const intensityMap = new Map<string, number>();

  summary?.forEach((item) => {
    intensityMap.set(item.date, calcIntensity(item.completedSets, item.totalSets));
  });

  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  /* 날짜 선택 핸들러 */
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(formatDate(date));
  };

  /* 5주 / 6주 판단 */
  const totalCells = startDay + daysInMonth;
  const cellCount = totalCells <= 35 ? 35 : 42;

  const cells = [];

  /* 앞쪽 빈 칸 (이전달) */
  for (let i = 0; i < startDay; i++) {
    const prevDate = new Date(year, monthIndex, i - startDay + 1);
    const dateKey = formatDate(prevDate);

    cells.push(
      <CalendarCell
        key={`prev-${i}`}
        date={prevDate}
        isCurrentMonth={false}
        selectedDate={selectedDate}
        today={today}
        onSelect={handleSelectDate}
        intensity={intensityMap.get(dateKey) ?? 0}
      />
    );
  }

  /* 이번 달 날짜 */
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    const dateKey = formatDate(date);
    // const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    cells.push(
      <CalendarCell
        key={day}
        date={date}
        isCurrentMonth={true}
        selectedDate={selectedDate}
        today={today}
        onSelect={handleSelectDate}
        intensity={intensityMap.get(dateKey) ?? 0}
      />
    );
  }

  /* 뒤쪽 칸 (다음달) */
  const remaining = cellCount - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = new Date(year, monthIndex + 1, i);
    const dateKey = formatDate(nextDate);

    cells.push(
      <CalendarCell
        key={`next-${i}`}
        date={nextDate}
        isCurrentMonth={false}
        selectedDate={selectedDate}
        today={today}
        onSelect={handleSelectDate}
        intensity={intensityMap.get(dateKey) ?? 0}
      />
    );
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className={cn("w-full rounded-xl bg-white p-6 shadow border border-fitlog-beige", className)}
    >
      {/* 상단 월 이동 */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(new Date(year, monthIndex - 1, 1))}
          className={cn(
            "group flex h-10 w-10 items-center justify-center rounded-full",
            "hover:bg-fitlog-100 transition-colors"
          )}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-fitlog-500" />
        </button>

        <YearMonthPicker
          year={year}
          month={monthIndex}
          onSelect={(y, m) => setCurrentMonth(new Date(y, m, 1))}
        />

        <button
          onClick={() => setCurrentMonth(new Date(year, monthIndex + 1, 1))}
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
