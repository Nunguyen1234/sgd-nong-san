// import {
//   faTachometerAlt,
//   faBox,
//   faPlusSquare,
//   faInfoCircle,
//   faCog,
//   faCheckCircle,
//   faPhone,
//   faChartLine,
//   faFolderOpen,
//   faFileCirclePlus,
//   faUserCog,
//   faLayerGroup,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export const getMenuItems = (isAdmin: boolean) => [
//   {
//     label: "Hệ thống",
//     href: "/dashboard",
//     icon: <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "#2e7d32" }} />,
//   },
//   {
//     label: "Sản phẩm",
//     icon: <FontAwesomeIcon icon={faBox} style={{ color: "#1565c0" }} />,
//     children: [
//       {
//         label: "Danh mục Bài Đăng",
//         href: "/dashboard/products",
//         path: "/dashboard/products",
//         icon: <FontAwesomeIcon icon={faBox} style={{ color: "#1565c0" }} />,
//       },
//       {
//         label: "Thêm Bài Đăng Mới",
//         href: "/dashboard/products/new",
//         path: "/dashboard/products/new",
//         icon: <FontAwesomeIcon icon={faPlusSquare} style={{ color: "#f9a825" }} />,
//       },
//     ],
//   },
//   {
//     label: "Duyệt bài đăng",
//     href: "/dashboard/DuyetBai",
//     icon: <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#2e7d32" }} />,
//     hidden: !isAdmin,
//   },
//   {
//     label: "Thông tin",
//     href: "/dashboard/info",
//     icon: <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#6a1b9a" }} />,
//     children: [
//       {
//         label: "Danh mục thông tin",
//         href: "/dashboard/ThongTin",
//         path: "/dashboard/ThongTin",
//         icon: <FontAwesomeIcon icon={faFolderOpen} style={{ color: "#546e7a" }} />,
//       },
//       {
//         label: "Thêm thông tin mới ",
//         href: "/dashboard/ThongTin/newThongTin",
//         path: "/dashboard/ThongTin/newThongTin",
//         icon: <FontAwesomeIcon icon={faFileCirclePlus} style={{ color: "#f9a825" }} />,
//       },
//     ],
//   },
//   {
//     label: "Quản Lý Người Dùng",
//     href: "/dashboard/QuanLiUser",
//     icon: <FontAwesomeIcon icon={faUserCog} style={{ color: "#d32f2f" }} />,
//     hidden: !isAdmin,
//     children: [
//       {
//         label: "Danh mục quản lí",
//         href: "/dashboard/QuanLi",
//         path: "/dashboard/QuanLi",
//         icon: <FontAwesomeIcon icon={faLayerGroup} style={{ color: "#6a1b9a" }} />,
//       },
//     ],
//   },
//   {
//     label: "Thống kê",
//     href: "/dashboard/ThongKe",
//     icon: <FontAwesomeIcon icon={faChartLine} style={{ color: "#0288d1" }} />,
//   },
//   {
//     label: "Liên Hệ",
//     href: "/dashboard/LienHe",
//     icon: <FontAwesomeIcon icon={faPhone} style={{ color: "#0288d1" }} />,
//   },
//   {
//     label: "Cài đặt",
//     href: "/dashboard/settings",
//     icon: <FontAwesomeIcon icon={faCog} style={{ color: "#c62828" }} />,
//   },
// ];
