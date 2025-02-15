import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logoImg from "../../assets/images/home/Lusso-logo.png";
import { decodeToken, getTokenFromCookies } from '../../hooks/common.utils';
import CreatorButton from '../common/CreatorButton';
import ExploreSearch from '../common/ExploreSearch';
import { ScrollProvider } from '../common/ScrollContext';
import HamburgerMenu from '../navbar/HamburgerMenu';
import NotificationProfile from '../navbar/NotificationProfile';
import SidebarExplore from '../sidebar/SidebarExplore';

const HomeLayoutNew: React.FC<any> = ({ children }: any) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const topRef = useRef<HTMLDivElement | any>(null);

    // Initialize user data
    useEffect(() => {
        const token = getTokenFromCookies();
        if (token) {
            const decoded = decodeToken(token);
            setUserData(decoded);
        } else {
            navigate('/auth');
        }
    }, [navigate]);

    const location = useLocation();
    let refreshTab = '';
    if (location.pathname.includes("/addproduct")) {
        refreshTab = 'addproducts';
    }
    if (location.pathname.includes("/manageprofile")) {
        refreshTab = 'manageprofile';
    }

    // Function to scroll to the top
    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Scroll to top when sidebar is toggled
    useEffect(() => {
        if (sidebarOpen) {
            scrollToTop();
        }
    }, [sidebarOpen]);

    return (
        <ScrollProvider>
            <div className='bg-blurred-new'>
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <aside
                        style={{ background: 'linear-gradient(179deg, #332784 0.63%, rgba(24, 21, 45, 0.50) 68.42%, rgba(24, 21, 45, 0.00) 101.06%)' }}
                        className={`hidden lg:block overflow-y-hidden text-white w-64 space-y-6 py-7 px-2 relative fixed md:relative inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out shadow-lg md:shadow-[6px_0_12px_-6px_rgba(0,0,0,0.3)]`}
                    >
                        <div className='flex justify-center cursor-pointer'
                            onClick={() => navigate('/explore')}>
                            <img src={logoImg} alt='logo' className='w-[200px]' />
                        </div>
                        <SidebarExplore shouldRefresh={refreshTab} scrollToTop={scrollToTop} />
                    </aside>

                    {/* Main content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Page content */}
                        <main ref={topRef} className="flex-1 overflow-x-hidden overflow-y-auto">
                            <div className='lg:flex justify-between pt-3 lg:pt-10 px-5 items-center'>
                                <div className='hidden lg:flex flex-1'>
                                    <ExploreSearch />
                                </div>
                                <div className='flex flex-1 justify-between lg:justify-center gap-10 items-center'>
                                    <CreatorButton />
                                    <NotificationProfile data={userData} />
                                    <HamburgerMenu userData={userData} />
                                </div>
                            </div>
                            <div className="mx-auto px-6 py-8">
                                {children}
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </ScrollProvider>

    );
};

export default HomeLayoutNew;
