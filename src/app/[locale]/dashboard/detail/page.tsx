"use client";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const packageData = [
  {
    feature: "Mã QR xuất xứ sản phẩm",
    options: [true, true, true],
    values: [
      "Tất cả sản phẩm cùng loại dùng chung 1 mã QR Mã QR thể hiện hình ảnh, thông tin mô tả, xuất xứ và giấy tờ pháp lý Phù hợp với nhu cầu giới thiệu sản phẩm và in cố định mã QR trên bao biễn phí",
      "Tất cả sản phẩm cùng lô dùng chung 1 mã QR Nhật ký sản xuất rõ ràng, minh bạch thể hiện đầy đủ thông tin theo tiêu chuẩn Phù hợp với số lượng sản phẩm rất nhiều, không thể dán tem từng sản phẩm",
      "Các sản phẩm cùng lô dán mã QR khác nhau Kiểm soát số lượng sản phẩm đã lưu thông trên thị trường Phù hợp với số lượng sản phẩm vừa, có thể dán tem cho từng sản phẩm",
    ],
  },
  {
    feature: "Ghi nhật ký sản xuất và truy xuất theo lô",
    options: [false, true, true],
  },
  {
    feature: "Truy xuất theo lô",
    options: [false, true, true],
  },
  {
    feature: "Truy xuất và kiểm soát theo từng sản phẩm",
    options: [false, false, true],
  },
  {
    feature: "Tư vấn chuẩn hóa thông tin",
    options: [false, true, true],
  },
  {
    feature: "Xác thực Blockchain",
    options: [true, true, true],
  },
];

const costData = [
  {
    label: "Chi phí mở tài khoản",
    values: ["Miễn phí", "Miễn phí", "Miễn phí"],
  },
  {
    label: "Chi phí thuê bao",
    values: [
      "Miễn phí cho 5 sản phẩm",
      "500,000đ/sản phẩm/tháng",
      "750,000đ/sản phẩm/tháng",
    ],
  },
  {
    label: "Chi phí hướng dẫn sử dụng",
    values: ["Miễn phí", "Miễn phí", "Miễn phí"],
  },
  {
    label: "Chi phí tem/mã QR",
    values: ["Theo nhu cầu", "Theo nhu cầu", "Theo nhu cầu"],
  },
];

export default function UpgradePage() {
  const highlightFeatures = [
    "Ghi nhật ký sản xuất và truy xuất theo lô",
    "Truy xuất và kiểm soát theo từng sản phẩm",
    "Xác thực Blockchain",
  ];

  const highlightCosts = ["Chi phí mở tài khoản", "Chi phí hướng dẫn sử dụng"];

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Nâng cấp gói thuê bao
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: "none", border: "none" }}>
                <strong>GÓI THUÊ BAO</strong>
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", borderRight: "none", border: "none" }}
              >
                XUẤT XỨ SẢN PHẨM
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderRight: "none", border: "none", fontWeight: "bold" }}
              >
                TRUY XUẤT THEO TỪNG LÔ SẢN XUẤT/THU HOẠCH
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "primary.main",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                TRUY XUẤT THEO TỪNG SẢN PHẨM
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packageData.map((row, i) => {
              const isHighlight = highlightFeatures.includes(row.feature);
              return (
                <TableRow
                  key={i}
                  sx={{
                    // backgroundColor: "#F0F8FF",
                    "&:hover": {
                      backgroundColor: "#fffaf0",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      border: "none",
                      // backgroundColor: "#F0F8FF",
                      ...(isHighlight
                        ? {
                            "&:hover": {
                              backgroundColor: "#fffaf0",
                            },
                          }
                        : {
                            "&:hover": {
                              backgroundColor: "#fffaf0",
                            },
                          }),
                    }}
                  >
                    {row.feature}
                  </TableCell>

                  {row.options.map((hasFeature, j) => {
                    const cellContent =
                      row.values?.[j] && typeof row.values[j] === "string" ? (
                        row.values[j]
                          .split("\n")
                          .map((line, idx) => <div key={idx}>{line}</div>)
                      ) : hasFeature ? (
                        <CheckIcon color={j === 2 ? "inherit" : "primary"} />
                      ) : (
                        ""
                      );

                    return (
                      <TableCell
                        key={j}
                        align="center"
                        sx={{
                          border: "none",
                          borderRight: j < 2 ? "none" : "",
                          // Loại bỏ logic isHighlight ở đây
                          ...(j === 2
                            ? {
                                backgroundColor: "primary.light",
                                color: "primary.contrastText",
                                fontWeight: "bold",
                              }
                            : {}), // Chắc chắn rằng không có màu highlight nào được áp dụng
                          // Giữ cố định màu nếu là cột thứ 3 (j === 2)
                          ...(j === 2 && {
                            "&:hover": {
                              backgroundColor: "primary.light",
                            },
                          }),
                        }}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell sx={{ borderRight: "none", border: "none" }} />
              <TableCell
                colSpan={2}
                align="center"
                sx={{ borderRight: "none", border: "none" }}
              >
                <Typography variant="h6" mt={3} align="left" fontWeight="bold">
                  Chi phí sử dụng
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.light",
                  color: "#fff",
                  border: "none",
                }}
              />
            </TableRow>

            {costData.map((cost, i) => {
              const isHighlight = highlightCosts.includes(cost.label);
              return (
                <TableRow
                  key={i}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#fffaf0",
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      border: "none",

                      borderRight: "none", // Ẩn đường kẻ phải của cột này
                      ...(isHighlight ? { backgroundColor: "#F0F8FF" } : {}),
                    }}
                  >
                    {cost.label}
                  </TableCell>
                  {cost.values.map((val, j) => (
                    <TableCell
                      key={j}
                      align="center"
                      sx={{
                        border: "none",

                        borderRight: j < 2 ? "none" : "", // Ẩn đường kẻ phải cho 2 cột đầu tiên
                        ...(j === 2
                          ? {
                              backgroundColor: "primary.light",
                              color: "primary.contrastText",
                              fontWeight: "bold",
                            }
                          : isHighlight
                            ? {
                                backgroundColor: "#F0F8FF",
                              }
                            : {}),
                        // Giữ cố định màu nếu là cột thứ 3 (j === 2)
                        ...(j === 2 && {
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }),
                      }}
                    >
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell sx={{ borderRight: "none" }}>
                <Typography>
                  * Thuê bao tối thiểu 6 tháng, tặng kèm 5000 tem vật lý (tem
                  vỡ, in màu, trị giá 3,150,000 đồng) nếu đăng ký 12 tháng.
                  Chương trình bắt đầu từ 01/06/2021 và kết thúc khi tặng đủ
                  1,000,000 tem cho 2000 khách.
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ borderRight: "none" }}>
                <Button variant="outlined" disabled>
                  Gói hiện tại
                </Button>
              </TableCell>
              <TableCell align="center" sx={{ borderRight: "none" }}>
                <Button variant="outlined">Đăng ký</Button>
              </TableCell>
              <TableCell align="center" sx={{ color: "primary.contrastText" }}>
                <Button variant="contained" color="success">
                  Đăng ký
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
