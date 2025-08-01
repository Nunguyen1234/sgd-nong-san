"use client";
import Grid from "@mui/material/Grid";

import React, { useRef } from "react";
import { Box, Container } from "@mui/material";
import { Tooltip as StatTooltip } from "../../../component/Tooltip/tooltip";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "TẠO MÃ QR SẢN PHẨM",
    value: "12.000.000₫",
    icon: <BarChart3 size={32} color="#1976d2" />,
    delay: 0,
    popover: {
      title: "Tạo mã QR sản phẩm",
      description:
        "Quét mã QR để truy xuất nguồn gốc và thông tin chi tiết của sản phẩm một cách minh bạch.",
    },
  },
  {
    title: "ĐẶT IN TEM",
    value: "45",
    icon: <Users size={32} color="#43a047" />,
    delay: 0.1,
    popover: {
      title: "Đặt in tem",
      description:
        "Tem Blockchain đã kích hoạt sẽ được cấp quyền đặt in tem với đầy đủ thông tin cung cấp.",
    },
  },
  {
    title: "KÍCH HOẠT TEM",
    value: "128",
    icon: <ShoppingCart size={32} color="#fb8c00" />,
    delay: 0.2,
    popover: {
      title: "Kích hoạt tem",
      description:
        "Kích hoạt tem để liên kết dữ liệu truy xuất và xác thực sản phẩm đã in.",
    },
  },
  {
    title: "THÔNG TIN DOANH NGHIỆP",
    value: "1.234.000.000₫",
    icon: <DollarSign size={32} color="#6a1b9a" />,
    delay: 0.3,
    link: "https://e-ggroup.com/",
    popover: {
      title: "Thông tin doanh nghiệp",
      description:
        "Thông tin doanh nghiệp được hiển thị minh bạch trong mỗi mã QR sản phẩm.",
    },
  },
  {
    title: "TĂNG TRƯỞNG DOANH SỐ",
    value: "+18%",
    icon: <TrendingUp size={32} color="#0288d1" />,
    delay: 0.4,
    popover: {
      title: "Tăng trưởng doanh số",
      description:
        "Theo dõi tốc độ tăng trưởng doanh số từ sản phẩm được truy xuất rõ ràng.",
    },
  },
  {
    title: "ĐÁNH GIÁ TRUNG BÌNH",
    value: "4.9 ★",
    icon: <Star size={32} color="#fbc02d" />,
    delay: 0.5,
    popover: {
      title: "Đánh giá trung bình",
      description:
        "Đánh giá từ người tiêu dùng về chất lượng và trải nghiệm sản phẩm.",
    },
  },
];

const DashboardPage = () => {
  const datInTemRef = useRef<HTMLDivElement>(null);
  return (
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Grid container spacing={3} justifyContent="center">
            {stats.map((item, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;

              return (
                <Grid key={index} size={{ xs: 12, md: 4, sm: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.delay, duration: 0.5 }}
                  >
                    <Box ref={isSecond ? datInTemRef : null}>
                      <StatTooltip
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        popover={item.popover}
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
      </Container>
    </Box>
  );
};

export default DashboardPage;
