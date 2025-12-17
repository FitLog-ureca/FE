import { apiClient } from "@/lib/interceptor/clientInterceptor";
import { Profile, UpdateProfileParams } from "@/types/profile";

// 프로필 조회
export async function getProfileApi(): Promise<Profile> {
  const res = await apiClient.get("/profile/me");
  if (!res.data) {
    throw new Error("프로필 조회 실패");
  }
  return res.data;
}

// 프로필 수정
export async function updateProfileApi({
  payload,
  profileImage,
}: UpdateProfileParams): Promise<Profile> {
  const formData = new FormData();
  if (payload.username) {
    formData.append("username", payload.username);
  }
  if (payload.birthDate) {
    formData.append("birthDate", payload.birthDate);
  }
  if (payload.bio) {
    formData.append("bio", payload.bio);
  }

  // 이미지 처리
  if (profileImage === null) {
  } else if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const res = await apiClient.put<Profile>("/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!res.data) {
    throw new Error("프로필 수정 실패");
  }
  return res.data;
}
