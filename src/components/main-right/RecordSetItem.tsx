"use client";

import Checkbox from "@/components/ui/CheckBox";
import { RecordSet } from "@/types/record";

export default function RecordSetItem({ set }: { set: RecordSet }) {
  return (
    <div className="flex justify-between items-center gap-4 pb-2">
      {/* 세트 번호 */}
      <p className="font-bold w-12">Set {set.setsNumber}</p>
      {/* 반복 횟수 */}
      <div className="w-16 text-center">{set.repsTarget}</div>회{/* 중량 */}
      <div className="w-16 text-center">{set.weight}</div>
      kg
      {/* 완료 체크 */}
      <Checkbox checked={set.isCompleted} disabled />
    </div>
  );
}
