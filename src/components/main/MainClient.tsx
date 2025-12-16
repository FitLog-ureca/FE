"use client";

import { useState } from "react";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";
import GoalList from "@/components/main-right/GoalList";
import Greeting from "@/components/main-right/Greeting";
import RecordList from "@/components/main-right/RecordList";

export default function MainClient() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dayStatus, setDayStatus] = useState<{
    hasTodos: boolean;
    isDone: boolean;
  } | null>(null);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);

    // mock
    if (date === "2025-12-15") {
      setDayStatus({ hasTodos: true, isDone: false });
    } else if (date === "2025-12-16") {
      setDayStatus({ hasTodos: true, isDone: true });
    } else {
      setDayStatus({ hasTodos: false, isDone: false });
    }
  };

  return (
    <div className="md:h-[calc(100vh-72px) grid w-full max-w-6xl grid-cols-1 gap-16 py-24 md:grid-cols-2">
      {/* LEFT */}
      <section className="mt-[72px] flex flex-col items-center">
        <Calendar className="w-full" onSelectDate={handleSelectDate} />
        <FillLevel className="w-full pt-6" />
      </section>

      {/* RIGHT */}
      <section className="flex min-h-0 flex-col">
        <div className="min-h-0 w-full overflow-y-auto md:h-full md:flex-1">
          {!dayStatus && <Greeting username="준형" />}
          {dayStatus && !dayStatus.hasTodos && <Greeting username="준형" />}
          {dayStatus && dayStatus.hasTodos && !dayStatus.isDone && <GoalList />}
          {dayStatus && dayStatus.hasTodos && dayStatus.isDone && <RecordList />}
        </div>
      </section>
    </div>
  );
}
