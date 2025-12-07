export default function MainPage() {
  return (
    <div className="flex h-full">
      {/* 왼쪽: Calendar */}
      <aside className="w-1/2  flex items-center justify-center border-r">
        <div className="w-[70%] h-[60%] bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Calendar 자리</p>
        </div>
      </aside>

      {/* 오른쪽: TodoList */}
      <section className="w-1/2 pr-4 flex items-center justify-center">
        <div className="w-[70%] h-[80%] bg-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">TodoList 자리</p>
        </div>
      </section>
    </div>
  );
}
