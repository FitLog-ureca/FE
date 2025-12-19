"use client";

import { ArrowLeft } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
// import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackToMainButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <div className="absolute mt-28 left-32">
      {/* <Link href={"/"}>
        <ActionButton className="py-2.5 px-5 flex flex-row">
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로
        </ActionButton>
      </Link> */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <ActionButton className="py-2.5 px-5 flex flex-row">
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로
          </ActionButton>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>운동을 종료할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              아직 운동이 완료되지 않았어요.
              <br />
              목표 수정 화면으로 돌아가시겠어요?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <ActionButton
              className="px-4 py-2 rounded-lg"
              variant="primary"
              onClick={handleConfirm}
            >
              돌아가기
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
    </div>
  );
}
