"use client";

import FitLogLogo from "@/components/ui/FitLogLogo";
import Link from "next/link";
import UserIcon from "../ui/UserIcon";

export default function Navbar() {
  return (
    <nav className="h-18 w-full flex items-center justify-between px-8 bg-fitlog-50 shadow-sm">
      {/* 왼쪽 - FitLog 로고 */}
      <Link href="/" className="flex items-center gap-4">
        <FitLogLogo size={44} />
        <p className="text-fitlog-500 text-2xl font-extrabold">FitLog</p>
      </Link>

      {/* 오른쪽 - 유저 아이콘 */}
      <UserIcon/>
    </nav>
  );
}
