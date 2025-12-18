import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "@/store/redux/features/auth/tokenStore";
import { authEvents } from "@/store/redux/features/auth/authEvents";
import { store } from "@/store/redux/store";

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // refresh cookie 자동 포함
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// - 요청 인터셉터: 모든 요청에 AccessToken 자동 첨부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Redux에서 토큰 가져오기
  const token = store.getState().auth.accessToken;

  // Authorization 헤더에 Bearer 토큰 추가
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// - 응답 인터셉터: 401 에러 시 자동으로 토큰 갱신
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Refresh 중복 방지 플래그
let isRefreshing = false;
// Refresh 대기 중인 요청들
let queue: Array<(token: string) => void> = [];

// 대기 중인 요청들을 새 토큰으로 재시도
function resolveQueue(token: string) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Case 1: 401 에러가 아니면 그대로 throw
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Case 2: 로그아웃 요청이 401이면 → 그냥 로그아웃 처리
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const isLogoutCall =
      typeof originalRequest.url === "string" &&
      originalRequest.url.includes("/auth/logout");

    if (isLogoutCall) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(error);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Case 3: Refresh 요청 자체가 401이면 → 완전히 로그아웃
    // (RefreshToken도 만료됨)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const isRefreshCall =
      typeof originalRequest.url === "string" &&
      originalRequest.url.includes("/auth/refresh");
    if (isRefreshCall) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(error);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Case 4: 이미 재시도한 요청이 또 401이면 → 로그아웃
    // (무한 루프 방지)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (originalRequest._retry) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(error);
    }

    // 재시도 플래그 설정
    originalRequest._retry = true;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Case 5: 이미 다른 요청이 Refresh 중이면 → 큐에 대기
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((newToken: string) => {
          // 새 토큰으로 헤더 교체
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // 원래 요청 재시도
          resolve(apiClient(originalRequest));
        });
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Case 6: Refresh 시도
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    isRefreshing = true;

    try {
      // refresh 호출 (쿠키로 RefreshToken 자동 전송)
      const { data } = await apiClient.post("/auth/refresh");

      const newAccessToken: string | undefined = data?.accessToken;
      if (!newAccessToken)
        throw new Error("No accessToken in refresh response");

      // 새 토큰을 redux에 저장
      tokenStore.set(newAccessToken);

      // 대기 중인 모든 요청에 새 토큰 전달
      resolveQueue(newAccessToken);

      // 원래 요청도 새 토큰으로 재시도
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (e) {
      // refresh 실패 시 완전 로그아웃 처리
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
