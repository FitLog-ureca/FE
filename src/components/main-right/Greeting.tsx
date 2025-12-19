"use client";

import Image from "next/image";
import greetingImg from "@/assets/images/greeting.png";

import { useGetProfile } from "@/lib/tanstack/query/profile";

export default function Greeting() {
  const { data: profileData } = useGetProfile();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl font-semibold text-gray-800">
          {profileData?.username}님,
        </p>
        <p className="text-xl font-semibold text-gray-800">
          오늘도 운동도 화이팅이에요! 💪🏻
        </p>
      </div>

      <Image
        src={greetingImg}
        alt="greeting"
        width={360}
        height={360}
        priority
      />
    </div>
  );
}
