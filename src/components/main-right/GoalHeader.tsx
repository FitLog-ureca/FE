export default function GoalHeader() {
  return (
    <div className="flex justify-between items-center px-2">
      <h1 className="text-xl font-semibold">
        {new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "long",
        })}
      </h1>
      <h1 className="text-xl font-semibold">운동 기록</h1>
    </div>
  );
}
