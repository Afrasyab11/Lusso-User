import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import logoImg from "../../assets/images/logo.svg";
import robot from '../../assets/images/header/asklusso.svg';
import logoImg from '../../assets/images/home/lusso-kids.svg';
import kidzAvatar from '../../assets/images/kidzAvatar.png';
import { useCookieCheck } from '../../hooks/authHooks';
import { decodeToken, getTokenFromCookies } from '../../hooks/common.utils';
import UserAvator from '../common/UserAvator';
import HeaderKidsMenu from '../layout/HeaderKidsMenu';
import NotificationProfile from './NotificationProfile';
import './topnavbar.scss';

const TopNavBarKids = () => {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('Home');
    const isWishListRoute = location.pathname === '/wishList';

    const [userData, setUserData] = useState<any>(null);
    const isLogged: any = useCookieCheck();
    const navigate = useNavigate();

    // init
    useEffect(() => {
        // Get token from cookies
        const token = getTokenFromCookies();
        if (token) {
            // Decode token to get user data
            const decoded = decodeToken(token);
            setUserData(decoded);
        }
    }, []);

    const handleClickLogo = () => {
        // if (isLogged) {
        //     navigate('/explore');
        // } else {
        //     navigate('/');
        // }
    };

    return (
        <div className="product-details-wrapper bg-black">
            <div
                className="top-nav-bar top-0 py-2"
                style={{ width: 'calc(100% - 0px)', background: '#682DD2' }}
            >
                <Link to="/Kids" className="md:min-w-[15%]">
                    <div
                        className="lg:w-[200px] cursor-pointer"
                    // onClick={handleClickLogo}
                    >
                        <img src={logoImg} alt="Logo" />
                    </div>
                </Link>

                <button
                    className="text-sm font-medium flex items-center gap-1.5 py-1.5 px-4 bg-[#00F0FB] rounded-full text-black lg:hidden ml-20"
                >
                    <img src={robot} alt="robo" style={{ width: '25px', height: '25px' }} />
                </button>
                <div
                    className="flex items-center bg-[#3B137B80] rounded-full p-1 cursor-pointer lg:hidden"
                >
                    <UserAvator img={kidzAvatar} className='w-[25px] md:w-auto rounded-full h-7' />


                </div>
                {/* <NotificationProfile data={userData} isKidsMenu={true} showMobileView={true} /> */}



                <div className="h-full hidden lg:flex items-center lg:flex-1">
                    <HeaderKidsMenu userData={userData} />
                </div>

                {/* <button className="flex items-center justify-between py-3 px-6 rounded-xl" style={{ background: 'linear-gradient(180deg, #8423F4 0%, #18142D 100%)' }}>
                    <span className="d-none lg:d-block text-white text-sm font-bold">Ask Lusso</span>
                    <img src={stars} alt="stars" className="h-5" />
                </button> */}

                <div className="hidden lg:flex items-center gap-3 justify-center flex-0 me-5">
                    {!userData?.username ? (
                        <>
                            <Link
                                to="/login"
                                className="signInbtn py-1.5 px-8 inline-flex items-center text-center 
                                rounded-full text-md font-medium transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="getStartedBtn py-1.5 px-8 inline-flex items-center text-center 
                                rounded-full text-md font-medium transition-all"
                            >
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <div>
                                <button
                                    className="text-sm font-medium flex items-center gap-1.5 py-1.5 px-4 
                                      rounded-full bg-[#00F0FB] text-black hover:bg-[#00C3D3] hover:text-white 
                                      transition-all duration-200">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none">
                                        <g clip-path="url(#clip0_2503_29550)">
                                            <path d="M22.7208 5.98575L22.2111 5.90024V5.81473C22.2111 4.53207 21.5314 3.37767 20.427 2.7791C19.4925 2.26603 18.0482 1.79572 15.8819 1.49644C15.627 0.64133 14.9049 0 12.2288 0C9.59513 0 8.87301 0.598575 8.61814 1.49644C6.23938 1.75297 4.71018 2.26603 3.73319 2.7791C2.67124 3.37767 1.94912 4.57482 1.94912 5.81473V5.94299L1.7792 5.98575C0.887168 6.11401 0.25 6.88361 0.25 7.78147V11.6722C0.25 12.5701 0.887168 13.3397 1.7792 13.4679L1.94912 13.5107C1.94912 14.7506 2.62876 15.905 3.73319 16.5036C5.13496 17.2732 7.64115 17.9572 12.0588 17.9572C16.4765 17.9572 18.9827 17.2304 20.3845 16.5036C21.4465 15.905 22.1686 14.7933 22.1686 13.5534L22.6783 13.4679C23.5704 13.3397 24.2075 12.5701 24.2075 11.6722V7.78147C24.25 6.88361 23.5704 6.11401 22.7208 5.98575ZM21.2765 13.5534C21.2765 14.4086 20.8093 15.2209 20.0447 15.6485C18.9403 16.247 16.6465 16.9739 12.2288 16.9739C7.81106 16.9739 5.55973 16.247 4.45531 15.6485C3.69071 15.2209 3.22345 14.4513 3.22345 13.5534V7.1829C3.22345 6.32779 3.69071 5.51544 4.45531 5.08789C5.55973 4.48931 7.85354 3.76247 12.2712 3.76247C16.6889 3.76247 18.9403 4.48931 20.0872 5.08789C20.8518 5.51544 21.319 6.28504 21.319 7.1829V13.5534H21.2765Z" fill="white" />
                                            <path d="M9.34358 10.2588C9.34358 11.0284 8.74889 10.6436 7.98429 10.6436C7.21969 10.6436 6.625 11.0284 6.625 10.2588C6.625 9.4892 7.21969 8.89062 7.98429 8.89062C8.74889 8.89062 9.34358 9.4892 9.34358 10.2588Z" fill="white" />
                                            <path d="M13.3338 12.5695C13.3338 12.8687 13.2064 13.168 12.994 13.3391C12.7816 13.5101 12.5268 13.6811 12.2294 13.6811C11.6347 13.6811 11.125 13.168 11.125 12.5695C11.125 12.5267 11.125 12.4839 11.1675 12.4412C11.21 12.3984 11.2524 12.3984 11.2949 12.3984H13.1639C13.2914 12.3984 13.3338 12.4839 13.3338 12.5695Z" fill="white" />
                                            <path d="M17.8748 10.2588C17.8748 11.0284 17.2801 10.6436 16.5155 10.6436C15.7509 10.6436 15.1562 11.0284 15.1562 10.2588C15.1562 9.4892 15.7509 8.89062 16.5155 8.89062C17.2801 8.89062 17.8748 9.4892 17.8748 10.2588Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2503_29550">
                                                <rect width="24" height="18" fill="white" transform="translate(0.25)" />
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                                    <img src={robot} alt="robo" style={{ width: '20px', height: '20px' }} />
                                    Ask Lusso
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M22.9437 13.6828C22.8824 13.6523 22.8211 13.6218 22.7598 13.5913C22.1165 13.3474 21.4732 13.1035 20.8605 12.8901C20.3703 12.7072 19.8802 12.5547 19.39 12.3108C18.471 11.8535 17.9502 11.0913 17.6132 10.1461C17.2763 9.17052 16.878 8.19489 16.5104 7.21926C16.4798 7.1278 16.3572 7.00584 16.2347 7.00584C16.1121 6.97535 15.9896 7.06682 15.9283 7.21926C15.5607 8.1644 15.2237 9.07905 14.8561 10.0242C14.6723 10.451 14.5191 10.8779 14.2741 11.2742C13.9984 11.701 13.5695 12.0669 13.11 12.2498C12.2216 12.6157 11.3332 12.9511 10.4447 13.2864C10.1078 13.4084 9.77079 13.5304 9.43381 13.7133C9.3419 13.7438 9.25 13.8962 9.25 13.9877C9.25 14.0791 9.37254 14.1706 9.43381 14.2621C9.46444 14.2926 9.52571 14.323 9.58698 14.323C10.5367 14.6889 11.4863 15.0243 12.436 15.3597C13.4776 15.7255 14.2741 16.3658 14.703 17.4024C14.9787 18.0731 15.2237 18.7439 15.4688 19.3841C15.622 19.811 15.8058 20.2378 15.959 20.6951C16.0202 20.8476 16.1121 20.9695 16.3266 21C16.4185 20.878 16.541 20.7866 16.5717 20.6646C16.9393 19.75 17.2763 18.8048 17.6132 17.8902C17.9502 16.945 18.471 16.1523 19.3594 15.695C19.8189 15.4511 20.3091 15.2987 20.7992 15.1157C21.5038 14.8414 22.2391 14.5974 22.9437 14.2926C23.0662 14.2316 23.1887 14.1096 23.25 13.9877C23.2194 13.8962 23.0356 13.7438 22.9437 13.6828Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M1.46472 7.16616C2.17025 7.43807 2.87577 7.70997 3.58129 7.95166C4.28681 8.22356 4.83896 8.64652 5.11503 9.3716C5.20706 9.58308 5.29908 9.79456 5.3911 10.0363C5.60583 10.5801 5.78988 11.1239 6.0046 11.6677C6.03528 11.7583 6.15798 11.8489 6.25 12C6.34203 11.8792 6.43405 11.8187 6.46472 11.7281C6.7408 11.0634 6.9862 10.3686 7.2316 9.70393C7.50767 8.91843 7.99847 8.34441 8.79601 8.0423C9.50153 7.77039 10.2071 7.5287 10.9126 7.22659C11.0353 7.16616 11.1273 7.04532 11.25 6.95468C11.158 6.86405 11.0353 6.77341 10.9433 6.71299C10.2991 6.4713 9.65491 6.22961 9.01074 5.98792C8.12117 5.6858 7.53834 5.11178 7.2316 4.20544C7.01687 3.54079 6.7408 2.87613 6.46472 2.24169C6.43405 2.15106 6.31135 2.09063 6.25 2C6.15798 2.09063 6.03528 2.15106 6.0046 2.2719C5.7592 2.87613 5.5138 3.48036 5.29908 4.1148C5.02301 4.83988 4.62423 5.44411 3.88804 5.77643C3.64264 5.89728 3.36656 5.98792 3.12117 6.07855C2.56902 6.29003 2.04755 6.4713 1.4954 6.68278C1.40337 6.71299 1.34202 6.86405 1.25 6.92447C1.31135 7.01511 1.3727 7.10574 1.46472 7.16616Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M7.38878 18.2263C6.70306 17.9959 6.21327 17.535 5.98469 16.8107C5.78878 16.284 5.59286 15.7572 5.39694 15.2305C5.36429 15.1317 5.26633 15.0658 5.20102 15C5.13571 15.0658 5.03776 15.1317 5.0051 15.2305C4.84184 15.6584 4.67857 16.1193 4.51531 16.5473C4.28673 17.2387 3.92755 17.8313 3.20918 18.0947C2.94796 18.1934 2.68673 18.2922 2.39286 18.4239C2.06633 18.5556 1.70714 18.6872 1.38061 18.8189C1.31531 18.8848 1.25 18.9506 1.25 19.0165C1.25 19.0823 1.34796 19.1481 1.38061 19.1811C1.47857 19.2469 1.60918 19.2798 1.7398 19.3457C2.19694 19.5103 2.65408 19.6749 3.11122 19.8395C3.66633 20.037 4.05816 20.3992 4.28673 20.9588C4.54796 21.5844 4.74388 22.177 5.0051 22.8025C5.03776 22.9012 5.13571 22.9342 5.20102 23C5.26633 22.9342 5.36429 22.8683 5.39694 22.8025C5.5602 22.4403 5.69082 22.0782 5.82143 21.7161C5.95204 21.3868 6.08265 21.0247 6.24592 20.6955C6.5398 20.1029 7.12755 19.9054 7.71531 19.6749C8.10714 19.5103 8.49898 19.3786 8.89082 19.214C8.98878 19.1811 9.08673 19.0823 9.25 18.9835C9.11939 18.8848 9.05408 18.8189 8.95612 18.786C8.43367 18.6214 7.91122 18.4239 7.38878 18.2263Z"
                                            fill="black"
                                        />
                                    </svg>

                                </button>
                            </div>
                            {/* {isWishListRoute ? <svg className="cursor-pointer" width="43" height="38" viewBox="0 0 43 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            </svg>} */}
                            {/* notification */}
                            <NotificationProfile data={userData} isKidsMenu={true} />
                        </>
                    )}
                </div>


            </div>
            <div className="alignCenter bg-[#18142D]">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default TopNavBarKids;
