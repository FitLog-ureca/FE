"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/interceptor/clientInterceptor";
import { authEvents } from "@/store/redux/features/auth/authEvents";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import {
  setAccessToken,
  clearAuth,
  setInitializing,
} from "@/store/redux/features/auth/authSlice";

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const isInitializing = useAppSelector((state) => state.auth.isInitializing);

  const router = useRouter();
  const queryClient = useQueryClient();

  // 로그아웃 이벤트 리스너 등록
  useEffect(() => {
    authEvents.setLogoutListener(() => {
      dispatch(clearAuth()); // redux 상태 초기화
      queryClient.clear(); // tanstack query 캐시 초기화
      router.replace("/login"); // 로그인 페이지로 이동
    });
  }, [dispatch, queryClient, router]);

  // 초기화: RefreshToken이 있으면 AccessToken 갱신
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Cookie에 있는 RefreshToken으로 새 AccessToken 받기
        const { data } = await apiClient.post("/auth/refresh");
        if (data?.accessToken) {
          // Redux에 저장
          dispatch(setAccessToken(data.accessToken));
        }
      } catch (error) {
        // RefreshToken이 없거나 만료됨 → 로그인 필요
        console.log("No valid refresh token");
      } finally {
        // 초기화 완료
        dispatch(setInitializing(false));
      }
    };

    initAuth();
  }, [dispatch]);

  // 초기화 중에는 로딩 표시
  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
