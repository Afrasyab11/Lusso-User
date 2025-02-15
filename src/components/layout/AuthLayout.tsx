import "./layout.scss";
import { Outlet } from "react-router-dom";

const AuthLayout = (props: any) => {
  return (
    <div className="auth-layout float-left w-full min-h-screen flex items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
