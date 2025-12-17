"use client";

import { Camera, LogOut, Play, User, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import greeting from "@/assets/images/greeting.png";
import { PopoverClose } from "@radix-ui/react-popover";
import ActionButton from "@/components/ui/ActionButton";
import { useLogout } from "@/lib/tanstack/mutation/logout";
import CloseButton from "@/components/ui/CloseButton";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { Profile } from "@/types/profile";
import { useGetProfile } from "@/lib/tanstack/query/profile";
import { useUpdateProfile } from "@/lib/tanstack/mutation/profile";

export default function ProfileModal() {
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { data: profileData, isLoading } = useGetProfile();
  const { mutateAsync: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isProfileImageReset, setIsProfileImageReset] =
    useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 파일 타입 체크
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("JPEG, PNG, JPG, WEBP 형식의 이미지만 업로드 가능합니다.");
        return;
      }

      setProfileImageFile(file);
      setIsProfileImageReset(false);

      // 미리보기를 위한 Data URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancleProfile = () => {
    setIsEditing(false);
    if (profileData) {
      setEditProfile(profileData);
      setProfileImage(profileData?.profileImage ?? null);
      setProfileImageFile(null);
    }
  };

  const handleSaveProfile = async () => {
    if (!editProfile) return;

    try {
      await updateProfile({
        payload: {
          username: editProfile.username,
          birthDate: editProfile.birthDate,
          bio: editProfile.bio,
        },
        profileImage: isProfileImageReset ? null : profileImageFile,
      });

      setIsEditing(false);
      setIsProfileImageReset(false);
    } catch (error) {
      alert("이름은 필수입니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileData) {
      setEditProfile(profileData);

      const img = profileData.profileImage;
      setProfileImage(
        img && (img.startsWith("http") || img.startsWith("data:")) ? img : null
      );
      setProfileImageFile(null);
    }
  }, [profileData]);

  if (isLoading || !editProfile) {
    return null;
  }

  const handleImageDelete = () => {
    setProfileImage(null);
    setProfileImageFile(null);
    setIsProfileImageReset(true);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600 hover:opacity-60 transition cursor-pointer flex items-center justify-center"
            aria-label="user menu"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필 사진"
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={6}
          className="min-w-80 p-4"
        >
          <header className="flex justify-between items-center">
            <p className="font-bold text-md text-gray-600">프로필</p>
            <PopoverClose asChild>
              <CloseButton onClick={() => setIsEditing(false)} />
            </PopoverClose>
          </header>
          <main className="flex flex-col w-full">
            <div className="flex justify-center">
              <div className="relative h-22 w-22">
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-fitlog-100">
                  <Image
                    src={profileImage ?? greeting}
                    alt="프로필 사진"
                    fill
                    className="object-cover"
                  />
                </div>
                {isEditing && (
                  <>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fitlog-500 text-white hover:bg-fitlog-600"
                    >
                      <Camera className="h-4 w-4" />
                    </label>
                    {profileImage && (
                      <button
                        onClick={handleImageDelete}
                        className="absolute -bottom-1 -left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fitlog-500 text-white hover:bg-fitlog-600"
                        aria-label="이미지 삭제"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              className={`w-full rounded-xl mt-3 space-y-3 ${isEditing ? "bg-white" : "p-3 bg-gray-100"}`}
            >
              <section>
                <p
                  className={`text-xs ${isEditing ? "text-fitlog-text" : "text-gray-400"}`}
                >
                  {isEditing ? "이름 *" : "이름"}
                </p>
                {isEditing ? (
                  <Input
                    type="text"
                    value={editProfile.username}
                    onChange={(e) =>
                      setEditProfile((prev) =>
                        prev ? { ...prev, username: e.target.value } : prev
                      )
                    }
                    className="mt-1 w-full border px-2 py-1 text-sm outline-none focus:border-fitlog-400 rounded-lg"
                  />
                ) : (
                  <p className="text-sm">{profileData?.username}</p>
                )}
              </section>
              <section>
                <p
                  className={`text-xs ${isEditing ? "text-fitlog-text" : "text-gray-400"}`}
                >
                  {isEditing ? "생년월일" : "나이"}
                </p>
                {isEditing ? (
                  <input
                    type="date"
                    value={editProfile.birthDate}
                    onChange={(e) =>
                      setEditProfile((prev) =>
                        prev ? { ...prev, birthDate: e.target.value } : prev
                      )
                    }
                    className="mt-1 w-full border px-2 py-1 text-sm outline-none focus:border-fitlog-400 rounded-lg"
                  />
                ) : (
                  <p className="text-sm">{editProfile.age}세</p>
                )}
              </section>
              <section>
                <p
                  className={`text-xs ${isEditing ? "text-fitlog-text" : "text-gray-400"}`}
                >
                  자기소개
                </p>
                {isEditing ? (
                  <textarea
                    value={editProfile?.bio ?? ""}
                    rows={2}
                    onChange={(e) =>
                      setEditProfile((prev) =>
                        prev ? { ...prev, bio: e.target.value } : prev
                      )
                    }
                    className="mt-1 w-full border px-2 py-1 text-sm outline-none focus:border-fitlog-400 rounded-lg"
                  />
                ) : (
                  <p className="text-sm">{editProfile?.bio}</p>
                )}
              </section>
            </div>

            {isEditing ? (
              <div className="mt-3 grid grid-cols-2 gap-2 w-full">
                <ActionButton
                  className="bg-white text-fitlog-text flex w-full items-center justify-center py-2 border text-sm border-fitlog-beige hover:bg-[#F1F1F1] shadow-fitlog-btn-sm"
                  onClick={handleCancleProfile}
                >
                  취소
                </ActionButton>
                <ActionButton
                  className="flex w-full items-center justify-center py-2 shadow-fitlog-btn-sm"
                  onClick={handleSaveProfile}
                  disabled={isUpdateProfilePending}
                >
                  {isUpdateProfilePending ? "저장 중..." : "저장"}
                </ActionButton>
              </div>
            ) : (
              <>
                <ActionButton
                  className="mt-3 w-full flex items-center justify-center py-2 shadow-fitlog-btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  수정
                </ActionButton>

                <ActionButton
                  onClick={() => logout()}
                  className="mt-3 w-full flex bg-white items-center justify-center py-2 text-fitlog-text border text-sm border-fitlog-beige hover:bg-[#F1F1F1] shadow-fitlog-btn-sm"
                  disabled={isLogoutPending}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLogoutPending ? "로그아웃 중..." : "로그아웃"}
                </ActionButton>
              </>
            )}
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
