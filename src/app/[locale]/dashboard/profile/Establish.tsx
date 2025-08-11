"use client";

import {
  Box,
  FormGroup,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Establish = () => {
  const [settings, setSettings] = useState({
    showActionTime: true,
    showActivityDetails: true,
    satelliteMap: true,
    autoExpandDetails: true,
    newestFirst: true,
    useAccountName: false,
    autoConfirmWork: true,
    showScanCount: false,
    defaultLang: "vi",
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLangChange = (event: SelectChangeEvent) => {
    setSettings((prev) => ({
      ...prev,
      defaultLang: event.target.value,
    }));
  };

  const switchItems = [
    { key: "showActionTime", label: "Hiển thị thời gian của các hành động" },
    {
      key: "showActivityDetails",
      label: "Hiển thị thông tin chi tiết hoạt động",
    },
    { key: "satelliteMap", label: "Hiển thị bản đồ dưới dạng vệ tinh" },
    {
      key: "autoExpandDetails",
      label: "Tự động mở rộng thông tin chi tiết hành động",
    },
    { key: "newestFirst", label: "Nhật ký: từ mới nhất đến cũ nhất" },
    { key: "useAccountName", label: "Dùng tên tài khoản nhập liệu thay thế" },
    { key: "autoConfirmWork", label: "Tự động xác nhận hoàn thành công việc" },
    { key: "showScanCount", label: "Hiển thị số lượt quét tem" },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={1}
        sx={{ textAlign: "left" }}
      >
        Thiết lập
      </Typography>
      <Typography color="text.secondary" mb={3} sx={{ textAlign: "left" }}>
        Thiết lập hiển thị và nâng cao
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 0,
          width: "65vw",
          minHeight: "100vh",
          boxSizing: "border-box",
          backgroundColor: "#fff",
        }}
      >
        <FormGroup>
          {switchItems.map((item, index) => (
            <Box
              key={item.key}
              display="flex"
              alignItems="center"
              py={2}
              sx={{
                borderBottom:
                  index < switchItems.length - 1 ? "1px solid #eee" : "none",
                gap: 2,
              }}
            >
              <Switch
                checked={Boolean(settings[item.key as keyof typeof settings])}
                onChange={() => handleToggle(item.key as keyof typeof settings)}
                color="success"
                sx={{
                  transform: "scale(1.2)",
                  "& .MuiSwitch-switchBase": {
                    padding: 1,
                  },
                }}
              />
              <Typography>{item.label}</Typography>
            </Box>
          ))}
        </FormGroup>
      </Paper>

      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mt: 2 }}>
        <Typography fontWeight={600} gutterBottom>
          Ngôn ngữ mặc định trên trang truy xuất
        </Typography>
        <Select
          value={settings.defaultLang}
          onChange={handleLangChange}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiSelect-select": { textAlign: "left" },
          }}
        >
          <MenuItem value="vi">Tiếng Việt</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>
      </Paper>
    </Box>
  );
};

export default Establish;
