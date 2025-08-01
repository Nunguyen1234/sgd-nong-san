// "use client";

// import { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Grid,
// } from "@mui/material";
// import apiAxios from "@/app/api/axiosConfig";
// import toast from "react-hot-toast";

// type PendingProduct = {
//   id: number;
//   productName: string;
//   productCode: string;
//   price: number;
//   description: string;
//   images?: string[];
// };

// export default function PendingProductList() {
//   const [pendingProducts, setPendingProducts] = useState<PendingProduct[]>([]);

//   useEffect(() => {
//     const fetchPendingProducts = async () => {
//       try {
//         const res = await apiAxios.get<{ data: PendingProduct[] }>(
//           "/product/pending"
//         );
//         setPendingProducts(res.data.data);
//       } catch (err) {
//         console.error("Lỗi khi lấy sản phẩm chờ duyệt:", err);
//         toast.error("Không thể tải sản phẩm chờ duyệt");
//       }
//     };

//     fetchPendingProducts();
//   }, []);

//   const handleApprove = async (id: number) => {
//     try {
//       await apiAxios.post(`/product/approve/${id}`);
//       toast.success("Đã duyệt sản phẩm");
//       setPendingProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error("Lỗi duyệt sản phẩm:", err);
//       toast.error("Duyệt sản phẩm thất bại");
//     }
//   };

//   if (!pendingProducts.length) {
//     return <Typography>Không có sản phẩm chờ duyệt.</Typography>;
//   }

//   return (
//     <Grid container spacing={3}>
//       {pendingProducts.map((product) => (
//         <Grid size={{ xs: 12, md: 6, lg: 4 }} key={product.id}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">{product.productName}</Typography>
//               <Typography variant="body2">Mã: {product.productCode}</Typography>
//               <Typography variant="body2">
//                 Giá: {product.price.toLocaleString()} VNĐ
//               </Typography>
//               <Typography variant="body2">{product.description}</Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 size="small"
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleApprove(product.id)}
//               >
//                 Duyệt
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }
