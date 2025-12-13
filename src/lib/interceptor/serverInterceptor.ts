import { cookies } from "next/headers";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();

  // refreshToken만 쿠키에 있음 (HttpOnly)
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // AccessToken은 SSR에서 읽지 않는다
  // CSR에서 react-query로 요청 시 axios가 AccessToken을 사용
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    cache: "no-store",
    credentials: "include",
    headers: {
      ...options.headers,
      Cookie: refreshToken ? `refreshToken=${refreshToken}` : "",
    },
  });

  return res;
}
