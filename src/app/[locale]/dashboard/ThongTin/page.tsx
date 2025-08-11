"use client";

import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface InfoCategory {
  id: number;
  title: string;
  description: string;
  slug: string;
}

const dummyCategories: InfoCategory[] = [
  {
    id: 1,
    title: "Giới thiệu",
    description: "Thông tin về doanh nghiệp, sứ mệnh và tầm nhìn.",
    slug: "gioi-thieu",
  },
  {
    id: 2,
    title: "Chính sách bảo mật",
    description: "Cam kết bảo mật thông tin người dùng.",
    slug: "chinh-sach-bao-mat",
  },
  {
    id: 3,
    title: "Hướng dẫn thanh toán",
    description: "Các hình thức thanh toán và quy trình xử lý đơn hàng.",
    slug: "huong-dan-thanh-toan",
  },
  {
    id: 4,
    title: "Liên hệ hỗ trợ",
    description: "Thông tin liên hệ và kênh hỗ trợ khách hàng.",
    slug: "lien-he",
  },
];

const InfoCategoryPage = () => {
  const router = useRouter();

  const handleViewDetail = (slug: string) => {
    router.push(`/dashboard/info-category/${slug}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Danh mục Thông tin
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        {dummyCategories.map((item) => (
          <Grid key={item.id} size={{ xs: 12, md: 4, sm: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleViewDetail(item.slug)}
                >
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InfoCategoryPage;
