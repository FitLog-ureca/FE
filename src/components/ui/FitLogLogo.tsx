import { Flame } from "lucide-react";

export default function FitlogLogo({ size }: { size: number }) {
  const px = `${size}px`;

  return (
    <div
      className="bg-fitlog-500 rounded-2xl flex items-center justify-center shadow-fitlog-logo"
      style={{ width: px, height: px }}
    >
      <Flame className="text-white" size={size * 0.5} />
    </div>
  );
}
