import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import postIcon from "../../assets/images/calender/createPost.png";
import analyticsIcon from '../../assets/images/products/icons/analytics.png';
import homeIcon from '../../assets/images/products/icons/home.png';
import productIcon from '../../assets/images/products/icons/product_details.png';
import profileIcon from '../../assets/images/products/icons/profile.png';
import settingIcon from '../../assets/images/products/icons/setting.png';
import subscriptionIcon from '../../assets/images/products/icons/subscription.png';
import SideBarLogo from '../../assets/images/re-lusso-logo.png';
import { useScroll } from '../../components/common/ScrollContext';
import { ICON_ENUM } from '../../constants/icons.constant';
import { ROUTES_ENUM } from '../../constants/routes.constant';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserSocialNetworks } from '../../redux/socialAnalytics/socialAnalyticSlice';
import { checkNullOrEmpty, getCookies } from '../../utils/utils';
import UserAvator from '../common/UserAvator';
import './SideBarNew.scss';

interface CategoryType {
  id: number;
  title: string;
  icon: string;
  activeIcon?: string;
  subCategories?: SubCategoryType[];
}

interface SubCategoryType {
  id: number;
  title: string;
  icon: string;
  addIcon?: boolean;
}

const catRoutes: {
  [key: number]: { parent: string; child?: { [key: number]: string } };
} = {
  1: { parent: '/dev/dashboard' },
  2: { parent: '/dev/allproducts' },
  3: { parent: '/dev/manageprofile' },
  4: { parent: '/dev/purchased' },
  5: { parent: '/dev/purchased' },
  6: { parent: '/dev/members' },
  7: {
    parent: '/dev/analytics',
    child: {
      201: '/dev/analytics/facebook',
      202: '/dev/analytics/instagram',
      203: ROUTES_ENUM.TWITTER,
      204: '/dev/analytics/tiktok',
      205: '/dev/analytics/youtube',
      206: '/dev/analytics/behance',
      207: '/dev/analytics/pinterest',
      208: '/dev/analytics/snapchat',
      209: '/dev/analytics/linkedin',
      210: '/dev/analytics/thread',
      211: ROUTES_ENUM.WEB,
      212: ROUTES_ENUM.GOOGLEBUSINESS,
    },
  },
  8: { parent: '/dev/settings' },
  9: { parent: '/dev/calender' },

}

