"use client";

import { ChevronRight } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import Checkbox from "@/components/ui/CheckBox";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import {
  resetRestTime,
  toggleTodoCompleted,
  updateTodoCompleted,
} from "@/store/redux/features/todos/todoSlice";
import { useTodoComplete } from "@/lib/tanstack/mutation/todoComplete";
import { TodoSetRowResponse } from "@/types/todos";
import { startRest } from "@/store/redux/features/todos/timerSlice";
import { useRestTimeReset } from "@/lib/tanstack/mutation/rest";

export default function TodoSetRow({
  todoId,
  setsNumber,
  repsTarget,
  weight,
  restTime,
  isCompleted,
}: TodoSetRowResponse) {
  const [isResting, setIsResting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { mutate: completeTodo, isPending } = useTodoComplete();
  const { mutate: resetRestTimeApi } = useRestTimeReset();

  // 휴식 버튼 비활성화 조건
  const isRestDisabled = !isCompleted || isResting || restTime !== null;

  // 타이머 상태 확인
  const timerState = useAppSelector((state) => state.timer);

  // 타이머가 종료되면 (stopRest 호출되면) isResting 상태 해제
  useEffect(() => {
    if (!timerState.isActive && timerState.todoId === null && isResting) {
      setIsResting(false);
    }
  }, [timerState.isActive, timerState.todoId, isResting]);

  useEffect(() => {
    if (!isCompleted) setIsResting(false);
  }, [isCompleted]);

  // 완료 토글
  const handleCompleted = () => {
    if (isPending) return;
    const wasCompleted = isCompleted;
    dispatch(toggleTodoCompleted(todoId));

    completeTodo(todoId, {
      onSuccess: (response) => {
        if (response?.data) {
          dispatch(
            updateTodoCompleted({
              todoId: response.data.todoId,
              isCompleted: response.data.isCompleted,
            })
          );

          // 완료 해제 시 (isCompleted :true -> false) restTime도 초기화
          if (wasCompleted && !response.data.isCompleted && restTime !== null) {
            resetRestTimeApi(todoId, {
              onSuccess: () => {
                dispatch(resetRestTime(todoId));
              },
              onError: (error) => {
                console.error("휴식 시간 초기화 실패:", error);
              },
            });
          }
        }
      },
      onError: (error) => {
        console.error("세트 완료 실패:", error);
        dispatch(toggleTodoCompleted(todoId));
        alert("세트 완료에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const handleStartResting = () => {
    const duration = 0;
    dispatch(startRest({ duration, todoId }));
    setIsResting(true);
  };

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <Checkbox
        checked={isCompleted}
        onChange={handleCompleted}
        disabled={isPending}
      />
      <p className="font-bold w-12">Set {setsNumber}</p>
      <div
        className={`w-23 h-9 px-3 text-sm rounded-xl border shadow-fitlog-btn-sm
          flex items-center justify-center
          ${
            isCompleted
              ? "border-fitlog-beige bg-[#EEEEEE] text-gray-400 cursor-auto"
              : "border-fitlog-beige text-fitlog-text"
          }
        `}
      >
        {repsTarget}
      </div>
      회
      <div
        className={`w-23 h-9 px-3 text-sm rounded-xl border shadow-fitlog-btn-sm
          flex items-center justify-center
          ${
            isCompleted
              ? "border-fitlog-beige bg-[#EEEEEE] text-gray-400 cursor-auto"
              : "border-fitlog-beige text-fitlog-text"
          }
        `}
      >
        {weight}
      </div>
      kg
      <div
        className={`w-15 h-9 px-3 text-sm rounded-xl border shadow-fitlog-btn-sm
          flex items-center justify-center
          ${
            isCompleted
              ? "border-fitlog-beige bg-[#EEEEEE] text-gray-400 cursor-auto"
              : "border-fitlog-beige text-fitlog-text"
          }
        `}
      >
        {restTime ?? "-"}
      </div>
      초
      <ActionButton
        onClick={handleStartResting}
        disabled={isRestDisabled}
        className={`flex items-center justify-center w-17 h-9 rounded-xl shadow-fitlog-btn-sm
          ${
            isResting || restTime !== null
              ? "bg-fitlog-500 text-white hover:bg-fitlog-500 cursor-not-allowed"
              : "bg-white border border-fitlog-500/60 text-fitlog-500 hover:bg-fitlog-100"
          }
          ${!isCompleted ? "cursor-not-allowed hover:bg-white!" : ""}
        `}
      >
        휴식
        <ChevronRight className="w-3 ml-1" />
      </ActionButton>
    </div>
  );
}
