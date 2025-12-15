import React from "react";
import ActionButton from "@/components/ui/ActionButton";
import { Plus } from "lucide-react";
import SetItem from "@/components/main-right/SetItem";
import CloseButton from "@/components/ui/CloseButton";
import { SetListProps } from "@/types/todoMain";

export default function SetList({
  goal, // 해당 운동 SetList
  completed, // 설정 완료 여부
  onCreateSet, // goal.id 기반으로 세트 추가
  onRemoveGoal, // 운동 항목 삭제
  onRemoveSet, // SetItem 삭제
  onUpdateSet, // reps/weight 값 업데이트
}: SetListProps) {
  return (
    <div className="SetList">
      <section className="w-full h-auto rounded-xl p-4 border border-border flex flex-col gap-2 bg-white shadow">
        {/* 운동 제목 */}
        <div className="flex justify-between items-center">
          <h1 className="text-md font-semibold">{goal.exercise}</h1>
          {!completed && <CloseButton className="w-5 h-5" onClick={() => onRemoveGoal(goal.id)} />}
        </div>

        {/* 세트 목록 */}
        {goal.sets.map((set) => (
          <SetItem
            key={set.id}
            set={set}
            goalId={goal.id}
            completed={completed}
            onRemoveSet={onRemoveSet}
            onUpdateSet={onUpdateSet}
          />
        ))}

        {!completed && (
          <ActionButton
            className="w-full p-2 flex justify-center items-center gap-2 text-md"
            variant="secondary"
            onClick={() => onCreateSet(goal.id)}
          >
            <Plus className="w-5 h-5" />
            세트 추가
          </ActionButton>
        )}
      </section>
    </div>
  );
}
