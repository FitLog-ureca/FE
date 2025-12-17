export interface UpdateProfile {
  username: string;
  bio: string;
  birthDate: string;
}

export interface Profile extends UpdateProfile {
  age: number;
  profileImage: string | null;
}

// 프로필 수정 param을 위한 타입
export interface UpdateProfileParams {
  payload: UpdateProfile;
  profileImage?: File | null;
}
