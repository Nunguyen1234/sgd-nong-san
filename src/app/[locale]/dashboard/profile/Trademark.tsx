"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

const AccountInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={2}
        sx={{ textAlign: "left" }}
      >
        Thương hiệu
      </Typography>
      <Typography color="text.secondary" mb={2} sx={{ textAlign: "left" }}>
        Thiết lập logo và banner
      </Typography> 
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Họ tên"
            fullWidth
            {...register("userName", { required: "Vui lòng nhập họ tên" })}
            error={!!errors.userName}
            helperText={errors.userName?.message as string}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField label="Địa chỉ" fullWidth {...register("address")} />
        </Grid>
        <Button type="submit" variant="contained">
          Cập nhật
        </Button>
      </Grid>
    </Box>
  );
};

export default AccountInfoForm;
