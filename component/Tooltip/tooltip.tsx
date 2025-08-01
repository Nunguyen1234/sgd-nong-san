"use client";
import React, { useState } from "react";
import {
  Popover,
  Typography,
  Button,
  Box,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TooltipProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  popover: {
    title: string;
    description: string;
  };
  onNext?: () => void;
};

export const Tooltip = ({
  title,
  value,
  icon,
  popover,
  onNext,
}: TooltipProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    const card = (e.currentTarget as HTMLElement).closest(
      ".stat-card"
    ) as HTMLElement;

    if (card) setAnchorEl(card);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Card
        className="stat-card"
        onClick={handleOpen}
        sx={{
          maxWidth: 300,
          mx: "auto",
          mt: 2,
          borderRadius: 4,
          py: 2,
          textAlign: "center",
          cursor: "pointer",
          transition: "transform 0.3s, box-shadow 0.3s",
          boxShadow: 2,
          "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            {icon}
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: { p: 2, maxWidth: 320, borderRadius: 2, boxShadow: 4 },
        }}
      >
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography fontWeight={600} fontSize={16}>
              {popover.title}
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {popover.description}
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button size="small" onClick={handleClose}>
              Bỏ qua
            </Button>
            <Button variant="outlined" size="small">
              Quay lại
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                onNext?.();
                handleClose();
              }}
            >
              Tiếp theo (2/4)
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
