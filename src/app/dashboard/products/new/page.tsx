"use client";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import Image from "next/image";
import apiAxios, { BASE_URL_API } from "@/app/api/axiosConfig";
import ImageUploadModal from "./addImages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type CreateProductResponse = {
  success: boolean;
  message: string;
  data: unknown;
};
type Category = {
  id: number;
  name: string;
};
type FormData = {
  message: string;
  categoryId: number;
  id: number;
  quantity: number;
  name: string;
  unitPrice: string;
  unit: string;
  productCode: string;
  origin: string;
  weight: string;
  productType: string;
  imageUrl: File[];
  description: string;
};

export default function ProductForm() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const [productTypes, setProductTypes] = useState<Category[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      unitPrice: "",
      unit: "",
      name: "",
      productCode: "",
      origin: "",
      quantity: 0,
      description: "",
      imageUrl: [],
      categoryId: 1000,
    },
  });
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const res = await apiAxios.get<{ data: Category[] }>(
          `${BASE_URL_API}/category`
        );
        const categories = res.data.data;
        setProductTypes(categories);

        if (categories.length > 0) {
          setValue("categoryId", categories[0].id);
        }
      } catch (error) {
        console.error("Lỗi:", error);
        enqueueSnackbar("Không tải được danh mục sản phẩm", {
          variant: "error",
        });
      }
    };
    fetchProductTypes();
  }, [enqueueSnackbar, setValue]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("productCode", data.productCode);
    formData.append("price", data.unitPrice);
    formData.append("unit", data.unit);
    formData.append("quantity", data.quantity.toString());
    formData.append("origin", data.origin);
    formData.append("categoryId", data.categoryId.toString());
    formData.append("description", data.description);

    if (data.imageUrl && data.imageUrl.length > 0) {
      data.imageUrl.forEach((file) => {
        formData.append("imageUrl", file);
      });
    }

    try {
      const res = await apiAxios.post<CreateProductResponse>(
        `${BASE_URL_API}/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Đăng bài thành công");
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Lỗi đăng bài:", error);

      if (data?.message) {
        toast.error(data.message);
      } else {
        toast.error("Đăng bài thất bại");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Tên sản phẩm */}
      <Box mb={2}>
        <TextField
          label="Tên sản phẩm"
          fullWidth
          {...register("name", { required: "Bắt buộc" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Box>
      {/* Đơn giá */}
      <Box mb={2}>
        <TextField
          label="Đơn giá"
          fullWidth
          {...register("unitPrice", { required: "Bắt buộc" })}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice?.message}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Số lượng"
          type="number"
          fullWidth
          {...register("quantity", {
            required: "Bắt buộc",
            min: {
              value: 1,
              message: "Số lượng phải lớn hơn 0",
            },
          })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />
      </Box>

      <Box mb={2}>
        {/* Đơn vị */}
        <TextField
          label="Đơn vị"
          fullWidth
          {...register("unit", { required: "Bắt buộc" })}
          error={!!errors.unit}
          helperText={errors.unit?.message}
        />
      </Box>
      <Box mb={2}>
        {/* Xuất xứ */}
        <TextField label="Xuất xứ" fullWidth {...register("origin")} />
      </Box>
      {/* Loại sản phẩm*/}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="productType-label">Loại sản phẩm</InputLabel>
          <Select
            labelId="category-label"
            label="Danh mục"
            {...register("categoryId", { required: "Vui lòng chọn danh mục" })}
          >
            {productTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Mô tả */}
      <Box mb={2}>
        <TextField
          label="Mô tả"
          fullWidth
          multiline
          rows={4}
          {...register("description", {
            required: "Mô tả không được để trống",
            minLength: { value: 10, message: "Mô tả tối thiểu 10 ký tự" },
          })}
        />
      </Box>

      <Box mb={2}>
        {/* Nút chọn ảnh */}
        <Box mb={1}>
          <Button variant="outlined" onClick={() => setOpenModal(true)}>
            Hình ảnh
          </Button>
          <ImageUploadModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            currentImages={watch("imageUrl") || []}
            onImageSelect={(updatedFiles: File[]) => {
              setValue("imageUrl", updatedFiles, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </Box>

        {/* Preview hình ảnh */}
        {Array.isArray(watch("imageUrl")) && watch("imageUrl").length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {watch("imageUrl").map((img, index) => (
              <Box key={index} position="relative" sx={{ maxWidth: 140 }}>
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index}`}
                  width={140}
                  height={140}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
                <IconButton
                  size="small"
                  onClick={() => {
                    const updated = [...watch("imageUrl")];
                    updated.splice(index, 1);
                    setValue("imageUrl", updated);
                  }}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    ":hover": {
                      backgroundColor: "rgba(255,255,255,1)",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box mb={2}>
        {/* Nút đăng bài */}
        <Button type="submit" variant="contained" className="col-span-2">
          Đăng bài
        </Button>
      </Box>
    </form>
  );
}
