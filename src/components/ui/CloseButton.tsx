"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function CloseButton({ onClick, className }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn("cursor-pointer rounded transition-colors", className)}
      aria-label="close"
    >
      <X className="w-5 h-5 text-gray-600 hover:text-fitlog-500" />
    </button>
  );
}
