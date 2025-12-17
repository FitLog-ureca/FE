import { TodoResponse } from "@/types/todos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodosState {
  data: TodoResponse | null;
}

const initialState: TodosState = {
  data: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // API 데이터 전체 설정
    setTodosData(state, action: PayloadAction<TodoResponse>) {
      state.data = action.payload;
    },

    // 개별 세트 완료 상태 토글
    toggleTodoCompleted(state, action: PayloadAction<number>) {
      const todoId = action.payload;

      if (!state.data?.exercises) return;

      const exercise = state.data.exercises.find((ex) => ex.todoId === todoId);
      if (exercise) {
        exercise.isCompleted = !exercise.isCompleted;
      }
    },

    // 서버에서 완료 성공 후 상태 업데이트
    updateTodoCompleted(
      state,
      action: PayloadAction<{ todoId: number; isCompleted: boolean }>
    ) {
      const { todoId, isCompleted } = action.payload;

      if (!state.data?.exercises) return;

      const exercise = state.data.exercises.find((ex) => ex.todoId === todoId);
      if (exercise) {
        exercise.isCompleted = isCompleted;
      }
    },

    // 데이터 초기화
    clearTodos(state) {
      state.data = null;
    },
  },
});

export const {
  setTodosData,
  toggleTodoCompleted,
  updateTodoCompleted,
  clearTodos,
} = todosSlice.actions;

export default todosSlice.reducer;
