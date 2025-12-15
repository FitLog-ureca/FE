"use client";

import { Camera, LogOut, Play, User } from "lucide-react";
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
import { useState } from "react";
import Input from "@/components/ui/Input";
import { Profile } from "@/types/profile";

const mockData = {
  name: "박준형",
  age: 28,
  bio: "테스트",
  profileImage: "text",
  birthDate: "2025-12-15",
};

export default function ProfileModal() {
  const { mutate: logout, isPending } = useLogout();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>(mockData);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancleProfile = () => {
    setIsEditing(false);
    setProfile(mockData);
    setProfileImage(null);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("저장", profile);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-1 border-2 border-gray-600 rounded-full hover:opacity-60 transition cursor-pointer flex items-center justify-center"
            aria-label="user menu"
          >
            <User className="w-6 h-6 text-gray-600" />
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
              <CloseButton />
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
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fitlog-500 text-white hover:bg-fitlog-600"
                    >
                      <Camera className="h-4 w-4" />
                    </label>
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
                  이름
                </p>
                {isEditing ? (
                  <Input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1 w-full border px-2 py-1 text-sm outline-none focus:border-fitlog-400 rounded-lg"
                  />
                ) : (
                  <p className="text-sm">{profile.name}</p>
                )}
              </section>
              <section>
                <p
                  className={`text-xs ${isEditing ? "text-fitlog-text" : "text-gray-400"}`}
                >
                  나이
                </p>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        birthDate: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border px-2 py-1 text-sm outline-none focus:border-fitlog-400 rounded-lg"
                  />
                ) : (
                  <p className="text-sm">{profile.age}세</p>
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
                    value={profile.bio}
                    rows={2}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    className="mt-1 w-full border px-2 py-1 text-sm outline-none focus:border-fitlog-400 rounded-lg"
                  />
                ) : (
                  <p className="text-sm">{profile.bio}</p>
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
                >
                  저장
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
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isPending ? "로그아웃 중..." : "로그아웃"}
                </ActionButton>
              </>
            )}
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
