import { store } from "@/store/redux/store";
import {
  setAccessToken,
  clearAuth,
} from "@/store/redux/features/auth/authSlice";

export const tokenStore = {
  // Redux store에서 토큰 읽기
  get() {
    return store.getState().auth.accessToken;
  },
  // Redux store에 토큰 저장
  set(token: string) {
    store.dispatch(setAccessToken(token));
  },
  // Redux store 초기화
  clear() {
    store.dispatch(clearAuth());
  },
};
