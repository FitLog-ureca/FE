import { cn } from "@/lib/cn";

interface FitlogInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  error?: boolean;
}
export default function ActionButton({
  className,
  error,
  children,
  disabled,
  ...props
}: FitlogInputProps) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={cn(
        "rounded-xl bg-fitlog-500 text-white text-sm transition-colors shadow-fitlog-btn cursor-pointer",
        "hover:bg-fitlog-700",
        disabled && "cursor-not-allowed bg-gray-300 text-gray-500",
        error && "bg-red-400 hover:bg-red-500 text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
