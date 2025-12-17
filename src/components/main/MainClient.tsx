"use client";

import { useState } from "react";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";
import GoalList from "@/components/main-right/GoalList";
import Greeting from "@/components/main-right/Greeting";
import RecordList from "@/components/main-right/RecordList";
import { useExercisesByDate } from "@/lib/tanstack/query/exerciseRecord";

export default function MainClient() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data, isLoading, error } = useExercisesByDate(selectedDate);

  const hasTodos = data && data.exercises.length > 0;
  const isDone = data?.isDone;

  return (
    <div className="md:h-[calc(100vh-72px)] grid w-full max-w-6xl grid-cols-1 gap-16 py-24 md:grid-cols-2">
      {/* LEFT */}
      <section className="mt-[72px] flex flex-col items-center">
        <Calendar className="w-full" onSelectDate={setSelectedDate} />
        <FillLevel className="w-full pt-6" />
      </section>

      {/* RIGHT */}
      <section className="flex min-h-0 flex-col">
        <div className="min-h-0 w-full overflow-y-auto md:h-full md:flex-1">
          {!data && !isLoading && !error && <Greeting username="준형" />}

          {isLoading && (
            <p className="mt-10 text-center text-gray-400">
              운동 정보를 불러오는 중...
            </p>
          )}

          {error && (
            <p className="mt-10 text-center text-red-400">
              운동 정보를 불러오지 못했어요.
            </p>
          )}

          {data && !hasTodos && <Greeting username="준형" />}

          {data && hasTodos && !isDone && <GoalList />}

          {data && hasTodos && isDone && (
            <RecordList
              exercises={data.exercises}
              totalCalories={data.totalCalories}
            />
          )}
        </div>
      </section>
    </div>
  );
}
