"use client";

import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { SnackbarProvider } from "notistack";
import Header from "component/Dashboard/Header";
import Sidebar from "component/Dashboard/Sidebar";
// import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", mt: "64px" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Toaster position="top-center" />

          {/* <button onClick={() => toast.success("Thành công!")}>
              Hiện toast
            </button> */}

          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {children}
          </SnackbarProvider>
        </Box>
      </Box>
    </>
  );
}
