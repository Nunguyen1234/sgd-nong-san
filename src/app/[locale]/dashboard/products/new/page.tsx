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
import ImageUploadModal from "./addImages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import apiAxios, { BASE_URL_API } from "src/app/api/axiosConfig";
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
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/br5.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "opacity(0.3)",
          zIndex: 0,
        }}
      />
      {/* Tên sản phẩm */}
      <Box mb={2} className="animate-fadeIn">
        <TextField
          label="Tên sản phẩm"
          fullWidth
          {...register("name", { required: "Bắt buộc" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            className:
              "transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-md shadow-sm",
          }}
        />
      </Box>
      {/* Đơn giá */}
      <Box mb={2} className="animate-fadeIn delay-100">
        <TextField
          label="Đơn giá"
          fullWidth
          {...register("unitPrice", { required: "Bắt buộc" })}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice?.message}
        />
      </Box>
      <Box mb={2} className="animate-fadeIn delay-200">
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
          InputProps={{
            className:
              "transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-md shadow-sm",
          }}
        />
      </Box>

      <Box mb={2} className="animate-fadeIn delay-300">
        {/* Đơn vị */}
        <TextField
          label="Đơn vị"
          fullWidth
          {...register("unit", { required: "Bắt buộc" })}
          error={!!errors.unit}
          helperText={errors.unit?.message}
          InputProps={{
            className:
              "transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-md shadow-sm",
          }}
        />
      </Box>
      <Box mb={2} className="animate-fadeIn delay-400">
        {/* Xuất xứ */}
        <TextField
          label="Xuất xứ"
          fullWidth
          {...register("origin")}
          InputProps={{
            className:
              "transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-md shadow-sm",
          }}
        />
      </Box>
      {/* Loại sản phẩm*/}
      <Box mb={2} className="animate-fadeIn delay-500">
        <FormControl fullWidth>
          <InputLabel id="productType-label">Loại sản phẩm</InputLabel>
          <Select
            labelId="category-label"
            label="Danh mục"
            {...register("categoryId", { required: "Vui lòng chọn danh mục" })}
            className="transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-md shadow-sm"
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
      <Box mb={2} className="animate-fadeIn delay-600">
        <TextField
          label="Mô tả"
          fullWidth
          multiline
          rows={4}
          {...register("description", {
            required: "Mô tả không được để trống",
            minLength: { value: 10, message: "Mô tả tối thiểu 10 ký tự" },
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          InputProps={{
            className:
              "transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-md shadow-sm",
          }}
        />
      </Box>

      <Box mb={2}>
        {/* Nút chọn ảnh */}
        <Box mb={1} className="animate-fadeIn delay-700 col-span-2">
          <Button
            variant="outlined"
            onClick={() => setOpenModal(true)}
            className="hover:bg-pink-50 text-pink-600 border-pink-400 hover:border-pink-600 transition duration-300 shadow-sm rounded-md"
          >
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
                  className="absolute top-1 right-1 bg-white bg-opacity-80 hover:bg-opacity-100 shadow-md transition duration-300"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box mb={2} className="col-span-2 animate-fadeIn delay-900">
        {/* Nút đăng bài */}
        <Button
          type="submit"
          variant="contained"
          className=" bg-pink-600 hover:bg-pink-700 transition duration-300 shadow-lg rounded-lg py-3 text-lg "
        >
          Đăng bài
        </Button>
      </Box>
    </form>
  );
}
