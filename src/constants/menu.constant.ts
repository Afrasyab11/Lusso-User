import {
  accountinformationSVG,
  accoutSecuritySVG,
  AI_Product_SVG,
  aiProductSVG,
  appSVG,
  categoriesSVG,
  courseSVG,
  gameSVG,
  homeSVG,
  loginSVG,
  logoutSVG,
  movieSVG,
  servicesSVG,
  settingSVG,
  subscriptionForHamburgerSVG
} from '../assets/icons/menu';

export const ENUM_EXPLORE = [
  {
    id: 1,
    title: 'Home',
    path: '/explore',
    icon: (width?: string, height?: string) => homeSVG(width, height),
    // activeIcon: DashBoardActiveIcon,
  },
  {
    id: 3,
    title: 'Categories',
    path: '/explore/manageprofile',
    icon: (width?: string, height?: string) => categoriesSVG(width, height),
    // activeIcon: ManageProfileActiveIcon,
    subCategories: [
      {
        id: 17,
        title: 'AI Products',
        path: '/explore#aiRef',
        icon: (width?: string, height?: string) => AI_Product_SVG(width, height),
      },
      {
        id: 12,
        title: 'Apps',
        path: '/explore#apps',
        icon: (width?: string, height?: string) => appSVG(width, height),
      },
      {
        id: 13,
        title: 'Games',
        path: '/explore#games',
        icon: (width?: string, height?: string) => gameSVG(width, height),
      },
      {
        id: 14,
        title: 'Movies',
        path: '/explore#movies-tvs',
        icon: (width?: string, height?: string) => movieSVG(width, height),
      },
      {
        id: 15,
        title: 'Courses',
        path: '/explore#courses',
        icon: (width?: string, height?: string) => courseSVG(width, height),
      },
      {
        id: 16,
        title: 'Services',
        path: '/explore#services',
        icon: (width?: string, height?: string) => servicesSVG(width, height),
      },
    ],
  },
  {
    id: 5,
    title: 'Account Information',
    path: '/userProfile',
    icon: (width?: string, height?: string) => accountinformationSVG(width, height),
    // activeIcon: ManageProfileActiveIcon,
  },
  // {
  //   id: 3,
  //   title: 'Manage Profile',
  //   path: '/explore/manageprofile',
  //   icon: (width?: string, height?: string) => manageProfileSVG(width, height),
  //   // activeIcon: ManageProfileActiveIcon,
  // },
  {
    id: 7,
    title: 'Subscription',
    path: '/subscribe',
    icon: (width?: string, height?: string) => subscriptionForHamburgerSVG(width, height),
  },
  {
    id: 9,
    title: 'Account Security',
    path: '/userProfile',
    icon: (width?: string, height?: string) => accoutSecuritySVG(width, height),
    // activeIcon: ManageProfileActiveIcon,

  },
  {
    id: 4,
    title: 'Settings',
    path: '/userProfile',
    icon: (width?: string, height?: string) => settingSVG(width, height),
  },
  // {
  //   id: 4,
  //   title: 'Settings',
  //   path: '/explore/settings',
  //   icon: (width?: string, height?: string) => settingSVG(width, height),
  // },
  {
    id: 6,
    title: 'Logout',
    isExit: true,
    icon: (width?: string, height?: string) => logoutSVG(width, height),
  },
];

export const ENUM_GUEST_MOBILE_MENU = [
  {
    id: 16,
    title: 'Home',
    path: '/',
    icon: (width?: string, height?: string) => appSVG(width, height),
  },
  {
    id: 101,
    title: 'Features',
    path: '/explore/games',
    icon: (width?: string, height?: string) => gameSVG(width, height),
    subCategories: [
      {
        id: 107,
        title: 'AI Products',
        path: '/explore/ai-products',
        icon: (width?: string, height?: string) => aiProductSVG(width, height),
      },
      {
        id: 102,
        title: 'Apps',
        path: '/explore/apps',
        icon: (width?: string, height?: string) => appSVG(width, height),
      },
      {
        id: 101,
        title: 'Games',
        path: '/explore/games',
        icon: (width?: string, height?: string) => gameSVG(width, height),
      },
      {
        id: 103,
        title: 'Movies',
        path: '/explore/movies-tvs',
        icon: (width?: string, height?: string) => movieSVG(width, height),
      },
      {
        id: 104,
        title: 'Courses',
        path: '/explore/courses',
        icon: (width?: string, height?: string) => courseSVG(width, height),
      },
      {
        id: 105,
        title: 'Services',
        path: '/explore/services',
        icon: (width?: string, height?: string) => servicesSVG(width, height),
      },
    ],

  },
  {
    id: 103,
    title: 'pricing',
    path: '/pricing',
    icon: (width?: string, height?: string) => movieSVG(width, height),
  },
  {
    id: 104,
    title: 'About Us',
    path: '/about',
    icon: (width?: string, height?: string) => courseSVG(width, height),
  },
  {
    id: 105,
    title: 'Contact Us',
    path: '/contact',
    icon: (width?: string, height?: string) => servicesSVG(width, height),
  },
  {
    id: 107,
    title: 'Kids',
    path: '/kids',
    icon: (width?: string, height?: string) => servicesSVG(width, height),
  },
  {
    id: 106,
    title: 'Sign In',
    path: '/login',
    icon: (width?: string, height?: string) => loginSVG(width, height),
  },
];
