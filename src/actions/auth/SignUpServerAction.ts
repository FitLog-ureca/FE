"use server";

import { redirect } from "next/navigation";

export default async function signupAction(formData: FormData) {
  const name = formData.get("name");
  const id = formData.get("id");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const birth = formData.get("birth");

  // 1) 빈 값 체크
  if (!name || !id || !password || !confirmPassword || !birth) {
    throw new Error("모든 값을 입력해주세요.");
  }
  // 2) 비밀번호 길이 검증
  if (!password || String(password).length < 8) {
    throw new Error("비밀번호는 8자 이상이어야 합니다.");
  }
  // 3) 비밀번호 확인 검증
  if (password !== confirmPassword) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  redirect("/login");
}
