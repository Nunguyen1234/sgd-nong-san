"use client";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../src/styles/input-shine.css";

// import {
//   Box,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import SaveIcon from "@mui/icons-material/Save";
// import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import apiAxios, { BASE_URL_API } from "src/app/api/axiosConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type LoginFormInputs = {
  email: string;
  password: string;
};

type LoginFormProps = {
  mode: "admin" | "user";
  onSwitchToRegister?: () => void;
};
type LoginResponse = {
  success: boolean;
  data: {
    id: number;
    email: string;
    role: string;
    access_token: string;
    refresh_token: string;
  };
};
type ForgetPasswordResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

export default function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [openOtp, setOpenOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Dữ liệu gửi login:", data);
    setLoading(true);
    const toastId = toast.loading("Đang đăng nhập...");
    try {
      const res = await apiAxios.post<LoginResponse>(
        `${BASE_URL_API}/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("Login response:", res);

      const user = res.data.data;
      if (!user?.access_token) {
        toast.error("Không nhận được token!", { id: toastId });
        return;
      }
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user_id", user.id.toString());
      localStorage.setItem("refresh_token", user.refresh_token);
      setTimeout(() => {
        toast.dismiss(toastId);
        router.push("/dashboard?login=success");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Sai tài khoản hoặc mật khẩu!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("Vui lòng nhập email đã đăng ký");
      return;
    }

    const toastId = toast.loading("Vui lòng kiểm tra email của bạn.");
    try {
      const res = await apiAxios.post<ForgetPasswordResponse>(
        `${BASE_URL_API}/auth/forget-password`,
        { email: forgotEmail }
      );

      if (res.data.success) {
        toast.success("Mã OTP đã được gửi tới email của bạn!", { id: toastId });
        setOpenForgot(false);
        setOpenOtp(true);
      } else {
        toast.error(res.data.message || "Không tìm thấy email!", {
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Lỗi khi gửi yêu cầu quên mật khẩu!", { id: toastId });
    }
  };

  const handleConfirmOtp = async () => {
    if (!forgotEmail || !otpCode || !newPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const toastId = toast.loading("Đang xác minh...");
    try {
      const res = await apiAxios.post<ForgetPasswordResponse>(
        `${BASE_URL_API}/auth/confirm-password`,
        {
          email: forgotEmail,
          otpCode,
          newPassword,
        }
      );

      if (res.data?.success) {
        toast.success("Đổi mật khẩu thành công!", { id: toastId });
        setOpenOtp(false);
        setOtpCode("");
        setNewPassword("");
      } else {
        toast.error("Mã OTP không hợp lệ!", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Xác minh OTP thất bại!", { id: toastId });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: 'url("/images/br.png")' }}
    >
      <div
        data-aos="fade-down-right"
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg text-white"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="input-shine-wrapper mb-4"> */}
          {/* <div className="input-shine" /> */}
          <div
            className="group relative rounded-lg mb-4 p-[2px] transition duration-300"
            style={{
              background:
                "radial-gradient(0px at 50% 50%, rgb(59, 130, 246), transparent 80%)",
            }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email là bắt buộc" })}
              placeholder="Email"
              className="w-full   px-4 py-3 rounded-md bg-white text-black border border-gray-300 shadow-input transition duration-300 group-hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-400 relative z-10"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          {/* </div> */}

          {/* <div className="input-shine-wrapper mb-2"> */}
          <div className="input-shine" />
          <div
            className="group relative rounded-lg p-[2px] transition duration-300"
            style={{
              background:
                "radial-gradient(0px at 50% 50%, rgb(59, 130, 246), transparent 80%)",
            }}
          >
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
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* </div> */}

          <div
            className="text-blue-600 font-semibold text-right text-sm cursor-pointer mt-4 mb-4 hover:text-blue-700 transition-all duration-200 animate-pulse flex items-center justify-end gap-1"
            onClick={() => setOpenForgot(true)}
          >
            Quên mật khẩu?
          </div>
          <button
            type="submit"
            className="  w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm mb-2">
          Chưa có tài khoản?{" "}
          <span
            className="text-[oklch(83.7%_0.22_142.5)] font-semibold cursor-pointer hover:brightness-110 transition"
            onClick={() => router.push("/auth/register")}
          >
            Đăng ký
          </span>
        </p>

        {openForgot && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm text-black">
              <h3 className="text-lg font-semibold mb-2">Quên mật khẩu</h3>
              <p className="text-sm text-gray-600 mb-4">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-orange-500 mr-2"
                />
                Vui lòng nhập email đã đăng ký trước đó!
              </p>
              {/* <input
              {...register("email", { required: "Email không được để trống" })}
              type="email"
              placeholder="Email đăng nhập"
              className="w-full bg-white text-black p-3 rounded-md outline-none"
            /> */}
              <input
                type="email"
                placeholder="Email đã đăng ký"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300 shadow-input transition duration-300 group-hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              />
              <div className="flex justify-end gap-2 mb-2">
                <button
                  onClick={() => setOpenForgot(false)}
                  className="text-gray-600"
                >
                  Hủy
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}

        {openOtp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm text-black">
              <h3 className="text-lg font-semibold mb-2">Xác minh OTP</h3>
              <input
                type="text"
                placeholder="Mã OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border p-2 rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpenOtp(false)}
                  className="text-gray-600"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmOtp}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
