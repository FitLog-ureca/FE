// JS 메모리(새로고침 시 초기화) 기반 토큰 저장소
let accessToken: string | null = null;

export const tokenStore = {
  get() {
    return accessToken;
  },
  set(token: string | null) {
    accessToken = token;
  },
  clear() {
    accessToken = null;
  },
};
