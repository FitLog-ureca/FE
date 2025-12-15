import GoalList from "@/components/main-right/GoalList";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";

export default function MainPage() {
  
  return (
    <div className="flex justify-center px-28">
      <div className="grid w-full max-w-6xl py-24 grid-cols-1 md:grid-cols-2 md:h-[calc(100vh-72px) gap-16">
        {/* LEFT: Calendar */}
        <section className="mt-[72px] flex flex-col items-center">
          <Calendar className="w-full" />
          <FillLevel className="w-full pt-6" />
        </section>

        {/* RIGHT: TodoList */}
        <section className="flex min-h-0 flex-col">
          <div className="md:flex-1 md:h-full w-full overflow-y-auto min-h-0">
          <GoalList />
          </div>
        </section>
      </div>
    </div>
  );
}
