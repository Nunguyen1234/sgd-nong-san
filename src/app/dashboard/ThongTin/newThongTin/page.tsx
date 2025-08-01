// app/dashboard/info/page.tsx
"use client";

import { Typography, Container, Paper, Grid, Divider } from "@mui/material";
import React from "react";

const InfoPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Thông tin hệ thống
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Tên website:
            </Typography>
            <Typography variant="body1">Nông Sản Sạch 24h</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Người phát triển:
            </Typography>
            <Typography variant="body1">Nguyễn Văn A</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Email liên hệ:
            </Typography>
            <Typography variant="body1">contact@nongsansach.vn</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Phiên bản:
            </Typography>
            <Typography variant="body1">v1.0.0</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Mô tả:
            </Typography>
            <Typography variant="body1">
              Đây là hệ thống quản lý sản phẩm nông sản hiện đại, hỗ trợ đăng
              bài, duyệt bài, quản lý sản phẩm và hình ảnh linh hoạt.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InfoPage;
