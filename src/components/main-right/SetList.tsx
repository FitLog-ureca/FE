import React from "react";
import ActionButton from "../ui/ActionButton";
import { Plus } from "lucide-react";
import SetItem from "./SetItem";
import CloseButton from "../ui/CloseButton";

export default function SetList({ goal }) {
  return (
    <div className="SetList">
      <section className="w-full h-auto rounded-xl p-4 border border-border bg-white shadow">
        {/* 운동 제목 */}
        <div className="flex justify-between items-center">
          <h1 className="text-md font-semibold">스쿼트</h1>
          {/* <h1 className="text-md font-semibold">{goal.exercise ?? "운동 선택"}</h1> */}
          <CloseButton className="" />
        </div>

        {/* 세트 목록 */}
        {/* {goal.sets.map((set) => (
          <SetItem key={set.id} set={set} />
        ))} */}
        <SetItem />
        <ActionButton
          className="w-full p-2 flex justify-center items-center gap-2 text-md"
          variant="secondary"
        >
          <Plus />
          세트 추가
        </ActionButton>
      </section>
    </div>
  );
}
