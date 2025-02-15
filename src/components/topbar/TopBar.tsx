import * as React from 'react';
import { Outlet } from 'react-router-dom';
import CloseIcon from '../../assets/images/icons/close.png';
import HamburgerMenu from '../../assets/images/icons/hamburger_menu.svg';
import profileImg from '../../assets/images/profile.png';
import SideBarLogo from '../../assets/images/re-lusso-logo.png';
import SearchStars from '../../assets/images/search-stars.png';
import '../layout/layout.scss';
import DevDropdown from '../navbar/DevDropdown';
import NotificationPart from '../navbar/NotificationPart';
const TopBar = () => {
    const [navOpen, setNavOpen] = React.useState(false);

    const handleToggleNavBar = () => {
        const sideNav = document.querySelector('.side-nav-container');
        sideNav?.classList.toggle('active');
        setNavOpen(value => !value);
    };
    return (
        <div
            className="float-left flex flex-col gap-y-9 side-bar-background top-bar-background"
            style={{
                flex: '1',
                //  height: '100vh',
                overflow: 'auto',
                borderRadius: 0
            }}
        >
            <div className="desktop-top-bar flex flex-row justify-between items-center ">
                <div className="flex flex-row items-center border-[0.75px] border-[#6C8CFF80] bg-[#FFFFFF1A] text-white rounded-full w-[50%] justify-between py-2 pl-5 pr-2">
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="How can i help you today?"
                        className="outline-none bg-transparent lg:w-[60%] md:w-[40%] md:text-[10px] lg:text-[12px] xl:text-[14px]"
                        onChange={e => { }}
                    />
                    <button
                        onClick={() => {
                            window.open('/askLusso');
                        }}
                        // style={{ background: "linear-gradient(86.75deg, #4800CB 3.45%, #792FFF 30.06%, #FF77B0 98.08%)" }}
                        className="askLussoBtn lg:px-5 md:px-2 py-2 rounded-full border-[1px] border-[#a968fc] flex items-center gap-2"
                    >
                        <p className=" md:text-[10px] lg:text-[9px] xl:text-[14px]">Search With AI</p>
                        <img className="lg:w-4 md:w-3" src={SearchStars} alt="" />
                    </button>
                </div>
                <div className="flex flex-row items-center gap-6 ">
                    {/* <div style={{
                        background: "linear-gradient(123.18deg, rgba(87, 4, 236, 0.5) 22.35%, rgba(203, 66, 251, 0.1) 107.61%)"
                    }} className='flex items-center gap-1 text-white pl-2 lg:pr-5 md:pr-2 py-2 rounded-t-full rounded-br-full rounded-bl-3xl'>
                        <div className='bg-[#4800cb] rounded-full p-1'>
                            <img className='lg:w-8 md:w-6' src={JoinCreator} alt='' />
                        </div>
                        <p className='lg:text-[11px] md:text-[8px]'>Join the creator<br />Community!</p>
                    </div> */}
                    {/* <div className="py-2">
                        <CreatorButton />
                    </div> */}
                    <div className="flex items-center gap-2">
                        {/* <div style={{
                            background: "linear-gradient(180deg, #370C8C 0%, #3D1673 100%)"
                        }} className='rounded-full p-3 border-[1px] border-[#401791]'>
                            <img src={NotificationIcon} alt='' />
                        </div> */}

                        {/* Notification */}
                        <NotificationPart />

                        {/* Dropdown */}
                        <DevDropdown image={profileImg} />
                    </div>
                </div>
            </div>
            {/* <div className="mobile-top-bar">
                <div className="left-cont">
                    <img src={SideBarLogo} alt="" />
                </div>
                <div className="right-cont">
                    <span className="nav-top-icon search-icon w-[60px] justify-center">
                        <img className="" src={SearchIcon} alt="" />
                    </span>
                    // <span
                    //     onClick={handleToggleNavBar}
                    //     className="nav-top-icon hamburger-icon"
                    // >
                    //     {navOpen ? (
                    //         <img className="close" src={CloseIcon} alt="" />
                    //     ) : (
                    //         <img className="menu" src={HamburgerMenu} alt="" />
                    //     )}
                    // </span> 
                </div>
            </div> */}
            <div className="md:hidden flex items-center justify-center">
                <div className="w-[200px] cursor-pointer">
                    <img src={SideBarLogo} alt="Logo" />
                </div>

                <span
                    onClick={handleToggleNavBar}
                    className="nav-top-icon hamburger-icon absolute right-2 h-12 w-12"
                >
                    {navOpen ? (
                        <img className="close" src={CloseIcon} alt="" />
                    ) : (
                        <img className="menu" src={HamburgerMenu} alt="" />
                    )}
                </span>
            </div>
            <div
                className="page-content md:min-h-[70vh]"
                style={{
                    overflow: 'auto',
                    // height: '100%',
                    scrollbarWidth: 'none',
                    width: '100%',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default TopBar;
