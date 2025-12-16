"server-only";

import TodoSetRow from "@/components/todos/TodoSetRow";
import { Todo } from "@/types/todos";

export default function TodoItem({ exerciseName, sets, todoId }: Todo) {
  return (
    <div className="w-141 min-h-3 flex flex-col bg-white p-4 py-5 border border-fitlog-beige rounded-[20px] mt-4 first:mt-0 ">
      <p className="ml-2 mt-2 font-bold">{exerciseName}</p>

      <div className="mt-2 flex flex-col gap-4">
        {sets.map((set, index) => (
          <TodoSetRow
            key={`${todoId}-${index}`}
            setNumber={index + 1}
            isCompleted={set.isCompleted}
            todoId={todoId}
            setId={set.setId}
          />
        ))}
      </div>
    </div>
  );
}
