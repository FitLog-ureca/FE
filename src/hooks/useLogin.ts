import { LoginFormData } from "@/types/auth";
import { useState } from "react";

export default function useAuthValidation() {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    id: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    loginFormData,
    setLoginFormData,
    handleLoginChange,
  };
}
