"use client";

import ActionButton from "@/components/ui/ActionButton";
import { useTodosDone } from "@/lib/tanstack/mutation/todosDone";
import { useRouter } from "next/navigation";

export default function FinishButton({ date }: { date: string }) {
  const router = useRouter();
  const { mutate: todosDone, isPending } = useTodosDone();
  const handleIsDone = () => {
    todosDone(date, {
      onSuccess: async () => {
        await fetch("/api/todos/end", { method: "POST" });
        router.push("/");
      },
      onError: (error) => {
        console.log("운동 완료 실패:", error);
      },
    });
  };

  return (
    <ActionButton onClick={handleIsDone} className="w-full py-3.5 mt-8">
      {isPending ? "운동 완료 중..." : "운동 완료"}
    </ActionButton>
  );
}
