"use client";
import React, { useEffect, useState } from "react";
import apiAxios from "@/app/api/axiosConfig";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import Image from "next/image";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  origin: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  images: { imageUrl: string }[];
};

const theme = createTheme({ palette: { secondary: { main: "#FFC107" } } });

const MotionTypography = motion(Typography);

export default function ProductListDataGrid() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await apiAxios.get<{ success: boolean; data: Product[] }>(
          "/product/post/user"
        );
        console.log("DATA:", res.data.data);
        if (res.data.success) setProductData(res.data.data);
      } catch (err) {
        console.log("Lỗi khi lưu vào danh mục:", err);
      }
    }

    fetchProducts();
  }, []);
  const handleDelete = (id: number) => {
    setDeletingProductId(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = async () => {
    if (deletingProductId == null) return;
    try {
      await apiAxios.delete(`/product/${deletingProductId}`);
    } catch {}
    setProductData((prev) => prev.filter((p) => p.id !== deletingProductId));
    setOpenDeleteDialog(false);
  };

  const handleEdit = (row: Product) => {
    setEditingProduct(row);
    setOpenEditDialog(true);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    } as Product);
  };

  const handleEditSave = async () => {
    if (!editingProduct) return;
    try {
      console.log("Saving product:", editingProduct);
      const res = await apiAxios.put<{ success: boolean; data: Product }>(
        `/product/${editingProduct.id}`,
        editingProduct
      );

      if (res.data.success) {
        const updatedProduct = res.data.data;
        setProductData((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        toast.success("Cập nhật sản phẩm thành công!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
    setOpenEditDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Tên sản phẩm", flex: 1 },
    { field: "description", headerName: "Mô tả", flex: 1 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 120,
      renderCell: (params: GridRenderCellParams<Product>) => {
        const img = params.row.images?.[0]?.imageUrl;
        return img ? (
          <Image
            src={params.row.images?.[0]?.imageUrl}
            alt="Hình sản phẩm"
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: 6 }}
            unoptimized
          />
        ) : (
          <Typography variant="caption" color="textSecondary">
            Không có ảnh
          </Typography>
        );
      },
    },
    { field: "price", headerName: "Giá", width: 120 },
    { field: "quantity", headerName: "Số lượng", width: 100 },
    { field: "unit", headerName: "Đơn vị", width: 100 },
    { field: "origin", headerName: "Xuất xứ", width: 120 },

    {
      field: "actions",
      headerName: "Hành động",
      width: 140,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => handleEdit(params.row)}
            size="small"
            sx={{ p: 0.5, color: "#4caf50" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            size="small"
            sx={{ p: 0.5, color: "#f44336" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderCell: (params) => {
        const status = params.row.status;
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "approved":
              return "success"; // xanh
            case "pending":
              return "warning"; // vàng
            case "rejected":
              return "error"; // đỏ
            default:
              return "default"; // xám
          }
        };

        return (
          <Chip
            label={status}
            color={getStatusColor(status)}
            variant="outlined"
            sx={{ textTransform: "lowercase " }}
          />
        );
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/images/br3.png')",
          py: 6,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <MotionTypography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                mb: 4,
                background: "linear-gradient(90deg, #007a99, #33FFFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              Sản Phẩm Nông Sản Đã Đăng
            </MotionTypography>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={productData}
                columns={columns}
                pageSizeOptions={[5, 10, 25, 100]}
                rowHeight={75}
                sx={{
                  "& .MuiDataGrid-cell": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    textAlign: "center",
                    width: "100%",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              />
            </Box>
          </Paper>
        </Container>

        {/* Edit Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Chỉnh Sửa Sản Phẩm</DialogTitle>
          <DialogContent dividers>
            {editingProduct && (
              <Box component="form" sx={{ mt: 1 }}>
                <Box
                  sx={{
                    gap: 2,
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  <Box mb={2}>
                    {" "}
                    <TextField
                      label="Tên sản phẩm"
                      name="name"
                      value={editingProduct.name}
                      onChange={handleEditChange}
                      fullWidth
                      required
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      type="number"
                      label="Giá"
                      name="price"
                      value={editingProduct.price ?? ""}
                      onChange={handleEditChange}
                      fullWidth
                      required
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      type="number"
                      label="Số lượng"
                      name="quantity"
                      value={editingProduct.quantity ?? ""}
                      onChange={handleEditChange}
                      fullWidth
                      required
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Đơn vị"
                      name="unit"
                      value={editingProduct.unit}
                      onChange={handleEditChange}
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      label="Xuất xứ"
                      name="origin"
                      value={editingProduct.origin}
                      onChange={handleEditChange}
                      fullWidth
                    />
                  </Box>
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Mô tả"
                    name="description"
                    value={editingProduct.description}
                    onChange={handleEditChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleEditSave}>
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Xác Nhận Xóa Sản Phẩm</DialogTitle>
          <DialogContent>
            Bạn có chắc muốn xóa sản phẩm{" "}
            <Typography component="span" color="error.main" fontWeight="bold">
              {productData.find((p) => p.id === deletingProductId)?.name || ""}
            </Typography>{" "}
            không?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
            <Button color="error" onClick={handleConfirmDelete}>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
