import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { setAuth } from "@/store/redux/features/auth/authSlice";
import { tokenStore } from "@/store/redux/features/auth/tokenStore";

type User = { loginId: string; name: string };

export function useAuth() {
  const dispatch = useAppDispatch();

  // redux에서 상태 가져오기
  const { accessToken, user } = useAppSelector((state) => state.auth);

  // 로그인 성공 시: 토큰 + 유저 정보 저장
  const setAuthData = (token: string, userData: User | null) => {
    dispatch(setAuth({ accessToken: token, user: userData }));
  };

  // 로그아웃: redux + tokenStore 모두 정리
  const clearAuthData = () => {
    tokenStore.clear();
  };

  return {
    accessToken,
    user,
    setAuth: setAuthData,
    clearAuth: clearAuthData,
  };
}
