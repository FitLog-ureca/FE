import ActionButton from "@/components/ui/ActionButton";
import { useRouter } from "next/navigation";

interface GoalHeaderProps {
  completed: boolean;
  selectedDate: string; // YYYY-MM-DD
}

export default function GoalHeader({ completed, selectedDate }: GoalHeaderProps) {
  const router = useRouter();
  
  const date = new Date(selectedDate);
        
  const handleStartWorkout = async () => {
    await fetch("/api/todos/start", { method: "POST" });
    router.push("/todos");
  };

  return (
    <div className="flex justify-between items-center px-2">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-xl font-semibold">
          {date.toLocaleString("ko-KR", {
            month: "long",
            day: "numeric",
          })}
        </h1>
        <h1 className="text-xl font-semibold"> 운동 목표</h1>
      </div>

      <ActionButton
        onClick={completed ? handleStartWorkout : undefined}
        className={`
          p-3 color-white text-md
          ${completed ? "visible" : "invisible"}
        `}
      >
        운동 시작
      </ActionButton>
    </div>
  );
}
