import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/store/redux/features/todos/todoSlice";
import timerReducer from "@/store/redux/features/todos/timerSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
