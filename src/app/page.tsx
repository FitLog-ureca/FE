import GoalList from "@/components/main-right/GoalList";
import { Calendar } from "@/components/main-left/Calendar";
import FillLevel from "@/components/main-left/FillLevel";

export default function MainPage() {
  
  return (
    <div className="flex h-screen justify-center px-28">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-16 py-24 md:grid-cols-2">
        {/* Calendar */}
        <section className="flex flex-col items-center justify-center">
          <Calendar className="h-auto w-full" />
          <FillLevel className="w-full pt-6" />
        </section>

        {/* TodoList */}
        <section className="flex items-center justify-center">
          <GoalList />
        </section>
      </div>
    </div>
  );
}
