"server-only";

import { ArrowLeft } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import Link from "next/link";

export default function BackToMainButton() {
  return (
    <div className="absolute mt-28 left-32">
      <Link href={"/"}>
        <ActionButton className="py-2.5 px-5 flex flex-row">
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로
        </ActionButton>
      </Link>
    </div>
  );
}
