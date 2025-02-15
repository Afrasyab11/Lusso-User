import "./auth.scss";
import GreenTickIcon from "../../assets/images/icons/green-tick.svg";
import StandaredIcon from "../../assets/images/icons/subscriptions/standared.png";
import PremiumIcon from "../../assets/images/icons/subscriptions/premium.png";
import ProIcon from "../../assets/images/icons/subscriptions/pro.png";
import AccountLayout from "../../components/layout/AccountLayout";

const Subscription = () => {
  // const { checkAuth } = useAuthCheck();

  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(()=>{
  //   checkAuth();
  //   setLoading(false)
  // },[checkAuth]);

  return (
    <>
      <AccountLayout>
        <div className="w-full float-left font-Jakarta-sans">
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full flex flex-col bg-black rounded-[42px] overflow-hidden">
              <div className="w-full h-290px">
                <img src={StandaredIcon} alt="" className="img-cover-center" />
              </div>
              <div className="w-full flex flex-col flex-grow justify-between px-8 pb-8 pt-4">
                <div className="w-full flex flex-col">
                  <h2 className="text-center text-white font-semibold text-[32px]">
                    Lusso Access
                  </h2>
                  <p className="text-center text-base text-white/50 font-normal capitalize">
                    Step into the World of Digital Excellence with Lusso Access
                    - Where Exclusive Apps and Games Await Your Discovery
                  </p>
                  <div className="w-full flex flex-col gap-y-3.5 mb-6 mt-8">
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Curated Selection:{" "}
                        <span className="text-white">
                          Access a thoughtfully curated library of apps and
                          games that are continuously updated to bring you the
                          finest digital experiences tailored to discerning
                          tastes.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Personalized Recommendations:{" "}
                        <span className="text-white">
                          Benefit from our AI's keen understanding of your
                          preferences to navigate our extensive selection and
                          discover apps and games that resonate with you.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Regular Updates:{" "}
                        <span className="text-white">
                          Stay assured with consistent performance enhancements
                          and security updates, ensuring a seamless and secure
                          user experience.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Community &amp; Support:{" "}
                        <span className="text-white">
                          Engage with a passionate community and receive
                          dedicated support whenever needed as part of our
                          commitment to outstanding service.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Seasonal Promotions:{" "}
                        <span className="text-white">
                          Take advantage of exclusive seasonal offers, allowing
                          you to explore new premium content while enjoying
                          special savings.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="ac-login-btn ac-login-btn-outline mt-3"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col bg-black rounded-[42px] overflow-hidden">
              <div className="w-full h-290px">
                <img src={PremiumIcon} alt="" className="img-cover-center" />
              </div>
              <div className="w-full flex flex-col flex-grow justify-between px-8 pb-8 pt-4">
                <div className="w-full flex flex-col">
                  <h2 className="text-center text-white font-semibold text-[32px]">
                    Lusso Elite
                  </h2>
                  <p className="text-center text-base text-white/50 font-normal capitalize">
                    Elevate Your Digital Lifestyle to the Pinnacle of Prestige -
                    Lusso Elite, Where Early Access and Exclusive Deals Define
                    Your Journey
                  </p>
                  <div className="w-full flex flex-col gap-y-3.5 mb-6 mt-8">
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Everything in Standard
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Early Access &amp; Betas:{" "}
                        <span className="text-white">
                          Get ahead with early access to new releases and beta
                          versions, giving you the opportunity to shape the
                          future of our offerings.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Enhanced AI Chatbot Support:{" "}
                        <span className="text-white">
                          Experience priority assistance from our advanced AI
                          chatbot, designed to provide you with swift and
                          intelligent responses.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Exclusive Invitations:{" "}
                        <span className="text-white">
                          Step into the inner circle with invitations to
                          exclusive digital events, connecting you directly with
                          the pulse of innovation.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Loyalty Rewards:{" "}
                        <span className="text-white">
                          Earn rewards for your engagement and loyalty,
                          redeemable for exclusive discounts and benefits,
                          enhancing your Lusso Labs experience.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Developer Collaborations:{" "}
                        <span className="text-white">
                          Enjoy unique collaborations with top developers,
                          offering you special deals and content exclusively
                          available through Lusso Labs.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="ac-login-btn ac-login-btn-outline mt-3"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col bg-black rounded-[42px] overflow-hidden">
              <div className="w-full h-290px">
                <img src={ProIcon} alt="" className="img-cover-center" />
              </div>
              <div className="w-full flex flex-col flex-grow justify-between px-8 pb-8 pt-4">
                <div className="w-full flex flex-col">
                  <h2 className="text-center text-white font-semibold text-[32px]">
                    Lusso Infinity
                  </h2>
                  <p className="text-center text-base text-white/50 font-normal capitalize">
                    Embark on a Journey of Limitless Digital Luxury - Lusso
                    Infinity, Where Unrestricted Access and Personalized Service
                    Redefine Your Digital Experience
                  </p>
                  <div className="w-full flex flex-col gap-y-3.5 mb-6 mt-8">
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Everything in Premium
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Unlimited Portfolio Access:{" "}
                        <span className="text-white">
                          Indulge in unrestricted access to our full portfolio,
                          where the breadth of digital apps and games awaits
                          your exploration without limits.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Concierge Service:{" "}
                        <span className="text-white">
                          Relish in the personalized attention of our concierge
                          service, providing tailored recommendations that align
                          with your individual digital lifestyle.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Direct Development Influence:{" "}
                        <span className="text-white">
                          Contribute directly to our development process with
                          the power to request and prioritize new features,
                          making your preferences heard.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Premium Community Network:{" "}
                        <span className="text-white">
                          Connect with an elite network of creators and
                          enthusiasts in a premium community space dedicated to
                          fostering innovation and exclusive collaborations.
                        </span>
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-x-2">
                      <img
                        src={GreenTickIcon}
                        className="flex-shrink-0 mt-0.5"
                        alt=""
                      />
                      <p className="text-white/60 text-base font-semibold">
                        Complimentary Partner Subscriptions:{" "}
                        <span className="text-white">
                          Complimentary Partner Subscriptions:
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="ac-login-btn ac-login-btn-fill mt-3"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    </>
  );
};
export default Subscription;
