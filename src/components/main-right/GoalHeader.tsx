import ActionButton from "@/components/ui/ActionButton";
import { useRouter } from "next/navigation";

export default function GoalHeader({ completed }: { completed: boolean }) {
  const router = useRouter();

  const handleStartWorkout = async () => {
    await fetch("/api/todos/start", { method: "POST" });
    router.push("/todos");
  };

  return (
    <div className="flex justify-between items-center px-2">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-xl font-semibold">
          {new Date().toLocaleString("ko-KR", {
            month: "long",
            day: "numeric",
          })}
        </h1>
        <h1 className="text-xl font-semibold"> 운동 목표</h1>
      </div>

      {completed && (
        <ActionButton
          onClick={handleStartWorkout}
          className="p-3 color-white text-md"
        >
          운동 시작
        </ActionButton>
      )}
    </div>
  );
}
