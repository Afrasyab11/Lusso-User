import { Link, NavLink } from "react-router-dom";
import NotificationIcon from "../../assets/images/icons/notification.svg";
import NavlogoIcon from "../../assets/images/logo-icon.png";
import NavlogoTxt from "../../assets/images/logo-txt.svg";
const PrivateNav = (props: any) => {
  return (
    <div className="header w-full float-left bg-black sticky top-0 z-[99] border-b border-white/10">
      <div className="w-full float-left px-10 2xl:px-16">
        <div className="w-full float-left flex gap-x-6 py-6">
          <div className="float-left flex flex-shrink-0">
            <Link
              to="/dashboard"
              className="py-1 float-left flex items-center gap-x-4 fhd:gap-x-6"
            >
              <img
                className="max-w-[60px] fhd:max-w-[90px]"
                src={NavlogoIcon}
                alt=""
              />
              <img
                className="max-w-[180px] fhd:max-w-[230px]"
                src={NavlogoTxt}
                alt=""
              />
            </Link>
            {/* Hamburger */}
          </div>
          <div className="flex-grow text-white flex justify-end items-center gap-x-6 xl:gap-x-10">
            <div className="flex gap-x-6 gap-y-2 fhd:gap-x-10 fhd:gap-y-4 flex-wrap place-content-end">
              <div className="uppercase relative">
                <NavLink to="/" className="private-nav-link">
                  Home
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/dashboard" className="private-nav-link">
                  Dashboard
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/askLusso" className="private-nav-link">
                  Ask lusso
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/admin-dashboard" className="private-nav-link">
                  Admin
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/dev-dashboard" className="private-nav-link">
                  Dev
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/admin-panel" className="private-nav-link">
                Analytics
                </NavLink>
              </div>
              {/* <div className="uppercase relative">
                <NavLink to="/auth" className="private-nav-link">
                  Course{" "}
                  <span className="text-[10px] font-medium bg-primary rounded-sm py-px px-0.5 normal-case relative bottom-px">
                    New
                  </span>
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/auth" className="private-nav-link">
                  Creators
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/auth" className="private-nav-link">
                  My Tools
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/auth" className="private-nav-link">
                  Saved
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink to="/auth" className="private-nav-link">
                  Community
                </NavLink>
              </div> */}
            </div>
            <div className="flex gap-x-6 fhd:gap-x-10 items-center flex-shrink-0">
              <div className="relative float-left">
                <img src={NotificationIcon} alt="Notification" />
                <span className="w-4 h-4 absolute -top-1 right-1 bg-primary rounded-full"></span>
              </div>
              <div className="relative float-left">
                <div className="w-16 h-16 fhd:w-24 fhd:h-24 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-bold text-4xl fhd:text-[64px]">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateNav;
