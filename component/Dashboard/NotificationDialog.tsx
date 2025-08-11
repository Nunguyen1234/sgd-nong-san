import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function NotificationDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Tất cả" />
          <Tab label="Hệ thống" />
          <Tab label="Tài khoản" />
          <Tab label="Giao dịch" />
        </Tabs>

        <Box mt={2}>
          {tab === 0 && <Typography>Hiển thị tất cả thông báo</Typography>}
          {tab === 1 && <Typography>Thông báo hệ thống</Typography>}
          {tab === 2 && <Typography>Thông báo tài khoản</Typography>}
          {tab === 3 && <Typography>Thông báo giao dịch</Typography>}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
