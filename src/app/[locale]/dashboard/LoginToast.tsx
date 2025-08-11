// components/LoginToast.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const LoginToast = () => {
  const searchParams = useSearchParams();
  const loginSuccess = searchParams.get("login");

  useEffect(() => {
    if (loginSuccess === "success") {
      const timeout = setTimeout(() => {
        toast.success("Đăng nhập thành công!", { duration: 4000 });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [loginSuccess]);

  return null;
};

export default LoginToast;
