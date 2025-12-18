import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 내부 리소스 / 정적 파일 / API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 공개 경로
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // todos 진입 가드
  if (pathname.startsWith("/todos")) {
    const canEnterTodos = req.cookies.get("canEnterTodos")?.value;

    if (!canEnterTodos) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 인증 가드
  const refreshToken = req.cookies.get("refreshToken");

  if (!refreshToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
