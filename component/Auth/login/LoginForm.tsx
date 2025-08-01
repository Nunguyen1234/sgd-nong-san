"use client";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import apiAxios, { BASE_URL_API } from "@/app/api/axiosConfig";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  userName: string;
  password: string;
};
// type dataUser = {
//   id: number;
//   email: string;
//   role: string;
//   access_token: string;
// };

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
  };
};
type ForgetPasswordResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

export default function LoginForm({ mode }: LoginFormProps) {
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
    setLoading(true);
    const toastId = toast.loading("Đang đăng nhập...");

    try {
      const res = await apiAxios.post<LoginResponse>(
        `${BASE_URL_API}/login`,
        data
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

      toast.success("Đăng nhập thành công!", { id: toastId });
      if (mode === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
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
        `${BASE_URL_API}/forget-password`,
        {
          email: forgotEmail,
          otpCode,
          newPassword,
        }
      );

      if (res.data.success) {
        toast.success("Mã OTP đã được gửi tới email của bạn!", { id: toastId });
        setOpenForgot(false);
        setOpenOtp(true);
      } else {
        toast.error("Không tìm thấy email!", { id: toastId });
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
        `${BASE_URL_API}/confirm-password`,
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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage: 'url("/images/br.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{ width: "100%", maxWidth: 480, p: 4, borderRadius: 3 }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            background: "linear-gradient(to right, #3b82f6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            {...register("userName", {
              required: "Tên đăng nhập không được để trống",
            })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            label="Mật khẩu"
            fullWidth
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Typography
              onClick={() => setOpenForgot(true)}
              sx={{
                mt: 1,
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "underline",
                color: "#3b82f6",
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Box>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </LoadingButton>

          <Typography align="center" sx={{ mt: 3 }}>
            Chưa có tài khoản?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                background: "linear-gradient(to right, #22c55e, #14b8a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Đăng ký
            </span>
          </Typography>
        </form>
      </Paper>
      {/* Modal Quên Mật Khẩu */}
      <Dialog
        open={openForgot}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setOpenForgot(false);
          }
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>Quên mật khẩu</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email đã đăng ký"
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgot(false)}>Hủy</Button>
          <Button onClick={handleForgotPassword} variant="contained">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openOtp}
        onClose={() => {
          setOpenOtp(false);
          setOtpCode("");
          setNewPassword("");
        }}
      >
        <DialogTitle>Xác minh OTP</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Mã OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOtp(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleConfirmOtp}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
