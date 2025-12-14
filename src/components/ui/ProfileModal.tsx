"use client";

import { LogOut, Play, User, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import greeting from "@/assets/images/greeting.png";
import { PopoverClose } from "@radix-ui/react-popover";
import ActionButton from "@/components/ui/ActionButton";
import { useLogout } from "@/lib/tanstack/mutation/logout";

export default function UserIcon() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-1 border-2 border-gray-600 rounded-full hover:opacity-60 transition cursor-pointer flex items-center justify-center"
            aria-label="user menu"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={6}
          className="min-w-80 p-4"
        >
          <header className="flex justify-between items-center">
            <p className="font-bold text-md text-gray-600">프로필</p>
            <PopoverClose asChild>
              <X className="w-5 h-5 text-gray-600 cursor-pointer hover:text-fitlog-500" />
            </PopoverClose>
          </header>
          <main className="flex flex-col items-center">
            <Image
              src={greeting}
              alt="프로필 사진"
              className="w-22 h-22 p-1 rounded-full border-2 border-fitlog-100"
            />
            <div className="w-full rounded-xl p-3 mt-3 space-y-2 bg-gray-100">
              <section>
                <p className="text-xs text-gray-400">이름</p>
                <p className="text-sm">박준형</p>
              </section>
              <section>
                <p className="text-xs text-gray-400">나이</p>
                <p className="text-sm">28세</p>
              </section>
              <section>
                <p className="text-xs text-gray-400">자기소개</p>
                <p className="text-sm">아이 니드 프로틴!</p>
              </section>
            </div>
            <ActionButton className="mt-3 w-full flex items-center justify-center py-2 shadow-fitlog-btn-sm">
              <Play className="w-4 h-4 mr-2" />
              수정
            </ActionButton>
            <ActionButton
              onClick={() => logout()}
              className="mt-3 w-full flex bg-white items-center justify-center py-2 text-fitlog-text border text-sm border-fitlog-beige hover:bg-[#F1F1F1] shadow-fitlog-btn-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isPending ? "로그아웃 중..." : "로그아웃"}
            </ActionButton>
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
