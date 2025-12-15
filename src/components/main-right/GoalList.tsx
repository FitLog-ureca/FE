"use client";

import React, { useRef, useState } from "react";
import GoalHeader from "@/components/main-right/GoalHeader";
import SetList from "@/components/main-right/SetList";
import ExercisesDropdownButton from "@/components/main-right/ExercisesDropdownButton";
import { GoalType, SetUpdatePayload } from "@/types/todoMain";

const mockDataGoal: GoalType[] = [
  {
    id: 1, // 운동 항목 ID
    exercise: "벤치프레스", // 운동 종목
    sets: [
      {
        id: 1, // 세트 ID
        setsNumber: 1, // 세트 번호
        repsTarget: "",
        weight: "",
      },
    ],
  },

  {
    id: 2,
    exercise: "스쿼트",
    sets: [
      {
        id: 1,
        setsNumber: 1,
        repsTarget: "",
        weight: "",
      },
    ],
  },
];

export default function GoalList() {
  const [goals, setGoals] = useState<GoalType[]>(mockDataGoal);
  const [completed, setCompleted] = useState(false);
  const idRef = useRef(3);
  const setIdRef = useRef(1);

  const onToggleCompleted = () => {
    setCompleted(!completed);
  };

  const onCreateGoal = (exerciseName: string) => {
    const newGoal: GoalType = {
      id: idRef.current++,
      exercise: exerciseName,
      sets: [
        {
          id: setIdRef.current++,
          setsNumber: 1,
          repsTarget: "",
          weight: "",
        },
      ],
    };

    setGoals([...goals, newGoal]);
  };

  const onCreateSet = (goalId: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              sets: [
                ...goal.sets,
                {
                  id: setIdRef.current++,
                  setsNumber: goal.sets.length + 1,
                  repsTarget: "",
                  weight: "",
                },
              ],
            }
          : goal
      )
    );
  };

  const onRemoveGoal = (goalId: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  const onRemoveSet = (goalId: number, setId: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              sets: goal.sets
                .filter((set) => set.id !== setId)
                .map((set, index) => ({
                  ...set,
                  setsNumber: index + 1,
                })),
            }
          : goal
      )
    );
  };

  const onUpdateSet = (goalId: number, setId: number, newValues: SetUpdatePayload) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              sets: goal.sets.map((set) => (set.id === setId ? { ...set, ...newValues } : set)),
            }
          : goal
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 날짜, 텍스트, 운동 시작 버튼 렌더링 */}
      <GoalHeader completed={completed} />

      {/* SetList 여러개 렌더링 */}
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

      {/* 버튼 렌더링 */}
      <ExercisesDropdownButton
        completed={completed}
        onToggleCompleted={onToggleCompleted}
        onSelectExercise={onCreateGoal}
      />
    </div>
  );
}
