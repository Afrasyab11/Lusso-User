import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import btnStar from "../../assets/images/icons/btn-star.svg";
import RobotIcon from "../../assets/images/icons/robot.png";
import GridBox from "../../components/common/GridBox";
import {
  aiToolsData,
  appsData,
  subscriptionsData,
} from "../../components/shared/gridData";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthCheck } from "../../hooks/authHooks";
import "./dashboard.scss";
const Dashboard = () => {
  const { checkAuth } = useAuthCheck();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);
  return (
    <>
      {!loading && (
        <div className="w-full float-left py-6 pl-10 2xl:pl-16">
          <div className="sidebar w-[340px] xl:w-[410px] float-left">
            <Sidebar />
          </div>
          <div className="pl-[340px] xl:pl-[410px] clearfix">
            <div className="max-w-[1370px] 2xl:max-w-[1418px] mx-auto clearfix px-10 2xl:px-16">
              <div className="w-full float-left">
                {/* Banner section html start */}
                <section className="w-full float-left dashboard-banner-bg py-8 px-10 rounded-t-[30px] min-h-[520px] mb-16">
                  <div className="w-full float-left mt-28">
                    <h2 className="text-center text-[44px] !leading-[54px] text-white font-bold">
                      Hi, Andrew! Welcome Back 🖐
                    </h2>
                  </div>
                  <div className="w-full float-left flex flex-col mt-20">
                    <div className="w-full relative">
                      <div className="ai-search-box max-w-[800px] w-full mx-auto clearfix bg-black/50 py-8 px-8 flex items-center rounded-full gap-x-5">
                        <img className="max-w-[120px]" src={RobotIcon} alt="" />
                        <div className="flex flex-col flex-grow">
                          <div className="flex items-center mb-2">
                            <p className="ask-lusso-txt bg-gradient-to-r from-[#CC00F2] via-[#7362FF] to-[#5B97FF] text-[34px] font-bold">
                              Ask Lusso
                            </p>
                            <span className="bg-primary text-xs font-medium text-white rounded py-0.5 px-1 ml-1">
                              beta
                            </span>
                          </div>
                          <div className="w-full float-left relative">
                            <input
                              defaultValue="how can I help you today?"
                              type="text"
                              className="ai-input-box py-4 pl-8 pr-[214px]"
                            ></input>
                            <button
                              type="button"
                              className="search-ai-btn px-4 py-2 absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                              <span>Search with AI</span>
                              <img src={btnStar} alt="Star" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Banner section html end */}

                <div className="w-full float-left mb-16">
                  <div className="w-full flex justify-between items-end">
                    <div className="float-left">
                      <h3 className="font-bold text-[44px] text-white">
                        <span className="text-secondary">Top 20</span> Trending
                        Ai Tools
                      </h3>
                      <p className="text-lg font-normal text-ll-gray mt-1.5">
                        Experience the future of communication with our
                        AI-powered chat solution.
                      </p>
                    </div>
                    <Link
                      to={""}
                      className="font-bold text-base text-white underline underline-offset-4"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="w-full float-left mt-10">
                    <GridBox data={aiToolsData} />
                  </div>
                </div>
                <div className="w-full float-left mb-16">
                  <div className="w-full flex justify-between items-end">
                    <div className="float-left">
                      <h3 className="font-bold text-[44px] text-white">
                        <span className="text-secondary">Top 20</span> Apps
                      </h3>
                      <p className="text-lg font-normal text-ll-gray mt-1.5">
                        Experience the future of communication with our
                        AI-powered chat solution.
                      </p>
                    </div>
                    <Link
                      to={""}
                      className="font-bold text-base text-white underline underline-offset-4"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="w-full float-left mt-10">
                    <GridBox data={appsData} />
                  </div>
                </div>
                <div className="w-full float-left mb-16">
                  <div className="w-full flex justify-between items-end">
                    <div className="float-left">
                      <h3 className="font-bold text-[44px] text-white">
                        <span className="text-secondary">Top 20</span>{" "}
                        Subscriptions
                      </h3>
                      <p className="text-lg font-normal text-ll-gray mt-1.5">
                        Experience the future of communication with our
                        AI-powered chat solution.
                      </p>
                    </div>
                    <Link
                      to={""}
                      className="font-bold text-base text-white underline underline-offset-4"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="w-full float-left mt-10">
                    <GridBox data={subscriptionsData} />
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
export default Dashboard;
