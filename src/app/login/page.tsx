"server-only";
import Image from "next/image";
import dumbbell from "@/assets/images/dumbbell.png";
import pushup from "@/assets/images/pushup.png";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-fitlog-50 flex min-h-screen items-center justify-center">
      <Image
        src={dumbbell}
        className="absolute top-16 left-36 h-80 w-80 opacity-70"
        alt="dumbbell"
      />
      <Image
        src={pushup}
        className="absolute right-36 bottom-16 h-80 w-80 opacity-70"
        alt="pushup"
      />
      <LoginForm />
    </div>
  );
}
