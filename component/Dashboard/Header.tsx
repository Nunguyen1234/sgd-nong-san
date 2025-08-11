"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { BASE_URL_API } from "../../src/app/api/axiosConfig";

import LockResetIcon from "@mui/icons-material/LockReset";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Stack,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  InputAdornment,
  useTheme,
  Badge,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// import type { SelectChangeEvent } from "@mui/material";

import NotificationPopover from "./NotificationPopover";
import { logout } from "../../src/app/api/axiosConfig";
import LocaleSwitcher from "./SwitchLanguage/LocaleSwitcher";
import dayjs from "dayjs";
import { NotificationItem } from "src/hook/useNotifications";
import apiAxios from "../../src/app/api/axiosConfig";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
};
const fakeNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "info",
    message: "Biến động thị trường mới.",
    createdAt: dayjs().subtract(2, "minute").fromNow(),
    isRead: false, // thông báo mơi
  },
  {
    id: 2,
    type: "warning",
    message: " Hê thống yêu cầu cập nhật lại hồ sơ của bạn",
    createdAt: dayjs().subtract(1, "hour").fromNow(),
    isRead: false,
  },
  {
    id: 3,
    type: "system",
    message: "Hệ thống sẽ bảo trì lúc 22:00 hôm nay.",
    createdAt: dayjs().subtract(3, "day").fromNow(),
    isRead: true,
  },
  {
    id: 4,
    type: "system",
    message: "Có thông báo mới về biến động thị trường.",
    createdAt: dayjs().subtract(3, "day").fromNow(),
    isRead: true,
  },
  {
    id: 5,
    type: "system",
    message: "Tổng thống ép thuế.",
    createdAt: dayjs().subtract(3, "day").fromNow(),
    isRead: true,
  },
];

