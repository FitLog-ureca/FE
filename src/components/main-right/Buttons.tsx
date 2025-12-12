import React from "react";
import ActionButton from "../ui/ActionButton";
import { Plus } from "lucide-react";

export default function Buttons({ completed, onToggleCompleted, onCreateGoal }) {
  return (
    <div className="flex flex-col gap-6">
      {/* 운동 종목 선택 버튼 */}
      <ActionButton
        className="w-full p-2 flex justify-center items-center gap-2 text-md"
        variant="secondary"
        onClick={onCreateGoal}
      >
        <Plus className="w-5 h-5" />
        운동 종목 선택
      </ActionButton>

      {/* 수정 하기 버튼 OR 설정 완료 버튼 */}
      {completed ? (
        <ActionButton onClick={onToggleCompleted} className="w-full p-2 color-white text-md">
          수정 하기
        </ActionButton>
      ) : (
        <ActionButton onClick={onToggleCompleted} className="w-full p-2 color-white text-md">
          설정 완료
        </ActionButton>
      )}
    </div>
  );
}
