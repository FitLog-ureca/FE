"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, format, startOfWeek, addDays } from "date-fns";
import { cn } from "@/lib/cn";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  const renderDays = () => {
    const start = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const days = [];

    for (let i = 0; i < 42; i++) {
      const day = addDays(start, i);
      const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
      const isSelected = selected && day.toDateString() === selected.toDateString();
      const isToday = new Date().toDateString() === day.toDateString();

      days.push(
        <button
          key={i}
          onClick={() => onSelect?.(day)}
          className={cn(
            "flex items-center justify-center rounded-md text-sm h-10 w-10 transition-all",
            isCurrentMonth ? "text-black" : "text-gray-300",
            isSelected && "bg-fitlog-500 text-white",
            isToday && "border border-fitlog-500",
            "hover:bg-fitlog-200/40"
          )}
        >
          {day.getDate()}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={cn("p-4 border rounded-xl bg-white shadow", className)}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={handlePrevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        <p className="font-medium">
          {format(currentMonth, "yyyy MMM")}
        </p>

        <button onClick={handleNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((d) => (
          <p key={d} className="text-center text-xs font-semibold text-gray-500">
            {d}
          </p>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
}
