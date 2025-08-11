"use client";

import { Container, Typography, Box, Paper, Divider } from "@mui/material";

const SettingsPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Cài đặt tài khoản
        </Typography>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Thông tin cá nhân
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cập nhật tên, email hoặc ảnh đại diện của bạn.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Đổi mật khẩu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thay đổi mật khẩu hiện tại để bảo vệ tài khoản của bạn.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
