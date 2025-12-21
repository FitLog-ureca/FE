import React, { useState } from "react";
import Input from "@/components/ui/Input";
import CloseButton from "@/components/ui/CloseButton";
import { SetItemProps } from "@/types/todoMain";

export default function SetItem({
  set,
  completed,
  goalId,
  onRemoveSet,
  onUpdateSet,
}: SetItemProps) {
  const [reps, setReps] = useState<number | "">(set.repsTarget);
  const [weight, setWeight] = useState<number | "">(set.weight);

  return (
    <div className="flex justify-between items-center gap-4">
      {/* 세트 번호 */}
      <span className="text-md w-10">Set {set.setsNumber}</span>
      {/* 반복 횟수 입력 */}
      <Input
        type="number"
        className="w-16 py-2 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default"
        value={reps}
        disabled={completed}
        onChange={(e) => setReps(e.target.value === "" ? "" : Number(e.target.value))}
        onBlur={() => {
          if (reps !== set.repsTarget) {
            onUpdateSet(goalId, set.id, { repsTarget: reps });
          }
        }}
      />
      <span>회</span>
      {/* 중량 입력 */}
      <Input
        type="number"
        className="w-16 py-2 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default"
        value={weight}
        disabled={completed}
        onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
        onBlur={() => {
          if (weight !== set.weight) {
            onUpdateSet(goalId, set.id, { weight });
          }
        }}
      />
      kg
      {/* 세트 삭제 */}
      {!completed && set.setsNumber !== 1 ? (
        <CloseButton onClick={() => onRemoveSet(goalId, set.id)} className="w-5 h-5" />
      ) : (
        <CloseButton className="w-5 h-5 opacity-0 pointer-events-none" />
      )}
    </div>
  );
}
