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

  // JSON 데이터를 Blob으로 변환하여 추가
  const profileBlob = new Blob(
    [
      JSON.stringify({
        username: payload.username,
        birthDate: payload.birthDate,
        bio: payload.bio,
      }),
    ],
    { type: "application/json" }
  );
  formData.append("profile", profileBlob);

  if (profileImage === null) {
    // 삭제를 위해 빈 Blob 전송하지 않음
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
