import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import logoImg from "../../assets/images/logo.svg";

import logoImg from "../../assets/images/home/Lusso-logo.png";
import { useCookieCheck } from "../../hooks/authHooks";
import ScrollToTop from "../common/ScrollToTop";
import FooterLatest from "../footer/FooterLatest";
import HeaderMenu from "../layout/HeaderMenu";
import HamburgerMenu from "./HamburgerMenu";
import NotificationProfile from "./NotificationProfile";
import './topnavbar.scss';

const TopNavBar = ({ isHome = true }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;
    const isWishListRoute = location.pathname === '/wishList';
    const isUserProfileScreen = location.pathname === '/userprofile';
    const [activeButton, setActiveButton] = useState('Home');
    const [userData, setUserData] = useState(null);
    const isLogged: any = useCookieCheck()
    const getTokenFromCookies = () => {
        const name = 'authToken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null; // Return null if token is not found
    };

    const decodeToken = (token: string) => {
        if (!token) return null;

        // JWT consists of three parts: header, payload, signature
        const payload = token.split('.')[1];

        if (!payload) return null;

        // Decode payload from base64 to a JSON string
        try {
            const decodedPayload = atob(payload);
            return JSON.parse(decodedPayload);
        } catch (e) {
            console.error('Invalid token');
            return null;
        }
    };

    // init
    useEffect(() => {
        // Get token from cookies
        const token = getTokenFromCookies();
        // console.log(token)
        if (token) {
            // Decode token to get user data
            const decoded = decodeToken(token);
            setUserData(decoded);
            console.log(decodeToken(token))

        } else {
            navigate('/')
        }
    }, []);

    const handleClickLogo = () => {
        if (isLogged) {
            navigate('/explore')
        } else {
            navigate('/')
        }
    }

    const handleLogout = () => {
        document.cookie = "authToken=; path=/;";
        if (currentPath === '/') {
            window.location.reload()
        } else {
            navigate('/')
        }
    }
    const handleButtonClick = () => {
        // const token = getCookies('authToken');
        // if (token) {
        //     navigate('/explore');
        // } else {
        //     navigate('/');
        // }
        navigate('/subscribe')
    };




    // render
    return (
        <div className="product-details-wrapper bg-black">
            <ScrollToTop />
            {/* <div className="flex justify-center items-center"> */}
            <div className="top-nav-bar top-0 py-2"
                style={{ width: 'calc(100% - 0px)', background: 'rgba(1, 1, 1, 0.8)' }}>
                <span className="md:min-w-[15%]">
                    <div className="lg:w-[200px] cursor-pointer" onClick={handleClickLogo}>
                        <img src={logoImg} alt="Logo" />
                    </div>
                </span>
                {/* <div className="top-nav-item-container lg:w-[55%]">
                    <Link
                        to="/explore"
                        className={`nav-item${activeButton === 'Home' ? '-active' : ''}`}
                        onClick={() => setActiveButton('Home')}
                    >Home</Link>
                    <Link
                        to="/explore/apps"
                        className={`nav-item${activeButton === 'Apps' ? '-active' : ''}`}
                        onClick={() => setActiveButton('Apps')}
                    >Apps</Link>
                    <Link
                        to="/explore/games"
                        className={`nav-item${activeButton === 'Games' ? '-active' : ''}`}
                        onClick={() => setActiveButton('Games')}
                    >Games</Link>
                    <Link
                        to="/explore/movies-tvs"
                        className={`nav-item${activeButton === 'Movies/TVs' ? '-active' : ''}`}
                        onClick={() => setActiveButton('Movies/TVs')}
                    >Movies/TVs</Link>
                    <Link
                        to="/explore/courses"
                        className={`nav-item${activeButton === 'Courses' ? '-active' : ''}`}
                        onClick={() => setActiveButton('Courses')}
                    >Courses</Link>
                    <Link
                        to="/explore/services"
                        className={`nav-item${activeButton === 'Services' ? '-active' : ''}`}
                        onClick={() => setActiveButton('Services')}
                    >Services</Link>
                    <button className="nav-item">
                        <img src={kidsNav} alt="Kids" />
                    </button>
                </div> */}

                <div className="hidden lg:flex h-full items-center lg:flex-1">
                    <HeaderMenu />
                </div>
                <div className="hidden lg:flex items-center gap-3 justify-center flex-0 me-5">
                    <div className="mr-2">
                        <button onClick={handleButtonClick} className="text-xs font-medium flex items-center py-2 px-3 rounded-full hover:px-5"
                            style={{ background: 'linear-gradient(90deg, #4B03CE 0%, #5899FF 52.5%, #00F0FB 100%)' }}>
                            <span className="hidden lg:flex">Become a Creator</span>
                        </button>
                    </div>
                    {isWishListRoute ? (
                        <button>
                            <svg
                                className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:opacity-80"
                                width="43"
                                height="38"
                                viewBox="0 0 43 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => navigate('/explore')}
                            >
                                <path
                                    d="M39.7228 3.74296C38.6843 2.70401 37.4513 1.87984 36.0943 1.31754C34.7372 0.755239 33.2826 0.46582 31.8137 0.46582C30.3447 0.46582 28.8902 0.755239 27.5331 1.31754C26.176 1.87984 24.9431 2.70401 23.9046 3.74296L21.7494 5.89814L19.5942 3.74296C17.4966 1.64534 14.6516 0.466908 11.6851 0.466908C8.71866 0.466908 5.87368 1.64534 3.77605 3.74296C1.67843 5.84058 0.5 8.68557 0.5 11.6521C0.5 14.6185 1.67843 17.4635 3.77605 19.5611L5.93123 21.7163L21.7494 37.5345L37.5676 21.7163L39.7228 19.5611C40.7617 18.5227 41.5859 17.2897 42.1482 15.9326C42.7105 14.5756 42.9999 13.121 42.9999 11.6521C42.9999 10.1831 42.7105 8.72854 42.1482 7.37148C41.5859 6.01441 40.7617 4.78142 39.7228 3.74296Z"
                                    fill="url(#paint0_linear_7759_82170)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_7759_82170"
                                        x1="22.1836"
                                        y1="0.584278"
                                        x2="22.1836"
                                        y2="37.9925"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#0054B5" />
                                        <stop offset="1" stop-color="#40DAFE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>

                    ) : (
                        <button>
                            <svg
                                className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:opacity-80"
                                onClick={() => navigate('/wishList')}
                                width="46"
                                height="42"
                                viewBox="0 0 46 42"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M40.7228 5.74296C39.6843 4.70401 38.4513 3.87984 37.0943 3.31754C35.7372 2.75524 34.2826 2.46582 32.8137 2.46582C31.3447 2.46582 29.8902 2.75524 28.5331 3.31754C27.176 3.87984 25.9431 4.70401 24.9046 5.74296L22.7494 7.89814L20.5942 5.74296C18.4966 3.64534 15.6516 2.46691 12.6851 2.46691C9.71866 2.46691 6.87368 3.64534 4.77605 5.74296C2.67843 7.84058 1.5 10.6856 1.5 13.6521C1.5 16.6185 2.67843 19.4635 4.77605 21.5611L6.93123 23.7163L22.7494 39.5345L38.5676 23.7163L40.7228 21.5611C41.7617 20.5227 42.5859 19.2897 43.1482 17.9326C43.7105 16.5756 43.9999 15.121 43.9999 13.6521C43.9999 12.1831 43.7105 10.7285 43.1482 9.37148C42.5859 8.01441 41.7617 6.78142 40.7228 5.74296Z"
                                    stroke="url(#paint0_linear_7759_81965)"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_7759_81965"
                                        x1="23.1836"
                                        y1="2.58428"
                                        x2="23.1836"
                                        y2="39.9925"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#0054B5" />
                                        <stop offset="1" stop-color="#40DAFE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>

                    )}

                    {/* notification */}
                    <NotificationProfile data={userData} />
                    {/* <div className="nav-profile">
                        <img src={navProfile} alt="Profile" />
                    </div> */}
                </div>

                <HamburgerMenu userData={userData} />

            </div>
            {/* </div> */}
            <div className={`${isHome && 'alignCenter'} bg-blurred-new`}>
                {isHome ?
                    <div className='content'>
                        <Outlet></Outlet>
                    </div> :
                    <Outlet></Outlet>
                }
            </div>
            {!isUserProfileScreen && (

                <div className="float-left w-full">
                    {/* <NewFooter /> */}
                    <FooterLatest />
                </div>
            )}
        </div>
    );
};

export default TopNavBar;
