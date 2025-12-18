import { TodoResponse } from "@/types/todos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodosState {
  data: TodoResponse | null;
  lastCompletedTodoId: number | null; // 마지막으로 선택(완료 체크)한 todoId
}

const initialState: TodosState = {
  data: null,
  lastCompletedTodoId: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // 투두 조회
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

        if (exercise.isCompleted) {
          state.lastCompletedTodoId = todoId;
        }
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

        if (isCompleted) {
          state.lastCompletedTodoId = todoId;
        }
      }
    },

    // 휴식 시간 업데이트
    updateRestTime(
      state,
      action: PayloadAction<{ todoId: number; restTime: number }>
    ) {
      const { todoId, restTime } = action.payload;

      if (!state.data?.exercises) return;

      const exercise = state.data.exercises.find((ex) => ex.todoId === todoId);
      if (exercise) {
        exercise.restTime = restTime;
      }
    },
    // 휴식 시간 초기화
    resetRestTime(state, action: PayloadAction<number>) {
      const todoId = action.payload;

      if (!state.data?.exercises) return;

      const exercise = state.data.exercises.find((ex) => ex.todoId === todoId);
      if (exercise) {
        exercise.restTime = null;
      }
    },

    // 데이터 초기화
    clearTodos(state) {
      state.data = null;
      state.lastCompletedTodoId = null;
    },
  },
});

export const {
  setTodosData,
  toggleTodoCompleted,
  updateTodoCompleted,
  updateRestTime,
  resetRestTime,
  clearTodos,
} = todosSlice.actions;

export default todosSlice.reducer;
