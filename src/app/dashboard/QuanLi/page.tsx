"use client";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import apiAxios, { BASE_URL_API } from "@/app/api/axiosConfig";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
type User = {
  userName: string;
  email: string;
  phone: string;
  nameCompany: string;
  city: string;
  district: string;
  address: string;
  role: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  categoryId: number;
  id: number;
  name: string;
  price: string;
  description: string;
  quantity: number;
  images: { imageUrl: string }[];
  userId: number;
  weight?: number;
  unit?: string;
  origin?: string;
};

const ProductByCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiAxios.get<{ data: Category[] }>(
          `${BASE_URL_API}/category`
        );
        console.log("DANH MỤC:", res.data.data);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!selectedCategory) return setProducts([]);

        const res = await apiAxios.get<{ success: boolean; data: Product[] }>(
          `/product/category/${selectedCategory}`
        );

        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleOpenDialog = async (userId: number) => {
    try {
      const res = await apiAxios.get<{ data: User }>(`/user/${userId}`);
      setUserInfo(res.data.data);
      setOpen(true);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin người dùng:", err);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Tên", flex: 1 },
    { field: "description", headerName: "Mô tả", flex: 2 },
    {
      field: "imageUrl",
      headerName: "Hình ảnh",
      width: 100,
      renderCell: ({ value }) => (
        <Image
          src={value || "/placeholder.png"}
          alt="product"
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    { field: "price", headerName: "Giá", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
    { field: "unit", headerName: "Đơn vị", flex: 1 },
    { field: "origin", headerName: "Xuất xứ", flex: 1 },
    {
      field: "actions",
      headerName: "Chi tiết",
      width: 100,
      align: "center",
      renderCell: ({ row }) => (
        <Button
          variant="text"
          size="small"
          color="primary"
          onClick={() => handleOpenDialog(row.userId)}
        >
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            background: "linear-gradient(90deg, #00c6ff, #ff8c00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Sản Phẩm Nông Sản
        </Typography>

        <FormControl sx={{ minWidth: 280 }}>
          <InputLabel id="cat-label">Danh mục</InputLabel>
          <Select
            labelId="cat-label"
            label="Danh mục"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {products.length === 0 ? (
        <Typography color="text.secondary">Không có sản phẩm nào.</Typography>
      ) : (
        <Box sx={{ background: "#fff", p: 2, borderRadius: 2 }}>
          <DataGrid
            rows={products.map((p) => ({
              ...p,
              imageUrl: p.images?.[0]?.imageUrl || "",
            }))}
            columns={columns}
            pageSizeOptions={[5, 10, 50, 100]}
            rowHeight={80}
            sx={{
              width: "100%",
              "& .MuiDataGrid-cell": {
                whiteSpace: "normal",
                wordWrap: "break-word",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f3f4f6",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Thông tin người dùng
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {userInfo ? (
            <>
              <Typography gutterBottom>
                <strong>Tên người dùng:</strong> {userInfo.userName}
              </Typography>
              <Typography gutterBottom>
                <strong>Email:</strong> {userInfo.email}
              </Typography>
              <Typography gutterBottom>
                <strong>Số điện thoại:</strong> {userInfo.phone}
              </Typography>
              <Typography gutterBottom>
                <strong>Công ty:</strong> {userInfo.nameCompany}
              </Typography>
              <Typography gutterBottom>
                <strong>Thành phố:</strong> {userInfo.city}
              </Typography>
              <Typography gutterBottom>
                <strong>Quận/Huyện:</strong> {userInfo.district}
              </Typography>
              <Typography gutterBottom>
                <strong>Địa chỉ:</strong> {userInfo.address}
              </Typography>
              <Typography gutterBottom>
                <strong>Vai trò:</strong> {userInfo.role}
              </Typography>
            </>
          ) : (
            <Typography>Đang tải...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductByCategoryPage;
