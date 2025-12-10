import { Calendar } from "@/components/main/Calendar";

export default function MainPage() {
  return (
    <div className="flex h-screen justify-center px-28">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-16 py-10 md:grid-cols-2">
        {/* Calendar */}
        <section className="flex items-center justify-center">
          <Calendar className="w-full h-auto" />
        </section>

        {/* TodoList */}
        <section className="flex items-center justify-center">
          <div className="flex h-[80%] w-full items-center justify-center rounded-lg bg-gray-300">
            TodoList
          </div>
        </section>
      </div>
    </div>
  );
}
