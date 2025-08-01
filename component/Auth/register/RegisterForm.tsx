// RegisterForm.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import apiAxios, { BASE_URL_API } from "@/app/api/axiosConfig";
import toast from "react-hot-toast";
import { registerSchema } from "./registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";

type RegisterFormProps = {
  onSwitchToRegister?: () => void;
};

type FormData = {
  userName: string;
  password: string;
  email: string;
  phone: string;
  nameCompany: string;
  city: string;
  district: string;
  address: string;
};

const RegisterForm = ({ onSwitchToRegister }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await apiAxios.post(`${BASE_URL_API}/register`, data);
      console.log(" Dữ liệu form:", data);
      if (res.status === 201) {
        toast.success("Đăng ký thành công! Mời bạn đăng nhập.", {
          duration: 4000,
        });
        reset();
        setTimeout(() => router.push("/auth/login"), 2000);
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

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage: 'url("/images/bt1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={8}
        data-aos="fade-down-left"
        sx={{
          width: "100%",
          maxWidth: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          p: 4,
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            background: "linear-gradient(to right, #10b981, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Đăng ký
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[
              { name: "userName", label: "Tên đăng nhập" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Số điện thoại" },
              { name: "nameCompany", label: "Tên công ty" },
              { name: "city", label: "Tỉnh/Thành phố" },
              { name: "district", label: "Quận/Huyện" },
              { name: "address", label: "Địa chỉ chi tiết" },
            ].map((field) => (
              <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
                <TextField
                  label={field.label}
                  fullWidth
                  {...register(field.name as keyof FormData, {
                    required: `${field.label} là bắt buộc`,
                  })}
                  error={!!errors[field.name as keyof FormData]}
                  helperText={errors[field.name as keyof FormData]?.message}
                />
              </Grid>
            ))}

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Đăng ký"}
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 3 }}>
          Đã có tài khoản?{" "}
          <span
            onClick={onSwitchToRegister ?? (() => router.push("/auth/login"))}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              background: "linear-gradient(to right, #22c55e, #14b8a6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Đăng nhập
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
