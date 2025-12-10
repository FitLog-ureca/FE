"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface YearMonthPickerProps {
  year: number;
  month: number;
  onSelect: (y: number, m: number) => void;
}

export default function YearMonthPicker({ year, month, onSelect }: YearMonthPickerProps) {
  const [open, setOpen] = useState(false);

  const years = Array.from({ length: 40 }, (_, i) => year - 20 + i);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="text-lg font-semibold hover:text-fitlog-500 cursor-pointer">
          {year}년 {month + 1}월
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="top"
        sideOffset={10}
        avoidCollisions={false}
        className="w-110 p-3 rounded-xl flex shadow-lg"
      >
        {/* flex 컨테이너 */}
        <div className="flex gap-6 relative">
          {/* 🔹 연도 선택 영역 */}
          <div className="w-25 h-40 overflow-y-auto border rounded-lg p-2">
            {years.map((y) => (
              <div
                key={y}
                onClick={() => {
                  onSelect(y, month);
                  setOpen(false);
                }}
                className={cn(
                  "cursor-pointer text-center py-2 rounded hover:bg-fitlog-100",
                  y === year && "bg-fitlog-500 text-white font-semibold"
                )}
              >
                {y}년
              </div>
            ))}
          </div>

          {/* 🔹 월 선택 영역 */}
          <div className="grid grid-cols-4 gap-2 w-65">
            {Array.from({ length: 12 }, (_, m) => (
              <button
                key={m}
                onClick={() => {
                  onSelect(year, m);
                  setOpen(false);
                }}
                className={cn(
                  "py-2 rounded hover:bg-fitlog-100 text-center hover:cursor-pointer",
                  m === month && "bg-fitlog-500 text-white font-semibold"
                )}
              >
                {m + 1}월
              </button>
            ))}
          </div>

          {/* X 버튼 */}
          {/* X 버튼 - 월 선택 영역의 오른쪽 위에 고정 */}
          <button onClick={() => setOpen(false)} className="absolute top-0 -right-7 p-1">
            <X className="w-5 h-5 text-gray-600 hover:text-fitlog-500 hover:cursor-pointer" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
