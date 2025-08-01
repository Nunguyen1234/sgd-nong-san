"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu đến backend tại đây
    console.log("Form submitted:", formData);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });

    setOpenSnackbar(true);
  };

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Liên hệ với chúng tôi
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        Nếu bạn có bất kỳ thắc mắc hoặc góp ý nào, vui lòng điền vào biểu mẫu
        bên dưới. Chúng tôi sẽ phản hồi sớm nhất.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Họ và tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Nội dung"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={5}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained" size="large">
              Gửi liên hệ
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Gửi liên hệ thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
