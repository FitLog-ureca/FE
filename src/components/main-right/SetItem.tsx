import React from "react";
import Input from "@/components/ui/Input";
import { X } from "lucide-react";
import CloseButton from "@/components/ui/CloseButton";
import { SetItemProps } from "@/types/todoMain";

export default function SetItem({
  set,
  completed,
  goalId,
  onRemoveSet,
  onUpdateSet,
}: SetItemProps) {
  return (
    <div className="flex justify-between items-center gap-4 pb-2">
      {/* 세트 번호 */}
      <h2 className="text-sm w-10">{set.setsNumber}세트</h2>

      {/* 반복 횟수 입력 */}
      <Input
        type="number"
        className="w-16 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default"
        value={set.repsTarget}
        disabled={completed}
        onChange={(e) =>
          onUpdateSet(goalId, set.id, {
            repsTarget: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />회
      <X className="w-4 h-4" />
      {/* 중량 입력 */}
      <Input
        type="number"
        className="w-16 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default"
        value={set.weight}
        disabled={completed}
        onChange={(e) =>
          onUpdateSet(goalId, set.id, {
            weight: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />KG

      {/* 세트 삭제 */}
      <CloseButton onClick={() => onRemoveSet(goalId, set.id)} className="w-5 h-5" />
    </div>
  );
}
