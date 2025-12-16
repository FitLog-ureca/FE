"use client";

import ActionButton from "@/components/ui/ActionButton";
import { useRouter } from "next/navigation";

export default function FinishButton() {
  const router = useRouter();
  const handleIsDone = () => {
    // 1. 서버에 오늘 운동 완료 처리
    // await fetch("/api/todos/done", {
    //   method: "PATCH",
    //   credentials: "include",
    // });

    // 2. 메인으로 이동
    router.push("/");
  };

  return (
    <ActionButton onClick={handleIsDone} className="w-full py-3.5 mt-8">
      운동 완료
    </ActionButton>
  );
}
