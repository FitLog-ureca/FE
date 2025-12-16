import { Timer } from "@/types/timer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Timer = {
  isActive: false,
  duration: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startRest(state, action: PayloadAction<number>) {
      state.isActive = true;
      state.duration = action.payload;
    },
    stopRest(state) {
      state.isActive = false;
      state.duration = 0;
    },
  },
});

export const { startRest, stopRest } = timerSlice.actions;
export default timerSlice.reducer;
