"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import apiAxios from "@/app/api/axiosConfig";
import { enqueueSnackbar } from "notistack";
import type { FormData } from "../profile/FormData/user";

const AccountInfoForm = () => {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<FormData>();

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");
      if (!userId || !token) return;

      try {
        const response = await apiAxios.get<{ data: FormData }>(
          `/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("DATA:", response.data);
        reset(response.data.data);
      } catch (error) {
        enqueueSnackbar("Không thể tải hồ sơ người dùng", { variant: "error" });
        console.error("Lỗi khi lấy hồ sơ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await apiAxios.put(`/profile`, data);
      enqueueSnackbar("Cập nhật hồ sơ thành công!", { variant: "success" });
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      enqueueSnackbar("Cập nhật thất bại!", { variant: "error" });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ textAlign: "left" }}
        gutterBottom
      >
        Thông tin tài khoản
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Họ tên"
            fullWidth
            {...register("userName", { required: "Vui lòng nhập họ tên" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Email"
            fullWidth
            {...register("email", { required: "Vui lòng nhập email" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Số điện thoại" fullWidth {...register("phone")} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Tên công ty"
            fullWidth
            {...register("nameCompany")}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Tỉnh / Thành phố" fullWidth {...register("city")} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Quận / Huyện" fullWidth {...register("district")} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Địa chỉ" fullWidth {...register("address")} />
        </Grid>

        <Grid size={{ xs: 2, md: 2 }}>
          <Button type="submit" variant="contained" fullWidth size="small">
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountInfoForm;
