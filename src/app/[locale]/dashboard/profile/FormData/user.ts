export type FormData = {
  userName: string;
  email: string;
  phone: string;
  // password?: string;
  // nameCompany: string;
  city: string;
  gender?: "Male" | "Female";
  // dateOfBirth?: string;
  district?: string;
  address?: string;
  avatar: FileList | string;
};
