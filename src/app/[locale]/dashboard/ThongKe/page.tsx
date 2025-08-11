"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardStatistics = () => {
  const theme = useTheme();

  const stats = [
    {
      label: "Sản phẩm",
      value: 1280,
      color: "#1976d2",
    },
    {
      label: "Người dùng",
      value: 560,
      color: "#2e7d32",
    },
    {
      label: "Đơn hàng",
      value: 430,
      color: "#f9a825",
    },
    {
      label: "Doanh thu hôm nay",
      value: 75200000,
      color: "#d32f2f",
      isMoney: true,
    },
  ];

  const barData = {
    labels: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"],
    datasets: [
      {
        label: "Doanh thu",
        data: [12, 19, 8, 25, 17, 22, 30],
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Thống kê hệ thống
      </Typography>

      <Grid container spacing={3} mt={2}>
        {stats.map((item, idx) => (
          <Grid key={idx} size={{ xs: 12, md: 3, sm: 6 }}>
            <Card sx={{ borderLeft: `6px solid ${item.color}` }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" mt={1}>
                  <CountUp
                    end={item.value}
                    duration={1.5}
                    separator=","
                    suffix={item.isMoney ? " đ" : ""}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Biểu đồ doanh thu theo tháng
            </Typography>
            <Bar data={barData} options={barOptions} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardStatistics;
