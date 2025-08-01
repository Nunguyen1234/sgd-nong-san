"use client";
import { useEffect } from "react";
import LoginForm from "../../../../component/Auth/login/LoginForm";
import AOS from "aos";
import "aos/dist/aos.css";
export default function LoginPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return <LoginForm onSwitchToRegister={() => {}} mode={"admin"} />;
}
