"use server";

import { cookies } from "next/headers";

export default async function loginAction(formData: FormData) {
  const loginId = formData.get("id");
  const password = formData.get("password");

  if (!loginId || !password) {
    return {
      success: false,
      message: "아이디와 비밀번호를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId,
          password,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
      };
    }

    const data = await response.json();

    // Refresh Token만 쿠키에 저장 (Set-Cookie 헤더에서 파싱)
    // Access Token은 응답 body에 있으므로 클라이언트에서 별도 관리
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const refreshTokenMatch = setCookieHeader.match(/refreshToken=([^;]+)/);
      if (refreshTokenMatch) {
        const refreshToken = refreshTokenMatch[1];
        (await cookies()).set({
          name: "refreshToken",
          value: refreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7일
        });
      }
    }

    return {
      success: true,
      accessToken: data.accessToken,
      loginId: data.loginId,
      name: data.name,
    };
  } catch (error) {
    console.error("로그인 에러:", error);
    return {
      success: false,
      message: "로그인 처리 중 오류가 발생했습니다.",
    };
  }
}
