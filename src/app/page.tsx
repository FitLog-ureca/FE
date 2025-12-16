"use client";

import GoalList from "@/components/main-right/GoalList";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";

export default function MainPage() {
  return (
    <div className="flex justify-center px-28">
      <div className="md:h-[calc(100vh-72px) grid w-full max-w-6xl grid-cols-1 gap-16 py-24 md:grid-cols-2">
        {/* LEFT: Calendar */}
        <section className="mt-[72px] flex flex-col items-center">
          <Calendar
            className="w-full"
            // onSelectDate={(date) => {
            //   console.log("선택한 날짜:", date);
            // }}
          />
          <FillLevel className="w-full pt-6" />
        </section>

        {/* RIGHT: TodoList */}
        <section className="flex min-h-0 flex-col">
          <div className="min-h-0 w-full overflow-y-auto md:h-full md:flex-1">
            <GoalList />
          </div>
        </section>
      </div>
    </div>
  );
}
