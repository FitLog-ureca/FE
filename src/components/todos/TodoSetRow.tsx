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

      <Input
        disabled={isCompleted}
        className="w-31 h-9 rounded-xl px-3 shadow-fitlog-btn-sm"
        placeholder="10회"
      />
      <Input
        disabled={isCompleted}
        className="w-31 h-9 rounded-xl px-3 shadow-fitlog-btn-sm"
        placeholder="0kg"
      />
      <Input
        disabled={isCompleted}
        className="w-19 h-9 rounded-xl px-3 text-center shadow-fitlog-btn-sm"
        placeholder="-"
      />

      <ActionButton
        onClick={handleStartResting}
        disabled={!isCompleted || isResting}
        className={`flex items-center justify-center w-17 h-9 rounded-xl shadow-fitlog-btn-sm
          ${
            isResting
              ? "bg-fitlog-500 text-white cursor-default"
              : "bg-white border border-fitlog-500/60 text-fitlog-500 hover:bg-fitlog-100"
          }
          ${!isCompleted ? "" : ""}
        `}
      >
        휴식
        <ChevronRight className="w-3 ml-1" />
      </ActionButton>
    </div>
  );
}
