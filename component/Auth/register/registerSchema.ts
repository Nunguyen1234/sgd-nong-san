import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup.string().required("Tên đăng nhập là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: yup.string().required("Số điện thoại là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  nameCompany: yup.string().required("Tên công ty là bắt buộc"),
  city: yup.string().required("Tỉnh/Thành phố là bắt buộc"),
  district: yup.string().required("Quận/Huyện là bắt buộc"),
  address: yup.string().required("Địa chỉ là bắt buộc"),
});
