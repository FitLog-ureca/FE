"use client";

import Checkbox from "@/components/ui/CheckBox";
import { RecordSet } from "@/types/record";
import Input from "../ui/Input";

export default function RecordSetItem({ set }: { set: RecordSet }) {
  return (
    <div className="flex justify-between items-center gap-4">
      {/* 세트 번호 */}
      <p className="text-md w-10">Set {set.setsNumber}</p>
      
      {/* 반복 횟수 */}
      <Input
        type="number"
        className={`w-16 py-2 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default ${set.isCompleted ? "border-fitlog-300" : ""}`}
        value={set.repsTarget ?? ""}
        disabled
      />
      <span>회</span>

      {/* 중량 */}
      <Input
        type="number"
        className={`w-16 py-2 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default ${set.isCompleted ? "border-fitlog-300" : ""}`}
        value={set.weight ?? ""}
        disabled
      />
      <span>kg</span>
      
      {/* 휴식 시간 */}
      {/* <div className="flex items-center gap-1 text-sm text-gray-500 min-w-[70px] justify-center"> */}
        {/* <span>휴식</span>
        <span className="font-semibold">
          {set.restTime != null ? set.restTime : 0}
        </span> */}
        <Input
        type="number"
        className={`w-16 py-2 flex-1 text-center disabled:opacity-100 disabled:bg-white disabled:text-black disabled:cursor-default ${set.isCompleted ? "border-fitlog-300" : ""}`}
        value={set.restTime ?? 0}
        disabled
      />
        <span>초</span>
      {/* </div> */}

      {/* 완료 체크 */}
      <div className="flex justify-center items-center">
        <Checkbox checked={set.isCompleted} onChange={() => {}} className="pointer-events-none" />
      </div>
    </div>
  );
}
