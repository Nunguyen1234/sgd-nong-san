"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faTachometerAlt,
  faBox,
  faPlusSquare,
  faInfoCircle,
  faCog,
  faCheckCircle,
  faPhone,
  faChartLine,
  faFolderOpen,
  faFileCirclePlus,
  faUserCog,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

config.autoAddCss = false;

const drawerWidth = 240;

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [label: string]: boolean }>({});
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const handleToggle = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => pathname === href;
  const isSubActive = (path: string) => pathname.startsWith(path);

  // Nếu chưa client-side, không render gì để tránh hydration mismatch
  if (!isClient) return null;

  // menuItems phải nằm bên trong component, sau khi có isAdmin
  const menuItems = [
    {
      label: "Hệ thống",
      href: "/dashboard",
      icon: (
        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "#2e7d32" }} />
      ),
    },
    {
      label: "Sản phẩm",
      icon: <FontAwesomeIcon icon={faBox} style={{ color: "#1565c0" }} />,
      children: [
        {
          label: "Danh mục Bài Đăng",
          href: "/dashboard/products",
          path: "/dashboard/products",
          icon: <FontAwesomeIcon icon={faBox} style={{ color: "#1565c0" }} />,
        },
        {
          label: "Thêm Bài Đăng Mới",
          href: "/dashboard/products/new",
          path: "/dashboard/products/new",
          icon: (
            <FontAwesomeIcon icon={faPlusSquare} style={{ color: "#f9a825" }} />
          ),
        },
      ],
    },
    {
      label: "Duyệt bài đăng",
      href: "/dashboard/DuyetBai",
      icon: (
        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#2e7d32" }} />
      ),
      hidden: !isAdmin,
    },
    {
      label: "Thông tin",
      href: "/dashboard/info",
      icon: (
        <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#6a1b9a" }} />
      ),
      children: [
        {
          label: "Danh mục thông tin",
          href: "/dashboard/ThongTin",
          path: "/dashboard/ThongTin",
          icon: (
            <FontAwesomeIcon icon={faFolderOpen} style={{ color: "#546e7a" }} />
          ),
        },
        {
          label: "Thêm thông tin mới ",
          href: "/dashboard/ThongTin/newThongTin",
          path: "/dashboard/ThongTin/newThongTin",
          icon: (
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              style={{ color: "#f9a825" }}
            />
          ),
        },
      ],
    },
    {
      label: "Quản Lý Người Dùng",
      href: "/dashboard/QuanLiUser",
      icon: <FontAwesomeIcon icon={faUserCog} style={{ color: "#d32f2f" }} />,
      hidden: !isAdmin,
      children: [
        {
          label: "Danh mục quản lí",
          href: "/dashboard/QuanLi",
          path: "/dashboard/QuanLi",
          icon: (
            <FontAwesomeIcon icon={faLayerGroup} style={{ color: "#6a1b9a" }} />
          ),
        },
      ],
    },
    {
      label: "Thống kê",
      href: "/dashboard/ThongKe",
      icon: <FontAwesomeIcon icon={faChartLine} style={{ color: "#0288d1" }} />,
    },
    {
      label: "Liên Hệ",
      href: "/dashboard/LienHe",
      icon: <FontAwesomeIcon icon={faPhone} style={{ color: "#0288d1" }} />,
    },
    {
      label: "Cài đặt",
      href: "/dashboard/settings",
      icon: <FontAwesomeIcon icon={faCog} style={{ color: "#c62828" }} />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#2e7d32",
            letterSpacing: "0.5px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Quản trị
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems
            .filter((item) => !item.hidden)
            .map((item, index) => {
              if (item.children) {
                const open =
                  openMenus[item.label] ?? isSubActive(item.children[0].path);
                return (
                  <Box key={item.label}>
                    <ListItemButton onClick={() => handleToggle(item.label)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child, idx) => (
                          <ListItemButton
                            key={idx}
                            component={Link}
                            href={child.href}
                            selected={isSubActive(child.path)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{child.icon}</ListItemIcon>
                            <ListItemText>{child.label}</ListItemText>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }
              return (
                <Box key={index}>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    selected={isActive(item.href)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </Box>
              );
            })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
