import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("canEnterTodos", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
  return res;
}
