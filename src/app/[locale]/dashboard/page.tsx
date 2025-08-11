"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import React, { Suspense, useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Tooltip as StatTooltip } from "../../../../component/Tooltip/tooltip";

import { motion } from "framer-motion";
import LoginToast from "./LoginToast";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DateRangePickerMUI from "./DateRangePickerMUI";
// import { BarChart3, Users, ShoppingCart, DollarSign } from "lucide-react";
import ChartComponent from "./ChartComponent";
import dayjs, { Dayjs } from "dayjs";
import ChatButton from "component/Dashboard/ChatBox/ChatButton";
// import ChatBox from "component/Dashboard/ChatBox/ChatBox";
// import ChatButton from "component/ChatBox/ChatButton";

const stats = [
  {
    title: "TẠO MÃ QR SẢN PHẨM",
    value: "12.000.000₫",
    // icon: <BarChart3 size={32} color="#1976d2" />,
    delay: 0,
    link: "/dashboard/products/create",
    popover: {
      image: "/images/bb.png",
      title: "Tạo mã QR sản phẩm",
      description:
        "Quét mã QR để truy xuất nguồn gốc và thông tin chi tiết của sản phẩm một cách minh bạch.",
    },
  },
  {
    title: "ĐẶT IN TEM",
    value: "45",
    // icon: <Users size={32} color="#43a047" />,
    delay: 0.1,
    popover: {
      image: "/images/cc.png",
      title: "Đặt in tem",
      description:
        "Tem Blockchain đã kích hoạt sẽ được cấp quyền đặt in tem với đầy đủ thông tin cung cấp.",
    },
  },
  {
    title: "KÍCH HOẠT TEM",
    value: "128",
    // icon: <ShoppingCart size={32} color="#fb8c00" />,
    delay: 0.2,
    popover: {
      image: "/images/dd.png",
      title: "Kích hoạt tem",
      description:
        "Kích hoạt tem để liên kết dữ liệu truy xuất và xác thực sản phẩm đã in.",
    },
  },
  {
    title: "THÔNG TIN DOANH NGHIỆP",
    value: "1.234.000.000₫",
    // icon: <DollarSign size={32} color="#6a1b9a" />,
    delay: 0.3,
    link: "https://e-ggroup.com/",
    popover: {
      image: "/images/ee.png",
      title: "Thông tin doanh nghiệp",
      description:
        "Thông tin doanh nghiệp được hiển thị minh bạch trong mỗi mã QR sản phẩm.",
    },
  },
];
const DashboardPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const router = useRouter();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2025-05-02"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2025-08-02"));
  const [viewMode, setViewMode] = useState<"week" | "month">("month");
  const datInTemRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Suspense fallback={null}>
        <LoginToast />
      </Suspense>
      <Box
        sx={{
          backgroundImage: "url(/images/bt1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 6,
          px: 2,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundImage: "url('/images/backgrond.jpg')",
              backgroundColor: "#fff",
              borderRadius: 4,
              p: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              position: "relative",
              width: "94%",
              minHeight: "30%",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              mb={3}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                color="primary"
                sx={{ textTransform: "uppercase" }}
              >
                Chào mừng bạn đến với
              </Typography>

              <Box
                component="img"
                src="/images/logo.png"
                alt="Logo công ty"
                sx={{
                  height: 50,
                  objectFit: "contain",
                }}
              />
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Grid container spacing={3} justifyContent="center">
                {stats.map((item, index) => {
                  const isFirst = index === 0;

                  return (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.delay, duration: 0.5 }}
                      >
                        <Box
                          ref={isFirst ? datInTemRef : null}
                          onClick={() => {
                            if (item.link) router.push(item.link);
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          <StatTooltip
                            title={item.title}
                            value={item.value}
                            icon={null}
                            image={item.popover?.image}
                            popover={item.popover}
                            showPulse={item.title === "ĐẶT IN TEM"}
                            onNext={
                              isFirst
                                ? () =>
                                    datInTemRef.current?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    })
                                : undefined
                            }
                          />
                        </Box>
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>
            </motion.div>
          </Box>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ textAlign: "left", width: "100%" }}>
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                sx={{ textTransform: "uppercase", color: "primary.main" }}
              >
                Bạn muốn gia tăng giá trị sản phẩm?
              </Typography>
              <Typography variant="body1" mb={4}>
                Gia tăng giá trị và bảo vệ thương hiệu sản phẩm bằng giải pháp{" "}
                Truy xuất nguồn gốc Blockchain của Agridential.vn. Người tiêu
                dùng sẽ hiểu và an tâm về nguồn gốc, chất lượng sản phẩm của
                bạn.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => router.push("dashboard/detail")}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 3,
                  backgroundColor: "primary.main",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Xem chi tiết
              </Button>
            </Box>
          </Box>
        </Container>

        <Box sx={{ maxWidth: "xl", px: 4, mt: 6 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Thống kê
          </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 2 }} data-aos="fade-right">
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              p: { xs: 3, md: 4 },
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="h6" fontWeight={700}>
                Tổng lượt quét tem
              </Typography>

              <Box display="flex" gap={2}>
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
            </Box>

            {/* Bộ lọc thời gian */}
            <DateRangePickerMUI
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />

            {/* Biểu đồ */}
            <Box mt={4}>
              {/* ApexChart Component tại đây */}
              <ChartComponent viewMode={viewMode} />
            </Box>
          </Box>
        </Container>

        {/* <ChatBox /> */}
        <ChatButton />
      </Box>
    </>
  );
};

export default DashboardPage;
