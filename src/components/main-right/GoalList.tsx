"use client";

import React from "react";
import GoalHeader from "@/components/main-right/GoalHeader";
import SetList from "@/components/main-right/SetList";
import ExercisesDropdownButton from "@/components/main-right/ExercisesDropdownButton";
import { GoalType, SetUpdatePayload } from "@/types/todoMain";

interface GoalListProps {
  goals: GoalType[];
}

export default function GoalList({ goals }: GoalListProps) {
  const completed = false;

  const onToggleCompleted = () => {
    // 👉 다음 단계에서 mutation으로 대체될 예정
  };

  const onCreateGoal = (exerciseName: string) => {
    // 👉 다음 단계: 운동 항목 추가 API
  };

  const onCreateSet = (goalId: number) => {
    // 👉 다음 단계
  };

  const onRemoveGoal = (goalId: number) => {
    // 👉 다음 단계
  };

  const onRemoveSet = (goalId: number, setId: number) => {
    // 👉 다음 단계
  };

  const onUpdateSet = (
    goalId: number,
    setId: number,
    newValues: SetUpdatePayload
  ) => {
    // 👉 다음 단계
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <GoalHeader completed={completed} />

      {goals.map((goal) => (
        <SetList
          key={goal.id}
          goal={goal}
          completed={completed}
          onCreateSet={onCreateSet}
          onRemoveGoal={onRemoveGoal}
          onRemoveSet={onRemoveSet}
          onUpdateSet={onUpdateSet}
        />
      ))}

      <ExercisesDropdownButton
        completed={completed}
        onToggleCompleted={onToggleCompleted}
        onSelectExercise={onCreateGoal}
      />
    </div>
  );
}
