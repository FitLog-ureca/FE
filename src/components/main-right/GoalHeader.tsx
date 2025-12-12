import ActionButton from "../ui/ActionButton";

export default function GoalHeader({ completed }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-4">
      <h1 className="text-xl font-semibold">
        {new Date().toLocaleString("ko-KR", {
          month: "long",
          day: "numeric",
        })}
      </h1>
      <h1 className="text-xl font-semibold"> 운동 목표</h1>
      </div>
      <div>{completed && <ActionButton className="w-full p-2 color-white text-md">운동 시작</ActionButton>}</div>
    </div>
  );
}
