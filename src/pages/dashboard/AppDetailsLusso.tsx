import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import LussoLogo from "../../assets/images/icons/lusso-logo-icon.svg";
import QuotesWhiteIcon from "../../assets/images/icons/quotes-white.svg";
import LussoBanner from "../../assets/images/icons/lusso-banner.png";
import FbIcon from "../../assets/images/icons/fb-icon.svg";
import BeIcon from "../../assets/images/icons/be-icon.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import Vicon from "../../assets/images/icons/v-icon.svg";
import StarRating from "../../components/common/StarRating";
import { Link } from "react-router-dom";
import CommentBox from "../../components/common/CommentBox";
import { useAuthCheck } from "../../hooks/authHooks";
const AppDetailsLusso = () => {
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
                  src={LussoBanner}
                  alt=""
                />
              </section>
              {/* Banner section html end */}
              <div className="w-full float-left flex justify-between items-end mt-12">
                <div className="flex gap-x-8 w-1/2">
                  <div className="p-1 rounded-3xl flex-shrink-0 self-center">
                    <img
                      className="w-full max-w-[140px]"
                      src={LussoLogo}
                      alt=""
                    />
                  </div>
                  <div className="max-w-[410px] w-full p-6 border border-white rounded-3xl">
                    <p className="font-bold text-white uppercase text-xs tracking-[1.2px] font-Jakarta-sans mb-2">
                      chatbot
                    </p>
                    <h3 className="font-bold text-white text-2xl font-Jakarta-sans mb-2">
                      Ask Lusso
                    </h3>
                    <p className="font-normal text-ll-gray text-base font-Jakarta-sans mb-1">
                      AI Personalized App Search at Scale
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
                  Ask Lusso
                  <br />
                  <span>AI Personalized App Search at Scale</span>
                </h2>
                <div className="w-full float-left mt-10">
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>What is Ask Lusso?</h3>
                    <p className="mb-8">
                      Immerse yourself in the pinnacle of digital assistance
                      with the recent launch of Ask Lusso, our sophisticated AI
                      chatbot. Crafted meticulously with the latest artificial
                      intelligence, Ask Lusso is designed to transform the
                      customer service landscape. Offering personalized,
                      responsive interaction, it ensures that every customer
                      receives timely and relevant support. Its intuitive design
                      integrates flawlessly within your digital ecosystem,
                      enhancing user experience and fostering enduring customer
                      relationships.
                    </p>
                    <p className="mb-8">
                      Ask Lusso is more than a chatbot; it's a dynamic service
                      revolutionizing real-time customer engagement. With its
                      advanced algorithms, Ask Lusso understands and adapts to
                      individual user preferences, delivering a bespoke service
                      experience. As it interacts, it learns, continuously
                      evolving to anticipate user needs with greater accuracy.
                      This launch heralds a new era for customer support,
                      setting a benchmark for digital communication excellence
                      and driving businesses towards a future where customer
                      satisfaction is not just met but exceeded.
                    </p>
                  </div>
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>Recent launches</h3>
                    <p className="mb-6">
                      The recent rollout of Ask Lusso has already made waves in
                      the digital marketplace. Leveraging the latest in AI
                      technology, the chatbot delivers swift, accurate support,
                      learning from each interaction to improve its service. Ask
                      Lusso's launch marks a milestone in our commitment to
                      providing state-of-the-art digital solutions.
                    </p>

                    <div className="w-full float-left bg-primary/25 p-8 rounded-2xl flex flex-col gap-y-4 mb-6">
                      <img className="w-10" src={QuotesWhiteIcon} alt="" />
                      <p className="font-bold text-2xl text-white">
                        "Ask Lusso has transformed our customer service
                        approach. It's like having a knowledgeable assistant
                        available 24/7, ensuring no query goes unanswered. The
                        personalized support it offers has significantly
                        improved our customer satisfaction rates."
                      </p>
                      <div className="flex items-center justify-start gap-x-2">
                        <span className="h-px w-6 bg-[#C1C1C1]"></span>
                        <p className="font-bold text-base text-ll-gray">
                          HAPPY USER
                        </p>
                      </div>
                    </div>
                    <ul className="list-inside list-disc text-white font-normal text-lg pl-2 mb-4 [&>li]:mb-2">
                      <li>
                        24/7 Real-time Response: Eliminates wait times, offering
                        instant support.Tailored Assistance: Provides
                        personalized solutions for individual needs.
                      </li>
                      <li>
                        Continuous Learning: Improves with each interaction for
                        optimal service.
                      </li>
                      <li>
                        Seamless Integration: Blends effortlessly into existing
                        digital platforms.
                      </li>
                      <li>
                        Advanced Analytics: Offers valuable insights into
                        customer behavior and preferences.
                      </li>
                    </ul>
                    <p className="mb-6">
                      In the ever-evolving landscape of digital interaction, Ask
                      Lusso stands as a beacon of innovation. This chatbot is
                      not just a tool but a game-changer, reimagining customer
                      engagement and setting a new standard for service
                      excellence. Experience the Ask Lusso difference today and
                      elevate your digital presence.
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
export default AppDetailsLusso;
