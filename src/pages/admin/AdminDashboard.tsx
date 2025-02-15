import NavlogoIcon from "../../assets/images/logo-icon.png";
import AdminDashboardIcon from "../../assets/images/icons/admin-dashboard.svg";
import CalendarIcon from "../../assets/images/icons/calendar.svg";
import AdminSettingsIcon from "../../assets/images/icons/settings-admin.svg";
import ProjectIcon from "../../assets/images/icons/project-icon.svg";
import HRDMSIcon from "../../assets/images/icons/hrdms-icon.svg";
import SettingsGrayIcon from "../../assets/images/icons/settings-gray.svg";
import GiftIcon from "../../assets/images/icons/gift-icon.svg";
import MsgIcon from "../../assets/images/icons/msg-icon.svg";
import BellIcon from "../../assets/images/icons/bell-icon.svg";
import Avatar from "../../assets/images/icons/avatar.svg";
import UpgradeBox from "../../components/common/UpgradeBox";
import NewUserGraph from "../../assets/images/icons/admin/new-user-graph.png";
import WaveChart from "../../assets/images/icons/admin/waveChart.png";
import PieChart from "../../assets/images/icons/admin/pieChart.png";
import WaveLineChart from "../../assets/images/icons/admin/waveLineChart.png";
import AiHelpGraph from "../../assets/images/icons/admin/ai-help-graph.png";
import SalesRevenue from "../../assets/images/icons/admin/salesRevenue.png";
import BestSelling from "../../assets/images/icons/admin/bestSelling.png";
import Profile1 from "../../assets/images/icons/profile-1.svg";
import Profile2 from "../../assets/images/icons/profile-2.svg";
import { appsData } from "../../components/shared/gridData";
import GridBox from "../../components/common/GridBox";
import { useAuthCheck } from "../../hooks/authHooks";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { checkAuth } = useAuthCheck();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);

  return (
    <>
      {!loading && (
        <div className="w-full float-left private-layout-bg min-h-[calc(100vh-348px)]">
          <div className="w-full max-w-[1800px] mx-auto clearfix px-10">
            <div className="admin-dashboard-wrapper wrapper-shadow-primary w-full float-left flex bg-[#2B2748] border border-[rgba(108,140,255)]/50 rounded-[60px] overflow-hidden my-12">
              <div className="admin-sidebar w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col py-10 justify-between pl-8 pr-4 font-poppins">
                <div className="w-full float-left">
                  <img
                    className="max-w-[96px] w-full mx-auto"
                    src={NavlogoIcon}
                    alt=""
                  />
                  <div className="w-full float-left flex flex-col items-start gap-y-12">
                    <div className="w-full flex flex-col gap-y-2 my-16">
                      <div className="w-full float-left">
                        <div className="admin-sidebar-list w-full flex gap-x-3.5 items-center hover:border-r-[#00F0FB] active-sidebar-menu">
                          <img
                            className="flex-shrink-0"
                            src={AdminDashboardIcon}
                            alt=""
                          />
                          <div className="flex-grow overflow-hidden flex items-center gap-x-1.5">
                            <p className="text-sm font-semibold text-white truncate">
                              Dashboard
                            </p>
                            {/* <span className="w-5 h-5 flex-shrink-0 bg-[#D9B75F] rounded-full text-black text-[10px]  flex justify-center items-center font-semibold">2</span> */}
                          </div>
                          {/* <svg className="flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <path d="M8.07422 16.1497L13.393 10.831L8.07422 5.51221" fill="#D3D6E4"/>
                        </svg> */}
                        </div>
                      </div>

                      <div className="w-full float-left">
                        <div className="admin-sidebar-list w-full flex gap-x-3.5 items-center hover:border-r-[#00F0FB]">
                          <img
                            className="flex-shrink-0"
                            src={CalendarIcon}
                            alt=""
                          />
                          <div className="flex-grow overflow-hidden flex items-center gap-x-1.5">
                            <p className="text-sm font-semibold text-white truncate">
                              Event Monitoring
                            </p>
                            <span className="w-5 h-5 flex-shrink-0 bg-[#D9B75F] rounded-full text-black text-[10px]  flex justify-center items-center font-semibold">
                              2
                            </span>
                          </div>
                          <svg
                            className="flex-shrink-0 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M8.07422 16.1497L13.393 10.831L8.07422 5.51221"
                              fill="#D3D6E4"
                            />
                          </svg>
                        </div>
                        <ul className="w-full float-left flex flex-col my-1 pl-9 gap-y-4 [&>li]:text-white [&>li]:font-normal [&>li]:cursor-pointer [&>li]:truncate [&>li]:text-sm">
                          <li className="hover:text-[#00F0FB]">
                            Finance Performance
                          </li>
                          <li className="hover:text-[#00F0FB]">
                            Sales Monitoring
                          </li>
                          <li className="hover:text-[#00F0FB]">Analytics</li>
                        </ul>
                      </div>

                      <div className="w-full float-left">
                        <div className="admin-sidebar-list w-full flex gap-x-3.5 items-center hover:border-r-[#00F0FB]">
                          <img
                            className="flex-shrink-0"
                            src={ProjectIcon}
                            alt=""
                          />
                          <div className="flex-grow overflow-hidden flex items-center gap-x-1.5">
                            <p className="text-sm font-semibold text-white truncate">
                              Project
                            </p>
                            {/* <span className="w-5 h-5 flex-shrink-0 bg-[#D9B75F] rounded-full text-black text-[10px]  flex justify-center items-center font-semibold">2</span> */}
                          </div>
                          <svg
                            className="flex-shrink-0 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M8.07422 16.1497L13.393 10.831L8.07422 5.51221"
                              fill="#D3D6E4"
                            />
                          </svg>
                        </div>
                        {/* submenu html code here */}
                      </div>

                      <div className="w-full float-left">
                        <div className="admin-sidebar-list w-full flex gap-x-3.5 items-center hover:border-r-[#00F0FB]">
                          <img
                            className="flex-shrink-0"
                            src={HRDMSIcon}
                            alt=""
                          />
                          <div className="flex-grow overflow-hidden flex items-center gap-x-1.5">
                            <p className="text-sm font-semibold text-white truncate">
                              HRDMS System
                            </p>
                            {/* <span className="w-5 h-5 flex-shrink-0 bg-[#D9B75F] rounded-full text-black text-[10px]  flex justify-center items-center font-semibold">2</span> */}
                          </div>
                          <svg
                            className="flex-shrink-0 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M8.07422 16.1497L13.393 10.831L8.07422 5.51221"
                              fill="#D3D6E4"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="w-full float-left">
                        <div className="admin-sidebar-list w-full flex gap-x-3.5 items-center hover:border-r-[#00F0FB]">
                          <img
                            className="flex-shrink-0"
                            src={AdminSettingsIcon}
                            alt=""
                          />
                          <div className="flex-grow overflow-hidden flex items-center gap-x-1.5">
                            <p className="text-sm font-semibold text-white truncate">
                              Settings
                            </p>
                            {/* <span className="w-5 h-5 flex-shrink-0 bg-[#D9B75F] rounded-full text-black text-[10px]  flex justify-center items-center font-semibold">2</span> */}
                          </div>
                          <svg
                            className="flex-shrink-0 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M8.07422 16.1497L13.393 10.831L8.07422 5.51221"
                              fill="#D3D6E4"
                            />
                          </svg>
                        </div>
                        {/* submenu html code here */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full float-left pr-4">
                  <UpgradeBox />
                </div>
              </div>
              <div className="flex-grow overflow-hidden flex flex-col font-poppins">
                <div className="admin-dashboard-bg w-full float-left pr-8 pl-6 gap-x-4 flex-shrink-0 py-6 flex justify-between">
                  <div className="flex items-center gap-x-6">
                    <svg
                      className="flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="41"
                      height="42"
                      viewBox="0 0 41 42"
                      fill="none"
                    >
                      <rect
                        width="23.0479"
                        height="2.65937"
                        rx="1.32969"
                        transform="matrix(-1 0 0 1 32.0625 12.323)"
                        fill="white"
                      />
                      <rect
                        width="23.0479"
                        height="2.65937"
                        rx="1.32969"
                        transform="matrix(-1 0 0 1 32.0625 19.4146)"
                        fill="white"
                      />
                      <rect
                        width="23.0479"
                        height="2.65937"
                        rx="1.32969"
                        transform="matrix(-1 0 0 1 32.0625 26.5063)"
                        fill="white"
                      />
                    </svg>
                    <h3 className="text-white font-semibold text-2xl">
                      Analytics Dashboard
                    </h3>
                  </div>
                  <div className="float-left flex items-center gap-x-6 2xl:gap-x-10 flex-grow justify-end">
                    <div className="flex gap-x-3 items-center">
                      <input
                        type="text"
                        placeholder="Search here"
                        className="admin-nav-item-bg admin-nav-search-box min-w-[170px] h-12"
                      />
                      <div className="flex-shrink-0 rounded-lg border border-white/40 admin-nav-item-bg cursor-pointer p-3 h-12 flex items-center justify-center">
                        <img src={SettingsGrayIcon} alt="" />
                      </div>
                    </div>
                    <div className="flex gap-x-3 items-center">
                      <div className="relative flex-shrink-0 rounded-lg border border-white/40 admin-nav-item-bg cursor-pointer p-3 w-12 h-12 flex items-center justify-center">
                        <img src={BellIcon} alt="" />
                        <span className="w-[14px] h-[14px] absolute -top-1.5 -right-1.5 bg-[#00F0FB] rounded-full"></span>
                      </div>
                      <div className="relative flex-shrink-0 rounded-lg border border-white/40 admin-nav-item-bg cursor-pointer p-3 w-12 h-12 flex items-center justify-center">
                        <img src={MsgIcon} alt="" />
                        <span className="w-[14px] h-[14px] absolute -top-1.5 -right-1.5 bg-[#00F0FB] rounded-full"></span>
                      </div>
                      <div className="relative flex-shrink-0 rounded-lg border border-white/40 admin-nav-item-bg cursor-pointer p-3 w-12 h-12 flex items-center justify-center">
                        <img src={GiftIcon} alt="" />
                        <span className="w-[14px] h-[14px] absolute -top-1.5 -right-1.5 bg-[#00F0FB] rounded-full"></span>
                      </div>
                    </div>
                    <div className="flex gap-x-3 items-center flex-shrink-0">
                      <img
                        className="w-12 h-12 float-left object-cover object-center flex-shrink-0"
                        src={Avatar}
                        alt=""
                      />
                      <div className="flex-grow overflow-hidden flex items-center gap-x-2">
                        <p className="truncate text-sm text-white max-w-[200px]">
                          David
                        </p>
                        <svg
                          className="flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M5.53633 8.52808L10.8551 13.8468L16.1738 8.52808"
                            fill="#D3D6E4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full float-left grid grid-cols-4 pr-8 pl-6 py-8 gap-8">
                  <div className="col-span-2">
                    <img className="w-full h-full" src={NewUserGraph} alt="" />
                  </div>
                  <div className="flex flex-col gap-y-8">
                    <div className="w-full float-left flex-1">
                      <img className="w-full h-full" src={WaveChart} alt="" />
                    </div>
                    <div className="w-full float-left flex-1">
                      <img className="w-full h-full" src={PieChart} alt="" />
                    </div>
                  </div>
                  <div className="h-full flex flex-col gap-y-8">
                    <div className="w-full float-left">
                      <img className="w-full" src={AiHelpGraph} alt="" />
                    </div>
                    <div className="w-full float-left">
                      <img className="w-full" src={WaveLineChart} alt="" />
                    </div>
                  </div>
                  <div className="col-span-3 rounded-lg">
                    <img className="w-full h-full" src={SalesRevenue} alt="" />
                  </div>
                  <div className="w-full">
                    <img className="w-full" src={BestSelling} alt="" />
                  </div>
                  <div className="border-2 border-white/40 rounded-xl px-4 py-6 admin-col-bg">
                    <h3 className="font-bold text-lg text-white">
                      <span className="text-secondary">Top 20</span>{" "}
                      Subscriptions
                    </h3>
                    <div className="w-full flex flex-col mt-4">
                      <div className="flex gap-x-5 items-center border-b border-[#323940] py-4">
                        <img
                          src={Profile1}
                          alt=""
                          className="flex-shrink-0 w-12 h-12 object-center object-cover"
                        />
                        <div className="flex-grow overflow-hidden flex flex-col gap-y-0.5">
                          <p className="truncate text-white text-base font-medium">
                            Olivia Johanson
                          </p>
                          <div className="flex-grow overflow-hidden flex justify-between gap-x-1 [&>p]:truncate [&>p]:font-normal [&>p]:text-sm [&>p]:text-[#969BA0]">
                            <p>Event AB</p>
                            <p>2m ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-x-5 items-center border-b border-[#323940] py-4">
                        <img
                          src={Profile2}
                          alt=""
                          className="flex-shrink-0 w-12 h-12 object-center object-cover"
                        />
                        <div className="flex-grow overflow-hidden flex flex-col gap-y-0.5">
                          <p className="truncate text-white text-base font-medium">
                            Olivia Johanson
                          </p>
                          <div className="flex-grow overflow-hidden flex justify-between gap-x-1 [&>p]:truncate [&>p]:font-normal [&>p]:text-sm [&>p]:text-[#969BA0]">
                            <p>Event AB</p>
                            <p>2m ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-x-5 items-center border-b border-[#323940] py-4">
                        <img
                          src={Profile1}
                          alt=""
                          className="flex-shrink-0 w-12 h-12 object-center object-cover"
                        />
                        <div className="flex-grow overflow-hidden flex flex-col gap-y-0.5">
                          <p className="truncate text-white text-base font-medium">
                            Olivia Johanson
                          </p>
                          <div className="flex-grow overflow-hidden flex justify-between gap-x-1 [&>p]:truncate [&>p]:font-normal [&>p]:text-sm [&>p]:text-[#969BA0]">
                            <p>Event AB</p>
                            <p>2m ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-x-5 items-center border-b border-[#323940] py-4">
                        <img
                          src={Profile2}
                          alt=""
                          className="flex-shrink-0 w-12 h-12 object-center object-cover"
                        />
                        <div className="flex-grow overflow-hidden flex flex-col gap-y-0.5">
                          <p className="truncate text-white text-base font-medium">
                            Olivia Johanson
                          </p>
                          <div className="flex-grow overflow-hidden flex justify-between gap-x-1 [&>p]:truncate [&>p]:font-normal [&>p]:text-sm [&>p]:text-[#969BA0]">
                            <p>Event AB</p>
                            <p>2m ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-x-5 items-center border-b border-[#323940] py-4">
                        <img
                          src={Profile1}
                          alt=""
                          className="flex-shrink-0 w-12 h-12 object-center object-cover"
                        />
                        <div className="flex-grow overflow-hidden flex flex-col gap-y-0.5">
                          <p className="truncate text-white text-base font-medium">
                            Olivia Johanson
                          </p>
                          <div className="flex-grow overflow-hidden flex justify-between gap-x-1 [&>p]:truncate [&>p]:font-normal [&>p]:text-sm [&>p]:text-[#969BA0]">
                            <p>Event AB</p>
                            <p>2m ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 border-2 border-white/40 rounded-xl px-4 py-6 admin-col-bg">
                    <div className="w-full float-left mb-16 last-of-type:mb-0">
                      <div className="w-full flex justify-between items-center">
                        <div className="float-left">
                          <h3 className="font-bold text-lg text-white">
                            <span className="text-secondary">Top 20</span> Apps
                          </h3>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="w-full float-left mt-4 grid-box-xs">
                        <GridBox data={appsData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminDashboard;
