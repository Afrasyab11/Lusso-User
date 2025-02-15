import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeIcon from "../../assets/images/icons/be-icon.svg";
import ClayIcon from "../../assets/images/icons/clay-icon.svg";
import ExploreBanner from "../../assets/images/icons/explore-details-banner.svg";
import FbIcon from "../../assets/images/icons/fb-icon.svg";
import QuotesWhiteIcon from "../../assets/images/icons/quotes-white.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import Vicon from "../../assets/images/icons/v-icon.svg";
import CommentBox from "../../components/common/CommentBox";
import StarRating from "../../components/common/StarRating";
import { useAuthCheck } from "../../hooks/authHooks";
import "./dashboard.scss";
const AppDetails = () => {
  const { checkAuth } = useAuthCheck();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {!loading && (
        <div className="w-full float-left py-6">
          <div className="max-w-[1370px] mx-auto clearfix px-10">
            <div className="w-full float-left my-4">
              {/* Banner section html start */}
              <section className="w-full float-left explore-banner-bg rounded-[30px]">
                <img
                  className="w-full rounded-[30px]"
                  src={ExploreBanner}
                  alt=""
                />
              </section>
              {/* Banner section html end */}
              <div className="w-full float-left flex justify-between items-end mt-12">
                <div className="flex gap-x-8 w-1/2">
                  <div className="bg-[#29292C] p-1 rounded-3xl flex-shrink-0 self-center">
                    <img className="w-full" src={ClayIcon} alt="" />
                  </div>
                  <div className="max-w-[410px] w-full p-6 border border-white rounded-3xl">
                    <p className="font-bold text-white uppercase text-xs tracking-[1.2px] font-Jakarta-sans mb-2">
                      Marketing tool
                    </p>
                    <h3 className="font-bold text-white text-2xl font-Jakarta-sans mb-2">
                      Clay
                    </h3>
                    <p className="font-normal text-ll-gray text-base font-Jakarta-sans mb-1">
                      AI Personalized Outbound at Scale
                    </p>
                    <div className="flex items-center gap-x-2">
                      <StarRating size={20} edit={false} value={5} />
                      <span className="text-xs font-bold font-Jakarta-sans text-white">
                        (493)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="float-left flex gap-x-6">
                  <Link to="/" className="btn-primary-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="14"
                      viewBox="0 0 17 14"
                      fill="none"
                    >
                      <path
                        d="M8.125 13.875C8.125 13.875 0 9.5 0 4.34375C0 3.22487 0.444474 2.15181 1.23564 1.36064C2.02681 0.569474 3.09987 0.125 4.21875 0.125C5.98359 0.125 7.49531 1.08672 8.125 2.625C8.75469 1.08672 10.2664 0.125 12.0312 0.125C13.1501 0.125 14.2232 0.569474 15.0144 1.36064C15.8055 2.15181 16.25 3.22487 16.25 4.34375C16.25 9.5 8.125 13.875 8.125 13.875Z"
                        fill="#7D3CF3"
                      />
                    </svg>
                  </Link>
                  <Link to="/" className="btn-primary-outline gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="18"
                      viewBox="0 0 13 18"
                      fill="none"
                    >
                      <path
                        d="M0 17.5V2.09375C0 1.21354 0.727526 0.5 1.625 0.5H11.375C12.2725 0.5 13 1.21354 13 2.09375V17.5L6.5 13.7812L0 17.5Z"
                        fill="#7D3CF3"
                      />
                    </svg>
                    <span>Save</span>
                  </Link>
                  <Link to="/" className="btn-primary-fill">
                    Visit Website
                  </Link>
                </div>
              </div>
              <div className="w-full float-left mt-20 flex flex-col items-start">
                <div className="tag-info-label">Email marketing</div>
                <h2 className="text-white text-[44px] leading-[54px] capitalize font-bold [&>span]:font-normal mt-3">
                  Clay <br />
                  <span>AI Personalized Outbound at Scale</span>
                </h2>
                <div className="w-full float-left mt-10">
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>What is Clay?</h3>
                    <p className="mb-8">
                      Prospect 31M Companies &amp; 770M People from LinkedIn in
                      Clay. Then, enrich, research, and act on live people and
                      company data sets to get those positive responses you've
                      always wanted from your dream customers. Cut your manual
                      work, reduce reliance on Upwork, and keep engineering time
                      focused on your beautiful product. Get started today, for
                      free.
                    </p>
                    <p className="mb-8">
                      Praesent interdum lacus ac est viverra hendrerit. Aliquam
                      dapibus, ante vitae matti gravida, purus sapien interdum
                      magna, convallis volutpat est turpis pulvinar dui. Aenean
                      eu turpis est. In hac habitasse platea dictumst. Integer
                      at lobortis metus. Proin molestie eget massa vel gravida.
                      Suspendisse nec ante vel augue consectetur mollis.
                      Praesent interdu lacus ac est viverra hendrerit. Aenean eu
                      turpis est.
                    </p>
                  </div>
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>Recent launches</h3>
                    <p className="mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi interdum sed mauris eu imperdiet. Donec congue orci
                      nec mi luctus, ut faucibus mauris scelerisque. Donec orci
                      lorem, volutpat a mauris nec, sodales imperdiet urna. Sed
                      dictum enim libero. Interdum et malesuada fames ac ante
                      ipsum primis in faucibus. Maecenas ligula libero, pharetra
                      non dolor et, tempor bibendum magna. Mauris a efficitur
                      nisi.
                    </p>
                    <div className="w-full float-left bg-primary/25 p-8 rounded-2xl flex flex-col gap-y-4 mb-6">
                      <img className="w-10" src={QuotesWhiteIcon} alt="" />
                      <p className="font-bold text-2xl text-white">
                        “If you set your goals ridiculously high and it's a
                        failure, you will fail above everyone else's success”
                      </p>
                      <div className="flex items-center justify-start gap-x-2">
                        <span className="h-px w-6 bg-[#C1C1C1]"></span>
                        <p className="font-bold text-base text-ll-gray">
                          Nelson Mandela
                        </p>
                      </div>
                    </div>
                    <ul className="list-inside list-disc text-white font-normal text-lg pl-2 mb-4 [&>li]:mb-2">
                      <li>
                        Deep knowledge and experience with different security
                        areas like identity and access management, cryptography,
                        network security, etc.
                      </li>
                      <li>Strong fundamentals in computer science skills.</li>
                      <li>Expert-level development skills in Java</li>
                      <li>Ph.D. in the related field is a plus</li>
                    </ul>
                    <p className="mb-6">
                      Curabitur aliquam ac arcu in mattis. Phasellus pulvinar
                      erat at aliquam hendrerit. Nam ut velit dolor. Sed
                      fermentum tempus odio, ac faucibus elit scelerisque
                      consequat. Fusce ac malesuada elit. Nam at aliquam libero,
                      quis lacinia erat. In hac habitasse platea dictumst.
                      Suspendisse id dolor orci. Vivamus at aliquam tellus.
                      Vestibulum a augue ac purus suscipit varius non eget
                      lectus.
                    </p>
                  </div>
                </div>
                <div className="w-full float-left py-5 border-y border-white/10 flex justify-between items-center">
                  <div className="float-left flex flex-wrap gap-x-4">
                    <span className="tag-info-label">Creative</span>
                    <span className="tag-info-label">Business</span>
                    <span className="tag-info-label">3D</span>
                  </div>
                  <div className="float-left flex items-center flex-wrap gap-x-4">
                    <p className="font-bold text-sm text-white flex-shrink-0">
                      Share This Post:
                    </p>
                    <Link
                      to={""}
                      className="w-10 h-10 bg-white/10 flex-shrink-0 rounded-full float-left flex items-center justify-center"
                    >
                      <img src={TwitterIcon} alt="" />
                    </Link>
                    <Link
                      to={""}
                      className="w-10 h-10 bg-white/10 flex-shrink-0 rounded-full float-left flex items-center justify-center"
                    >
                      <img src={FbIcon} alt="" />
                    </Link>
                    <Link
                      to={""}
                      className="w-10 h-10 bg-white/10 flex-shrink-0 rounded-full float-left flex items-center justify-center"
                    >
                      <img src={BeIcon} alt="" />
                    </Link>
                    <Link
                      to={""}
                      className="w-10 h-10 bg-white/10 flex-shrink-0 rounded-full float-left flex items-center justify-center"
                    >
                      <img src={Vicon} alt="" />
                    </Link>
                  </div>
                </div>
                <CommentBox />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AppDetails;
