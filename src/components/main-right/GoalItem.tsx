import React from "react";
import ActionButton from "../ui/ActionButton";
import { Plus } from "lucide-react";
import SetItem from "./SetItem";
import CloseButton from "../ui/CloseButton";

export default function GoalItem() {
  return (
    <div className="GoalItem">
      <section className="w-full h-auto rounded-xl p-4 border border-border bg-white shadow">
        <SetItem/>
        <div className="flex justify-between items-center">
          <h1 className="text-md font-semibold">스쿼트</h1>
          <CloseButton className="" />
        </div>
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
