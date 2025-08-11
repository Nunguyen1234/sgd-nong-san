"use client";

import { Stack, Typography, InputAdornment, Box } from "@mui/material";
// import { CalendarMonth } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";

interface Props {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
}

export default function DateRangePickerMUI({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} direction="row" sx={{ mt: 3, width: "100%" }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography fontWeight={600} mb={1}>
            Thời gian bắt đầu
          </Typography>
          <DatePicker
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                color: "success",
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <CalendarMonth /> */}
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography fontWeight={600} mb={1}>
            Thời gian kết thúc
          </Typography>
          <DatePicker
            value={endDate}
            onChange={onEndDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                color: "success",
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <CalendarMonth /> */}
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}
