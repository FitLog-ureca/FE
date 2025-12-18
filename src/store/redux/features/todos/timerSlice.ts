import { Timer } from "@/types/timer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// sessionStorage에서 todoId 복원
const getInitialTodoId = (): number | null => {
  if (typeof window === "undefined") return null;
  const saved = sessionStorage.getItem("lastTodoId");
  return saved ? parseInt(saved, 10) : null;
};

const initialState: Timer = {
  isActive: false,
  duration: 0,
  todoId: getInitialTodoId(),
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // 휴식 시작
    startRest(
      state,
      action: PayloadAction<{ duration: number; todoId: number }>
    ) {
      state.isActive = true;
      state.duration = action.payload.duration;
      state.todoId = action.payload.todoId;

      // sessionStorage에 마지막으로 선택된 todoId 저장
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastTodoId", action.payload.todoId.toString());
      }
    },
    // 휴식 스탑
    stopRest(state) {
      state.isActive = false;
      state.duration = 0;
    },
    // 타이머 초기화
    clearTimer(state) {
      state.isActive = false;
      state.duration = 0;
      state.todoId = null;
      // sessionStorage에서 제거
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("lastTodoId");
      }
    },
  },
});

export const { startRest, stopRest, clearTimer } = timerSlice.actions;
export default timerSlice.reducer;
