"use client";

import ActionButton from "@/components/ui/ActionButton";
import { useTodosDone } from "@/lib/tanstack/mutation/todosDone";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function FinishButton({ date }: { date: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: todosDone, isPending } = useTodosDone();

  const handleIsDone = () => {
    todosDone(date, {
      onSuccess: async () => {
        // 1. 메인 쿼리 무효화 (queryKey를 invalidate)
        await queryClient.invalidateQueries({
          queryKey: ["exercises", date],
        });

        // 2. todos 접근 권한 제거
        await fetch("/api/todos/end", { method: "POST" });

        // 3. Dialog창 닫고, 메인 화면으로 이동
        setOpen(false);
        router.push("/");
      },
      onError: (error) => {
        console.log("운동 완료 실패:", error);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ActionButton className="w-full py-3.5 mt-8">
          {/* {isPending ? "운동 완료 중..." : "운동 완료"} */}
          운동 완료
        </ActionButton>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>운동을 종료할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            운동을 완료하면 오늘 운동은 더 이상 수정할 수 없어요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <ActionButton
            className="px-4 py-2 rounded-lg"
            variant="primary"
            onClick={handleIsDone}
            disabled={isPending}
          >
            {isPending ? "처리 중..." : "완료하기"}
          </ActionButton>
          <ActionButton
            className="px-4 py-2 rounded-lg"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            취소
          </ActionButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
