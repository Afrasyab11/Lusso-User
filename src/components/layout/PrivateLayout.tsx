import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
// import Sidebar from "../sidebar/sidebar";
import { decodeToken, getTokenFromCookies } from "../../hooks/common.utils";
import PrivateNav from "../navbar/PrivateNav";

const PrivateLayout = (props: any) => {
  const navigate = useNavigate()
  // init
  useEffect(() => {
    // Get token from cookies
    const token = getTokenFromCookies();
    if (token) {
      // Decode token to get user data
      const decoded = decodeToken(token);
    } else {
      navigate('/auth')
    }
  }, []);
  return (
    <div className="float-left w-full">
      <PrivateNav />
      <div className="w-full float-left min-h-[calc(100vh-348px)] private-layout-bg">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
