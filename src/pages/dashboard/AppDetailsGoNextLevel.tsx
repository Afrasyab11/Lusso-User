import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import GoNextLevelLogo from "../../assets/images/icons/goNextLevel.png";
import QuotesWhiteIcon from "../../assets/images/icons/quotes-white.svg";
import GoNextLevelBg from "../../assets/images/icons/goNextLevel.svg";
import FbIcon from "../../assets/images/icons/fb-icon.svg";
import BeIcon from "../../assets/images/icons/be-icon.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import Vicon from "../../assets/images/icons/v-icon.svg";
import StarRating from "../../components/common/StarRating";
import { Link } from "react-router-dom";
import CommentBox from "../../components/common/CommentBox";
import { useAuthCheck } from "../../hooks/authHooks";
const AppDetailsGoNextLevel = () => {
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
                  className="w-full rounded-[30px] object-cover object-center max-h-[500px]"
                  src={GoNextLevelBg}
                  alt=""
                />
              </section>
              {/* Banner section html end */}
              <div className="w-full float-left flex justify-between items-end mt-12">
                <div className="flex gap-x-8 w-1/2">
                  <div className="bg-[#29292C] rounded-3xl overflow-hidden flex-shrink-0 self-center">
                    <img
                      className="w-full max-h-[200px]"
                      src={GoNextLevelLogo}
                      alt=""
                    />
                  </div>
                  <div className="max-w-[410px] w-full p-6 border border-white rounded-3xl">
                    <p className="font-bold text-white uppercase text-xs tracking-[1.2px] font-Jakarta-sans mb-2">
                      Enterprise chatbot
                    </p>
                    <h3 className="font-bold text-white text-2xl font-Jakarta-sans mb-2">
                      GoNextLevel.ai
                    </h3>
                    <p className="font-normal text-ll-gray text-base font-Jakarta-sans mb-1">
                      Tailored AI App Search for Broad-Scale Impact
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
                  GoNextLevel.ai <br />
                  <span>Tailored AI App Search for Broad-Scale Impact</span>
                </h2>
                <div className="w-full float-left mt-10">
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>What is Ask Lusso?</h3>
                    <p className="mb-8">
                      GoNextLevel.AI, a trailblazer in the realm of artificial
                      intelligence, is reshaping the landscape of various
                      industries with its innovative solutions. In sectors as
                      diverse as Healthcare, Robotics, Software & Hardware, and
                      Digital Marketing, the company is not just a participant
                      but a leader, pushing the limits of what's technologically
                      feasible. Their approach is not confined to mere
                      automation; it's about intelligent automation that adapts,
                      learns, and evolves. This forward-thinking strategy has
                      positioned GoNextLevel.AI as more than a provider of AI
                      solutions; it has become a beacon of innovation, guiding
                      enterprises towards a future where technology and human
                      ingenuity converge to create unprecedented possibilities.
                    </p>
                    <p className="mb-8">
                      At the heart of GoNextLevel.AI's success is its commitment
                      to strategic partnerships, which are instrumental in
                      driving the future of enterprise solutions. These
                      collaborations are not just about leveraging technology;
                      they are about integrating it into the fabric of business
                      operations in a way that is both meaningful and
                      transformative. By focusing on sectors like Healthcare and
                      Digital Marketing, GoNextLevel.AI tailors its AI-driven
                      solutions to meet the unique challenges and opportunities
                      of each domain. This bespoke approach ensures that every
                      solution is not just effective but also a perfect fit for
                      the client's needs, setting GoNextLevel.AI apart as a
                      visionary force in the AI landscape.
                    </p>
                  </div>
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>Recent launches</h3>
                    <p className="mb-6">
                      Recently, GoNextLevel.AI launched the Good AI Enterprise
                      Class Chatbot, a groundbreaking advancement in AI
                      communication technology. Designed to revolutionize
                      customer interactions, this chatbot offers unparalleled
                      intelligence, adaptability, and learning capabilities,
                      setting a new standard in AI-driven customer service.
                    </p>
                    <div className="w-full float-left bg-primary/25 p-8 rounded-2xl flex flex-col gap-y-4 mb-6">
                      <img className="w-10" src={QuotesWhiteIcon} alt="" />
                      <p className="font-bold text-2xl text-white">
                        "We've been using GoNextLevel.AI's services for a year,
                        and the impact is phenomenal. The Good AI Chatbot
                        transformed our customer engagement, providing insights
                        and efficiency beyond our expectations. It's not just a
                        tool; it's a game-changer for our business"
                      </p>
                      <div className="flex items-center justify-start gap-x-2">
                        <span className="h-px w-6 bg-[#C1C1C1]"></span>
                        <p className="font-bold text-base text-ll-gray">
                          Jane Doe, CEO of TechCorp.
                        </p>
                      </div>
                    </div>
                    <ul className="list-inside list-disc text-white font-normal text-lg pl-2 mb-4 [&>li]:mb-2">
                      <li>
                        Pioneering Good AI technology for advanced
                        problem-solving.
                      </li>
                      <li>
                        Expertise across diverse sectors, including healthcare
                        and digital marketing.
                      </li>
                      <li>
                        Customized AI solutions tailored to specific business
                        needs.
                      </li>
                      <li>
                        Global impact focus, addressing enterprise and societal
                        challenges.
                      </li>
                      <li>
                        Strategic partnership approach, offering more than just
                        AI products.
                      </li>
                    </ul>
                    <p className="mb-6">
                      In conclusion, GoNextLevel.AI is more than an AI solutions
                      provider; it's a partner in progress, innovation, and
                      transformation. With its unique Good AI technology and
                      sector-specific expertise, the company is not just meeting
                      the demands of the digital age but is actively shaping the
                      future. GoNextLevel.AI is where technology meets vision,
                      creating a world where AI amplifies human potential and
                      drives global advancement.
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
export default AppDetailsGoNextLevel;
