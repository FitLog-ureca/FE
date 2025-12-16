import Image from "next/image";
import React from "react";
import greetingImg from "@/assets/images/greeting.png";

type GreetingProps = {
  username: string;
};

export default function Greeting({ username }: GreetingProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-xl bg-white p-8 shadow border border-border">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl font-semibold text-gray-800">{username}님,</p>
        <p className="text-lg font-medium text-gray-600">오늘도 화이팅이에요! 💪🏻</p>
      </div>

      <Image src={greetingImg} alt="greeting" width={180} height={180} priority />
    </div>
  );
}
