"use client";

import { useMemo, useState } from "react";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";
import GoalList from "@/components/main-right/GoalList";
import Greeting from "@/components/main-right/Greeting";
import RecordList from "@/components/main-right/RecordList";
import { useExercisesByDate } from "@/lib/tanstack/query/exerciseRecord";
import { GoalType } from "@/types/todoMain";
import { isToday, isPast, isFuture } from "@/lib/date";
import { RecordWorkout } from "@/types/record";

export default function MainClient() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data, isLoading, error } = useExercisesByDate(selectedDate);

  /* RIGHT 화면 분기 조건 */
  const isTodaySelected = selectedDate && isToday(selectedDate);
  const isPastSelected = selectedDate && isPast(selectedDate);
  const isFutureSelected = selectedDate && isFuture(selectedDate);

  /** 서버 데이터 → GoalList용 데이터 변환 */
  const goalModels: GoalType[] = useMemo(() => {
    if (!data || data.isDone) return [];

    const map = new Map<number, GoalType>();

    data.exercises.forEach((item) => {
      // 기준: workoutId
      if (!map.has(item.workoutId)) {
        map.set(item.workoutId, {
          id: item.workoutId, // 이후 세트 추가 기준
          exercise: item.exerciseName,
          sets: [],
        });
      }

      map.get(item.workoutId)!.sets.push({
        id: item.todoId, // 세트 단위 id
        setsNumber: item.setsNumber,
        repsTarget: item.repsTarget ?? "",
        weight: item.weight ?? "",
      });
    });

    return Array.from(map.values());
  }, [data]);

  const recordModels: RecordWorkout[] = useMemo(() => {
    if (!data) return [];

    const map = new Map<number, RecordWorkout>();

    data.exercises.forEach((item) => {
      if (!map.has(item.workoutId)) {
        map.set(item.workoutId, {
          workoutId: item.workoutId,
          exerciseName: item.exerciseName,
          burnedCalories: item.burnedCalories ?? null,
          sets: [],
        });
      }

      map.get(item.workoutId)!.sets.push({
        todoId: item.todoId,
        setsNumber: item.setsNumber,
        repsTarget: item.repsTarget,
        weight: item.weight ?? null,
        isCompleted: item.isCompleted,
      });
    });

    return Array.from(map.values());
  }, [data]);

  return (
    <div className="md:h-[calc(100vh-72px)] grid w-full max-w-6xl grid-cols-1 gap-16 py-26 md:grid-cols-2">
      {/* LEFT */}
      <section className="mt-[72px] flex flex-col items-center">
        <Calendar className="w-full" onSelectDate={setSelectedDate} />
        <FillLevel className="w-full mt-6" />
      </section>

      {/* RIGHT */}
      <section className="flex min-h-0 flex-col">
        <div className="min-h-0 w-full overflow-y-auto md:h-full md:flex-1">
          {/* 날짜 선택 안 했을 때만 */}
          {!selectedDate && !isLoading && !error && <Greeting />}

          {/* 날짜 선택 후 로딩 */}
          {selectedDate && isLoading && (
            <p className="mt-10 text-center text-gray-400">운동 정보를 불러오는 중...</p>
          )}

          {/* 날짜 선택 후 에러 */}
          {selectedDate && error && (
            <p className="mt-10 text-center text-red-400">운동 정보를 불러오지 못했어요.</p>
          )}

          {/* [과거 날짜] -> RecordList */}
          {selectedDate && data && isPastSelected && (
            <RecordList
              records={recordModels}
              totalCalories={data.totalCalories}
              selectedDate={selectedDate}
            />
          )}

          {/* [오늘 날짜 + 운동 미완료] -> GoalList (운동 시작 버튼 O) */}
          {selectedDate && data && isTodaySelected && !data.isDone && (
            <GoalList key={selectedDate} goals={goalModels} selectedDate={selectedDate} />
          )}

          {/* [오늘 날짜 + 운동 완료] -> RecordList */}
          {selectedDate && data && isTodaySelected && data.isDone && (
            <RecordList
              records={recordModels}
              totalCalories={data.totalCalories}
              selectedDate={selectedDate}
            />
          )}

          {/* [미래 날짜] -> GoalList (운동 시작 버튼 X) */}
          {selectedDate && data && isFutureSelected && (
            <GoalList key={selectedDate} goals={goalModels} selectedDate={selectedDate} />
          )}
        </div>
      </section>
    </div>
  );
}
