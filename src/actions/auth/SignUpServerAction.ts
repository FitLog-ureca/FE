"use server";

export default async function signupAction(formData: FormData) {
  const name = formData.get("name");
  const loginId = formData.get("id");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const birthRaw = formData.get("birth") as string;
  const birth = new Date(birthRaw).toISOString().split("T")[0];

  // 1) 빈 값 체크
  if (!name || !loginId || !password || !confirmPassword || !birth) {
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

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          loginId,
          password,
          passwordCheck: confirmPassword,
          birth,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data?.message || "회원가입 실패",
      };
    } else {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.error("회원가입 에러", error);
    return {
      success: false,
      message: "회원가입 처리 중 오류가 발생했습니다.",
    };
  }
}
