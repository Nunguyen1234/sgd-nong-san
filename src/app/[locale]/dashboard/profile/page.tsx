"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  CircularProgress,
  Container,
  Grid,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import ContactInfoForm from "./ContactInfoForm";
import Trademark from "./Trademark";
import AccountInfoForm from "./Account";
import type { FormData } from "../profile/FormData/user";
import Establish from "./Establish";
import apiAxios from "src/app/api/axiosConfig";

// const getAuthHeaders = () => {
//   const token = localStorage.getItem("access_token");
//   return {
//     Authorization: `Bearr e${token}`,
//   };
// };

const ProfilePage = () => {
  const methods = useForm<FormData>();
  const { enqueueSnackbar } = useSnackbar();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("access_token");
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setAvatarUrl(storedAvatar);
    }
    const fetchProfile = async () => {
      if (!userId || !token) return;

      try {
        const response = await apiAxios.get<FormData>(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        methods.reset(response.data);
        const avatar = response.data.avatar;
        if (typeof avatar === "string") {
          setAvatarUrl(avatar);
          localStorage.setItem("avatar", avatar);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        enqueueSnackbar("Không thể tải hồ sơ người dùng", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    const handleAvatarUpdate = () => {
      const newAvatar = localStorage.getItem("avatar");
      if (newAvatar) setAvatarUrl(newAvatar);
    };

    window.addEventListener("avatar-updated", handleAvatarUpdate);
    return () =>
      window.removeEventListener("avatar-updated", handleAvatarUpdate);
  }, [methods, enqueueSnackbar]);

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundImage: "url('/images/backgrond.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container maxWidth="lg" sx={{ py: 6 }}></Container>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid textAlign="center" size={{ xs: 16, md: 8, sm: 4 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Box mb={2}>
                  <Avatar
                    src={avatarUrl || "/images/default-avatar.png"}
                    alt="Avatar công ty"
                    sx={{ width: 160, height: 160 }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 700,
                    // bgcolor: "#fff",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    width="100%"
                    sx={
                      {
                        // backgroundColor: "#fff",
                        // borderRadius: 2,
                        // boxShadow: 1,
                      }
                    }
                  >
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="tabs"
                      textColor="primary"
                      indicatorColor="primary"
                      sx={{
                        "& .MuiTab-root": {
                          minWidth: 160,
                          textTransform: "none",
                          opacity: 0.6,
                          mx: 2,
                          fontSize: "1.4rem",
                          fontWeight: 500,
                          borderRadius: 2,
                          transition: "all 0.3s",
                          px: 2,
                          py: 1,
                          "&:hover": {
                            // backgroundColor: "#e3f2fd",
                            // color: "#e3f2fd",
                          },
                        },
                        "& .Mui-selected": {
                          // color: "#fff",
                          // backgroundColor: "#4CAF50",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        },
                        "& .MuiTabs-indicator": {
                          // backgroundColor: "#4CAFe3",
                          height: 3,
                          borderRadius: 5,
                        },
                      }}
                    >
                      <Tab label="Thông tin tài khoản" />
                      <Tab label="Thông tin liên lạc" />
                      <Tab label="Thương hiệu" />
                      <Tab label="Thiết lập" />
                      <Tab label="Đổi mật khẩu" />
                    </Tabs>
                  </Box>
                </Box>
                {tabValue === 0 && (
                  <Box mt={3}>
                    <AccountInfoForm />
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box mt={3}>
                    <ContactInfoForm />
                  </Box>
                )}
                {tabValue === 2 && <Trademark />}
                {tabValue === 3 && <Establish />}
                {tabValue === 4 && <Box>Đổi mật khẩu (đang phát triển)</Box>}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </FormProvider>
  );
};

export default ProfilePage;
