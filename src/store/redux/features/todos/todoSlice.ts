import { Todo, Todos } from "@/types/todos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Todos = {
  todos: [],
};

interface TodoSetCompletedPayload {
  todoId: number;
  setId: number;
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoSetCompleted(state, action: PayloadAction<TodoSetCompletedPayload>) {
      const { todoId, setId } = action.payload;

      const todo = state.todos.find((todo) => todo.todoId === todoId);
      if (!todo) return;

      const set = todo.sets.find((set) => set.setId === setId);
      if (!set) return;

      set.isCompleted = !set.isCompleted;
    },

    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
});

export const { todoSetCompleted, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
