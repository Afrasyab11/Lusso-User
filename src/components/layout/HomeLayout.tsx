import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeToken, getTokenFromCookies } from "../../hooks/common.utils";
import { ScrollProvider } from "../common/ScrollContext";
import Sidebar from "../sidebar/SideBarNew";
import TopBar from "../topbar/TopBar";
const HomeLayout = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  let refreshTab = '';
  if (location.pathname.includes("/addproduct")) {
    refreshTab = 'addproducts';
  }
  if (location.pathname.includes("/manageprofile")) {
    refreshTab = 'manageprofile';
  }
  location.pathname.includes("/manageprofile")
    ;

  // init
  useEffect(() => {
    // Get token from cookies
    const token = getTokenFromCookies();
    if (token) {
      // Decode token to get user data
      const decoded = decodeToken(token);
    } else {
      // navigate('/auth')
    }
  }, []);

  // render
  return (
    <ScrollProvider>
      <div style={{ display: "flex" }}>
        <Sidebar shouldRefresh={refreshTab} />
        <TopBar></TopBar>
        {/* <div className="w-full float-left min-h-[calc(100vh-348px)]">
          <Outlet />
        </div> */}
        {/* <Footer /> */}
      </div>
    </ScrollProvider>
  );
};

export default HomeLayout;
