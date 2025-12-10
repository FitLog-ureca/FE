export default function MainPage() {
  return (
 <div className="h-screen flex justify-center px-28">
      <div className="w-full max-w-6xl py-10 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Calendar */}
        <section className="flex justify-center items-center">
          <div className="w-full h-[70%] bg-gray-200 rounded-lg flex justify-center items-center">
            Calendar
          </div>
        </section>

        {/* TodoList */}
        <section className="flex justify-center items-center">
          <div className="w-full h-[80%] bg-gray-300 rounded-lg flex justify-center items-center">
            TodoList
          </div>
        </section>

      </div>
    </div>
  );
}
