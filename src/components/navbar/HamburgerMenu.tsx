import { ChevronRight, CircleChevronLeft } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CommunitySVGHamburger } from '../../assets/icons/community';
import { ICON_ENUM } from '../../constants/icons.constant';
import {
  ENUM_EXPLORE,
  ENUM_GUEST_MOBILE_MENU,
} from '../../constants/menu.constant';
import UserAvator from '../common/UserAvator';
import './mobile-view-menu.css';
import UserNotificationsForHamburger from './UserNotificationsForHamburger';

const HamburgerMenu = ({ userData = {} }: any) => {
  const navigate = useNavigate();
  const [activeDepth, setActiveDepth] = useState<number>(1);
  const [activeNav, setActiveNav] = useState<string>("");
  const [isMenuOpen, setMenuOpen] = useState(true); // Controls hamburger visibility


  const handleLogout = () => {
    document.cookie = 'authToken=; path=/;';
    navigate('/login');
  };
  // Define types for the menu data structure
  // Define types for menu structure
  type MenuItem = {
    label: string;
    nav: string;
    icon: (width?: string, height?: string) => JSX.Element;
  };

  type MenuData = {
    1: MenuItem[];
    2: Record<string, MenuItem[]>;
    3: Record<string, MenuItem[]>;
  };

  // Utility function to convert ENUM_EXPLORE to the MegaMenu data structure
  const convertEnumExploreToMenuData = (): MenuData => {
    const menuData: MenuData = {
      1: [],
      2: {},
      3: {},
    };

    ENUM_EXPLORE.forEach((item) => {
      const { title, path, icon, subCategories } = item;

      // Depth 1 items
      menuData[1].push({
        label: title,
        nav: path || "", // Default to an empty string if no path
        icon: icon,
      });

      // Depth 2 (subcategories)
      if (subCategories) {
        menuData[2][title] = subCategories.map((subItem) => ({
          label: subItem.title,
          nav: subItem.path || "", // Default to an empty string if no path
          icon: subItem.icon,
        }));


      }
    });

    return menuData;
  };


  // Utility function to convert ENUM_GUEST_MOBILE_MENU to the MegaMenu data structure
  const convertEnumGuestToMenuData = (): MenuData => {
    const menuData: MenuData = {
      1: [],
      2: {},
      3: {},
    };

    ENUM_GUEST_MOBILE_MENU.forEach((item) => {
      const { title, path, icon, subCategories } = item;

      // Depth 1 items
      menuData[1].push({
        label: title,
        nav: path || "", // Default to an empty string if no path
        icon: icon,
      });

      // Depth 2 (subcategories)
      if (subCategories) {
        menuData[2][title] = subCategories.map((subItem) => ({
          label: subItem.title,
          nav: subItem.path || "", // Default to an empty string if no path
          icon: subItem.icon,
        }));
      }
    });

    return menuData;
  };

  const closeMenu = () => {
    // Locate the drawer checkbox element
    const drawerCheckbox = document.querySelector("#my-drawer-4") as HTMLInputElement;

    // Check if the element exists and update its state
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }

    // Update the menu state
    setMenuOpen(false);
  };



  const menuData = userData ? convertEnumExploreToMenuData() : convertEnumGuestToMenuData();

  const [activeMenu, setActiveMenu] = useState('main');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(true); // Show notifications submenu
  };

  const handleMenuChange = (menu: string) => {
    if (menu === "Notification") {
      handleNotificationClick();
    } else {
      setShowNotifications(false); // Reset when switching menus
      setActiveMenu(menu); // Existing menu change logic
    }
  };

  const subCategories = ['Action', 'Story Play', 'Adventure', 'FPS'];

  return (
    <div className="flex lg:hidden drawer drawer-end justify-end text-white">
      <label className="askLussoMobButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M22.9437 13.6828C22.8824 13.6523 22.8211 13.6218 22.7598 13.5913C22.1165 13.3474 21.4732 13.1035 20.8605 12.8901C20.3703 12.7072 19.8802 12.5547 19.39 12.3108C18.471 11.8535 17.9502 11.0913 17.6132 10.1461C17.2763 9.17052 16.878 8.19489 16.5104 7.21926C16.4798 7.1278 16.3572 7.00584 16.2347 7.00584C16.1121 6.97535 15.9896 7.06682 15.9283 7.21926C15.5607 8.1644 15.2237 9.07905 14.8561 10.0242C14.6723 10.451 14.5191 10.8779 14.2741 11.2742C13.9984 11.701 13.5695 12.0669 13.11 12.2498C12.2216 12.6157 11.3332 12.9511 10.4447 13.2864C10.1078 13.4084 9.77079 13.5304 9.43381 13.7133C9.3419 13.7438 9.25 13.8962 9.25 13.9877C9.25 14.0791 9.37254 14.1706 9.43381 14.2621C9.46444 14.2926 9.52571 14.323 9.58698 14.323C10.5367 14.6889 11.4863 15.0243 12.436 15.3597C13.4776 15.7255 14.2741 16.3658 14.703 17.4024C14.9787 18.0731 15.2237 18.7439 15.4688 19.3841C15.622 19.811 15.8058 20.2378 15.959 20.6951C16.0202 20.8476 16.1121 20.9695 16.3266 21C16.4185 20.878 16.541 20.7866 16.5717 20.6646C16.9393 19.75 17.2763 18.8048 17.6132 17.8902C17.9502 16.945 18.471 16.1523 19.3594 15.695C19.8189 15.4511 20.3091 15.2987 20.7992 15.1157C21.5038 14.8414 22.2391 14.5974 22.9437 14.2926C23.0662 14.2316 23.1887 14.1096 23.25 13.9877C23.2194 13.8962 23.0356 13.7438 22.9437 13.6828Z"
            fill="white"
          />
          <path
            d="M1.46472 7.16616C2.17025 7.43807 2.87577 7.70997 3.58129 7.95166C4.28681 8.22356 4.83896 8.64652 5.11503 9.3716C5.20706 9.58308 5.29908 9.79456 5.3911 10.0363C5.60583 10.5801 5.78988 11.1239 6.0046 11.6677C6.03528 11.7583 6.15798 11.8489 6.25 12C6.34203 11.8792 6.43405 11.8187 6.46472 11.7281C6.7408 11.0634 6.9862 10.3686 7.2316 9.70393C7.50767 8.91843 7.99847 8.34441 8.79601 8.0423C9.50153 7.77039 10.2071 7.5287 10.9126 7.22659C11.0353 7.16616 11.1273 7.04532 11.25 6.95468C11.158 6.86405 11.0353 6.77341 10.9433 6.71299C10.2991 6.4713 9.65491 6.22961 9.01074 5.98792C8.12117 5.6858 7.53834 5.11178 7.2316 4.20544C7.01687 3.54079 6.7408 2.87613 6.46472 2.24169C6.43405 2.15106 6.31135 2.09063 6.25 2C6.15798 2.09063 6.03528 2.15106 6.0046 2.2719C5.7592 2.87613 5.5138 3.48036 5.29908 4.1148C5.02301 4.83988 4.62423 5.44411 3.88804 5.77643C3.64264 5.89728 3.36656 5.98792 3.12117 6.07855C2.56902 6.29003 2.04755 6.4713 1.4954 6.68278C1.40337 6.71299 1.34202 6.86405 1.25 6.92447C1.31135 7.01511 1.3727 7.10574 1.46472 7.16616Z"
            fill="white"
          />
          <path
            d="M7.38878 18.2263C6.70306 17.9959 6.21327 17.535 5.98469 16.8107C5.78878 16.284 5.59286 15.7572 5.39694 15.2305C5.36429 15.1317 5.26633 15.0658 5.20102 15C5.13571 15.0658 5.03776 15.1317 5.0051 15.2305C4.84184 15.6584 4.67857 16.1193 4.51531 16.5473C4.28673 17.2387 3.92755 17.8313 3.20918 18.0947C2.94796 18.1934 2.68673 18.2922 2.39286 18.4239C2.06633 18.5556 1.70714 18.6872 1.38061 18.8189C1.31531 18.8848 1.25 18.9506 1.25 19.0165C1.25 19.0823 1.34796 19.1481 1.38061 19.1811C1.47857 19.2469 1.60918 19.2798 1.7398 19.3457C2.19694 19.5103 2.65408 19.6749 3.11122 19.8395C3.66633 20.037 4.05816 20.3992 4.28673 20.9588C4.54796 21.5844 4.74388 22.177 5.0051 22.8025C5.03776 22.9012 5.13571 22.9342 5.20102 23C5.26633 22.9342 5.36429 22.8683 5.39694 22.8025C5.5602 22.4403 5.69082 22.0782 5.82143 21.7161C5.95204 21.3868 6.08265 21.0247 6.24592 20.6955C6.5398 20.1029 7.12755 19.9054 7.71531 19.6749C8.10714 19.5103 8.49898 19.3786 8.89082 19.214C8.98878 19.1811 9.08673 19.0823 9.25 18.9835C9.11939 18.8848 9.05408 18.8189 8.95612 18.786C8.43367 18.6214 7.91122 18.4239 7.38878 18.2263Z"
            fill="white"
          />
        </svg>
      </label>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content sdd">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label> */}

        <label htmlFor="my-drawer-4" className="swap swap-rotate mt-1">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          {/* <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg> */}
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.56885 5.90454V8.26565H26.18V5.90454H2.56885ZM2.56885 12.9879V15.349H26.18V12.9879H2.56885ZM2.56885 20.0712V22.4323H26.18V20.0712H2.56885Z"
              fill="white"
            />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      {/* <div className={!userData?.username ? "drawer-side drawer-side-loggedout" : "drawer-side drawer-side-loggedin"}
        style={{ zIndex: '100' }}>

        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex justify-end"></div>
        <div className="app">
          <nav className="mobile_menu">
            <div className={`mobile_menu-content ${activeMenu === 'main' ? 'active' : ''}`}>
              {!userData?.username ? (
                <ul className="mobile_menu card-bg-dev min-h-full w-full text-white">
                  <li className="border-b border-b-[#FFFFFF1C] p-1 flex flex-row justify-between items-center">
                    <label htmlFor="my-drawer-4">
                      <div className="flex items-center gap-3">
                        <CircleChevronLeft size={20} />
                        <span className="tetx-white text-xl">Menu</span>
                      </div>
                    </label>
                  </li>

                  {menuData[1].map((item, index) => (

                    <li key={item.label + '_' + index}>

                      <div
                        onClick={() => {
                          if (item.label === 'Sign In') {
                            handleLogout();
                          } else if (menuData[2][item.label]) {
                            handleMenuChange(item.label);
                          } else {
                            navigate(item.nav);
                          }
                        }}
                        className={`flex flex-row gap-x-2 justify-start items-center `}
                      >
                        <span className="">{item.label}</span>
                        {menuData[2][item.label] && (
                          <ChevronRight size={20} />
                        )}
                      </div>

                    </li>
                  ))}

                </ul>
              ) : (

                <ul className="mobile_menu card-bg-dev min-h-full w-full text-white">
                  <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row justify-between items-center flex-nowrap">
                    <div className="flex gap-3">
                      <UserAvator />
                      <span className="text-white text-xl">
                        {userData?.username ?? ''}
                      </span>
                    </div>
                    <label htmlFor="my-drawer-4">
                      <img
                        src={ICON_ENUM.CROSS.icon}
                        alt="close"
                        className="w-5 h-5"
                      />
                    </label>
                  </li>

                  <li className="border-b border-b-[#FFFFFF1C] gap-0">
                    <div className="" onClick={() => navigate('/devonboard')}>
                      {CommunitySVGHamburger('20', '20')} Become a Creator
                    </div>
                    <div className="" onClick={() => navigate('/wishList')}>
                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8125 5.57031C16.8125 10.7656 9.10934 14.9709 8.78129 15.1445C8.69483 15.191 8.59818 15.2154 8.5 15.2154C8.40182 15.2154 8.30517 15.191 8.21871 15.1445C7.89066 14.9709 0.1875 10.7656 0.1875 5.57031C0.188875 4.35032 0.674123 3.1807 1.53679 2.31804C2.39945 1.45537 3.56907 0.970125 4.78906 0.96875C6.32168 0.96875 7.66355 1.62781 8.5 2.74184C9.33645 1.62781 10.6783 0.96875 12.2109 0.96875C13.4309 0.970125 14.6006 1.45537 15.4632 2.31804C16.3259 3.1807 16.8111 4.35032 16.8125 5.57031Z" fill="#00F0FB" />
                      </svg>

                      Wishlist
                    </div>
                    <div className="">
                      <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.86958 16.6257C9.7304 16.8656 9.53063 17.0647 9.29026 17.2032C9.0499 17.3416 8.77738 17.4145 8.5 17.4145C8.22262 17.4145 7.9501 17.3416 7.70974 17.2032C7.46937 17.0647 7.2696 16.8656 7.13042 16.6257M13.25 6.33398C13.25 5.07421 12.7496 3.86602 11.8588 2.97523C10.968 2.08443 9.75978 1.58398 8.5 1.58398C7.24022 1.58398 6.03204 2.08443 5.14124 2.97523C4.25045 3.86602 3.75 5.07421 3.75 6.33398C3.75 11.8757 1.375 13.459 1.375 13.459H15.625C15.625 13.459 13.25 11.8757 13.25 6.33398Z" stroke="#00F0FB" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      Notification
                    </div>

                  </li>

                  {menuData[1].map((item, index) => (
                    <li key={item.nav + '_' + index}>
                      <div className="flex justify-between w-full py-1">
                        <div
                          onClick={() => {
                            if (item.label === 'Logout') {
                              handleLogout();
                            } else if (menuData[2][item.label]) {
                              handleMenuChange(item.label);
                            } else {
                              navigate(item.nav);
                            }
                          }}
                          className={`flex flex-row gap-x-3 justify-${item?.nav ? 'start' : 'end'
                            } items-center w-full`}
                        >
                          <div>{item.icon()}</div>
                          <span className="">{item.label}</span>
                        </div>
                        {menuData[2][item.label] && (
                          <ChevronRight size={20} />
                        )}
                      </div>

                    </li>

                  ))}
                </ul>
              )}
            </div>
            <div className={`mobile_menu-content ${activeMenu != 'main' ? 'active' : ''}`}>
              <ul className="mobile_menu card-bg-dev min-h-full w-full text-white">
                {userData ? (
                  <>
                    <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row justify-between items-center flex-nowrap">
                      <div className="flex gap-3" onClick={() => handleMenuChange('main')}>
                        <div>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.50065 17.4173C13.873 17.4173 17.4173 13.873 17.4173 9.50065C17.4173 5.12828 13.873 1.58398 9.50065 1.58398C5.12828 1.58398 1.58398 5.12828 1.58398 9.50065C1.58398 13.873 5.12828 17.4173 9.50065 17.4173Z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                            <path d="M10.6875 13.0625L7.125 9.5L10.6875 5.9375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                        <span className="">Menu</span>
                      </div>

                    </li>
                 
                  </>) : (
                  <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row items-center flex-nowrap">
                    <div className="flex flex-row gap-x-3 w-full items-center"
                      onClick={() => handleMenuChange('main')}>
                      <div>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.50065 17.4173C13.873 17.4173 17.4173 13.873 17.4173 9.50065C17.4173 5.12828 13.873 1.58398 9.50065 1.58398C5.12828 1.58398 1.58398 5.12828 1.58398 9.50065C1.58398 13.873 5.12828 17.4173 9.50065 17.4173Z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                          <path d="M10.6875 13.0625L7.125 9.5L10.6875 5.9375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                      <span className="">Menu</span>
                    </div>
                    <label htmlFor="my-drawer-4">
                      <img
                        src={ICON_ENUM.CROSS.icon}
                        alt="close"
                        className="w-5 h-5"
                      />
                    </label>



                

                  </li>
                )}

                {menuData[2][activeMenu]?.map((item, index) => (
                  <li key={item.nav + '_' + index}>
                    <div className="flex justify-between w-full py-1">
                      <div
                        onClick={() => navigate(item.nav)}
                        className={`flex flex-row gap-x-3 justify-${item?.nav ? 'start w-full' : 'end'
                          } items-center `}
                      >
                        <div>{item.icon()}</div>
                        <span className="">{item.label}</span>
                      </div>
                    </div>
                  </li>

                ))}

              </ul>
            </div>
          </nav>
        </div>
      </div> */}

      <div
        className={`drawer-side ${!userData?.username ? "drawer-side-loggedout" : "drawer-side-loggedin"
          }`}
        style={{ zIndex: "100" }}
      >
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex justify-end"></div>
        <div className="app">
          <nav className="mobile_menu" style={{ width: !userData?.username ? 315 : 350 }}>
            {/* Main Menu */}
            <div
              className={`mobile_menu-content ${activeMenu === "main" ? "active" : ""
                }`}
            >
              {!userData?.username ? (
                <ul className={`mobile_menu card-bg-dev min-h-full w-full text-white ${isMenuOpen ? "open" : "closed"
                  }`} >
                  <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row justify-between items-center flex-nowrap h-[70px]"
                    style={{ padding: '10px 1.75rem 10px 0.25rem' }}>
                    {/* <label htmlFor="my-drawer-4"> */}
                    {activeMenu === "main" ? <div className="flex items-center gap-0"></div> :
                      <div className="flex items-center gap-3">
                        <CircleChevronLeft size={20} />
                        <span className="text-white text-xl">Menu</span>
                      </div>}
                    {/* </label> */}
                    <label htmlFor="my-drawer-4">
                      <img
                        src={ICON_ENUM.CROSS.icon}
                        alt="close"
                        className="w-5 h-5 pe-5"
                      />
                    </label>
                  </li>

                  {menuData[1].map((item, index) => (
                    <li key={`${item.label}_${index}`}>
                      <div
                        onClick={() => {
                          if (item.label === "Logout") {
                            handleLogout();
                          } else if (menuData[2][item.label]) {
                            handleMenuChange(item.label);
                          } else {
                            closeMenu();
                            navigate(item.nav);
                          }
                        }}
                        className="flex flex-row gap-x-2 justify-start items-center"
                      >
                        {/* <div>{item.icon()}</div> */}
                        <span>{item.label}</span>
                        {menuData[2][item.label] && <ChevronRight size={20} />}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className={`mobile_menu card-bg-dev min-h-full w-full text-white ${isMenuOpen ? "open" : "closed"
                  }`} style={{ height: activeMenu !== "main" ? '100%' : '90%' }}>
                  {!showNotifications ? (
                    <>
                      <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row justify-between items-center flex-nowrap"
                        style={{ padding: '10px 1.75rem 10px 0.25rem' }}>
                        <div className="flex gap-3 items-center">
                          <UserAvator />
                          <span className="text-white text-xl">{userData.username}</span>
                        </div>
                        <label htmlFor="my-drawer-4">
                          <img
                            src={ICON_ENUM.CROSS.icon}
                            alt="close"
                            className="w-5 h-5"
                          />
                        </label>
                      </li>

                      <li className="border-b border-b-[#FFFFFF1C] flex flex-col gap-4"
                        style={{ padding: '10px 1.75rem 10px 0.25rem' }}>
                        <div
                          onClick={() => {
                            closeMenu(); // Close the hamburger menu
                            navigate("/subscribe"); // Navigate to the specified route
                          }}
                          className="flex items-center gap-3"
                        >
                          {CommunitySVGHamburger("20", "20")} Become a Creator
                        </div>

                        <div onClick={() => { closeMenu(); navigate("/wishList") }} className='flex items-center gap-3'>
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.8125 5.57031C16.8125 10.7656 9.10934 14.9709 8.78129 15.1445C8.69483 15.191 8.59818 15.2154 8.5 15.2154C8.40182 15.2154 8.30517 15.191 8.21871 15.1445C7.89066 14.9709 0.1875 10.7656 0.1875 5.57031C0.188875 4.35032 0.674123 3.1807 1.53679 2.31804C2.39945 1.45537 3.56907 0.970125 4.78906 0.96875C6.32168 0.96875 7.66355 1.62781 8.5 2.74184C9.33645 1.62781 10.6783 0.96875 12.2109 0.96875C13.4309 0.970125 14.6006 1.45537 15.4632 2.31804C16.3259 3.1807 16.8111 4.35032 16.8125 5.57031Z" fill="#00F0FB" />
                          </svg>
                          Wishlist
                        </div>
                        <div className='flex items-center gap-3' onClick={() => {  setShowNotifications(!showNotifications) }}>
                          <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.86958 16.6257C9.7304 16.8656 9.53063 17.0647 9.29026 17.2032C9.0499 17.3416 8.77738 17.4145 8.5 17.4145C8.22262 17.4145 7.9501 17.3416 7.70974 17.2032C7.46937 17.0647 7.2696 16.8656 7.13042 16.6257M13.25 6.33398C13.25 5.07421 12.7496 3.86602 11.8588 2.97523C10.968 2.08443 9.75978 1.58398 8.5 1.58398C7.24022 1.58398 6.03204 2.08443 5.14124 2.97523C4.25045 3.86602 3.75 5.07421 3.75 6.33398C3.75 11.8757 1.375 13.459 1.375 13.459H15.625C15.625 13.459 13.25 11.8757 13.25 6.33398Z" stroke="#00F0FB" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Notification
                        </div>
                        <div className='flex items-center gap-3' onClick={() => { closeMenu(); navigate("/kids")}}>
                          <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.86958 16.6257C9.7304 16.8656 9.53063 17.0647 9.29026 17.2032C9.0499 17.3416 8.77738 17.4145 8.5 17.4145C8.22262 17.4145 7.9501 17.3416 7.70974 17.2032C7.46937 17.0647 7.2696 16.8656 7.13042 16.6257M13.25 6.33398C13.25 5.07421 12.7496 3.86602 11.8588 2.97523C10.968 2.08443 9.75978 1.58398 8.5 1.58398C7.24022 1.58398 6.03204 2.08443 5.14124 2.97523C4.25045 3.86602 3.75 5.07421 3.75 6.33398C3.75 11.8757 1.375 13.459 1.375 13.459H15.625C15.625 13.459 13.25 11.8757 13.25 6.33398Z" stroke="#00F0FB" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Kids
                        </div>
                      </li>
                    </>) : (
                    <div
                      className={`mobile_menu-content ${activeMenu !== "Notification" ? "active" : ""}`}
                    >
                      <ul className="mobile_menu card-bg-dev min-h-full w-full text-white">
                        {/* <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row justify-between items-center flex-nowrap">
                          <div
                            className="flex gap-3 items-center"
                            onClick={() => handleMenuChange("main")}
                          >
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.50065 17.4173C13.873 17.4173 17.4173 13.873 17.4173 9.50065C17.4173 5.12828 13.873 1.58398 9.50065 1.58398C5.12828 1.58398 1.58398 5.12828 1.58398 9.50065C1.58398 13.873 5.12828 17.4173 9.50065 17.4173Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                              <path d="M10.6875 13.0625L7.125 9.5L10.6875 5.9375" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="h-full">Notifications</span>
                          </div>
                        </li> */}

                        {/* Notifications List */}
                        <li className="p-3">
                          <div className="notifications-list">
                            <UserNotificationsForHamburger />
                          </div>
                        </li>
                      </ul>
                    </div>
                    

                  )}

                  {menuData[1].map((item, index) => (
                    <li key={`${item.nav}_${index}`}>
                      <div className="flex justify-between w-full py-1"
                        style={{ padding: '10px 0 5px 0.25rem' }}>
                        <div
                          onClick={() => {

                            if (item.label === "Logout") {
                              handleLogout();
                            } else if (menuData[2][item.label]) {
                              handleMenuChange(item.label);
                            } else {
                              closeMenu();
                              navigate(item.nav);
                            }
                          }}
                          className={`flex flex-row gap-x-3 justify-${item?.nav ? "start" : "end"
                            } items-center w-full`}
                        >
                          <div>{item.icon && item.icon()}</div>
                          <span>{item.label}</span>
                        </div>
                        {menuData[2][item.label] && <ChevronRight size={20} />}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Sub-menu */}
            <div
              className={`mobile_menu-content ${activeMenu !== "main" ? "active" : ""
                }`}
            >
              <ul className="mobile_menu card-bg-dev min-h-full w-full text-white">
                {userData ? (
                  <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row justify-between items-center flex-nowrap">
                    <div
                      className="flex gap-3 items-center"
                      // onClick={() => { closeMenu(); handleMenuChange("main") }}
                      onClick={() => handleMenuChange("main")}

                    >
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.50065 17.4173C13.873 17.4173 17.4173 13.873 17.4173 9.50065C17.4173 5.12828 13.873 1.58398 9.50065 1.58398C5.12828 1.58398 1.58398 5.12828 1.58398 9.50065C1.58398 13.873 5.12828 17.4173 9.50065 17.4173Z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                        <path d="M10.6875 13.0625L7.125 9.5L10.6875 5.9375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <span className='h-full'>Menu</span>
                    </div>
                  </li>
                ) : (
                  <li className="border-b border-b-[#FFFFFF1C] p-3 flex flex-row items-center flex-nowrap">
                    <div
                      className="h-[70px] flex flex-row gap-x-3 w-full items-center"
                      onClick={() => handleMenuChange("main")}
                    // onClick={() => { closeMenu(); handleMenuChange("main") }}
                    >
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.50065 17.4173C13.873 17.4173 17.4173 13.873 17.4173 9.50065C17.4173 5.12828 13.873 1.58398 9.50065 1.58398C5.12828 1.58398 1.58398 5.12828 1.58398 9.50065C1.58398 13.873 5.12828 17.4173 9.50065 17.4173Z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                        <path d="M10.6875 13.0625L7.125 9.5L10.6875 5.9375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Menu
                    </div>
                  </li>
                )}

                {menuData[2][activeMenu]?.map((item, index) => (
                  <li key={item.nav + '_' + index}>
                    <div className="flex justify-between w-full py-1">
                      <div
                        onClick={() => {
                          const drawerElement = document.getElementById("my-drawer-4") as HTMLInputElement | null;
                          if (drawerElement) {
                            drawerElement.checked = false;
                          }
                          setActiveMenu('main')
                          closeMenu();
                          navigate(item.nav)
                        }}
                        className={`flex flex-row gap-x-3 justify-${item?.nav ? 'start w-full' : 'end'
                          } items-center `}
                      >
                        <div>{item.icon()}</div>
                        <span className="">{item.label}</span>
                      </div>
                    </div>
                  </li>

                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

    </div>
  );
};

export default HamburgerMenu;