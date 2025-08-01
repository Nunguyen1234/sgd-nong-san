import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ContactInfoForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const email = watch("email");

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ textAlign: "left" }}>
        Thông tin liên lạc
      </Typography>
      <Typography color="text.secondary" mb={2} sx={{ textAlign: "left" }}>
        Thông tin địa chỉ liên lạc
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label={
              <Box component="span">
                Email đăng nhập tài khoản{" "}
                <Box component="span" color="error.main">
                  (*)
                </Box>
              </Box>
            }
            fullWidth
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email không hợp lệ",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            InputProps={{
              endAdornment:
                email && /^\S+@\S+\.\S+$/.test(email) ? (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ) : null,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "success.main",
                },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Email liên hệ"
            fullWidth
            {...register("contactEmail")}
            placeholder="Email liên hệ"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Địa chỉ website"
            fullWidth
            {...register("website")}
            placeholder="Địa chỉ website"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Địa chỉ"
            fullWidth
            {...register("address")}
            placeholder="Địa chỉ"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Số điện thoại liên hệ"
            fullWidth
            {...register("contactPhone")}
            placeholder="Số điện thoại liên hệ"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactInfoForm;
