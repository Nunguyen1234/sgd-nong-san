"use client";
import {
  Box,
  Typography,
  Popover,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import NotificationDialog from "./NotificationDialog";

import { useState } from "react";
dayjs.extend(relativeTime);

type NotificationType = "info" | "warning" | "system";

type NotificationItem = {
  id: number;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead?: boolean;
};

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  notifications: NotificationItem[];
  onRefresh: () => void;
  handleViewAll: () => void;
  isLoading: boolean;
};

const getIcon = (type: NotificationType) => {
  switch (type) {
    case "info":
      return <InfoIcon color="info" />;
    case "warning":
      return <WarningIcon color="warning" />;
    case "system":
      return <SystemUpdateAltIcon color="success" />;
    default:
      return <InfoIcon />;
  }
};

export default function NotificationPopover({
  open,
  anchorEl,
  onClose,
  notifications,
  onRefresh,
  // handleViewAll,
  isLoading,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 2,
            width: 320,
            maxHeight: 400,
            overflowY: "auto",

            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>Thông báo</Typography>

          <Tooltip title="Làm mới">
            <IconButton size="small" onClick={onRefresh}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ my: 1 }} />
        {isLoading ? (
          <Typography variant="body2" color="text.secondary">
            Đang tải thông báo...
          </Typography>
        ) : notifications.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Bạn có 0 thông báo
          </Typography>
        ) : (
          <List dense disablePadding>
            {(showAll ? notifications : notifications.slice(0, 3)).map(
              (note) => (
                <ListItem
                  key={note.id}
                  alignItems="flex-start"
                  sx={{
                    py: 1,

                    bgcolor: note.isRead
                      ? "transparent"
                      : "rgba(25, 118, 210, 0.08)",
                    borderRadius: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: "transparent",
                        width: 32,
                        height: 32,
                      }}
                    >
                      {getIcon(note.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={note.message}
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {note.createdAt}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            )}
          </List>
        )}

        <Box textAlign="center" mt={1}>
          <Button
            size="small"
            onClick={() => setShowAll(!showAll)}
            sx={{ textTransform: "none" }}
          >
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </Button>
        </Box>
      </Popover>
      {/* <NotificationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      /> */}
    </>
  );
}
