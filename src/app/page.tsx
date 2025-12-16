"use client";

import GoalList from "@/components/main-right/GoalList";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";
import Greeting from "@/components/main-right/Greeting";
import RecordList from "@/components/main-right/RecordList";
import { useState } from "react";

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dayStatus, setDayStatus] = useState<{
    hasTodos: boolean;
    isDone: boolean;
  } | null>(null);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);

    // 임시 mock 로직
    if (date === "2025-12-15") {
      setDayStatus({ hasTodos: true, isDone: false });
    } else if (date === "2025-12-16") {
      setDayStatus({ hasTodos: true, isDone: true });
    } else {
      setDayStatus({ hasTodos: false, isDone: false });
    }
  };

  return (
    <div className="flex justify-center px-28">
      <div className="md:h-[calc(100vh-72px) grid w-full max-w-6xl grid-cols-1 gap-16 py-24 md:grid-cols-2">
        {/* LEFT: Calendar */}
        <section className="mt-[72px] flex flex-col items-center">
          <Calendar className="w-full" onSelectDate={handleSelectDate} />
          <FillLevel className="w-full pt-6" />
        </section>

        {/* RIGHT: TodoList */}
        <section className="flex min-h-0 flex-col">
          <div className="min-h-0 w-full overflow-y-auto md:h-full md:flex-1">
            {!dayStatus && <Greeting username="준형" />}

            {dayStatus && !dayStatus.hasTodos && <Greeting username="준형" />}

            {dayStatus && dayStatus.hasTodos && !dayStatus.isDone && <GoalList />}

            {dayStatus && dayStatus.hasTodos && dayStatus.isDone && <RecordList />}
          </div>
        </section>
      </div>
    </div>
  );
}
