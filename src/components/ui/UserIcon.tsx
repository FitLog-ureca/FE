"use client";

import { User } from "lucide-react";

export default function UserIcon() {
  return (
    <button
      className="p-1 border-2 border-gray-600 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
      aria-label="user menu"
    >
      <User className="w-6 h-6 text-gray-600" />
    </button>
  );
}
