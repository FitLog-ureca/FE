"use client";

import ActionButton from "@/components/ui/ActionButton";
import { useRouter } from "next/navigation";

export default function FinishButton() {
  const router = useRouter();
  const handleIsDone = () => {
    router.push("/");
  };
  return (
    <ActionButton onClick={handleIsDone} className="w-full py-3.5 mt-8">
      운동 완료
    </ActionButton>
  );
}