const Sidebar = ({ shouldRefresh }: { shouldRefresh: string }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = location.pathname;

  const { connectedPlatforms } = useAppSelector(
    state => state?.socialAnalytics,
  );

  const { scrollToSection } = useScroll();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<number | null>(null);

  let categories: CategoryType[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: homeIcon,
    },
    {
      id: 2,
      title: 'My Product',
      icon: productIcon,
      // subCategories: [
      //   { id: 102, title: 'Apps', icon: appsIcon },
      //   { id: 101, title: 'Games', icon: gameIcon },
      //   { id: 103, title: 'Movies & TV', icon: moviesIcon },
      //   { id: 104, title: 'Content Creator', icon: contentIcon },
      //   { id: 105, title: 'Services', icon: servicesIcon },
      // ],
    },
    {
      id: 9,
      title: 'Create Post',
      icon: postIcon,
    },
    {
      id: 3,
      title: 'Manage Profile',
      icon: profileIcon,
    },
    // {
    //   id: 4,
    //   title: 'Product Details',
    //   icon: product_detailIcon,
    // },
    {
      id: 5,
      title: 'Subscription',
      icon: subscriptionIcon,
    },
    // {
    //   id: 6,
    //   title: 'Teams',
    //   icon: teamsIcon,
    // },
    {
      id: 7,
      title: 'Social Analytics',
      icon: analyticsIcon,
      subCategories: [
        { id: 201, title: 'Facebook', icon: ICON_ENUM?.FACEBOOK?.icon, addIcon: connectedPlatforms['facebook'] ? false : true },
        { id: 202, title: 'Instagram', icon: ICON_ENUM?.INSTAGRAM?.icon, addIcon: connectedPlatforms['instagram'] ? false : true },
        { id: 203, title: 'Twitter', icon: ICON_ENUM?.X?.icon, addIcon: connectedPlatforms['twitter'] ? false : true },
        // { id: 204, title: 'Tiktok', icon: ICON_ENUM?.TIKTOK?.icon },
        // { id: 205, title: 'Youtube', icon: ICON_ENUM?.YOUTUBE?.icon },
        // { id: 206, title: 'Behance', icon: ICON_ENUM?.BEHANCE?.icon },
        // {
        //   id: 207,
        //   title: 'Pinterest',
        //   icon: ICON_ENUM?.PINTEREST?.icon,
        //   addIcon: true,
        // },
        // {
        //   id: 208,
        //   title: 'SnapChat',
        //   icon: ICON_ENUM?.SNAPCHAT?.icon,
        //   addIcon: true,
        // },
        {
          id: 209,
          title: 'LinkedIn',
          icon: ICON_ENUM?.LINKEDIN?.icon,
          addIcon: connectedPlatforms['linkedin'] ? false : true,
        },
        // {
        //   id: 210,
        //   title: 'Thread',
        //   icon: ICON_ENUM?.THREAD?.icon,
        //   addIcon: true,
        // },
        // { id: 211, title: 'Web', icon: ICON_ENUM?.WEB?.icon, addIcon: connectedPlatforms['web'] ? false : true },
        // { id: 212, title: 'Google Bussiness', icon: ICON_ENUM?.GOOGLEBUSINESS?.icon, addIcon: connectedPlatforms['gmb'] ? false : true },
      ],
    },
    {
      id: 8,
      title: 'Settings',
      icon: settingIcon,
    },
  ];

  const isMobile = () => window.innerWidth < 768;

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
    const handleResize = () => setIsMobileDevice(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      console.log('Sidebar refreshed');
      if (shouldRefresh === 'addproduct') {
        setActiveTab(2);
      } else if (shouldRefresh === 'manageprofile') {
        setActiveTab(3);
      } else if (shouldRefresh === 'settings') {
        setActiveTab(8);
      }
    }
  }, [shouldRefresh]);
  // Replace token and payload mock with actual logic
  const token = 'token';
  const user = getCookies('authUser');

  useEffect(() => {

    if (token) {
      if (user?.type === 'developer') {
        dispatch(getUserSocialNetworks())
      }
      checkActiveRoute();
    }
  }, []);

  useEffect(() => {
    if (currentRoute === '/dev/dashboard') {
      setActiveTab(1)
    }
  }, [currentRoute])

  const checkActiveRoute = (): void => {
    Object.entries(catRoutes).forEach(([key, value]) => {
      const parentId = Number(key);

      // Check if the current route matches the parent route
      // if (value.parent === currentRoute) {
      //   setActiveTab(parentId);
      // }
      if (currentRoute.startsWith(value.parent)) {
        setActiveTab(parentId);
      }

      // Check if the current route matches any child routes
      if (value.child) {
        Object.entries(value.child).forEach(([childKey, childValue]) => {
          if (childValue === currentRoute) {
            setActiveTab(parentId);
            setActiveSubTab(Number(childKey));
          }
        });
      }
    });
  };

  const handleSubCategoryAction = (id: number, parent: number = 0) => {
    if (id === 101) {
      scrollToSection('games');
      setActiveSubTab(id);
    } else if (id === 102) {
      scrollToSection('apps');
      setActiveSubTab(id);
    } else if (id === 103) {
      scrollToSection('movies');
      setActiveSubTab(id);
    } else if (id === 104) {
      scrollToSection('courses');
      setActiveSubTab(id);
    } else if (id === 105) {
      scrollToSection('services');
      setActiveSubTab(id);
    } else {
      const redirectRoute = catRoutes?.[parent]?.child?.[id] ?? '';
      if (!checkNullOrEmpty(redirectRoute)) {
        setActiveTab(parent);
        setActiveSubTab(id);
        navigate(redirectRoute);
      }
    }
  };

  const ToggleTab = (id: number) => {
    if (!checkNullOrEmpty(catRoutes[id]?.parent)) {
      setActiveTab(id);
      setActiveSubTab(null);
      navigate(catRoutes[id]?.parent);
    }
  };

  // const navigateOnAnalyticPlatform = (platform: string) => {
  //   if (checkNullOrEmpty(platform)) return;
  //   let platformUpper = platform.toUpperCase()
  //   const socialMediaLink = ROUTES_ENUM[platformUpper as keyof typeof ROUTES_ENUM];
  //   if (checkNullOrEmpty(socialMediaLink)) return;
  //   navigate(socialMediaLink)
  // }
  const currentPath = location.pathname;

  const handleLogout = () => {
    document.cookie = "authToken=; path=/;";
    if (currentPath === '/') {
      window.location.reload()
    } else {
      navigate('/')
    }
  }
  return (
    <div
      className="sidenav-bg-shadow side-nav-container float-left flex flex-col gap-y-9"
      style={{ maxWidth: 'fit-content', overflow: 'auto' }}
    >
      <div className="px-5 py-5">
        <div className="mb-5 px-3">
          <img className="w-52 cursor-pointer" src={SideBarLogo} alt="lusso-logo" onClick={() => ToggleTab(1)} />
        </div>
        <div className="flex flex-col gap-2">
          {user?.type === 'developer' && isMobileDevice ?
            <div
              onClick={handleLogout}
              className={`flex flex-row gap-x-2 justify-start items-center category-card`}
            >
              {/* <div> */}
              <LogOut color='white' />
              {/* <img className="w-5" src={category.icon} alt="" /> */}
              {/* </div> */}
              <div>
                <p
                  className="text-[15px] font-medium text-white"
                // style={{
                //   color:
                //     'var(--4, #00F0FB)',
                // }}
                >
                  Log out
                </p>
              </div>
            </div> :
            categories?.map(category => (
              <div key={category.id}>
                <div
                  onClick={() => ToggleTab(category.id)}
                  className={`flex flex-row gap-x-2 justify-start items-center ${activeTab === category.id
                    ? 'category-card-active-sharp'
                    : 'category-card'
                    }`}
                >
                  <div>
                    <img className="w-5" src={category.icon} alt="" />
                  </div>
                  <div>
                    <p
                      className="text-[15px] font-medium text-white"
                      style={{
                        color:
                          activeTab === category.id ? 'var(--4, #00F0FB)' : '',
                      }}
                    >
                      {category.title}
                    </p>
                  </div>
                </div>
                {activeTab === category.id && category.subCategories && (
                  <div style={{ paddingLeft: 16 }}>
                    {category.subCategories.map(subCategory => (
                      <div
                        key={subCategory.id}
                        onClick={() => {
                          handleSubCategoryAction(subCategory.id, category?.id);
                          // navigateOnAnalyticPlatform(subCategory.title)
                        }}
                        className={`flex flex-row gap-x-2 justify-between items-center ${activeSubTab === subCategory.id
                          ? 'category-card-active-sharp'
                          : 'category-card'
                          }`}
                      >
                        <div className="flex flex-row gap-x-2 justify-start items-center">
                          <div>
                            <img className="w-5" src={subCategory.icon} alt="" />
                          </div>
                          <div>
                            <p
                              className="text-[15px] font-medium text-white"
                              style={{
                                color:
                                  activeSubTab === subCategory.id
                                    ? 'var(--4, #00F0FB)'
                                    : '',
                              }}
                            >
                              {subCategory.title}
                            </p>
                          </div>
                        </div>
                        {subCategory.addIcon ?
                          // <a href='https://app.metricool.com/socialConnection?blogId=4065887&userId=2241311&userToken=TOLZVGNZXBNYVWVSPOHWDRFOHTEZBQBVLRJMLAMETVYHCNIFYNFQYSRDKQHWHDCP&from=linkedin' target="_parent">
                          // <img className="w-5" src={ICON_ENUM?.PLUS_WITH_CIRCLE?.icon ?? ''} alt="" />
                          <img
                            className="w-5"
                            src={ICON_ENUM?.PLUS_WITH_CIRCLE?.icon ?? ''}
                            alt=""
                          // onClick={() => addSocialPlatform(subCategory.title)}
                          />
                          : <UserAvator className="object-contain rounded-full h-5" />
                          // </a>
                        }
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
