import { useNavigate } from "react-router-dom";
import ProductOfMonth1 from "../../assets/images/icons/pom1.png";
import GridBox from "../../components/common/GridBox";
import {
  aiToolsData
} from "../../components/shared/gridData";
import "./home.scss";

import { useEffect, useRef, useState } from "react";
import "swiper/css";
import HomeCarouselComponent from "../../components/slider/HomeCarousel";
import { useAuthCheck } from "../../hooks/authHooks";
import Clients from "../landingPage/Clients";
import FAQ from "../landingPage/FAQ";
import FeaturesGrid from "../landingPage/FeatureGrid";
import ScalableSolutions from "../landingPage/ScalableSolutions";

const starData = [1, 2, 3, 4, 5];
const sliderData = [1, 2, 3];

const Home = () => {
  const navigate = useNavigate();
  const communitySwiperRef: any = useRef(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [slideActiveIndex, setSlideActiveIndex] = useState(0);

  // Function to go to the next slide
  const communitySlideNext = () => {
    if (communitySwiperRef.current && communitySwiperRef.current.swiper) {
      communitySwiperRef.current.swiper.slideNext();
    }
  };

  // Function to go to the previous slide
  const communitySlidePrev = () => {
    if (communitySwiperRef.current && communitySwiperRef.current.swiper) {
      communitySwiperRef.current.swiper.slidePrev();
    }
  };

  const { checkAuth } = useAuthCheck();

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);
  return (
    <>
      {!loading && (
        <div className="w-full float-left">
          {/* Banner section html start */}
          <section className="w-full float-left home-banner-bg-new py-8">
            <div className="w-full max-w-[1680px] mx-auto clearfix px-10">
              {/* <div className="w-full float-left mt-6">
                <h2 className="text-center text-7xl !leading-[94px] text-white font-normal">
                  Everything Digital, One Global <br />
                  <span className="font-bold">AI Marketplace</span>
                </h2>
              </div> */}
              <div className="w-full float-left flex flex-col mt-64">
                {/* <p className="text-2xl text-center font-normal text-white mb-8">
                  Implement intelligent chatbots that can handle customer
                  inquiries
                </p> */}
                <div className="w-full relative px-[100px] 2xl:px-[140px] items-center">
                  {/* <div className="absolute left-0 bottom-4 flex flex-col gap-y-2.5 py-3 px-4 rounded-2xl pdct-hunt-bg">
                    <div className="flex gap-x-2">
                      {starData.map((item) => (
                        <svg
                          key={item}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                        >
                          <path
                            d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                            fill="white"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-bold text-ll-gray font-Jakarta-sans">
                      on ProductHunt
                    </p>
                  </div> */}
                  <div className=" w-full mx-auto py-8 px-8 flex items-center gap-x-5 justify-center">
                    {/* <img src={RobotIcon} alt="" /> */}
                    <div className="flex flex-col gap-y-5 items-center">
                      {/* <div className="flex items-center mb-4">
                        <p className="ask-lusso-txt bg-gradient-to-r from-[#CC00F2] via-[#7362FF] to-[#5B97FF] text-[44px] font-bold">
                          Ask Lusso
                        </p>
                        <span className="bg-primary text-xs font-medium text-white rounded py-0.5 px-1 ml-1">
                          beta
                        </span>
                      </div> */}
                      {/* <img src={Navlogo} alt="" className="w-full" /> */}
                      <p className="text-xl lg:text-5xl font-medium leading-tight uppercase text-center">We Are Everything Digital,<br />
                        <span className="font-bold">One Global <span className="text-[#00F0FB]">AI Marketplace</span></span></p>
                      <div className="text-md font-medium leading-tight uppercase text-center">It all starts here, the beginning of a journey filled with endless possibilities</div>
                      <div className="font-inter font-700" text-16>
                        {/* <input
                          defaultValue="how can I help you today?"
                          type="text"
                          className="ai-input-box py-6 pl-8 pr-[218px]"
                        ></input> */}

                        <button
                          onClick={() => { navigate('/askLusso') }}
                          type="button"
                          className="search-ai-btn px-6 py-3"
                        >
                          <span>Explore now</span>
                          {/* <img src={btnStar} alt="Star" /> */}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="absolute right-0 bottom-4 items-center gap-y-2.5 py-3 px-4 ai-help-bg rounded-[48px] rounded-bl-2xl hidden 2xl:flex">
                    <div className="ai-help-circle w-[70px] h-[70px] rounded-full"></div>
                    <p className="text-lg font-bold text-white font-Jakarta-sans px-3">
                      AI helps me revitalize
                      <br />
                      my business.
                    </p>
                  </div> */}
                </div>
              </div>
              {/* <div className="w-full float-left flex gap-6 justify-between items-center py-4 mt-16">
                <Link to={""} className="float-left">
                  <img src={MegaArtIcon} alt="Mega Art" />
                </Link>
                <Link to={""} className="float-left">
                  <img src={MianIcon} alt="Mian" />
                </Link>
                <Link to={""} className="float-left">
                  <img src={MianStudioIcon} alt="Mian Studio" />
                </Link>
                <Link to={""} className="float-left">
                  <img src={BetaIcon} alt="Beta" />
                </Link>
                <Link to={""} className="float-left">
                  <img src={GenviIcon} alt="Gen Vi" />
                </Link>
                <Link to={""} className="float-left">
                  <img src={MianIcon} alt="MMian" />
                </Link>
              </div> */}
            </div>
          </section>
          {/* Banner section html end */}

          {/* Feature Start */}
          <section className="bg-[#060D17] w-full float-left lg:py-24">
            <FeaturesGrid />
          </section>
          {/* Feature End */}

          {/* Client Start */}
          <section className="bg-[#060D17] w-full float-left lg:pb-24">
            <Clients />
          </section>
          {/* Client End */}

          {/* Tool section start */}
          <section className="bg-[#060D17] w-full float-left py-24">
            <div className="max-w-[1370px] mx-auto clearfix px-10">
              <div className="w-full float-left mb-16 last-of-type:mb-0">
                {/* <div className="w-full flex justify-between items-end">
                  <div className="float-left"> */}
                <h3 className="font-[700] text-[50px] text-white text-center uppercase fontFamily-work-sans">
                  See What's New
                </h3>
                {/* </div> */}
                {/* <Link
                    to={""}
                    className="font-bold text-base text-white underline underline-offset-4"
                  >
                    View All
                  </Link> */}
                {/* </div> */}
                <div className="w-full float-left mt-10">
                  <GridBox data={aiToolsData} />
                </div>
              </div>
              <div className="w-full float-left mb-16 last-of-type:mb-0">
                <HomeCarouselComponent images={[ProductOfMonth1]} titles={["Express VPN"]} subtitles={["VPN | Top Rated | 100% Secure"]} />
              </div>
              <div className="w-full float-left mb-16 last-of-type:mb-0">

                <h3 className="font-[700] text-[50px] text-white text-center uppercase fontFamily-work-sans">
                  Trending Now
                </h3>

                <div className="w-full float-left mt-10">
                  <GridBox data={aiToolsData} />
                </div>
                <div className="w-full float-left mt-10">
                  <h4 className="font-[700] text-[20px] text-white text-end uppercase fontFamily-work-sans">
                    See More
                  </h4>
                </div>

              </div>
              {/* <div className="w-full float-left mb-16 last-of-type:mb-0">
                <div className="w-full flex justify-between items-end">
                  <div className="float-left">
                    <h3 className="font-bold text-[44px] text-white">
                      <span className="text-secondary">Top 20</span>{" "}
                      Subscriptions
                    </h3>
                    <p className="text-lg font-normal text-ll-gray mt-1.5">
                      Experience the future of communication with our AI-powered
                      chat solution.
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
              </div> */}
            </div>
          </section >
          {/* Tool section end */}

          {/* ScalableSolutions START */}
          <section className="w-full float-left bg-[#161328]">
            <ScalableSolutions />
          </section>
          {/* ScalableSolutions END */}

          {/* FAQ START */}
          <section className="py-24 w-full float-left  bg-[#060D17]">
            <FAQ />
          </section>
          {/* FAQ END */}

          {/* Service section start */}
          {/* <section className="w-full float-left py-16 bg-[#1a0943]">
            <div className="max-w-[1370px] mx-auto clearfix px-10">
              <div className="w-full float-left">
                <h3 className="font-bold text-[44px] text-white text-center">
                  Find an <span className="text-primary">AI solution</span> for
                  your business
                </h3>
                <p className="text-lg font-normal text-ll-gray text-center mt-1.5">
                  Experience the future of communication with our AI-powered
                  chat solution.
                </p>
              </div>
              <div className="w-full float-left grid grid-cols-4 gap-7 mt-10">
                <div className="group w-full float-left flex flex-col gap-y-8 py-7 px-6 rounded-3xl cursor-pointer relative transition-all hover:bg-primary group">
                  <img
                    className="max-w-[84px] group-hover:hidden"
                    src={ServiceIcon1}
                    alt="Ai Tools"
                  />
                  <img
                    className="max-w-[84px] hidden group-hover:block"
                    src={ServiceIconWhite1}
                    alt="Ai Tools"
                  />
                  <img
                    src={ReadMoreArrow}
                    alt="Readmore"
                    className="absolute right-6 top-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                  <div className="w-full flex flex-col gap-y-2.5 float-left rounded-b-3xl">
                    <h3 className="text-white font-bold text-2xl">
                      AI-Powered <br />
                      Chatbots
                    </h3>
                    <p className="text-ll-gray text-base font-normal">
                      Implement intelligent chatbots that can handle customer
                      inquiries, provide{" "}
                    </p>
                  </div>
                </div>
                <div className="group w-full float-left flex flex-col gap-y-8 py-7 px-6 rounded-3xl cursor-pointer relative transition-all hover:bg-primary group">
                  <img
                    className="max-w-[84px] group-hover:hidden"
                    src={ServiceIcon2}
                    alt="Ai Tools"
                  />
                  <img
                    className="max-w-[84px] hidden group-hover:block"
                    src={ServiceIconWhite2}
                    alt="Ai Tools"
                  />
                  <img
                    src={ReadMoreArrow}
                    alt="Readmore"
                    className="absolute right-6 top-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                  <div className="w-full flex flex-col gap-y-2.5 float-left rounded-b-3xl">
                    <h3 className="text-white font-bold text-2xl">
                      Embracing <br />
                      Multilingual Support
                    </h3>
                    <p className="text-ll-gray text-base font-normal">
                      Expand your reach and cater to a global audience with chat
                      services available{" "}
                    </p>
                  </div>
                </div>
                <div className="group w-full float-left flex flex-col gap-y-8 py-7 px-6 rounded-3xl cursor-pointer relative transition-all hover:bg-primary group">
                  <img
                    className="max-w-[84px] group-hover:hidden"
                    src={ServiceIcon3}
                    alt="Ai Tools"
                  />
                  <img
                    className="max-w-[84px] hidden group-hover:block"
                    src={ServiceIconWhite3}
                    alt="Ai Tools"
                  />
                  <img
                    src={ReadMoreArrow}
                    alt="Readmore"
                    className="absolute right-6 top-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                  <div className="w-full flex flex-col gap-y-2.5 float-left rounded-b-3xl">
                    <h3 className="text-white font-bold text-2xl">
                      Integration <br />
                      Capabilities
                    </h3>
                    <p className="text-ll-gray text-base font-normal">
                      Seamlessly integrate AI chat services into your existing
                      systems{" "}
                    </p>
                  </div>
                </div>
                <div className="group w-full float-left flex flex-col gap-y-8 py-7 px-6 rounded-3xl cursor-pointer relative transition-all hover:bg-primary group">
                  <img
                    className="max-w-[114px] group-hover:hidden"
                    src={ServiceIcon4}
                    alt="Ai Tools"
                  />
                  <img
                    className="max-w-[114px] hidden group-hover:block"
                    src={ServiceIconWhite4}
                    alt="Ai Tools"
                  />
                  <img
                    src={ReadMoreArrow}
                    alt="Readmore"
                    className="absolute right-6 top-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                  <div className="w-full flex flex-col gap-y-2.5 float-left rounded-b-3xl">
                    <h3 className="text-white font-bold text-2xl">
                      Proactive <br />
                      Engagement
                    </h3>
                    <p className="text-ll-gray text-base font-normal">
                      Initiate proactive conversations with customers based on
                      their{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* Service section end */}

          {/* Impact Number section start */}
          {/* <section className="w-full float-left py-16 bg-[#1a0943]">
            <div className="max-w-[1370px] mx-auto clearfix px-10">
              <div className="w-full float-left">
                <h3 className="font-bold text-[44px] text-white text-center">
                  Our Impact in Numbers
                </h3>
                <p className="text-xl font-normal text-ll-gray text-center mt-1.5">
                  Implement intelligent chatbots that can handle customer
                  inquiries
                </p>
              </div>
              <div className="w-full float-left grid grid-cols-2 items-center gap-7 mt-10">
                <div className="w-full max-w-[629px] float-left rounded-3xl overflow-hidden relative">
                  <img src={VideoThumbnail} alt="" />
                  <img
                    src={PlayBtn}
                    className="absolute-center cursor-pointer"
                    alt="Play Button"
                  ></img>
                </div>
                <div className="w-full float-left flex flex-col max-w-[520px] justify-self-end">
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col [&>p]:font-bold">
                      <p className="text-[56px] text-white [&>span]:text-primary">
                        1.77k<span>+</span>
                      </p>
                      <p className="text-xl text-ll-gray">Business Problem</p>
                    </div>
                    <div className="flex flex-col [&>p]:font-bold">
                      <p className="text-[56px] text-white [&>span]:text-primary">
                        2.3k<span>+</span>
                      </p>
                      <p className="text-xl text-ll-gray">Business Setup</p>
                    </div>
                  </div>
                  <div className="seperator w-full float-left my-7 h-px bg-white/10"></div>
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col [&>p]:font-bold">
                      <p className="text-[56px] text-white [&>span]:text-primary">
                        298k<span>+</span>
                      </p>
                      <p className="text-xl text-ll-gray">Goal achiever</p>
                    </div>
                    <div className="flex flex-col [&>p]:font-bold">
                      <p className="text-[56px] text-white [&>span]:text-primary">
                        298k<span>+</span>
                      </p>
                      <p className="text-xl text-ll-gray">Goal achiever</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* Impact Number section end */}

          {/* Video section start */}
          {/* <section className="w-full float-left bg-[#1a0943]">
            <img className="w-full" src={VideoBg} alt="" />
          </section> */}
          {/* Video section end */}

          {/* Testimonial section start */}
          {/* <section className="w-full float-left bg-black py-16 flex items-center">
            <div className="w-1/2 float-left">
              <div className="w-full max-w-[685px] ml-auto clearfix px-10">
                <div className="w-full flex flex-col float-left lg:pr-16">
                  <div className="w-full float-left gap-y-5 flex flex-col">
                    <h3 className="font-bold text-[44px] text-white !leading-[54px]">
                      Our community with User reviews
                    </h3>
                    <p className="text-lg font-normal text-ll-gray mt-1.5">
                      Say goodbye to the hassle of managing multiple accounts
                      across different financial institutions.
                    </p>
                    <div className="community-slider-nav flex items-center justify-start gap-x-2">
                      <img
                        onClick={() => communitySlidePrev()}
                        className={`community-slider-prev cursor-pointer select-none transform rotate-180 ${slideActiveIndex === 0 ? "opacity-60" : "opacity-100"
                          }`}
                        src={SwiperArrow}
                        alt="Prev"
                      />
                      <img
                        onClick={() => communitySlideNext()}
                        className={`community-slider-next cursor-pointer select-none ${slideActiveIndex === sliderData.length - 1
                          ? "opacity-60"
                          : "opacity-100"
                          }`}
                        src={SwiperArrow}
                        alt="Next"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 float-left relative">
              <Swiper
                className="w-full float-left"
                ref={communitySwiperRef}
                spaceBetween={30}
                slidesPerView={1.3}
                onSlideChange={(swiper: any) =>
                  setSlideActiveIndex(swiper.activeIndex)
                }
              // onSwiper={(swiper:any) => console.log(swiper)}
              >
                {sliderData.map((item) => (
                  <SwiperSlide key={item} className="community-slider-box">
                    <div className="w-full float-left flex items-center gap-x-5 mb-7">
                      <div className="w-[68px] h-[68px] bg-[#615F6F] rounded-full"></div>
                      <div className="flex flex-col gap-y-1.5 flex-grow overflow-hidden [&>p]:truncate [&>p]:font-bold">
                        <p className="text-xl capitalize text-white">
                          Maverick. n
                        </p>
                        <p className="uppercase text-primary">
                          Content Strategist
                        </p>
                      </div>
                    </div>
                    <p className="w-full float-left text-white font-medium text-2xl mb-6">
                      “Unmatched Creativity! Agency Business constantly
                      surprises me with its ability to interpret my ideas and
                      turn them into beautiful visuals.”
                    </p>
                    <div className="w-full float-left">
                      <StarRating size={20} edit={false} value={5} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section> */}
          {/* Testimonial section end */}

          {/* Intelligent solution section start */}
          {/* <section className="w-full float-left py-16 bg-[#121215]">
            <div className="max-w-[1370px] mx-auto clearfix px-10">
              <div className="w-full float-left flex items-center gap-7 mt-10">
                <div className="w-2/5 float-left flex flex-col gap-y-10 items-end">
                  <h3 className="font-bold text-[44px] leading-[54px] text-white">
                    Intelligent Solutions for Enhanced Customer{" "}
                  </h3>
                </div>
                <div className="w-3/5 float-left flex flex-col gap-y-10 items-end">
                  <p className="text-lg font-normal text-ll-gray text-right">
                    Power up your business with our advanced Lusso Ask Ai tool
                    and <br />
                    accurate question answering capabilities
                  </p>
                </div>
              </div>
              <div className="w-full float-left flex gap-7 mt-10">
                <div className="w-2/5 float-left flex flex-col gap-y-10 items-end justify-center">
                  <div className="solution-list w-full float-left">
                    <div className="solution-list-item w-full float-left flex gap-x-5">
                      <div className="flex flex-col">
                        <div className="w-[72px] h-[72px] mt-1.5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <img src={SolnIcon1} alt="" />
                        </div>
                        <div className="soln-v-line flex-grow mt-1.5 self-center w-px bg-white"></div>
                      </div>
                      <div className="w-full flex flex-col gap-y-2 float-left pb-8">
                        <h3 className="text-white font-bold text-2xl">
                          Choose Your Niche
                        </h3>
                        <p className="text-ll-gray text-base font-normal">
                          Online banking allows you to manage your <br />
                          finances from anywhere, anytime.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="solution-list-item w-full float-left flex gap-x-5">
                      <div className="flex flex-col">
                        <div className="w-[72px] h-[72px] mt-1.5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <img src={SolnIcon2} alt="" />
                        </div>
                        <div className="soln-v-line flex-grow mt-1.5 self-center w-px bg-white"></div>
                      </div>
                      <div className="w-full flex flex-col gap-y-2 float-left pb-8">
                        <h3 className="text-white font-bold text-2xl">
                          Customize and Personalize
                        </h3>
                        <p className="text-ll-gray text-base font-normal">
                          Online banking allows you to manage your <br />
                          finances from anywhere, anytime.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="solution-list-item w-full float-left flex gap-x-5">
                      <div className="flex flex-col">
                        <div className="w-[72px] h-[72px] mt-1.5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <img src={SolnIcon3} alt="" />
                        </div>
                        <div className="soln-v-line flex-grow mt-1.5 self-center w-px bg-white"></div>
                      </div>
                      <div className="w-full flex flex-col gap-y-2 float-left pb-8">
                        <h3 className="text-white font-bold text-2xl">
                          Fine-Tune and Refine
                        </h3>
                        <p className="text-ll-gray text-base font-normal">
                          Online banking allows you to manage your finances from
                          anywhere, anytime.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/5 float-left flex flex-col gap-y-10 items-end">
                  <div className="float-left rounded-3xl overflow-hidden relative">
                    <img
                      className="max-w-[750px] w-full"
                      src={Solutionsbg}
                      alt=""
                    />
                    <div className="py-3 px-6 absolute bottom-7 left-7 flex gap-x-8 bg-primary rounded-xl">
                      <div className="flex flex-col text-white font-bold">
                        <p className="text-[36px]">1.77k+</p>
                        <span className="text-base">Business Problem </span>
                      </div>
                      <div className="flex flex-col text-white font-bold">
                        <p className="text-[36px]">2.3k+</p>
                        <span className="text-base">Business Setup</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* Intelligent solution section end */}

          {/* FAQ section start */}
          {/* <section className="w-full float-left py-16 bg-[#09002E]">
            <div className="max-w-[1190px] mx-auto clearfix px-10">
              <div className="w-full float-left">
                <h3 className="font-bold text-[44px] text-white">FAQs</h3>
                <p className="text-lg font-normal text-ll-gray mt-1.5">
                  Say goodbye to the hassle of managing multiple accounts across
                  different financial institutions.
                </p>
              </div>
              <div className="w-full float-left mt-10">
                <Accordion type="single" collapsible>
                  <AccordionItem
                    className="border-none faq-accordian px-4"
                    value="faq-1"
                  >
                    <AccordionTrigger className="font-bold text-xl text-white hover:no-underline py-4">
                      How does AI Generation Create Business work?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-ll-gray font-normal py-2.5">
                      AI Generation Create Business is an advanced technology
                      that utilizes Artificial Intelligence (AI) algorithms to
                      automatically generate high-quality, realistic Businesss.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    className="border-none faq-accordian px-4"
                    value="faq-2"
                  >
                    <AccordionTrigger className="font-bold text-xl text-white hover:no-underline py-4">
                      What is AI Generation Create Business?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-ll-gray font-normal py-2.5">
                      AI Generation Create Business is an advanced technology
                      that utilizes Artificial Intelligence (AI) algorithms to
                      automatically generate high-quality, realistic Businesss.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    className="border-none faq-accordian px-4"
                    value="faq-3"
                  >
                    <AccordionTrigger className="font-bold text-xl text-white hover:no-underline py-4">
                      Can AI-generated Businesss match human-created?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-ll-gray font-normal py-2.5">
                      AI Generation Create Business is an advanced technology
                      that utilizes Artificial Intelligence (AI) algorithms to
                      automatically generate high-quality, realistic Businesss.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    className="border-none faq-accordian px-4"
                    value="faq-4"
                  >
                    <AccordionTrigger className="font-bold text-xl text-white hover:no-underline py-4">
                      What are the applications of AI Generation Create
                      Business?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-ll-gray font-normal py-2.5">
                      AI Generation Create Business is an advanced technology
                      that utilizes Artificial Intelligence (AI) algorithms to
                      automatically generate high-quality, realistic Businesss.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section> */}
          {/* FAQ section end */}

          {/* contact section start */}
          {/* <section className="w-full float-left bg-[#121215] flex items-center">
            <div className="w-1/2 h-full float-left relative">
              <img
                className="w-full h-full object-cover float-left"
                src={ContactLeftBanner}
                alt=""
              />
            </div>
            <div className="w-1/2 float-left py-12">
              <div className="w-full max-w-[740px] mr-auto clearfix px-10">
                <div className="w-full flex flex-col float-left lg:pl-16">
                  <div className="w-full float-left">
                    <h3 className="font-bold text-[44px] text-white">
                      Get in touch
                    </h3>
                    <p className="text-lg font-normal text-ll-gray mt-1.5">
                      Say goodbye to the hassle of managing multiple accounts
                      across different financial institutions.
                    </p>
                  </div>
                  <form className="w-full float-left flex flex-col items-start mt-8 gap-y-5">
                    <label className="w-full float-left">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="contact-frm-input"
                      ></input>
                    </label>
                    <label className="w-full float-left">
                      <input
                        type="text"
                        placeholder="Your Email"
                        className="contact-frm-input"
                      ></input>
                    </label>
                    <label className="w-full float-left">
                      <input
                        type="text"
                        placeholder="Telephone"
                        className="contact-frm-input"
                      ></input>
                    </label>
                    <label className="w-full float-left">
                      <select
                        placeholder="Telephone"
                        className="contact-frm-input contact-frm-select"
                      >
                        <option value="1">Personal</option>
                        <option value="2">Option - 2</option>
                      </select>
                    </label>
                    <label className="w-full float-left">
                      <textarea
                        placeholder="Message"
                        className="contact-frm-txtarea"
                      ></textarea>
                    </label>
                    <button
                      type="button"
                      className="py-2.5 px-7 gap-x-2 float-left flex items-center text-center rounded-full text-base text-white font-bold bg-primary border border-primary transition-all hover:bg-transparent"
                    >
                      Message{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.554 3.33348C15.2206 3.33348 14.9984 3.44459 14.7762 3.66681L3.66536 14.7777C3.22092 15.2221 3.22092 15.8887 3.66536 16.3332C4.10979 16.7776 4.77644 16.7776 5.22088 16.3332L16.3317 5.22233C16.7762 4.77789 16.7762 4.11124 16.3317 3.66681C16.1095 3.44459 15.8873 3.33348 15.554 3.33348Z"
                          fill="white"
                        />
                        <path
                          d="M15.5562 3.33324H5.5564C4.88975 3.33324 4.44531 3.77767 4.44531 4.44432C4.44531 5.11098 4.88975 5.55541 5.5564 5.55541H14.4451V14.4441C14.4451 15.1107 14.8895 15.5552 15.5562 15.5552C16.2228 15.5552 16.6672 15.1107 16.6672 14.4441V4.44432C16.6672 3.77767 16.2228 3.33324 15.5562 3.33324Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section> */}
          {/* contact section end */}
        </div >
      )}
    </>
  );
};
export default Home;
