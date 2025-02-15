import btnStar from "../../assets/images/icons/btn-star.svg";
import NewUserGraph from "../../assets/images/icons/admin/new-user-graph.png";
import RobotIcon from "../../assets/images/icons/robot.png";
import PieIcon from "../../assets/images/icons/pie-chart.png";
import AiAvatar from "../../assets/images/icons/admin/ai-img.png";
import SalesRevenue from "../../assets/images/icons/admin/salesRevenue.png";
import BestSelling from "../../assets/images/icons/admin/bestSelling.png";
import Profile1 from "../../assets/images/icons/profile-1.svg";
import Profile2 from "../../assets/images/icons/profile-2.svg";
import { appsData } from "../../components/shared/gridData";
import GridBox from "../../components/common/GridBox";
import { useAuthCheck } from "../../hooks/authHooks";
import { useEffect, useState } from "react";

const AdminPanel = () => {
  const { checkAuth } = useAuthCheck();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);

  return (
    <>
      {!loading && (
        <div className="w-full float-left auth-layout min-h-[calc(100vh-348px)]">
          <div className="w-full max-w-[1720px] mx-auto clearfix px-10">
            <div className="admin-dashboard-wrapper wrapper-shadow-primary admin-panel-bg w-full float-left flex border border-[rgba(108,140,255)]/50 rounded-[60px] overflow-hidden my-12">

              <div className="w-full flex flex-col">
                <div className="w-full float-left grid grid-cols-4 p-10 xl:p-16 gap-8">
                  <div className="w-full col-span-3 grid grid-cols-3 gap-8 items-end">
                    <div className="w-full float-left relative col-span-3">
                      <input
                        defaultValue="how can I help you today?"
                        type="text"
                        className="ai-input-box py-6 pl-8 pr-[218px]"
                      ></input>
                      <button
                        type="button"
                        className="search-ai-btn px-6 py-3 absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <span>Search with AI</span>
                        <img src={btnStar} alt="Star" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 gap-8">
                    <div className="w-full flex items-center gap-y-2.5 py-3 px-4 ai-help-bg rounded-[48px] rounded-bl-2xl">
                      <div className="ai-help-circle w-[70px] h-[70px] rounded-full"></div>
                      <p className="text-lg font-bold text-white font-Jakarta-sans px-3">
                        AI helps me revitalize
                        <br />
                        my business.
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <img className="w-full h-full" src={NewUserGraph} alt="" />
                  </div>
                  <div className="h-full flex flex-col gap-y-8">
                    <div className="w-full h-full float-left rounded-xl overflow-hidden">
                      <img className="img-cover-center" src={AiAvatar} alt="" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-y-8">
                    {/* <div className="w-full float-left flex-1">
                      <img className="w-full h-full" src={WaveChart} alt="" />
                    </div>
                    <div className="w-full float-left flex-1">
                      <img className="w-full h-full" src={PieChart} alt="" />
                    </div> */}
                    <div className="w-full h-full bg-black rounded-xl px-8 py-6 flex flex-col gap-y-3">
                      <img className="max-w-[80px]" src={RobotIcon} alt="" />
                      <div className="flex items-center mt-1">
                        <p className="ask-lusso-txt bg-gradient-to-r from-[#CC00F2] via-[#7362FF] to-[#5B97FF] text-3xl font-bold">
                          Ask Lusso
                        </p>
                        <span className="bg-primary text-xs font-medium text-white rounded py-0.5 px-1 ml-1">
                          beta
                        </span>
                      </div>
                      <p className="text-white text-sm font-medium"> Ask Lusso is designed to transform the customer service landscape. Offering personalized, responsive interaction, it ensures that every customer receives timely and relevant support.</p>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-3 col-span-4 gap-8">
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
export default AdminPanel;
