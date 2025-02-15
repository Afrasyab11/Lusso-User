import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import PublicNav from "../navbar/PublicNav";
// import Sidebar from "../sidebar/sidebar";

const PublicLayout = (props: any) => {
  return (
    <div className="float-left w-full">
      <PublicNav />
      <div className="w-full float-left min-h-[calc(100vh-348px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
