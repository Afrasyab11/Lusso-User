import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import logoImg from "../../assets/images/logo.svg";

import logoImg from "../../assets/images/home/Lusso-logo.png";
import { useCookieCheck } from "../../hooks/authHooks";
import { getCookies } from "../../utils/utils";
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
        const token = getCookies('authToken');
        if (token) {
            navigate('/explore');
        } else {
            navigate('/');
        }
    };




    // render
    return (
        <div className="product-details-wrapper bg-black">
            {/* <div className="flex justify-center items-center"> */}
            <div className="top-nav-bar top-0 py-2"
                style={{ width: 'calc(100% - 0px)', background: 'rgba(1, 1, 1, 0.8)' }}>
                <Link to="/" className="md:min-w-[15%]">
                    <div className="lg:w-[200px] cursor-pointer" onClick={handleClickLogo}>
                        <img src={logoImg} alt="Logo" />
                    </div>
                </Link>
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
                <div className="flex items-center gap-2 lg:w-[27%] justify-evenly">
                    <div>
                        <button onClick={handleButtonClick} className="askLussoBtn text-sm font-medium flex items-center gap-1.5 py-1.5 px-4">

                            <span className="hidden lg:flex">Ask Lusso</span>

                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path d="M22.9437 13.6828C22.8824 13.6523 22.8211 13.6218 22.7598 13.5913C22.1165 13.3474 21.4732 13.1035 20.8605 12.8901C20.3703 12.7072 19.8802 12.5547 19.39 12.3108C18.471 11.8535 17.9502 11.0913 17.6132 10.1461C17.2763 9.17052 16.878 8.19489 16.5104 7.21926C16.4798 7.1278 16.3572 7.00584 16.2347 7.00584C16.1121 6.97535 15.9896 7.06682 15.9283 7.21926C15.5607 8.1644 15.2237 9.07905 14.8561 10.0242C14.6723 10.451 14.5191 10.8779 14.2741 11.2742C13.9984 11.701 13.5695 12.0669 13.11 12.2498C12.2216 12.6157 11.3332 12.9511 10.4447 13.2864C10.1078 13.4084 9.77079 13.5304 9.43381 13.7133C9.3419 13.7438 9.25 13.8962 9.25 13.9877C9.25 14.0791 9.37254 14.1706 9.43381 14.2621C9.46444 14.2926 9.52571 14.323 9.58698 14.323C10.5367 14.6889 11.4863 15.0243 12.436 15.3597C13.4776 15.7255 14.2741 16.3658 14.703 17.4024C14.9787 18.0731 15.2237 18.7439 15.4688 19.3841C15.622 19.811 15.8058 20.2378 15.959 20.6951C16.0202 20.8476 16.1121 20.9695 16.3266 21C16.4185 20.878 16.541 20.7866 16.5717 20.6646C16.9393 19.75 17.2763 18.8048 17.6132 17.8902C17.9502 16.945 18.471 16.1523 19.3594 15.695C19.8189 15.4511 20.3091 15.2987 20.7992 15.1157C21.5038 14.8414 22.2391 14.5974 22.9437 14.2926C23.0662 14.2316 23.1887 14.1096 23.25 13.9877C23.2194 13.8962 23.0356 13.7438 22.9437 13.6828Z" fill="white" />
                                <path d="M1.46472 7.16616C2.17025 7.43807 2.87577 7.70997 3.58129 7.95166C4.28681 8.22356 4.83896 8.64652 5.11503 9.3716C5.20706 9.58308 5.29908 9.79456 5.3911 10.0363C5.60583 10.5801 5.78988 11.1239 6.0046 11.6677C6.03528 11.7583 6.15798 11.8489 6.25 12C6.34203 11.8792 6.43405 11.8187 6.46472 11.7281C6.7408 11.0634 6.9862 10.3686 7.2316 9.70393C7.50767 8.91843 7.99847 8.34441 8.79601 8.0423C9.50153 7.77039 10.2071 7.5287 10.9126 7.22659C11.0353 7.16616 11.1273 7.04532 11.25 6.95468C11.158 6.86405 11.0353 6.77341 10.9433 6.71299C10.2991 6.4713 9.65491 6.22961 9.01074 5.98792C8.12117 5.6858 7.53834 5.11178 7.2316 4.20544C7.01687 3.54079 6.7408 2.87613 6.46472 2.24169C6.43405 2.15106 6.31135 2.09063 6.25 2C6.15798 2.09063 6.03528 2.15106 6.0046 2.2719C5.7592 2.87613 5.5138 3.48036 5.29908 4.1148C5.02301 4.83988 4.62423 5.44411 3.88804 5.77643C3.64264 5.89728 3.36656 5.98792 3.12117 6.07855C2.56902 6.29003 2.04755 6.4713 1.4954 6.68278C1.40337 6.71299 1.34202 6.86405 1.25 6.92447C1.31135 7.01511 1.3727 7.10574 1.46472 7.16616Z" fill="white" />
                                <path d="M7.38878 18.2263C6.70306 17.9959 6.21327 17.535 5.98469 16.8107C5.78878 16.284 5.59286 15.7572 5.39694 15.2305C5.36429 15.1317 5.26633 15.0658 5.20102 15C5.13571 15.0658 5.03776 15.1317 5.0051 15.2305C4.84184 15.6584 4.67857 16.1193 4.51531 16.5473C4.28673 17.2387 3.92755 17.8313 3.20918 18.0947C2.94796 18.1934 2.68673 18.2922 2.39286 18.4239C2.06633 18.5556 1.70714 18.6872 1.38061 18.8189C1.31531 18.8848 1.25 18.9506 1.25 19.0165C1.25 19.0823 1.34796 19.1481 1.38061 19.1811C1.47857 19.2469 1.60918 19.2798 1.7398 19.3457C2.19694 19.5103 2.65408 19.6749 3.11122 19.8395C3.66633 20.037 4.05816 20.3992 4.28673 20.9588C4.54796 21.5844 4.74388 22.177 5.0051 22.8025C5.03776 22.9012 5.13571 22.9342 5.20102 23C5.26633 22.9342 5.36429 22.8683 5.39694 22.8025C5.5602 22.4403 5.69082 22.0782 5.82143 21.7161C5.95204 21.3868 6.08265 21.0247 6.24592 20.6955C6.5398 20.1029 7.12755 19.9054 7.71531 19.6749C8.10714 19.5103 8.49898 19.3786 8.89082 19.214C8.98878 19.1811 9.08673 19.0823 9.25 18.9835C9.11939 18.8848 9.05408 18.8189 8.95612 18.786C8.43367 18.6214 7.91122 18.4239 7.38878 18.2263Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    {isWishListRoute ? <svg className="cursor-pointer" width="43" height="38" viewBox="0 0 43 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.7228 3.74296C38.6843 2.70401 37.4513 1.87984 36.0943 1.31754C34.7372 0.755239 33.2826 0.46582 31.8137 0.46582C30.3447 0.46582 28.8902 0.755239 27.5331 1.31754C26.176 1.87984 24.9431 2.70401 23.9046 3.74296L21.7494 5.89814L19.5942 3.74296C17.4966 1.64534 14.6516 0.466908 11.6851 0.466908C8.71866 0.466908 5.87368 1.64534 3.77605 3.74296C1.67843 5.84058 0.5 8.68557 0.5 11.6521C0.5 14.6185 1.67843 17.4635 3.77605 19.5611L5.93123 21.7163L21.7494 37.5345L37.5676 21.7163L39.7228 19.5611C40.7617 18.5227 41.5859 17.2897 42.1482 15.9326C42.7105 14.5756 42.9999 13.121 42.9999 11.6521C42.9999 10.1831 42.7105 8.72854 42.1482 7.37148C41.5859 6.01441 40.7617 4.78142 39.7228 3.74296Z" fill="url(#paint0_linear_7759_82170)" />
                        <defs>
                            <linearGradient id="paint0_linear_7759_82170" x1="22.1836" y1="0.584278" x2="22.1836" y2="37.9925" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#0054B5" />
                                <stop offset="1" stop-color="#40DAFE" />
                            </linearGradient>
                        </defs>
                    </svg> : <svg className="cursor-pointer" onClick={() => navigate('/wishList')} width="46" height="42" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.7228 5.74296C39.6843 4.70401 38.4513 3.87984 37.0943 3.31754C35.7372 2.75524 34.2826 2.46582 32.8137 2.46582C31.3447 2.46582 29.8902 2.75524 28.5331 3.31754C27.176 3.87984 25.9431 4.70401 24.9046 5.74296L22.7494 7.89814L20.5942 5.74296C18.4966 3.64534 15.6516 2.46691 12.6851 2.46691C9.71866 2.46691 6.87368 3.64534 4.77605 5.74296C2.67843 7.84058 1.5 10.6856 1.5 13.6521C1.5 16.6185 2.67843 19.4635 4.77605 21.5611L6.93123 23.7163L22.7494 39.5345L38.5676 23.7163L40.7228 21.5611C41.7617 20.5227 42.5859 19.2897 43.1482 17.9326C43.7105 16.5756 43.9999 15.121 43.9999 13.6521C43.9999 12.1831 43.7105 10.7285 43.1482 9.37148C42.5859 8.01441 41.7617 6.78142 40.7228 5.74296Z" stroke="url(#paint0_linear_7759_81965)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_7759_81965" x1="23.1836" y1="2.58428" x2="23.1836" y2="39.9925" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#0054B5" />
                                <stop offset="1" stop-color="#40DAFE" />
                            </linearGradient>
                        </defs>
                    </svg>}
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
