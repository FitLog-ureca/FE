import { cn } from "@/lib/cn";

interface FitlogInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({
  className,
  error,
  disabled,
  ...props
}: FitlogInputProps) {
  return (
    <input
      disabled={disabled}
      {...props}
      className={cn(
        "text-fitlog-text placeholder:text-gray-400",
        "rounded-xl border py-2.5 text-sm border-fitlog-beige",
        "focus:outline-none focus:border-fitlog-300",
        disabled && "cursor-not-allowed bg-[#EEEEEE] text-gray-400",
        error && "border-red-400 text-red-500",
        className
      )}
    />
  );
}
