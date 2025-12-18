import { AuthState, User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isInitializing: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인 시: 토큰 + 유저 정보 모두 저장
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; user: User | null }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    // Refresh 시: 토큰만 갱신
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    // 로그아웃 시: 모두 초기화
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    // 초기화 완료 플래그
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.isInitializing = action.payload;
    },
  },
});

export const { setAuth, setAccessToken, clearAuth, setInitializing } =
  authSlice.actions;
export default authSlice.reducer;
