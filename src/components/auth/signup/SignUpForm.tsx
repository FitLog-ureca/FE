"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "@/components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import FitlogLogo from "@/components/ui/FitLogLogo";
import useSignUp from "@/hooks/useSignUp";
import signupAction from "@/actions/auth/SignUpServerAction";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    signupFormData,
    isSamePassword,
    handleSignUpChange,
    isPasswordLengthValid,
    isFormValid,
    isBirthValid,
  } = useSignUp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isFormValid) {
      e.preventDefault();
    }
    console.log("회원가입 성공", signupFormData);
  };

  return (
    <form action={signupAction} onSubmit={handleSubmit}>
      <div className="flex h-194 w-96 flex-col items-center rounded-xl bg-white border-fitlog-beige border shadow-fitlog-form">
        <div className="flex flex-row items-center justify-center py-14">
          <FitlogLogo size={48} />
          <p className="text-fitlog-500 text-4xl font-extrabold ml-4">FitLog</p>
        </div>

        <div className="flex w-full flex-col px-8">
          <p className="mb-2 ml-1">이름</p>
          <Input
            type="text"
            placeholder="이름"
            className="w-full px-3"
            required
            name="name"
            onChange={handleSignUpChange}
          />
        </div>
        <div className="mt-6 flex w-full flex-col px-8">
          <p className="mb-2 ml-1">아이디</p>
          <Input
            type="text"
            placeholder="아이디"
            className="w-full px-3"
            required
            name="id"
            onChange={handleSignUpChange}
          />
        </div>
        <div className="mt-6 flex w-full flex-col px-8">
          <p className="mb-2 ml-1">비밀번호</p>
          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="w-full pr-10 px-3"
              required
              name="password"
              onChange={handleSignUpChange}
            />
            {showPassword ? (
              <EyeOff
                onClick={() => setShowPassword(false)}
                className="text-fitlog-beige absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer stroke-1 hover:text-[#d7d0ce]"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="text-fitlog-beige absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer stroke-1 hover:text-[#d7d0ce]"
              />
            )}
          </div>
          {signupFormData.password.length > 0 && !isPasswordLengthValid && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              * 비밀번호는 8자 이상이어야 합니다.
            </p>
          )}
        </div>
        <div className="mt-6 flex w-full flex-col px-8">
          <p className="mb-2 ml-1">비밀번호 확인</p>
          <div className="relative w-full">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              className="w-full pr-10 px-3"
              required
              name="confirmPassword"
              onChange={handleSignUpChange}
            />
            {showConfirmPassword ? (
              <EyeOff
                onClick={() => setShowConfirmPassword(false)}
                className="text-fitlog-beige absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer stroke-1 hover:text-[#d7d0ce]"
              />
            ) : (
              <Eye
                onClick={() => setShowConfirmPassword(true)}
                className="text-fitlog-beige absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer stroke-1 hover:text-[#d7d0ce]"
              />
            )}
          </div>
          {signupFormData.confirmPassword.length > 0 && !isSamePassword && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              * 비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        <div className="mt-6  flex w-full flex-col px-8">
          <p className="mb-2 ml-1">생년월일</p>
          <Input
            type="date"
            placeholder="YYYY.MM.DD"
            className="w-full px-3"
            required
            name="birth"
            onChange={handleSignUpChange}
          />
          {!signupFormData.birth && !isBirthValid && (
            <p className="text-red-500 text-sm mt-1">
              * 올바른 생년월일을 입력해주세요.
            </p>
          )}
        </div>
        <div className="mt-7 flex w-full flex-col px-8">
          <ActionButton className="px-3 py-2.5" type="submit">
            회원가입
          </ActionButton>
          <div className="mt-5 flex flex-row justify-center text-sm">
            <p>이미 계정이 있으신가요?</p>
            <Link
              href={"/login"}
              className="text-fitlog-500 hover:text-fitlog-700 ml-3 font-bold"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
