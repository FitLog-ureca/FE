"use client";

import { Play, Square, RotateCcw, Pause } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import { useState, useRef, useEffect } from "react";
import FinishButton from "@/components/todos/FinishButton";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { stopRest } from "@/store/redux/features/todos/timerSlice";

export default function Timer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [records, setRecords] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const { isActive, duration } = useAppSelector((state) => state.timer);

  useEffect(() => {
    if (!isActive) return;
    setTime(duration);
    setIsRunning(false);
  }, [isActive, duration]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    if (time > 0) {
      const seconds = Math.floor(time / 1000);
      setRecords((prev) => [...prev, seconds]);
      console.log(records);
      setTime(0);
      setIsRunning(false);
    }
    dispatch(stopRest());
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
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
              disabled={!isActive}
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
              disabled={!isActive}
              className="flex w-full items-center justify-center py-2.5 bg-fitlog-400 shadow-fitlog-btn-sm hover:bg-[#CC595F] disabled:bg-fitlog-disabled disabled:cursor-not-allowed disabled:text-white"
            >
              <Square className="mr-2 h-4 w-4" />
              기록
            </ActionButton>
            <ActionButton
              onClick={handleReset}
              // disabled={!isActive}
              className="flex w-full items-center justify-center py-2.5 bg-white border border-fitlog-beige text-fitlog-text shadow-fitlog-btn-sm hover:bg-[#F1F1F1] disabled:bg-fitlog-disabled disabled:cursor-not-allowed disabled:text-white"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              초기화
            </ActionButton>
          </div>
        </div>
      </div>
      <FinishButton />
    </div>
  );
}
