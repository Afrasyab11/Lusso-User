import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import kidzAvatar from '../../assets/images/kidzAvatar.png';
import UserAvator from '../common/UserAvator';
import UserNotifications from './UserNotifications';

const NotificationProfile = ({ data, isKidsMenu = false, showMobileView = false }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleLogout = () => {
        document.cookie = "authToken=; path=/;";
        if (currentPath === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // render
    const isKidsPage = currentPath.includes('/kids');
    return (
        <>
            <div className='hidden md:flex items-center'>
                <div className="flex items-center space-x-2">
                    {/* Notification Icon */}
                    {!isKidsPage && <UserNotifications />}

                    <div className="hidden md:flex relative" ref={dropdownRef}>
                        {!isKidsMenu ? <div
                            className="flex items-center bg-[#2c2051] rounded-full pl-2 pr-2 py-2 cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <UserAvator className='w-[20px] md:w-auto rounded-full h-7' />
                            <span className={`ml-2 text-sm text-white ${!isKidsMenu ? 'font-medium' : 'font-small'} capitalize`}>
                                {data?.username}
                            </span>
                            {!isKidsMenu && <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M5 7L9.5 11.5L14 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>}
                        </div> : <button
                            className="flex items-center bg-[#3B137B80] rounded-full pl-2 pr-4 py-2 cursor-pointer"
                            onClick={() => navigate('/kids')}
                        // onClick={toggleDropdown}
                        >
                            <UserAvator img={kidzAvatar} className='w-[25px] md:w-auto rounded-full h-7' />
                            <span className={`ml-3 text-white ${!isKidsMenu ? 'font-medium' : 'font-small'} capitalize`}>
                                Lusso Kids
                            </span>
                            {!isKidsMenu && <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M5 7L9.5 11.5L14 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>}
                        </button>}

                        {isOpen && (
                            <div className="absolute right-0 mt-1 md:mt-[50px] w-40 shadow-lg z-10 bg-[#2C2051] rounded-xl">
                                <ul className="p-1.5">
                                    <li
                                        className="flex px-4 py-1.5 text-white capitalize items-center gap-3 hover:bg-[#4567AC] 
                                    rounded-xl cursor-pointer"
                                        onClick={() => navigate('/userProfile')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                            <path d="M5 23.2734V16.2734M5 12.2734V5.27344M13 23.2734V14.2734M13 10.2734V5.27344M21 23.2734V18.2734M21 14.2734V5.27344M2 16.2734H8M10 10.2734H16M18 18.2734H24" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Settings
                                    </li>
                                    <li
                                        className="flex px-4 py-1.5 text-white capitalize items-center gap-3 hover:bg-[#4567AC] 
                                    rounded-xl cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 27 28" fill="none">
                                            <path d="M16.7003 5.04688H20.0585C21.295 5.04688 22.2974 6.04923 22.2974 7.28571V20.7187C22.2974 21.9552 21.295 22.9575 20.0585 22.9575H16.7003M8.86438 9.52454L4.38672 14.0022M4.38672 14.0022L8.86438 18.4799M4.38672 14.0022H17.8197" stroke="#E4E4E4" strokeWidth="1.11942" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showMobileView && (
                <div className='flex items-center'>
                    <div className="flex items-center space-x-4">
                        <div className="flex relative" ref={dropdownRef}>
                            <div
                                className="flex items-center bg-[#2c2051] rounded-full px-[4px] py-[4px] cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <UserAvator className='w-[27px] md:w-auto rounded-full h-7' />
                            </div>

                            {isOpen && (
                                <div className="absolute right-0 mt-1 w-40 shadow-lg z-10 bg-[#2C2051] rounded-xl">
                                    <ul className="p-1.5">
                                        <li
                                            className="flex px-4 py-1.5 text-white capitalize items-center gap-3 hover:bg-[#4567AC] 
                                        rounded-xl cursor-pointer"
                                        // onClick={navigate to settings if needed}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                                                <path d="M5 23.2734V16.2734M5 12.2734V5.27344M13 23.2734V14.2734M13 10.2734V5.27344M21 23.2734V18.2734M21 14.2734V5.27344M2 16.2734H8M10 10.2734H16M18 18.2734H24" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Settings
                                        </li>
                                        <li
                                            className="flex px-4 py-1.5 text-white capitalize items-center gap-3 hover:bg-[#4567AC] 
                                        rounded-xl cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 27 28" fill="none">
                                                <path d="M16.7003 5.04688H20.0585C21.295 5.04688 22.2974 6.04923 22.2974 7.28571V20.7187C22.2974 21.9552 21.295 22.9575 20.0585 22.9575H16.7003M8.86438 9.52454L4.38672 14.0022M4.38672 14.0022L8.86438 18.4799M4.38672 14.0022H17.8197" stroke="#E4E4E4" strokeWidth="1.11942" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotificationProfile;
