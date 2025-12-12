"use client";

import React, { useRef, useState } from "react";
import GoalHeader from "./GoalHeader";
import SetList from "./SetList";
import Buttons from "./Buttons";

const mockDataGoal = [
  {
    id: 1, // 운동 항목 ID
    exercise: "벤치프레스", // 운동 종목
    sets: [
      {
        id: 1, // 세트 ID
        setsNumber: 1, // 세트 번호
        repsTarget: 0,
        weight: 0,
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
        repsTarget: 0,
        weight: 0,
      },
    ],
  },
];

export default function GoalList() {
  const [goals, setGoals] = useState(mockDataGoal);
  const [completed, setCompleted] = useState(false);
  const idRef = useRef(3);

  const onCreateGoal = () => {
    const newGoal = {
      id: idRef.current++,
      exercise: null,
      sets: [
        {
          id: 1,
          setsNumber: 1,
          repsTarget: 0,
          weight: 0,
        },
      ],
    };

    setGoals([...goals, newGoal]);
  };

  const onToggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 날짜 및 운동 기록 텍스트 렌더링 */}
      <GoalHeader completed={completed} />

      {/* SetList 여러개 렌더링 */}
      {goals.map((goal) => (
        <SetList key={goal.id} goal={goal} />
      ))}

      {/* 버튼 렌더링 */}
      <Buttons completed={completed} onToggleCompleted={onToggleCompleted} onCreateGoal={onCreateGoal} />
    </div>
  );
}
