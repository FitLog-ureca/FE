"use client";

import { ChevronRight } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import Checkbox from "@/components/ui/CheckBox";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useAppDispatch } from "@/store/redux/hooks";
import { todoSetCompleted } from "@/store/redux/features/todos/todoSlice";
import { startRest } from "@/store/redux/features/todos/timerSlice";

interface TodoSetRowProps {
  todoId: number;
  setId: number;
  setNumber: number;
  isCompleted: boolean;
}

export default function TodoSetRow({
  setNumber,
  isCompleted,
  todoId,
  setId,
}: TodoSetRowProps) {
  const [isResting, setIsResting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleCompleted = () => {
    dispatch(todoSetCompleted({ todoId, setId }));
  };

  const handleStartResting = () => {
    dispatch(startRest(0));
    setIsResting(true);
  };

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <Checkbox checked={isCompleted} onChange={handleCompleted} />
      <p className="font-bold w-12">Set {setNumber}</p>
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
        10
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
        0
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
        -
      </div>
      초
      <ActionButton
        onClick={handleStartResting}
        disabled={!isCompleted || isResting}
        className={`flex items-center justify-center w-17 h-9 rounded-xl shadow-fitlog-btn-sm
          ${
            isResting
              ? "bg-fitlog-500 text-white hover:bg-fitlog-500 cursor-auto"
              : "bg-white border border-fitlog-500/60 text-fitlog-500 hover:bg-fitlog-100"
          }
          ${!isCompleted ? "cursor-not-allowed  hover:bg-white! " : ""}
        `}
      >
        휴식
        <ChevronRight className="w-3 ml-1" />
      </ActionButton>
    </div>
  );
}
