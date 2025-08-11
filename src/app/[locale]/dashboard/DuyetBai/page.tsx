"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import toast from "react-hot-toast";
import apiAxios, { BASE_URL_API } from "src/app/api/axiosConfig";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  createdAt: string;
  images: Image[];
};

type Image = {
  imageUrl: string;
};
const ApprovalPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiAxios.get<{ data: Product[] }>(
        `${BASE_URL_API}/product/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(res.data.data);
      console.log("Products:", res.data.data);
    } catch (error) {
      console.error("Lỗi khi tải bài đăng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const token = localStorage.getItem("token") ?? "";

      await apiAxios.put(
        `${BASE_URL_API}/product/set-status`,
        {
          productId: id,

          status: "Approved",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Đã duyệt sản phẩm thành công!");
    } catch (err) {
      console.error("Lỗi khi duyệt bài:", err);
      toast.error("Lỗi khi duyệt bài!");
    }
  };
  const handleReject = async (id: number) => {
    try {
      const token = localStorage.getItem("token") ?? "";
      await apiAxios.put(
        `${BASE_URL_API}/product/set-status`,
        {
          productId: id,
          status: "Rejected",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Lỗi khi từ chối bài:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiAxios.delete(`${BASE_URL_API}/product/${deleteTarget.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("Đã xóa sản phẩm thành công!");
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      toast.error("Lỗi khi xóa sản phẩm!");
    } finally {
      setDeleteTarget(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          background: "linear-gradient(90deg, #007a99, #33FFFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        Duyệt Bài Đăng
      </Typography>

      {loading ? (
        <Grid container spacing={3} mt={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="rectangular" height={150} />
            </Grid>
          ))}
        </Grid>
      ) : products.length === 0 ? (
        <Typography textAlign="center" mt={4}>
          Không có bài đăng cần duyệt.
        </Typography>
      ) : (
        <Grid container spacing={3} mt={2}>
          {products.map((prod, idx) => (
            <Grow
              in
              style={{ transformOrigin: "0 0 0" }}
              timeout={300 + idx * 100}
              key={prod.id}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card
                  sx={{
                    transition: "transform .2s, box-shadow .2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {prod.images?.[0]?.imageUrl && (
                    <CardMedia
                      component="img"
                      image={prod.images[0].imageUrl}
                      alt={prod.name}
                      sx={{
                        height: 220,
                        objectFit: "cover",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                  )}

                  <CardContent>
                    <Typography variant="h6">{prod.name}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {prod.price.toLocaleString()}đ –{" "}
                      {new Date(prod.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">{prod.description}</Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: "flex-end", // căn phải
                      paddingTop: 0, // bỏ padding top mặc định
                      paddingBottom: 1, // padding dưới nhẹ
                      marginTop: -1, // đẩy khối này lên một chút
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(prod.id)}
                    >
                      Duyệt
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleReject(prod.id)}
                    >
                      Từ chối
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      )}

      {/* Dialog Xác Nhận Xóa */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogTitle>
          <Typography sx={{ color: "#000", fontWeight: "bold" }}>
            Xác nhận xóa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa vĩnh viễn sản phẩm{" "}
            <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
              {deleteTarget?.name}
            </span>{" "}
            không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Hủy</Button>
          <Button color="error" onClick={handleDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ApprovalPage;
