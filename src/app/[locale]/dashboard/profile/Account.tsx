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
  MenuItem,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import type { FormData } from "./FormData/user";
import Image from "next/image";
import apiAxios from "src/app/api/axiosConfig";
const AccountInfoForm = () => {
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("access_token");
    if (!userId || !token) return;

    apiAxios
      .get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const avatarUrl = res.data?.data?.avatar;
        if (avatarUrl) {
          setAvatar(avatarUrl);
          // localStorage.setItem("avatar", avatarUrl);
        }
      })
      .catch((err) => {
        console.error("Không lấy được avatar từ backend:", err);
      });
  }, []);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("gender", data.gender || "");

    // formData.append("nameCompany", data.nameCompany || "");
    formData.append("city", data.city || "");
    formData.append("district", data.district || "");
    formData.append("address", data.address || "");

    const files =
      data.avatar instanceof FileList ? Array.from(data.avatar) : data.avatar;
    if (files && files.length > 0) {
      formData.append("avatar", files[0]);
    }

    // console.log(data.avatar);

    try {
      const res = await apiAxios.put(`/auth/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageUrl = res.data?.data?.imageUrl;
      if (uploadedImageUrl) {
        localStorage.setItem("avatar", uploadedImageUrl);
        setAvatar(uploadedImageUrl);
        setPreviewImage(uploadedImageUrl);
        window.dispatchEvent(new Event("avatar-updated"));
      }

      enqueueSnackbar("Cập nhật hồ sơ thành công!", { variant: "success" });
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      enqueueSnackbar("Cập nhật thất bại!", { variant: "error" });
    }
  };

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
        if (typeof response.data.data.avatar === "string") {
          setAvatar(response.data.data.avatar);
        }
      } catch (error) {
        enqueueSnackbar("Không thể tải hồ sơ người dùng", { variant: "error" });
        console.error("Lỗi khi lấy hồ sơ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

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
        mb={2}
        sx={{ textAlign: "left" }}
      >
        Thông tin tài khoản
      </Typography>
      <Typography color="text.secondary" mb={2} sx={{ textAlign: "left" }}>
        Thông tin địa chỉ liên lạc
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
            label="Giới tính"
            fullWidth
            select
            {...register("gender", { required: "Vui lòng chọn giới tính" })}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            sx={{
              "& .MuiSelect-select": { textAlign: "left" },
            }}
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </TextField>{" "}
        </Grid>

        {/* <Grid size={{ xs: 12 }}>
          <TextField
            label="Tên công ty"
            fullWidth
            {...register("nameCompany")}
          />
        </Grid> */}

        <Grid size={{ xs: 12 }}>
          <TextField label="Tỉnh / Thành phố" fullWidth {...register("city")} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Quận / Huyện" fullWidth {...register("district")} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Địa chỉ" fullWidth {...register("address")} />
        </Grid>

        <Grid
          size={{ xs: 12 }}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Box>
            <Image
              src={previewImage || avatar || "/images/default-avatar.png"}
              alt="Ảnh đại diện"
              width={64}
              height={64}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #ccc",
              }}
            />
          </Box>

          {/* Chọn ảnh */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Ảnh đại diện (nếu có)
            </Typography>
            <Button variant="outlined" component="label">
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const previewUrl = URL.createObjectURL(files[0]);
                    setPreviewImage(previewUrl);
                    setValue("avatar", files);
                    console.log("Ảnh đã chọn:", files[0]);
                  }
                }}
              />
            </Button>
          </Box>
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
