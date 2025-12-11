// 기존 middleware.ts

import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Next.js 내부 리소스 경로나 공개 라우트는 통과
  if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("refreshToken")?.value;

  // 로그인 안 되어있으면 redirect
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Refresh 요청
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (!refreshRes.ok) throw new Error("Refresh failed");

    // accessToken/refreshToken 재발급 쿠키 전달
    const response = NextResponse.next();
    const setCookie = refreshRes.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