const Header = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Gọi lần đầu khi component mount
    setAvatarUrl(localStorage.getItem("avatar"));

    // Lắng nghe sự kiện cập nhật avatar
    const handleAvatarUpdated = () => {
      const updatedAvatar = localStorage.getItem("avatar");
      setAvatarUrl(updatedAvatar);
    };

    window.addEventListener("avatar-updated", handleAvatarUpdated);

    return () => {
      window.removeEventListener("avatar-updated", handleAvatarUpdated);
    };
  }, []);

  // const pathname = usePathname();
  // const handleLangChange = (event: SelectChangeEvent) => {
  //   const selectedLang = event.target.value;

  //   document.cookie = `NEXT_LOCALE=${selectedLang}; path=/`;

  //   const segments = pathname.split("/");
  //   segments[1] = selectedLang;
  //   const newPath = segments.join("/");

  //   router.replace(newPath);
  // };

  const router = useRouter();
  const notifications = fakeNotifications;
  const notificationCount = notifications.filter((n) => !n.isRead).length;

  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);
  const isNotificationOpen = !!notificationAnchor;
  const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const theme = useTheme();
  const handleConfirmChangePassword = async (data: ChangePasswordForm) => {
    const access_token = localStorage.getItem("access_token");
    const toastId = toast.loading("Đang đổi mật khẩu...");

    try {
      const res = await apiAxios.post(
        `${BASE_URL_API}/auth/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(res);

      toast.success("Đổi mật khẩu thành công!", { id: toastId });
      setOpenChangePassword(false);
      reset();
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Lỗi khi đổi mật khẩu!", {
        id: toastId,
      });
    }
  };

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseModal = () => {
    setOpenChangePassword(false);
  };

  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const handleOpenUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUser = () => setAnchorUser(null);

  // const handleLogout = async () => {
  //   // const access_token = localStorage.getItem("access_token");
  //   // try {
  //   //   await apiAxios.post(`${BASE_URL_API}/auth/logout`, null, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${access_token}`,
  //   //     },
  //   //     withCredentials: true,
  //   //   });
  //   //   toast.success("Đăng xuất thành công");
  //   // } catch (error) {
  //   //   toast.error("Lỗi khi đăng xuất");
  //   //   console.error("Logout error:", error);
  //   // } finally {
  //   //   localStorage.removeItem("access_token");
  //   //   window.location.href = "/auth/login";
  //   // }
  // };

  const handleAccountClick = () => {
    router.push("/dashboard/profile");
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#fff",
        zIndex: 1101,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 1, sm: 2 },
          width: "100%",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "90px",
          }}
        >
          <Box display="flex" alignItems="center" gap={1} sx={{ ml: 40 }}>
            <Typography variant="h6" fontWeight={600} color="#2f2f5f">
              Chào mừng bạn đến với{" "}
              <Box component="span" color="success.main" fontWeight={700}>
                Dashboard
              </Box>
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            {/* <Select
              value={currentLocale}
              onChange={handleLangChange}
              variant="standard"
              disableUnderline
              sx={{
                fontWeight: 500,
                fontSize: "0.95rem",
                color: "#2f2f5f",
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                minWidth: 130,
              }}
            >
              <MenuItem value="vi">
                <img
                  src="https://flagcdn.com/w40/vn.png"
                  alt="Việt Nam"
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%", marginRight: 8 }}
                />
                Tiếng Việt
              </MenuItem>
              <MenuItem value="en">
                <img
                  src="https://flagcdn.com/w40/gb.png"
                  alt="English"
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%", marginRight: 8 }}
                />
                English
              </MenuItem>
            </Select> */}
            <LocaleSwitcher />
            <Box
              onClick={handleOpenUser}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                px: 1.5,
                py: 0.5,
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Image
                  src={avatarUrl || "/images/default-avatar.png"}
                  alt="Ảnh đại diện"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />

                <Box>
                  <Typography fontSize={14} fontWeight={600} color="#2f2f5f">
                    Người dùng
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Nhà sản xuất
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Tooltip title="Thông báo">
              <IconButton
                size="small"
                color="success"
                onClick={handleOpenNotification}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Trợ giúp">
              <IconButton size="small" color="success">
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cuộn lên">
              <IconButton size="small" color="success">
                <KeyboardArrowUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Menu
            anchorEl={anchorUser}
            open={Boolean(anchorUser)}
            onClose={handleCloseUser}
          >
            <Divider />
            <MenuItem
              // onClick={handleLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "& svg": {
                  color: theme.palette.warning.light,
                  transition: "transform 0.3s ease, color 0.3s ease",
                },
                "& .logout-text": {
                  color: theme.palette.warning.light,
                  transition: "color 0.3s ease",
                },
                "&:hover svg": {
                  transform: "scale(1.2)",
                  color: theme.palette.success.light,
                },
                "&:hover .logout-text": {
                  color: theme.palette.success.light,
                },
              }}
            >
              <LogoutIcon fontSize="small" />
              <Typography className="logout-text" onClick={logout}>
                Đăng xuất
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleAccountClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "& svg": {
                  color: theme.palette.info.main,
                  transition: "transform 0.3s ease, color 0.3s ease",
                },
                "& .account-text": {
                  color: theme.palette.info.main,
                  transition: "color 0.3s ease",
                },
                "&:hover svg": {
                  transform: "scale(1.2)",
                  color: theme.palette.primary.main,
                },
                "&:hover .account-text": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <AccountCircleIcon fontSize="small" />
              <Typography className="account-text">Tài khoản</Typography>
            </MenuItem>

            <MenuItem
              onClick={handleChangePassword}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "& svg": {
                  color: "error.main",
                  transition: "transform 0.3s ease, color 0.3s ease",
                },
                "& .logout-text": {
                  color: "error.main",
                  transition: "color 0.3s ease",
                },
                "&:hover svg": {
                  transform: "scale(1.2)",
                  color: "primary.main",
                },
                "&:hover .logout-text": {
                  color: "primary.main",
                },
              }}
            >
              <LockResetIcon fontSize="small" />
              <Typography className="logout-text">Đổi Mật Khẩu</Typography>
            </MenuItem>
            <Dialog
              open={openChangePassword}
              onClose={(event, reason) => {
                if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
                  handleCloseModal();
                }
              }}
              disableEscapeKeyDown
            >
              <DialogTitle>Đổi Mật Khẩu </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Mật khẩu cũ "
                  type={showOld ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  {...register("oldPassword", {
                    required: "Vui lòng nhập mật khẩu cũ",
                  })}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowOld((prev) => !prev)}
                          edge="end"
                        >
                          {showOld ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="dense"
                  label="Mật khẩu mới"
                  type={showNew ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  {...register("newPassword", {
                    required: "Vui lòng nhập mật khẩu mới",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải ít nhất 6 ký tự",
                    },
                  })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNew((prev) => !prev)}
                          edge="end"
                        >
                          {showNew ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} disabled={isSubmitting}>
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleConfirmChangePassword)}
                >
                  Xác nhận
                </Button>
              </DialogActions>
            </Dialog>
          </Menu>
        </Toolbar>
      </Box>
      <NotificationPopover
        open={isNotificationOpen}
        anchorEl={notificationAnchor}
        onClose={() => setNotificationAnchor(null)}
        // onViewAll={() => router.push("/dashboard/notifications")}
        notifications={notifications}
        onRefresh={() => {
          console.log("Làm mới thông báo");
        }}
        isLoading={false}
        handleViewAll={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </AppBar>
  );
};

export default Header;
