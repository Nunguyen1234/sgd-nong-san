// import Image from "next/image";

import { Dashboard } from "@mui/icons-material";
import LoginForm from "../component/Auth/login/LoginForm";
// import RegisterForm from "./component/Auth/register/RegisterForm";
export default function Home() {
  return (
    <div className="">
      <LoginForm mode={"admin"} />
      {/* <RegisterForm /> */}
      <Dashboard />
    </div>
  );
}
