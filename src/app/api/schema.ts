import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  productName: Yup.string().required("Tên sản phẩm không được để trống"),
  unitPrice: Yup.number()
    .typeError("Đơn giá phải là số")
    .min(1, "Đơn giá phải lớn hơn 0")
    .required("Đơn giá không được để trống"),
  unit: Yup.string().required("Đơn vị tính không được để trống"),
  origin: Yup.string().required("Xuất xứ không được để trống"),
  description: Yup.string(),
  productType: Yup.string().required("Loại sản phẩm không được để trống"),
});
