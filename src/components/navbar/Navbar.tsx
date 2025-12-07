"use client";

import FitLogLogo from "@/components/ui/FitLogLogo";
import UserIcon from "@/components/ui/UserIcon";

export default function Navbar() {
  return (
    /* 네비바 색상 - #FFFFFF */
    // <nav
    //   className="
    //     h-[72px]
    //     w-full
    //     flex
    //     items-center
    //     justify-between
    //     px-6
    //     bg-white
    //     shadow-sm
    //   "
    // >

    /* 네비바 색상 - Primary Color */
    <nav
      className="
        h-[72px] 
        w-full 
        flex 
        items-center 
        justify-between 
        px-8
        bg-[#FCEDEE]
        shadow-sm
      "
    >
      {/* 왼쪽 - FitLog 로고 */}
      <section className="flex justify-center items-center">
        <FitLogLogo size={44} />
        <p className="text-fitlog-500 pl-5 text-2xl font-extrabold">FitLog</p>
      </section>

      {/* 오른쪽 - 유저 아이콘 */}
      <section>
        <UserIcon />
      </section>
    </nav>
  );
}
