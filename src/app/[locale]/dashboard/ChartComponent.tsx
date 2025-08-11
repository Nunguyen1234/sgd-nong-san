"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Box } from "@mui/material";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  viewMode: "week" | "month";
};

const ChartComponent = ({ viewMode }: Props) => {
  const series = React.useMemo(() => {
    return [
      {
        name: "Lượt quét",
        data:
          viewMode === "week"
            ? [10, 15, 8, 20, 12, 5, 7]
            : [44, 55, 41, 67, 22, 43],
      },
    ];
  }, [viewMode]);
  console.log("Current viewMode:", viewMode);

  const chartOptions: ApexOptions = React.useMemo(() => {
    return {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "40%",
          dataLabels: { position: "top" },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => val.toString(),
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
      },
      xaxis: {
        categories:
          viewMode === "week"
            ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
            : ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6"],
        position: "bottom",
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: {
          text: "Số lượt quét",
          style: {
            fontSize: "12px",
            fontWeight: 600,
            color: "#333",
          },
        },
      },
      fill: {
        opacity: 1,
        colors: ["#1976d2"],
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} lượt`,
        },
      },
    };
  }, [viewMode]);
  console.log("Current viewMode:", viewMode);

  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto" }}>
      <ApexChart
        key={viewMode}
        options={chartOptions}
        series={series}
        type="bar"
        height={300}
      />
    </Box>
  );
};

export default ChartComponent;
