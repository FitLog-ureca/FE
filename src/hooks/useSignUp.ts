import { SignUpFormData } from "@/types/auth";
import { useState } from "react";

export default function useSignUp() {
  const [signupFormData, setSignupFormData] = useState<SignUpFormData>({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
    birth: "",
  });

  const isPasswordLengthValid = signupFormData.password.length >= 8;

  const isSamePassword =
    signupFormData.password === signupFormData.confirmPassword;

  const isBirthValid = () => {
    if (!signupFormData.birth) return false;

    const today = new Date();
    const birthDate = new Date(signupFormData.birth);

    return birthDate <= today;
  };

  // 모든 검증을 통과한 경우만 true (회원가입 버튼 활성화 조건)
  const isFormValid = isPasswordLengthValid && isSamePassword && isBirthValid;

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    signupFormData,
    setSignupFormData,
    isSamePassword,
    handleSignUpChange,
    isPasswordLengthValid,
    isFormValid,
    isBirthValid,
  };
}
