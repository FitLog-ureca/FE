"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import Input from "@/components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import loginAction from "@/actions/auth/LoginServerAction";
import FitlogLogo from "@/components/ui/FitLogLogo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await loginAction(formData);

        if (!result.success) {
          setError(result.message || "로그인에 실패했습니다.");
          return;
        }
        // access token 저장
        if (result.accessToken) {
          setAuth(result.accessToken, {
            loginId: result.loginId,
            name: result.name,
          });
        }

        router.push("/");
        router.refresh();
      } catch (error) {
        console.error(error);
        setError("로그인 처리 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <>
      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex h-120 w-96 flex-col items-center rounded-xl bg-white border-fitlog-beige border shadow-fitlog-form">
          <div className="flex flex-row items-center justify-center py-14">
            <FitlogLogo size={48} />
            <p className="text-fitlog-500 text-4xl font-extrabold ml-4">
              FitLog
            </p>
          </div>

          <div className="flex w-full flex-col px-8">
            <p className="mb-2 ml-1">아이디</p>
            <Input
              type="text"
              placeholder="아이디"
              className="w-full px-3"
              required
              name="id"
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
          </div>
          <div className="mt-7 flex w-full flex-col px-8">
            <ActionButton
              className="px-3 py-2.5"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "로그인 중 ..." : "로그인"}
            </ActionButton>
            <div className="mt-7 flex flex-row justify-center text-sm">
              <p>FitLog가 처음이신가요?</p>
              <Link
                href={"/signup"}
                className="text-fitlog-500 hover:text-fitlog-700 ml-3 font-bold"
              >
                계정 만들기
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
