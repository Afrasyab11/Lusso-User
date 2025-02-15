import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import NetflixLogo from "../../assets/images/icons/netflix.png";
import QuotesWhiteIcon from "../../assets/images/icons/quotes-white.svg";
import NetflixBanner from "../../assets/images/icons/netflix-banner.svg";
import FbIcon from "../../assets/images/icons/fb-icon.svg";
import BeIcon from "../../assets/images/icons/be-icon.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import Vicon from "../../assets/images/icons/v-icon.svg";
import StarRating from "../../components/common/StarRating";
import { Link } from "react-router-dom";
import CommentBox from "../../components/common/CommentBox";
import { useAuthCheck } from "../../hooks/authHooks";
const AppDetailsNetflix = () => {
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
                  src={NetflixBanner}
                  alt=""
                />
              </section>
              {/* Banner section html end */}
              <div className="w-full float-left flex justify-between items-end mt-12">
                <div className="flex gap-x-8 w-1/2">
                  <div className="p-1 rounded-3xl flex-shrink-0 self-center">
                    <img
                      className="w-full max-w-[176px]"
                      src={NetflixLogo}
                      alt=""
                    />
                  </div>
                  <div className="max-w-[410px] w-full p-6 border border-white rounded-3xl">
                    <p className="font-bold text-white uppercase text-xs tracking-[1.2px] font-Jakarta-sans mb-2">
                      Video streaming
                    </p>
                    <h3 className="font-bold text-white text-2xl font-Jakarta-sans mb-2">
                      Netflix
                    </h3>
                    <p className="font-normal text-ll-gray text-base font-Jakarta-sans mb-1">
                      Streaming services
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
                  NETFLIX <br />
                  <span>Streaming Services</span>
                </h2>
                <div className="w-full float-left mt-10">
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>What is Netflix?</h3>
                    <p className="mb-8">
                      Netflix's success in 2023 is a testament to its ability to
                      evolve and innovate in a competitive streaming market. The
                      company has not only focused on preserving a rich library
                      of beloved classics and popular hits but has also invested
                      heavily in creating original content. This unique blend of
                      familiar and new material caters to a wide spectrum of
                      tastes, ensuring that there is something for everyone.
                      From critically acclaimed series to blockbuster movies,
                      Netflix's diverse offerings transcend cultural and
                      linguistic barriers, making it a universal hub for
                      entertainment.
                    </p>

                    <p className="mb-8">
                      The reasons to sign up for Netflix are manifold. It's a
                      gateway to an expansive world of entertainment, with the
                      convenience of streaming anytime, anywhere. The platform's
                      commitment to diversity and inclusion in its programming
                      means that it offers stories from different cultures and
                      perspectives, enriching the viewing experience. Netflix's
                      no-ad policy ensures uninterrupted viewing, which is a
                      significant draw for those who prefer an ad-free
                      experience. Lastly, the affordability of its plans, with
                      various options to suit different budgets and needs, makes
                      Netflix an attractive option for a wide range of viewers.
                    </p>
                    <p className="mb-8">
                      In essence, Netflix's strategy in 2023 is built on the
                      pillars of diversity, innovation, and quality, making it a
                      compelling choice for anyone looking for comprehensive,
                      high-quality entertainment in the streaming age.
                    </p>
                    <p className="mb-8">
                      Moreover, the platform's user experience is tailored to
                      individual preferences, thanks to sophisticated algorithms
                      that suggest content based on viewing history and ratings.
                      This personalized approach enhances user engagement,
                      making it easy for subscribers to discover their next
                      favorite show or movie. Additionally, Netflix's commitment
                      to quality is evident in its array of high-budget
                      productions, which are often recognized for their
                      excellence in storytelling, acting, and production values.
                    </p>
                  </div>
                  <div className="w-full float-left [&>h3]:mb-4 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>p]:text-ll-gray [&>p]:font-normal [&>p]:text-lg">
                    <h3>Recent launches</h3>
                    <p className="mb-6">
                      The first quarter of 2023 witnessed Netflix rolling out an
                      array of exciting shows and movies. In January, fans
                      welcomed the return of beloved series like "Ginny &
                      Georgia" for its second season and the debut of "That '90s
                      Show". February and March saw the release of eagerly
                      awaited series like "You season 4 part 1" and "Outer Banks
                      season 3". The subsequent months sustained this momentum
                      with a mix of new and returning series, including "Beef",
                      "The Diplomat", "The Lincoln Lawyer season 2", and
                      "Heartstopper season 2". This diverse lineup not only
                      underscores Netflix's commitment to delivering varied
                      content but also its ability to tap into different
                      audience segments, reinforcing its position as a versatile
                      and inclusive entertainment provider​​.
                    </p>
                    <p className="mb-6">
                      In parallel, Netflix's film division has not lagged
                      behind, keeping up with the promise of releasing new
                      movies every week throughout 2023. The year started with
                      high-profile releases like "The Pale Blue Eye", featuring
                      Christian Bale, and continued with various genres
                      including rom-coms, thrillers, and dramas. The summer and
                      fall are set to feature a range of animated movies, poised
                      to be family favorites. Such a varied movie slate
                      demonstrates Netflix's endeavor to provide something for
                      every type of movie enthusiast, whether they seek action,
                      romance, or family-friendly content​
                    </p>
                    <div className="w-full float-left bg-primary/25 p-8 rounded-2xl flex flex-col gap-y-4 mb-6">
                      <img className="w-10" src={QuotesWhiteIcon} alt="" />
                      <p className="font-bold text-2xl text-white">
                        The powerful testimonials from Netflix users reflect the
                        significant impact of its diverse content offerings.
                        These testimonials often highlight how Netflix has
                        become an integral part of their daily lives, offering a
                        means of relaxation, discovery, and emotional connection
                        through its vast selection of programs.
                      </p>
                      <div className="flex items-center justify-start gap-x-2">
                        <span className="h-px w-6 bg-[#C1C1C1]"></span>
                        <p className="font-bold text-base text-ll-gray">
                          Netflix community
                        </p>
                      </div>
                    </div>
                    <ul className="list-inside list-disc text-white font-normal text-lg pl-2 mb-4 [&>li]:mb-2">
                      <li>
                        Regular introduction of new and exclusive content,
                        including original series and films.
                      </li>
                      <li>
                        High-quality productions across different genres and
                        languages.
                      </li>
                      <li>
                        Personalized viewing experience with user-friendly
                        interface and recommendation algorithms.
                      </li>
                      <li>
                        Global reach, making it accessible to audiences in
                        various regions.
                      </li>
                      <li>
                        A vast and varied content library, catering to diverse
                        tastes and preferences.
                      </li>
                    </ul>
                    <p className="mb-6">
                      In conclusion, Netflix's strategy in 2023 of balancing a
                      rich mix of original and acquired content has further
                      cemented its status as a key player in the streaming
                      domain. By continuously evolving and adapting to the
                      dynamic entertainment landscape, Netflix has not only
                      retained its existing subscriber base but also attracted
                      new viewers, proving its enduring appeal and relevance in
                      the fast-paced world of digital entertainment.
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
export default AppDetailsNetflix;
