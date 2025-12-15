import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "@/store/tokenStore";
import { authEvents } from "@/store/authEvents";

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // refresh cookie 자동 포함
});

// 요청 시 access token 자동 첨부
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// refresh 락 + 대기열
let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

function resolveQueue(token: string) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    // 401 아니면 그대로 throw
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }
    // 로그아웃 중에는 토큰 재발급 로직 시도하지 못하게 처리
    const isLogoutCall =
      typeof originalRequest.url === "string" &&
      originalRequest.url.includes("/auth/logout");

    if (isLogoutCall) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(error);
    }

    // refresh 요청 자체가 401이면 -> 로그아웃 처리
    const isRefreshCall =
      typeof originalRequest.url === "string" &&
      originalRequest.url.includes("/auth/refresh");
    if (isRefreshCall) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(error);
    }

    // 이미 재시도한 요청이면 -> 로그아웃 처리(무한루프 방지)
    if (originalRequest._retry) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // refresh 중이면 큐에 넣고 새 토큰 받으면 재시도
    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      // refresh 호출 (쿠키로 RT 전송)
      const { data } = await apiClient.post("/auth/refresh");

      const newAccessToken: string | undefined = data?.accessToken;
      if (!newAccessToken)
        throw new Error("No accessToken in refresh response");

      tokenStore.set(newAccessToken);
      resolveQueue(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (e) {
      tokenStore.clear();
      authEvents.emitLogout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
