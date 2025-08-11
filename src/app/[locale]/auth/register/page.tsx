"use client";
import { useEffect } from "react";
// import RegisterForm from "../../../../component/Auth/register/RegisterForm";
import Aos from "aos";
import { Toaster } from "react-hot-toast";
import RegisterForm from "component/Auth/register/RegisterForm";

export default function RegisterPage() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <>
      <Toaster position="top-center" />
      <RegisterForm onSwitchToRegister={() => {}} />
    </>
  );
}
