import { Play, User, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Image from "next/image";
import greeting from "@/assets/images/greeting.png";
import { PopoverClose } from "@radix-ui/react-popover";

export default function UserIcon() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-1 border-2 border-gray-600 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
            aria-label="user menu"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[320px] p-4">
          <header className="flex justify-between items-center">
            <p className="font-bold text-md text-gray-500">프로필</p>
            <PopoverClose asChild>
              <X className="w-5 h-5 text-gray-500" />
            </PopoverClose>
          </header>
          <main className="flex flex-col items-center">
            <Image
              src={greeting}
              alt="프로필 사진"
              className="w-22 h-22 p-1 rounded-full border-2 border-fitlog-100"
            />
            <div className="w-full rounded-sm p-3 mt-3 space-y-2 bg-gray-100">
              <section>
                <p className="text-[10px] text-gray-400">이름</p>
                <p className="text-sm">박준형</p>
              </section>
              <section>
                <p className="text-[10px] text-gray-400">나이</p>
                <p className="text-sm">만 27세</p>
              </section>
              <section>
                <p className="text-[10px] text-gray-400">자기소개</p>
                <p className="text-sm">아이 니드 프로틴!</p>
              </section>
            </div>
            <button className="flex justify-center items-center mt-3 w-full bg-fitlog-500 text-white py-2 rounded-lg">
              <Play className="w-4 h-4 mr-2" />
              <p className="text-sm">수정</p>
            </button>
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
