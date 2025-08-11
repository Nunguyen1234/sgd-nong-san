"use client";

import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
//   Grid,
// } from "@mui/material";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import apiAxios, { BASE_URL_API } from "src/app/api/axiosConfig";
type RegisterFormProps = {
  onSwitchToRegister?: () => void;
};

type FormData = {
  userName: string;
  password: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  address: string;
};

const RegisterForm = ({}: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const [step, setStep] = useState<"register" | "otp">("register");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await apiAxios.post(`${BASE_URL_API}/auth/register`, data);
      if (res.status === 201) {
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra email để nhập mã OTP."
        );
        setEmail(data.email);
        setStep("otp");
        reset();
      }
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Lỗi đăng ký! Vui lòng thử lại sau.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) {
      toast.error("Vui lòng nhập mã OTP");
      return;
    }

    setLoading(true);
    try {
      await apiAxios.post(`${BASE_URL_API}/auth/verify`, {
        email,
        otpCode,
      });
      toast.success("Xác minh tài khoản thành công!");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Mã OTP không đúng hoặc đã hết hạn!");
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Không tìm thấy email để gửi lại OTP");
      return;
    }
    setLoadingResend(true);
    try {
      await apiAxios.post(`${BASE_URL_API}/auth/resend-otp`, { email });
      toast.success("Mã OTP đã được gửi, vui lòng xem lại email!");
    } catch (error) {
      console.log(error);

      toast.error("Gửi lại OTP thất bại, vui lòng thử lại!");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/images/bt1.png')" }}
    >
      <div
        data-aos="fade-down-left"
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl px-6 py-8 animate-fade-in overflow-y-auto max-h-[90vh] border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
          {step === "register" ? "Đăng ký" : "Xác minh tài khoản"}
        </h1>

        {step === "register" ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "userName", label: "Tên đăng nhập" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Số điện thoại" },
                { name: "city", label: "Tỉnh/Thành phố" },
                { name: "district", label: "Quận/Huyện" },
                { name: "address", label: "Địa chỉ chi tiết" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    placeholder={field.label}
                    type={field.type || "text"}
                    className="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300 shadow-input 
        transition duration-300 group-hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register(field.name as keyof FormData, {
                      required: `${field.label} là bắt buộc`,
                      ...(field.name === "email" && {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Email không hợp lệ",
                        },
                      }),
                    })}
                  />
                  {errors[field.name as keyof FormData] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                  })}
                  placeholder="Mật khẩu"
                  className="w-full px-4 pr-10 py-3 rounded-md bg-white text-black border border-gray-300 shadow-input 
               transition duration-300 group-hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 flex justify-center items-center"
            >
              {loading ? <span className="loader" /> : "Đăng ký"}
            </button>
          </form>
        ) : (
          <div className="mt-4">
            <p className="text-center text-gray-700 mb-2">
              Vui lòng nhập mã OTP đã được gửi đến email:{" "}
              <strong>{email}</strong>
            </p>
            <input
              type="text"
              placeholder="Mã OTP"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 flex justify-center items-center"
            >
              {loading ? <span className="loader" /> : "Xác minh"}
            </button>
            {/* Gửi lại OTP */}
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 flex justify-center items-center"
            >
              {loading ? <span className="loader" /> : "Gửi lại mã OTP"}
            </button>
            <button
              onClick={handleResendOtp}
              disabled={loadingResend}
              className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 flex justify-center items-center"
            >
              {loadingResend ? <span className="loader" /> : "Gửi lại mã OTP"}
            </button>
          </div>
        )}

        {step === "register" && (
          <p className="text-center text-sm mt-6 text-gray-700">
            Đã có tài khoản?{" "}
            <span
              className="text-teal-600 font-medium  cursor-pointer hover:text-teal-800"
              onClick={() => router.push("/auth/login")}
            >
              Đăng nhập
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
