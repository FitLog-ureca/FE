"server-only";

import Timer from "@/components/todos/Timer";
import TodosContainer from "@/components/todos/TodosContainer";
import BackToMainButton from "@/components/ui/BackToMainButton";

export default function TodosPage() {
  return (
    <div className="flex h-screen flex-col px-28">
      <BackToMainButton />

      <div className="grid w-full grid-cols-1 gap-16 px-32 pt-40 lg:grid-cols-2">
        <section className="flex justify-center">
          <TodosContainer />
        </section>

        <section className="flex items-center justify-center">
          <Timer />
        </section>
      </div>
    </div>
  );
}
