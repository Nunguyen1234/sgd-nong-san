"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  CircularProgress,
  Container,
  Avatar,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import apiAxios from "@/app/api/axiosConfig";
import ContactInfoForm from "./ContactInfoForm";
import Trademark from "./Trademark";
import AccountInfoForm from "./Account ";
import type { FormData } from "../profile/FormData/user";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

const ProfilePage = () => {
  const methods = useForm<FormData>();

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      try {
        const response = await apiAxios.get<FormData>(`/user/${userId}`, {
          headers: getAuthHeaders(),
        });
        methods.reset(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        enqueueSnackbar("Không thể tải hồ sơ người dùng", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
          <Grid container spacing={4} alignItems="center">
            <Grid textAlign="center" size={{ xs: 16, md: 8, sm: 4 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 100, height: 100, mb: 2 }}></Avatar>
                <Box
                  sx={{
                    width: "100%",

                    maxWidth: 700,
                    // bgcolor: "#fff",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="tabs"
                    centered
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                      "& .MuiTab-root": {
                        minWidth: 160,
                        textTransform: "none",
                        opacity: 0.6,
                        mx: 2,
                      },
                      "& .Mui-selected": {
                        color: "#4CAF50",
                        opacity: 1,
                      },
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#4CAF50",
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

                {tabValue === 0 && <AccountInfoForm />}

                {tabValue === 1 && <ContactInfoForm />}

                {tabValue === 2 && <Trademark />}

                {tabValue === 3 && <Box>Thiết lập (đang phát triển)</Box>}

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
