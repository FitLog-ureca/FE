"use client";

import React from "react";
import GoalHeader from "@/components/main-right/GoalHeader";
import SetList from "@/components/main-right/SetList";
import ExercisesDropdownButton from "@/components/main-right/ExercisesDropdownButton";
import { GoalType, SetUpdatePayload } from "@/types/todoMain";
import { useCreateTodo } from "@/lib/tanstack/mutation/createTodo";
import { useAddSet } from "@/lib/tanstack/mutation/addSet";
import { useDeleteTodo } from "@/lib/tanstack/mutation/deleteTodo";
import { useDeleteWorkout } from "@/lib/tanstack/mutation/deleteWorkout";

interface GoalListProps {
  goals: GoalType[];
  selectedDate: string;
}

export default function GoalList({ goals, selectedDate }: GoalListProps) {
  const completed = false;
  const { mutate: createTodo } = useCreateTodo(selectedDate);
  const { mutate: addSet } = useAddSet(selectedDate);
  const { mutate: deleteTodo } = useDeleteTodo(selectedDate);
  const { mutate: deleteWorkout } = useDeleteWorkout(selectedDate);

  const onToggleCompleted = () => {
    // 👉 다음 단계에서 mutation으로 대체될 예정
  };

  const onCreateGoal = (exerciseId: number) => {
    createTodo({
      date: selectedDate,
      exerciseId,
    });
  };

  const onCreateSet = (goalId: number) => {
    addSet(goalId);
  };

  const onRemoveGoal = (goalId: number) => {
   deleteWorkout(goalId);
  };

  const onRemoveSet = (goalId: number, setId: number) => {
    deleteTodo(setId);
  };

  const onUpdateSet = (goalId: number, setId: number, newValues: SetUpdatePayload) => {
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
