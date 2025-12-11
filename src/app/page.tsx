"use client"

import GoalList from "@/components/goal/GoalList";
import { Calendar } from "@/components/main/Calendar";
import FillLevel from "@/components/main/FillLevel";
import { useState } from "react";

export default function MainPage() {
  const [selectedDate, SetSelectedDate] = useState<Date | null>(null);
  
  return (
    <div className="flex h-screen justify-center px-28">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-16 py-24 md:grid-cols-2">
        {/* Calendar */}
        <section className="flex flex-col items-center justify-center">
          <Calendar onSelect={(date) => SetSelectedDate(date)} className="h-auto w-full" />
          <FillLevel className="w-full pt-6" />
        </section>

        {/* TodoList */}
        <section className="flex items-center justify-center">
          <GoalList date={selectedDate} />
        </section>
      </div>
    </div>
  );
}
