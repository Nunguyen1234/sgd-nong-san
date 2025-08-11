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
import Image from "next/image";
import { heartBeatPulse } from "../../src/styles/animations";

type TooltipProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  image?: string;
  popover: {
    title: string;
    description: string;
  };
  onNext?: () => void;
  showPulse?: boolean;
};

export const Tooltip = ({
  title,
  value,
  icon,
  popover,
  image,
  onNext,
  showPulse,
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
          height: 240,
          mx: "auto",
          mt: 2,
          borderRadius: 4,
          py: 2,
          textAlign: "center",
          cursor: "pointer",
          justifyContent: "space-between",
          transition: "transform 0.3s, box-shadow 0.3s",
          boxShadow: 2,
          "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
        }}
      >
        <CardContent>
          {image && (
            <Box mb={2} display="flex" justifyContent="center">
              <Image
                src={image}
                alt={title}
                width={80}
                height={100}
                style={{ objectFit: "contain", borderRadius: 12 }}
              />
            </Box>
          )}
          <Box display="flex" justifyContent="center" mb={2}>
            {icon}
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
          {showPulse && (
            <Box
              sx={{
                position: "relative",
                width: 24,
                height: 24,
                margin: "8px auto 0",
              }}
            >
              {/* Viền ngoài đậm – có animation */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "2px solid #f50057", // đỏ đậm
                  animation: `${heartBeatPulse} 1.8s infinite`,
                  boxSizing: "border-box",
                  zIndex: 3,
                }}
              />

              {/* Lớp ánh sáng mờ – có animation */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#ff80ab",
                  opacity: 0.4,
                  animation: `${heartBeatPulse} 1.8s infinite`,
                  zIndex: 1,
                }}
              />

              {/* Lõi đỏ – đứng yên */}
              <Box
                sx={{
                  position: "absolute",
                  top: "25%",
                  left: "25%",
                  width: "50%",
                  height: "50%",
                  borderRadius: "50%",
                  backgroundColor: "#f50057", // đỏ đậm
                  zIndex: 2,
                }}
              />
            </Box>
          )}
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

          <Box display="flex" justifyContent="center" gap={3} mt={3}>
            <Button size="small" variant="outlined" onClick={handleClose}>
              Bỏ qua
            </Button>
            <Button
              size="small"
              variant="contained"
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
