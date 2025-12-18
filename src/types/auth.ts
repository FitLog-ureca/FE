export interface LoginFormData {
  id: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  id: string;
  password: string;
  confirmPassword: string;
  birth: string;
}

export interface User {
  loginId: string;
  name: string;
}

// 토큰 관련 타입
export interface AuthState {
  accessToken: string | null; // JWT AccessToken (메모리 저장)
  user: User | null; // 사용자 정보
  isInitializing: boolean; // 앱 초기화 중인지 여부
}
