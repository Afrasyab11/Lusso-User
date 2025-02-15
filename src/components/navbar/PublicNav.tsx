import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kidsNav from "../../assets/images/icons/kids.svg";
import searchIcon from "../../assets/images/icons/search.svg";
import Navlogo from "../../assets/images/navlogo.svg";
import './navbar.scss';
const PublicNav = (props: any) => {

  const [scrolled, setScrolled] = useState(false);

  const [activeButton, setActiveButton]: any = useState('All');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div
      className={`header w-full float-left sticky top-0 z-[99] border-b border-white/10 ${scrolled ? "light-black" : "black"}`}
    >
      <div className="w-full max-w-[1480px] mx-auto clearfix px-10 py-5 f-500 text-20">
        {/* <div className="w-full float-left flex justify-between py-2 gap-x-2">
          <div className="float-left flex gap-x-6">
            <div className="flex gap-x-2 items-center">
              <img src={EmailIcon} alt="Email" />
              <p className="text-sm font-normal text-white">
                lussolabs@gmail.com
              </p>
            </div>
            <div className="flex gap-x-2 items-center">
              <img src={LocationIcon} alt="Location" />
              <p className="text-sm font-normal text-white">
              1203 S White Chapel Blvd Suite 100 Southlake,Texas 76092
              </p>
            </div>
          </div>
          <div className="float-left flex gap-x-3 items-center">
            <p className="text-sm font-bold text-white">Follow Us</p>
            <div className="flex gap-x-2.5 items-center">
              <svg
                className="[&:hover>rect]:opacity-20 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <rect
                  width="28"
                  height="28"
                  rx="14"
                  fill="white"
                  fillOpacity="0.1"
                />
                <path
                  d="M14 27.5C6.54416 27.5 0.5 21.4558 0.5 14C0.5 6.54416 6.54416 0.5 14 0.5C21.4558 0.5 27.5 6.54416 27.5 14C27.5 21.4558 21.4558 27.5 14 27.5Z"
                  stroke="white"
                  strokeOpacity="0.1"
                />
                <path
                  d="M16.5254 14.6999L16.8053 12.673H15.0549V11.3576C15.0549 10.8031 15.2994 10.2626 16.0834 10.2626H16.8792V8.53684C16.8792 8.53684 16.157 8.3999 15.4666 8.3999C14.0251 8.3999 13.0828 9.37072 13.0828 11.1282V12.673H11.4805V14.6999H13.0828V19.5999H15.0549V14.6999H16.5254Z"
                  fill="white"
                />
              </svg>
              <svg
                className="[&:hover>rect]:opacity-20 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <rect
                  width="28"
                  height="28"
                  rx="14"
                  fill="white"
                  fillOpacity="0.1"
                />
                <path
                  d="M14 27.5C6.54416 27.5 0.5 21.4558 0.5 14C0.5 6.54416 6.54416 0.5 14 0.5C21.4558 0.5 27.5 6.54416 27.5 14C27.5 21.4558 21.4558 27.5 14 27.5Z"
                  stroke="white"
                  strokeOpacity="0.1"
                />
                <path
                  d="M10.9074 19.5999H8.58539V12.1222H10.9074V19.5999ZM9.74517 11.1022C9.00265 11.1022 8.40039 10.4872 8.40039 9.74468C8.40039 9.38802 8.54207 9.04597 8.79427 8.79378C9.04646 8.54158 9.38851 8.3999 9.74517 8.3999C10.1018 8.3999 10.4439 8.54158 10.6961 8.79378C10.9483 9.04597 11.09 9.38802 11.09 9.74468C11.09 10.4872 10.4874 11.1022 9.74517 11.1022ZM19.5981 19.5999H17.2811V15.9598C17.2811 15.0923 17.2636 13.9798 16.0738 13.9798C14.8665 13.9798 14.6815 14.9223 14.6815 15.8973V19.5999H12.362V12.1222H14.589V13.1423H14.6215C14.9315 12.5547 15.6888 11.9347 16.8186 11.9347C19.1686 11.9347 19.6006 13.4823 19.6006 15.4923V19.5999H19.5981Z"
                  fill="white"
                />
              </svg>
              <svg
                className="[&:hover>rect]:opacity-20 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <rect
                  width="28"
                  height="28"
                  rx="14"
                  fill="white"
                  fillOpacity="0.1"
                />
                <path
                  d="M14 27.5C6.54416 27.5 0.5 21.4558 0.5 14C0.5 6.54416 6.54416 0.5 14 0.5C21.4558 0.5 27.5 6.54416 27.5 14C27.5 21.4558 21.4558 27.5 14 27.5Z"
                  stroke="white"
                  strokeOpacity="0.1"
                />
                <path
                  d="M18.4492 12.0671C18.4563 12.1665 18.4563 12.266 18.4563 12.3655C18.4563 15.4 16.1466 18.8965 11.9253 18.8965C10.6248 18.8965 9.41664 18.5199 8.40039 17.8661C8.58517 17.8874 8.76282 17.8945 8.95471 17.8945C10.0278 17.8945 11.0156 17.5321 11.8045 16.9138C10.7953 16.8925 9.94963 16.2315 9.65825 15.3219C9.8004 15.3432 9.94252 15.3574 10.0918 15.3574C10.2979 15.3574 10.504 15.329 10.6958 15.2793C9.64406 15.066 8.8552 14.1422 8.8552 13.0264V12.998C9.16077 13.1686 9.51613 13.2752 9.89275 13.2894C9.27448 12.8772 8.86941 12.1736 8.86941 11.3777C8.86941 10.9513 8.9831 10.5604 9.1821 10.2193C10.3121 11.6122 12.0105 12.5219 13.9151 12.6214C13.8796 12.4508 13.8582 12.2732 13.8582 12.0955C13.8582 10.8305 14.8816 9.80005 16.1537 9.80005C16.8146 9.80005 17.4116 10.0772 17.8309 10.5249C18.3496 10.4254 18.8471 10.2335 19.2877 9.97061C19.1171 10.5036 18.7547 10.9513 18.2786 11.2356C18.7405 11.1859 19.1882 11.0579 19.6004 10.8803C19.2878 11.3351 18.8969 11.7401 18.4492 12.0671Z"
                  fill="white"
                />
              </svg>
              <svg
                className="[&:hover>rect]:opacity-20 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <rect
                  width="28"
                  height="28"
                  rx="14"
                  fill="white"
                  fillOpacity="0.1"
                />
                <path
                  d="M14 27.5C6.54416 27.5 0.5 21.4558 0.5 14C0.5 6.54416 6.54416 0.5 14 0.5C21.4558 0.5 27.5 6.54416 27.5 14C27.5 21.4558 21.4558 27.5 14 27.5Z"
                  stroke="white"
                  strokeOpacity="0.1"
                />
                <path
                  d="M19.3664 11.0322C19.2375 10.5472 18.858 10.1652 18.3762 10.0356C17.5027 9.80005 14.0004 9.80005 14.0004 9.80005C14.0004 9.80005 10.4981 9.80005 9.62462 10.0356C9.14275 10.1653 8.76323 10.5472 8.63443 11.0322C8.40039 11.9113 8.40039 13.7455 8.40039 13.7455C8.40039 13.7455 8.40039 15.5797 8.63443 16.4588C8.76323 16.9438 9.14275 17.3099 9.62462 17.4395C10.4981 17.675 14.0004 17.675 14.0004 17.675C14.0004 17.675 17.5027 17.675 18.3762 17.4395C18.858 17.3099 19.2375 16.9438 19.3664 16.4588C19.6004 15.5797 19.6004 13.7455 19.6004 13.7455C19.6004 13.7455 19.6004 11.9113 19.3664 11.0322ZM12.8549 15.4108V12.0802L15.7822 13.7455L12.8549 15.4108Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div> */}
        <div className="w-full float-left flex gap-x-2 items-center justify-center">
          <div className="float-left flex">
            <Link to="/home" className="py-3 float-left">
              <img src={Navlogo} alt="" />
            </Link>
            {/* Hamburger */}
          </div>
          {/* <div className="flex-grow text-white flex justify-end items-end gap-x-6 2xl:gap-x-10 font-inter">
            <div className="flex gap-x-6 xl:gap-x-8">
              <div className="uppercase relative">
                <NavLink
                  to="/"
                  end
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  Home
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink
                  to="/dashboard"
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  Apps
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink
                  to="/askLusso"
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  Games
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink
                  to="/admindashboard"
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  Movies/TVs
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink
                  to="/devdashboard"
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  Courses
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink
                  to="/adminpanel"
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  Services
                </NavLink>
              </div>

              <div className="uppercase relative">
                <NavLink
                  to="/adminpanel"
                  className="nav-link-public border-transparent hover:border border-primary transition-all rounded-full"
                >
                  <div style={{ width: '100%', height: '100%', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
                    <div style={{ color: '#00DAF4', fontSize: 25, fontFamily: 'Chewy', fontWeight: '400', wordWrap: 'break-word' }}>Kids</div>
                  </div>
                </NavLink>
              </div>



              <div className="uppercase relative">
                <NavLink
                  to="/auth"
                  className="nav-link-public border-transparent"
                >
                  Blog
                </NavLink>
              </div>
              <div className="uppercase relative">
                <NavLink
                  to="/auth"
                  className="nav-link-public border-transparent"
                >
                  Contact
                </NavLink>
              </div>
            </div>
            <div className="flex gap-x-4 self-center">
              <Link
                to="/auth"
                className="py-2 px-8 inline-flex items-center text-center rounded-full text-base font-bold border border-primary transition-all hover:bg-primary"
              >
                Login
              </Link>
              <Link to="/auth/signup" className="btn-primary-fill">
                Get Started
              </Link>
              <div className="relative inline-flex items-center">
                <img src={SearchIcon} alt="Search" />
              </div>
            </div>
          </div> */}
          <div className="flex-grow text-white flex justify-end items-end gap-x-6 2xl:gap-x-10 font-inter items-center">
            <button
              onClick={() => { setActiveButton('All') }}
              className={`nav-item${activeButton === 'All' ? '-active' : ''}`}>All</button>
            <button
              onClick={() => { setActiveButton('Apps') }}
              className={`nav-item${activeButton === 'Apps' ? '-active' : ''}`}>Apps</button>
            <button
              onClick={() => { setActiveButton('Games') }}
              className={`nav-item${activeButton === 'Games' ? '-active' : ''}`}>Games</button>
            <button
              onClick={() => { setActiveButton('Movies/TVs') }}
              className={`nav-item${activeButton === 'Movies/TVs' ? '-active' : ''}`}>Movies/TVs</button>
            <button
              onClick={() => { setActiveButton('Courses') }}
              className={`nav-item${activeButton === 'Courses' ? '-active' : ''}`}>Courses</button>
            <button
              onClick={() => { setActiveButton('Services') }}
              className={`nav-item${activeButton === 'Services' ? '-active' : ''}`}>Services</button>
            <button className="nav-item">
              <img src={kidsNav} alt="" />
            </button>
            <button className="">
              <img src={searchIcon} alt="" />
            </button>
            <Link
              to="/login"
              className="py-2 px-8 inline-flex items-center text-center rounded-full text-base font-bold border border-primary transition-all hover:bg-primary"
            >
              Login
            </Link>
            <Link to="/signup" className="btn-primary-fill">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNav;
