"use client";

import React, { useState } from "react";
import ActionButton from "../ui/ActionButton";
import GoalHeader from "./GoalHeader";
import GoalItem from "./GoalItem";
import { Plus } from "lucide-react";

export default function GoalList() {
  const [completed, setComplted] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6">
      <GoalHeader />
      <GoalItem />
      <div className="flex flex-col gap-6">
        <ActionButton
          className="w-full p-2 flex justify-center items-center gap-2 text-md"
          variant="secondary"
        >
          <Plus className="w-5 h-5" />
          운동 종목 선택
        </ActionButton>
        {completed === true ? (
          <ActionButton
            onClick={() => {
              setComplted(false);
            }}
            className="w-full p-2 color-white text-md"
          >
            수정 하기
          </ActionButton>
        ) : (
          <ActionButton
            onClick={() => {
              setComplted(true);
            }}
            className="w-full p-2 color-white text-md"
          >
            설정 완료
          </ActionButton>
        )}
      </div>
    </div>
  );
}
