"use client";

import { useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import CloseButton from "../ui/CloseButton";

interface YearMonthPickerProps {
  year: number;
  month: number;
  onSelect: (selectedYear: number, selectedMonth: number) => void;
}

export default function YearMonthPicker({ year, month, onSelect }: YearMonthPickerProps) {
  const [open, setOpen] = useState(false);
  const yearListRef = useRef<HTMLDivElement | null>(null);
  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

  useEffect(() => {
    if (!open) return;

    setTimeout(() => {
      if (!yearListRef.current) return;

      const container = yearListRef.current;
      const el = container.querySelector<HTMLDivElement>(`[data-year="${year}"]`);
      if (!el) return;

      const offset = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;

      container.scrollTo({
        top: offset,
        behavior: "auto",
      });
    }, 0);
  }, [open, year]);

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
          {/* 연도 선택 */}
          <div className="w-25 h-40 overflow-y-auto border rounded-lg p-2" ref={yearListRef}>
            {years.map((y) => (
              <div
                key={y}
                data-year={y}
                onClick={() => {
                  onSelect(y, month); // y → selectedYear
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

          {/* 월 선택 */}
          <div className="grid grid-cols-4 gap-2 w-65">
            {Array.from({ length: 12 }, (_, m) => (
              <button
                key={m}
                onClick={() => {
                  onSelect(year, m); // m → selectedMonth
                  setOpen(false);
                }}
                className={cn(
                  "py-2 rounded hover:bg-fitlog-100 text-center cursor-pointer",
                  m === month && "bg-fitlog-500 text-white font-semibold"
                )}
              >
                {m + 1}월
              </button>
            ))}
          </div>

          {/* X 버튼 */}
          <button onClick={() => setOpen(false)} className="absolute top-0 -right-7 p-1">
            <CloseButton className="w-5 h-5 text-gray-600 hover:text-fitlog-500 cursor-pointer" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
