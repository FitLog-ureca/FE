import { Calendar } from "@/components/main/Calendar";
import FillLevel from "@/components/main/FillLevel";

export default function MainPage() {
  return (
    <div className="flex h-screen justify-center px-28">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-16 py-24">
        {/* Calendar */}
        <section className="flex flex-col items-center justify-center">
          <Calendar className="h-auto w-full" />
          <FillLevel className="w-full pt-6" />
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
