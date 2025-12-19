import { cn } from "@/lib/cn";
import { CheckIcon } from "lucide-react";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

export default function Checkbox({
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />

      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-all",
          "border-input bg-background text-transparent",
          "peer-checked:bg-fitlog-500 peer-checked:border-fitlog-500 peer-checked:text-white",
          "peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50",
          "peer-disabled:opacity-50",
          className
        )}
      >
        <CheckIcon className="size-3.5" />
      </span>
    </label>
  );
}
