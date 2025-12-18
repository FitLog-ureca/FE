"use client";

import { Play, Square, RotateCcw, Pause } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import { useState, useRef, useEffect } from "react";
import FinishButton from "@/components/todos/FinishButton";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { clearTimer, stopRest } from "@/store/redux/features/todos/timerSlice";
import {
  useRestTimeRecord,
  useRestTimeReset,
} from "@/lib/tanstack/mutation/rest";
import {
  resetRestTime,
  updateRestTime,
} from "@/store/redux/features/todos/todoSlice";

interface TimerProps {
  currentTodoId?: number;
  date: string;
}

export default function Timer({ currentTodoId, date }: TimerProps) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [records, setRecords] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const { isActive, duration, todoId } = useAppSelector((state) => state.timer);

  // 이 타이머가 활성화되어야 하는지 확인
  const isThisTimerActive =
    isActive && (!currentTodoId || todoId === currentTodoId);

  const { mutate: recordRestTime, isPending } = useRestTimeRecord();
  const { mutate: resetRestTimeApi, isPending: isResetting } =
    useRestTimeReset();

  useEffect(() => {
    if (!isThisTimerActive) return;
    setTime(duration);
    setIsRunning(false);
  }, [isThisTimerActive, duration]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 시간
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleRunning = () => {
    setIsRunning(!isRunning);
  };

  const handleRecord = () => {
    if (time > 0 && todoId) {
      const seconds = Math.floor(time / 1000);

      recordRestTime(
        { todoId, restTime: seconds },
        {
          onSuccess: () => {
            setRecords((prev) => [...prev, seconds]);
            dispatch(
              updateRestTime({
                todoId,
                restTime: seconds,
              })
            );
            setTime(0);
            setIsRunning(false);
            dispatch(stopRest());
          },
          onError: (error) => {
            console.error("휴식 시간 기록 실패:", error);
          },
        }
      );
    }
  };

  const handleReset = () => {
    if (todoId) {
      resetRestTimeApi(todoId, {
        onSuccess: () => {
          // Redux에서 restTime 초기화 (null)
          dispatch(resetRestTime(todoId));
          setIsRunning(false);
          setTime(0);
          dispatch(clearTimer()); // todoId도 null로 초기화
        },
        onError: (error) => {
          console.error("휴식 시간 초기화 실패:", error);
        },
      });
    } else {
      // todoId가 없으면 그냥 로컬 타이머만 초기화
      setIsRunning(false);
      setTime(0);
    }
  };

  return (
    <div className="static lg:fixed lg:top-1/2 lg:-translate-y-1/2">
      <div className="flex h-89 items-center rounded-xl border border-fitlog-beige bg-white p-10">
        <div className="w-114">
          <div className="rounded-xl bg-gray-100 py-14 text-center">
            <p className="text-md font-bold text-gray-500">Rest Time</p>
            <div className="mt-5 items-center justify-center font-mono text-5xl font-bold text-gray-400">
              {formatTime(time)}
            </div>
          </div>
          <div className="mt-8" />
          <div className="grid grid-cols-3 gap-3">
            <ActionButton
              onClick={handleRunning}
              disabled={!isThisTimerActive}
              className="flex w-full items-center justify-center py-2.5 shadow-fitlog-btn-sm disabled:bg-fitlog-disabled disabled:cursor-not-allowed disabled:text-white"
            >
              {!isRunning ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  시작
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  일시정지
                </>
              )}
            </ActionButton>
            <ActionButton
              onClick={handleRecord}
              disabled={!isThisTimerActive || isPending}
              className="flex w-full items-center justify-center py-2.5 bg-fitlog-400 shadow-fitlog-btn-sm hover:bg-[#CC595F] disabled:bg-fitlog-disabled disabled:cursor-not-allowed disabled:text-white"
            >
              <Square className="mr-2 h-4 w-4" />
              {isPending ? "기록 중..." : "기록"}
            </ActionButton>
            <ActionButton
              onClick={handleReset}
              disabled={isResetting}
              className="flex w-full items-center justify-center py-2.5 bg-white border border-fitlog-beige text-fitlog-text shadow-fitlog-btn-sm hover:bg-[#F1F1F1] disabled:bg-fitlog-disabled disabled:cursor-not-allowed disabled:text-white"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {isResetting ? "초기화 중..." : "초기화"}
            </ActionButton>
          </div>
        </div>
      </div>
      <FinishButton date={date} />
    </div>
  );
}
