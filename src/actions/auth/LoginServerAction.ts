"use server";

import { redirect } from "next/navigation";

export default async function loginAction(formData: FormData) {
  const id = formData.get("id");
  const password = formData.get("password");

  // 로그인 api 코드 작성
  redirect("/");
}
