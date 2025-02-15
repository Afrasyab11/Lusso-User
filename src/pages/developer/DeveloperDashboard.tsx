import { Link } from "react-router-dom";
import AppIcon1 from "../../assets/images/icons/app-icon-1.svg";
import AppIcon2 from "../../assets/images/icons/app-icon-2.svg";
import AppIcon3 from "../../assets/images/icons/app-icon-3.svg";
import FilterIcon from "../../assets/images/icons/filter.svg";
import ExportIcon from "../../assets/images/icons/export.svg";
import PaginationPrev from "../../assets/images/icons/pagination-prev.svg";
import PaginationNext from "../../assets/images/icons/pagination-next.svg";
import PerformanceMeter1 from "../../assets/images/icons/performance-meter.svg";
import PerformanceMeter2 from "../../assets/images/icons/performance-meter-2.png";
import PieIcon from "../../assets/images/icons/pie-chart.png";
import StarRating from "../../components/common/StarRating";
import { useAuthCheck } from "../../hooks/authHooks";
import { useEffect, useState } from "react";

const DeveloperDashboard = () => {
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
            <div className="dev-dashboard-wrapper wrapper-shadow-primary w-full float-left flex bg-[#2B2748] border border-[rgba(108,140,255)]/50 p-8 rounded-[60px] overflow-hidden my-12">
              <div className="w-full p-8 bg-[#2B2748] rounded-[40px] flex flex-col gap-y-6">
                <div className="w-full grid grid-cols-4 gap-x-4">
                  <div className="bg-[#353057] border border-[#464070] p-6 rounded-[20px] flex flex-col gap-y-0.5">
                    <p className="text-base font-medium text-ll-gray">
                      APK added
                    </p>
                    <div className="flex items-center gap-x-1">
                      <span className="font-bold text-2xl text-white">10</span>
                    </div>
                  </div>
                  <div className="bg-[#353057] border border-[#464070] p-6 rounded-[20px] flex flex-col gap-y-0.5">
                    <p className="text-base font-medium text-ll-gray">
                      APK’s Retained
                    </p>
                    <div className="flex items-center gap-x-1">
                      <span className="font-bold text-2xl text-white">10</span>
                    </div>
                  </div>
                  <div className="bg-[#353057] border border-[#464070] p-6 rounded-[20px] flex flex-col gap-y-0.5">
                    <p className="text-base font-medium text-ll-gray">
                      Crashes
                    </p>
                    <div className="flex items-center gap-x-1">
                      <span className="font-bold text-2xl text-white">100</span>
                    </div>
                  </div>
                  <div className="bg-[#353057] border border-[#464070] p-6 rounded-[20px] flex flex-col gap-y-0.5">
                    <p className="text-base font-medium text-ll-gray">
                      Averaged rating
                    </p>
                    <div className="flex items-center gap-x-1">
                      <span className="font-bold text-2xl text-white">
                        4,0000{" "}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10.0008 15.217L4.12295 18.5072L5.43573 11.9002L0.490234 7.32683L7.17943 6.53371L10.0008 0.416992L12.8222 6.53371L19.5113 7.32683L14.5659 11.9002L15.8787 18.5072L10.0008 15.217Z"
                          fill="#FFAC70"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-x-4">
                  <div className="bg-[#353057] border border-[#464070] p-5 rounded-[20px] flex flex-col justify-between">
                    <div className="flex items-center flex-shrink-0 gap-x-1 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2.66699 14.666C2.66699 11.7205 5.05481 9.33268 8.00033 9.33268C10.9459 9.33268 13.3337 11.7205 13.3337 14.666H2.66699ZM8.00033 8.66602C5.79033 8.66602 4.00033 6.87602 4.00033 4.66602C4.00033 2.45602 5.79033 0.666016 8.00033 0.666016C10.2103 0.666016 12.0003 2.45602 12.0003 4.66602C12.0003 6.87602 10.2103 8.66602 8.00033 8.66602Z"
                          fill="white"
                        />
                      </svg>
                      <p className="capitalize text-white font-bold text-base">
                        User age group
                      </p>
                    </div>
                    {/* Sample graph HTML for demo purposes only. */}
                    <div className="w-full float-left grid grid-cols-6 gap-x-3 2xl:gap-x-3.5">
                      <div className="flex flex-col text-center justify-end gap-y-2">
                        <span className="text-white font-medium text-base">
                          14%
                        </span>
                        <span className="w-full h-[130px] rounded-lg bg-primary"></span>
                        <span className="text-ll-gray font-medium text-xs 2xl:text-base truncate">
                          18-24
                        </span>
                      </div>
                      <div className="flex flex-col text-center justify-end gap-y-2">
                        <span className="text-white font-medium text-base">
                          40%
                        </span>
                        <span className="w-full h-[210px] rounded-lg bg-gradient-to-b from-[#4800CB] from-30% to-[#FF77B0]"></span>
                        <span className="text-ll-gray font-medium text-xs 2xl:text-base truncate bg-[#464070] border border-[#665F9A] rounded-xl">
                          25-34
                        </span>
                      </div>
                      <div className="flex flex-col text-center justify-end gap-y-2">
                        <span className="text-white font-medium text-base">
                          26%
                        </span>
                        <span className="w-full h-[158px] rounded-lg bg-primary"></span>
                        <span className="text-ll-gray font-medium text-xs 2xl:text-base truncate">
                          35-44
                        </span>
                      </div>
                      <div className="flex flex-col text-center justify-end gap-y-2">
                        <span className="text-white font-medium text-base">
                          10%
                        </span>
                        <span className="w-full h-24 rounded-lg bg-primary"></span>
                        <span className="text-ll-gray font-medium text-xs 2xl:text-base truncate">
                          45-56
                        </span>
                      </div>
                      <div className="flex flex-col text-center justify-end gap-y-2">
                        <span className="text-white font-medium text-base">
                          6%
                        </span>
                        <span className="w-full h-[60px] rounded-lg bg-primary"></span>
                        <span className="text-ll-gray font-medium text-xs 2xl:text-base truncate">
                          56-65
                        </span>
                      </div>
                      <div className="flex flex-col text-center justify-end gap-y-2">
                        <span className="text-white font-medium text-base">
                          4%
                        </span>
                        <span className="w-full h-7 rounded-lg bg-primary"></span>
                        <span className="text-ll-gray font-medium text-xs 2xl:text-base truncate">
                          65+
                        </span>
                      </div>
                    </div>
                    {/* Sample graph HTML for demo purposes only. */}
                  </div>
                  <div className="bg-[#353057] border border-[#464070] p-5 rounded-[20px] flex flex-col justify-between">
                    <div className="flex items-center flex-shrink-0 gap-x-1 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1.36621 8.66701H5.01816C5.13749 10.8463 5.83826 12.8706 6.968 14.5877C3.99174 14.1251 1.66673 11.6939 1.36621 8.66701ZM1.36621 7.33367C1.66673 4.30686 3.99174 1.87558 6.968 1.41309C5.83826 3.13011 5.13749 5.15448 5.01816 7.33367H1.36621ZM14.6337 7.33367H10.9817C10.8624 5.15448 10.1617 3.13011 9.03193 1.41309C12.0082 1.87558 14.3332 4.30686 14.6337 7.33367ZM14.6337 8.66701C14.3332 11.6939 12.0082 14.1251 9.03193 14.5877C10.1617 12.8706 10.8624 10.8463 10.9817 8.66701H14.6337ZM6.35378 8.66701H9.64613C9.53173 10.5223 8.94306 12.2492 7.99993 13.7281C7.0568 12.2492 6.46819 10.5223 6.35378 8.66701ZM6.35378 7.33367C6.46819 5.47847 7.0568 3.75155 7.99993 2.27268C8.94306 3.75155 9.53173 5.47847 9.64613 7.33367H6.35378Z"
                          fill="white"
                        />
                      </svg>
                      <p className="capitalize text-white font-bold text-base">
                        Usage in country{" "}
                      </p>
                    </div>
                    <div className="w-full flex justify-between mt-4 gap-x-10 items-center">
                      <div className="flex flex-col gap-y-3 flex-shrink-0">
                        <div className="flex items-center gap-x-2">
                          <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-1"></span>
                          <p className="text-white text-lg font-medium">
                            India
                          </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-2"></span>
                          <p className="text-white text-lg font-medium">
                            China
                          </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-3"></span>
                          <p className="text-white text-lg font-medium">USA</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-4"></span>
                          <p className="text-white text-lg font-medium">
                            Canada
                          </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-5"></span>
                          <p className="text-white text-lg font-medium">
                            Other
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow overflow-hidden flex justify-end">
                        <img src={PieIcon} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#353057] border border-[#464070] p-5 rounded-[20px] flex flex-col">
                    <div className="flex items-center flex-shrink-0 gap-x-1 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.99967 1.33301H11.9997C12.3679 1.33301 12.6663 1.63149 12.6663 1.99967V13.9997C12.6663 14.3679 12.3679 14.6663 11.9997 14.6663H3.99967C3.63149 14.6663 3.33301 14.3679 3.33301 13.9997V1.99967C3.33301 1.63149 3.63149 1.33301 3.99967 1.33301ZM7.99967 11.333C7.63147 11.333 7.33301 11.6315 7.33301 11.9997C7.33301 12.3679 7.63147 12.6663 7.99967 12.6663C8.36787 12.6663 8.66634 12.3679 8.66634 11.9997C8.66634 11.6315 8.36787 11.333 7.99967 11.333Z"
                          fill="white"
                        />
                      </svg>
                      <p className="capitalize text-white font-bold text-base">
                        App user base
                      </p>
                    </div>
                    <div className="w-full flex flex-wrap justify-between gap-x-3">
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-1"></span>
                        <p className="text-white text-base 2xl:text-lg font-medium">
                          App1
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-2"></span>
                        <p className="text-white text-base 2xl:text-lg font-medium">
                          App2
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-3"></span>
                        <p className="text-white text-base 2xl:text-lg font-medium">
                          App3
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-4"></span>
                        <p className="text-white text-base 2xl:text-lg font-medium">
                          App4
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 flex-shrink-0 rounded-full gradient-label-5"></span>
                        <p className="text-white text-base 2xl:text-lg font-medium">
                          App5
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex-grow flex flex-col justify-end items-start mt-4 gap-x-10">
                      <div className="flex-grow w-full overflow-hidden flex flex-col justify-end">
                        <div className="w-full flex flex-col gap-y-5 my-5">
                          <div className="flex gap-x-2 items-center">
                            <span className="w-[46%] h-2 gradient-progress-1 rounded-md"></span>
                            <p className="text-white text-base font-medium">
                              700K
                            </p>
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <span className="w-[74%] h-2 gradient-progress-2 rounded-md"></span>
                            <p className="text-white text-base font-medium">
                              1000K
                            </p>
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <span className="w-[56%] h-2 gradient-progress-3 rounded-md"></span>
                            <p className="text-white text-base font-medium">
                              800K
                            </p>
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <span className="w-[38%] h-2 gradient-progress-4 rounded-md"></span>
                            <p className="text-white text-base font-medium">
                              600K
                            </p>
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <span className="w-1/5 h-2 gradient-progress-5 rounded-md"></span>
                            <p className="text-white text-base font-medium">
                              400K
                            </p>
                          </div>
                        </div>
                        <div className="w-full flex justify-between gap-x-2 2xl:gap-x-3 [&>span]:text-ll-gray [&>span]:text-sm [&>span]:2xl:text-base [&>span]:font-medium">
                          <span>100K</span>
                          <span>400K</span>
                          <span>600K</span>
                          <span>800K</span>
                          <span>1,000K</span>
                          <span>1,200K+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full float-left flex gap-x-4">
                  <div className="flex-grow flex overflow-hidden bg-[#353057] border border-[#464070] rounded-[20px] py-5">
                    <div className="w-[44%] px-5 flex flex-wrap 2xl:flex-nowrap gap-4 border-r border-white/10">
                      <div className="w-[100px] h-[100px] 2xl:w-[130px] 2xl:h-[130px] flex-shrink-0 overflow-hidden">
                        <img
                          src={AppIcon1}
                          alt=""
                          className="img-cover-center"
                        />
                      </div>
                      <div className="flex-grow overflow-hidden flex flex-col">
                        <h3 className="text-3xl font-medium text-white">
                          Pixel Palooza
                        </h3>
                        <p className="text-base font-medium text-ll-gray">
                          Mobile app
                        </p>
                        <div className="flex items-center gap-x-1.5">
                          <StarRating
                            size={18}
                            edit={false}
                            count={4}
                            value={4}
                            color={"#FFAC70"}
                          />
                          <span className="text-base font-medium text-[#FFAC70]">
                            1,000K{" "}
                          </span>
                        </div>
                        <div className="w-full flex flex-col gap-y-2 mt-2.5">
                          <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                            <span className="w-[110px]">App link:</span>
                            <p>
                              <Link to={""} className="text-[#77A5FF]">
                                pixelpalooza.com
                              </Link>
                            </p>
                          </div>
                          <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                            <span className="w-[110px]">Category:</span>
                            <p>Photography</p>
                          </div>
                          <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                            <span className="w-[110px]">Prize:</span>
                            <p>Free</p>
                          </div>
                          <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                            <span className="w-[110px]">Size:</span>
                            <p>20 MB</p>
                          </div>
                          <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                            <span className="w-[110px]">Created date:</span>
                            <p>June 20 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[56%] px-5 2xl:pl-10">
                      <p className="text-white font-medium text-base">
                        App performance
                      </p>
                      <div className="w-full flex flex-wrap xl:flex-nowrap gap-6 2xl:gap-10 items-start mt-8">
                        <div className="flex-shrink-0 relative">
                          <img
                            className="max-w-[120px] 2xl:max-w-[172px]"
                            src={PerformanceMeter1}
                            alt=""
                          />
                          <img
                            src={PerformanceMeter2}
                            className="absolute -bottom-11 left-1/2 transform -translate-x-1/2"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <div className="w-full flex flex-col gap-y-2 mt-2.5">
                            <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                              <span className="w-[170px]">
                                Search visibility:
                              </span>
                              <p>40%</p>
                            </div>
                            <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                              <span className="w-[170px]">Description:</span>
                              <p>20%</p>
                            </div>
                            <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                              <span className="w-[170px]">Keyword Rank:</span>
                              <p>10%</p>
                            </div>
                            <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                              <span className="w-[170px]">Screen shot:</span>
                              <p>3</p>
                            </div>
                            <div className="w-full flex gap-x-4 [&>*]:text-base [&>*]:font-medium [&>span]:text-ll-gray [&>p]:text-white">
                              <span className="w-[170px]">
                                Review performance:
                              </span>
                              <p>50%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[380px] flex-shrink-0 px-2 py-5 flex flex-col bg-[#353057] border border-[#464070] rounded-[20px]">
                    <div className="flex items-center flex-shrink-0 gap-x-1 px-3 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.99967 1.33301H11.9997C12.3679 1.33301 12.6663 1.63149 12.6663 1.99967V13.9997C12.6663 14.3679 12.3679 14.6663 11.9997 14.6663H3.99967C3.63149 14.6663 3.33301 14.3679 3.33301 13.9997V1.99967C3.33301 1.63149 3.63149 1.33301 3.99967 1.33301ZM7.99967 11.333C7.63147 11.333 7.33301 11.6315 7.33301 11.9997C7.33301 12.3679 7.63147 12.6663 7.99967 12.6663C8.36787 12.6663 8.66634 12.3679 8.66634 11.9997C8.66634 11.6315 8.36787 11.333 7.99967 11.333Z"
                          fill="white"
                        />
                      </svg>
                      <p className="capitalize text-white font-bold text-base">
                        All apps
                      </p>
                    </div>
                    <div className="w-full flex-grow custom-scrollbar overflow-auto max-h-[300px] px-3">
                      <div className="w-full flex flex-col gap-y-2 [&>div:not(:last-child)]:!border-b-[#8078B6]/40 ">
                        <div className="dev-app-list hover:!border-[#8078B6] rounded-2xl bg-[#635C90] !border-[#8078B6]">
                          <div className="w-[52px] h-[52px] flex-shrink-0 overflow-hidden">
                            <img
                              src={AppIcon1}
                              alt=""
                              className="img-cover-center"
                            />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <p className="text-lg font-medium text-white">
                              Pixel Palooza
                            </p>
                            <StarRating
                              size={18}
                              edit={false}
                              count={4}
                              value={4}
                              color={"#FFAC70"}
                            />
                          </div>
                        </div>
                        <div className="dev-app-list hover:!border-[#8078B6]">
                          <div className="w-[52px] h-[52px] flex-shrink-0 overflow-hidden">
                            <img
                              src={AppIcon2}
                              alt=""
                              className="img-cover-center"
                            />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <p className="text-lg font-medium text-white">
                              Apptivate
                            </p>
                            <StarRating
                              size={18}
                              edit={false}
                              count={4}
                              value={4}
                              color={"#FFAC70"}
                            />
                          </div>
                        </div>
                        <div className="dev-app-list hover:!border-[#8078B6]">
                          <div className="w-[52px] h-[52px] flex-shrink-0 overflow-hidden">
                            <img
                              src={AppIcon3}
                              alt=""
                              className="img-cover-center"
                            />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <p className="text-lg font-medium text-white">
                              Cloud Crafty
                            </p>
                            <StarRating
                              size={18}
                              edit={false}
                              count={4}
                              value={4}
                              color={"#FFAC70"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full float-left bg-[#353057] border border-[#464070] rounded-[20px]">
                  <div className="w-full float-left px-8 py-3 flex justify-between items-center border-b border-[#464070]">
                    <input
                      type="search"
                      placeholder="Search"
                      className="data-table-search"
                    />
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-[#3A345C] hover:bg-[#3A345C]/40 border border-[#464070] cursor-pointer rounded-lg px-4 py-2 h-[52px] gap-x-2">
                        <img
                          src={FilterIcon}
                          className="flex-shrink-0"
                          alt="Filter"
                        />
                        <p className="text-base font-medium text-white">
                          Filter
                        </p>
                      </div>
                      <div className="flex items-center bg-[#3A345C] hover:bg-[#3A345C]/40 border border-[#464070] cursor-pointer rounded-lg px-4 py-2 h-[52px] gap-x-2">
                        <img
                          src={ExportIcon}
                          className="flex-shrink-0"
                          alt="Export"
                        />
                        <p className="text-base font-medium text-white">
                          Export
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full float-left">
                    <table className="w-full 2xl:table-fixed">
                      <thead>
                        <tr className="text-left [&>th]:text-white/50 [&>th]:text-lg [&>th]:font-medium [&>th]:px-8 [&>th]:py-6 [&>th]:uppercase bg-[#302B4E]">
                          <th className="w-[340px]">App name</th>
                          <th>price</th>
                          <th className="whitespace-nowrap">Active installs</th>
                          <th>avg rating</th>
                          <th>Errors</th>
                          <th className="whitespace-nowrap">Last update</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      <tbody className="[&>tr]:text-left [&>tr]:border-t [&>tr]:border-[#464070] ">
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Pixel Palooza</td>
                          <td>Free</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>100</td>
                          <td>Aug 20 2023</td>
                          <td>Published</td>
                        </tr>
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Apptivate</td>
                          <td>$10</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>120</td>
                          <td>Aug 20 2023</td>
                          <td>Draft</td>
                        </tr>
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Cloud Crafty</td>
                          <td>$10</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>130</td>
                          <td>Aug 20 2023</td>
                          <td>Published</td>
                        </tr>
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Appsolutely Fabulous</td>
                          <td>$10</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>140</td>
                          <td>Aug 20 2023</td>
                          <td>Published</td>
                        </tr>
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Pixel Palooza</td>
                          <td>Free</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>100</td>
                          <td>Aug 20 2023</td>
                          <td>Published</td>
                        </tr>
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Apptivate</td>
                          <td>$10</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>120</td>
                          <td>Aug 20 2023</td>
                          <td>Draft</td>
                        </tr>
                        <tr className="[&>td]:text-white [&>td]:text-lg [&>td]:font-medium [&>td]:px-8 [&>td]:py-5">
                          <td>Cloud Crafty</td>
                          <td>$10</td>
                          <td>4,0000</td>
                          <td>500</td>
                          <td>130</td>
                          <td>Aug 20 2023</td>
                          <td>Published</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full float-left px-8 py-5 border-t border-[#464070] flex justify-between items-center">
                    <p className="text-sm font-medium text-white">
                      Result 1-10 of 100
                    </p>
                    <div className="flex items-center [&>span]:text-xs [&>span]:font-semibold [&>span]:text-white">
                      <span className="flex-shrink-0 min-w-[36px] h-9 flex items-center justify-center p-2 bg-[#302B4E] hover:bg-[#302B4E]/20 cursor-pointer border border-[#464070]">
                        <img src={PaginationPrev} alt="Prev" />
                      </span>
                      <span className="flex-shrink-0 min-w-[36px] h-9 flex items-center justify-center p-2 bg-[#302B4E] hover:bg-[#302B4E]/20 cursor-pointer border border-[#464070]">
                        1
                      </span>
                      <span className="flex-shrink-0 min-w-[36px] h-9 flex items-center justify-center p-2 bg-[#302B4E] hover:bg-[#302B4E]/20 cursor-pointer border border-[#464070]">
                        2
                      </span>
                      <span className="flex-shrink-0 min-w-[36px] h-9 flex items-center justify-center p-2 bg-[#302B4E] hover:bg-[#302B4E]/20 cursor-pointer border border-[#464070]">
                        ...
                      </span>
                      <span className="flex-shrink-0 min-w-[36px] h-9 flex items-center justify-center p-2 bg-[#302B4E] hover:bg-[#302B4E]/20 cursor-pointer border border-[#464070]">
                        8
                      </span>
                      <span className="flex-shrink-0 min-w-[36px] h-9 flex items-center justify-center p-2 bg-[#302B4E] hover:bg-[#302B4E]/20 cursor-pointer border border-[#464070]">
                        <img src={PaginationNext} alt="Prev" />
                      </span>
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
export default DeveloperDashboard;
