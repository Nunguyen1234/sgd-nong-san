"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import ChartComponent from "./ChartComponent";

const ChartWrapper = () => {
  const [viewMode, setViewMode] = React.useState<"week" | "month">("month");

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <Button
          size="small"
          variant={viewMode === "week" ? "contained" : "outlined"}
          color="success"
          onClick={() => setViewMode("week")}
        >
          Tuần
        </Button>
        <Button
          size="small"
          variant={viewMode === "month" ? "contained" : "outlined"}
          color="success"
          onClick={() => setViewMode("month")}
        >
          Tháng
        </Button>
      </Box>

      <ChartComponent viewMode={viewMode} />
    </Box>
  );
};

export default ChartWrapper;
