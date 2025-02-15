import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import './assets/css/custom.scss';
import AuthLayout from './components/layout/AuthLayout';
import HomeLayoutDev from './components/layout/HomeLayoutDev';
import HomeLayoutNew from "./components/layout/HomeLayoutNew";
import PrivateLayout from './components/layout/PrivateLayout';
import PublicLayout from './components/layout/PublicLayout';
import TopNavBar from "./components/navbar/TopNavBar";
import TopNavLandingPage from "./components/navbar/TopNavLandingPage";
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPanel from './pages/admin/AdminPanel';
import AskLusso from './pages/ask-lusso/AskLusso';
import AccountLogin from './pages/auth/AccountLogin';
import AccountSignup from './pages/auth/AccountSignup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Subscription from './pages/auth/Subscription';
import VerifyMail from './pages/auth/VerifyMail';
import AppDetails from './pages/dashboard/AppDetails';
import AppDetailsGoNextLevel from './pages/dashboard/AppDetailsGoNextLevel';
import AppDetailsLusso from './pages/dashboard/AppDetailsLusso';
import AppDetailsNetflix from './pages/dashboard/AppDetailsNetflix';
import Dashboard from './pages/dashboard/Dashboard';
import AccountCreationSuccess from "./pages/developer/AccountCreationSuccess";
import AddProduct from './pages/developer/AddProduct';
import AllProducts from './pages/developer/AllProducts';
import DashBoard, {
  default as CreatorDashboard,
} from './pages/developer/DashBoard';
import DeveloperDashboard from './pages/developer/DeveloperDashboard';
import DeveloperOnboard from './pages/developer/DeveloperOnboard';
import WithoutSubscriptionScreen from './pages/developer/NoSubscription';
import PricingScreen from './pages/developer/PricingScreen';
import ProductDetails from './pages/developer/ProductDetails';
import ProductList from './pages/developer/ProductList';
import Profile from './pages/developer/Profile';
import Purchased from './pages/developer/Purchased';

import React, { useState } from 'react';
import 'react-swipeable-list/dist/styles.css';
import { SessionProvider } from "./auth/SessionProvider";
import ErrorBoundary from "./components/ErrorBoundry";
import TopNavBarKids from "./components/navbar/TopNavBarKids";
import { EditModeProvider } from "./context/EditModeContext";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/aboutus";
import AuthGuard from "./pages/auth/AuthGuard";
import AuthGuardUser from "./pages/auth/AuthGuardUser";
import CalenderComp from './pages/calender/CalenderComp';
import PostView from "./pages/calender/PostView";
import Checkout from "./pages/checkout/Checkout.js";
import DashboardCreatorMobile from "./pages/developer/DashboardCreatorMobile";
import ViewAllProducts from './pages/developer/ViewAllProducts';
import CallbackEndpoint from "./pages/developer/callbackEndpoint/CallbackEndpoint";
import ManageProfile from "./pages/developer/manageProfile/ManageProfile";
import DeveloperOrgStepper from "./pages/developer/orgStepper/DeveloperOrgStepper";
import BehanceAnalytics from "./pages/developer/socialAnalytics/Components/BehanceAnalytics";
import FacebookAnalytics from "./pages/developer/socialAnalytics/Components/FacebookAnalytics";
import InstagramAnalytics from "./pages/developer/socialAnalytics/Components/InstagramAnalytics";
import LinkedinAnalytics from "./pages/developer/socialAnalytics/Components/LinkedinAnalytics";
import PinterestAnalytics from "./pages/developer/socialAnalytics/Components/PinterestAnalytics";
import SnapchatAnalytics from "./pages/developer/socialAnalytics/Components/SnapchatAnalytics";
import Thread from "./pages/developer/socialAnalytics/Components/Thread";
import TiktokAnalytics from "./pages/developer/socialAnalytics/Components/TiktokAnalytics";
import XAnalytics from "./pages/developer/socialAnalytics/Components/XAnalytics";
import YoutubeAnalytics from "./pages/developer/socialAnalytics/Components/YoutubeAnalytics";
import SocialAnalytics from "./pages/developer/socialAnalytics/index";
import ExploreAll from "./pages/explore/ExploreAll";
import NewHomepage from "./pages/explore/NewHomepage";
import AiDetailsScreen from "./pages/explore/categoryDetails/AiDetailsScreen";
import GameDetailsScreen from "./pages/explore/categoryDetails/GameDetailsScreen";
import ServiceDetailsScreen from "./pages/explore/categoryDetails/ServiceDetailsScreen";
import AppDetailsComponent from "./pages/explore/categoryDetails/appDetails";
import CourseDetailsScreen from "./pages/explore/courses/CourseDetail";
import MovieDetailsScreen from "./pages/explore/movieDetails/MovieDetailsScreen";
import FeatureAi from "./pages/features/FeatureAi";
import FeatureApps from "./pages/features/FeatureApps";
import FeatureCourses from "./pages/features/FeatureCourses";
import FeatureGames from "./pages/features/FeatureGames";
import FeatureMovies from "./pages/features/FeatureMovies";
import FeatureServices from "./pages/features/FeatureServices";
import Explore from './pages/home/Explore';
import HomeExplore from "./pages/home/HomeExplore";
import Kids from "./pages/home/Kids";
import ViewAllCategory from './pages/home/ViewAllCategory';
import ContactUs from "./pages/home/constctUs/ContactUs";
import HomePricingComp from "./pages/home/pricing/PricingComp";
import Home from './pages/landingPage/Home';
import AddMember from './pages/members/AddMember';
import AllMembers from "./pages/members/AllMembers";
import CreatorDetails from './pages/members/CreatorDetails';
import NewProductDetails from './pages/products/NewProductDetails';
import ViewProductDetails from './pages/products/ViewProductDetails';
import Settings from './pages/settings/settings';
import UserProfile from "./pages/userProfile/UserProfile";
import WishList from "./pages/wishList/WishList";
import ReactQueryProvider from './providers/ReactQueryProvider';
Chart.register(CategoryScale)
const InternetStatus: React.FC = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '10px',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      Check your internet connection!
    </div>
  );
};


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state to show main application content
  };
  return (
    <div>
      {/* {!isLoggedIn && <Popup onLoginSuccess={handleLoginSuccess} />} */}
      {/* {isLoggedIn && ( */}
      <ReactQueryProvider>
        <ErrorBoundary>
          <InternetStatus />
          <BrowserRouter>
            <SessionProvider>
              <EditModeProvider>
                <Routes>
                  <Route path="/join-waitlist" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                  </Route>
                  <Route path="/callbackEndpoint" element={<CallbackEndpoint />} />
                  <Route path="subscribe" element={<PricingScreen />} />
                  <Route />
                  <Route path="/" element={<TopNavLandingPage />}>
                    <Route index element={<Home />} />
                    <Route path="pricing" element={<HomePricingComp />} />
                    <Route path="contact" element={<ContactUs />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="checkout" element={<Checkout />} />
                  </Route>

                  <Route path="/" element={<TopNavBar />}>
                    <Route path="wishList" element={<WishList />} />
                  </Route>

                  <Route path="/userProfile" element={
                    <AuthGuardUser>
                      <TopNavBar />
                    </AuthGuardUser>
                  }>
                    <Route index element={<UserProfile />} />
                  </Route>

                  <Route path="/" element={<TopNavBarKids />}>
                    <Route path="Kids" element={<Kids />} />
                  </Route>
                  <Route path="/" element={
                    <AuthGuardUser>
                      <TopNavBar isHome={false} />
                    </AuthGuardUser>
                  }>
                    <Route path="explore" element={<NewHomepage />} />

                    {/* -------------- OLD Paths -------------- */}
                    {/* <Route path="explore/ai-products" element={<NewHomepage section="aiRef" />} />
                    <Route path="explore/apps" element={<NewHomepage section="apps" />} />
                    <Route path="explore/games" element={<NewHomepage section="games" />} />
                    <Route path="explore/movies-tvs" element={<NewHomepage section="movies-tvs" />} />
                    <Route path="explore/courses" element={<NewHomepage section="courses" />} />
                    <Route path="explore/services" element={<NewHomepage section="services" />} /> */}
                    <Route path="newproductdetails/:productId" element={<NewProductDetails />} />
                  </Route>
                  {/* -------------- New Feature Paths -------------- */}
                  <Route path="/explore/ai-products" element={<FeatureAi />} />
                  <Route path="/explore/apps" element={<FeatureApps />} />
                  <Route path="/explore/games" element={<FeatureGames />} />
                  <Route path="/explore/movies-tvs" element={<FeatureMovies />} />
                  <Route path="/explore/courses" element={<FeatureCourses />} />
                  <Route path="/explore/services" element={<FeatureServices />} />

                  {/* Explore Routes */}
                  <Route path="/explore" element={
                    <AuthGuardUser>
                      <HomeLayoutNew />
                    </AuthGuardUser>}>
                    <Route path="courses" element={<HomeExplore />} />
                    <Route path="services" element={<HomeExplore />} />
                    <Route path="apps/:id" element={<ExploreAll />} />
                    <Route path="services/:id" element={<ExploreAll />} />
                    <Route path="courses/:id" element={<ExploreAll />} />
                    <Route path="games/:id" element={<ExploreAll />} />
                    <Route path="ai/:id" element={<ExploreAll />} />
                    <Route path="movies/:id" element={<ExploreAll />} />
                  </Route>

                  {/* Category details Routes */}
                  <Route path="/explore" element={
                    <AuthGuardUser>
                      <TopNavBar isHome={false} />
                    </AuthGuardUser>
                  }>
                    <Route path="games/details/:id" element={<GameDetailsScreen />} />
                    <Route path="services/details/:id" element={<ServiceDetailsScreen />} />
                    <Route path="apps/details/:id" element={<AppDetailsComponent />} />
                    <Route path="ai/details/:id" element={<AiDetailsScreen />} />
                    <Route path="movies/details/:id" element={<MovieDetailsScreen />} />
                    <Route path="courses/details/:id" element={<CourseDetailsScreen />} />
                  </Route>

                  <Route path="/dev" element={
                    <AuthGuard>
                      <HomeLayoutDev />
                    </AuthGuard>
                  }
                  >
                    <Route path="no-subscription" element={<WithoutSubscriptionScreen />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="editproduct/:productId" element={<AddProduct />} />

                    <Route path="preview/game/:id" element={<GameDetailsScreen isCreator={true} />} />
                    <Route path="preview/service/:id" element={<ServiceDetailsScreen isCreator={true} />} />
                    <Route path="preview/app/:id" element={<AppDetailsComponent isCreator={true} />} />
                    <Route path="preview/ai_products/:id" element={<AiDetailsScreen isCreator={true} />} />
                    <Route path="preview/movie/:id" element={<MovieDetailsScreen isCreator={true} />} />
                    <Route path="preview/course/:id" element={<CourseDetailsScreen isCreator={true} />} />

                    {/* <Route path="editproduct/:productId" element={<EditProduct />} /> */}
                    <Route path="allproducts" element={<ProductList />} />
                    <Route path="pricing" element={<PricingScreen />} />
                    <Route path="purchased" element={<Purchased />} />
                    <Route path="analytics" element={<SocialAnalytics />} />
                    <Route path="analytics/facebook" element={<FacebookAnalytics />} />
                    {/* <Route path="analytics/googlebusiness" element={<GoogleBusinessAnalytics />} /> */}
                    <Route path="analytics/instagram" element={<InstagramAnalytics />} />
                    <Route path="analytics/twitter" element={<XAnalytics />} />
                    <Route path="analytics/tiktok" element={<TiktokAnalytics />} />
                    <Route path="analytics/youtube" element={<YoutubeAnalytics />} />
                    <Route path="analytics/behance" element={<BehanceAnalytics />} />
                    <Route path="analytics/pinterest" element={<PinterestAnalytics />} />
                    <Route path="analytics/snapchat" element={<SnapchatAnalytics />} />
                    <Route path="analytics/linkedin" element={<LinkedinAnalytics />} />
                    {/* <Route path="analytics/web" element={<WebAnalytics />} /> */}
                    <Route path="analytics/thread" element={<Thread />} />
                    <Route path="profiletemp" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="explore/:productType" element={<ViewAllCategory />} />
                    <Route path="products" element={<ViewAllProducts />} />
                    <Route path="productdetails/:productId" element={<ViewProductDetails />} />
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="viewpost" element={<PostView />} />
                    <Route path="dashboard2" element={<DashboardCreatorMobile />} />
                    {/* <Route index element={<AllProducts />} /> */}
                    {/* </Route> */}
                    <Route path="dashboard/productdetails/:productId" element={<ProductDetails />} />
                    <Route path="manageprofile" element={<ManageProfile />}>
                      {/* <Route path="manageprofile" element={<CreatorDetails />}> */}
                      <Route index element={<AllProducts />} />
                      {/* <Route path="productdetails" element={<ProductDetails />}/> */}
                    </Route>
                    <Route path="calender" element={<CalenderComp />} />
                    <Route path="members" element={<AllMembers />} />
                    <Route path="addmember" element={<AddMember />} />
                  </Route>
                  {/* Login page at /login */}

                  <Route path="/login" element={<AccountLogin />} />

                  {/* Signup, Forgot Password, and other routes without /auth */}
                  <Route path="/signup" element={<AccountSignup />} />
                  <Route path="/forgot" element={<ForgotPassword />} />
                  <Route path="/verify" element={<VerifyMail />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="/devonboard" element={<DeveloperOnboard />} />
                  <Route path="/devonboard/stepper" element={<DeveloperOrgStepper />} />
                  <Route path="/devonboard/success" element={<AccountCreationSuccess />} />
                  <Route path="/" element={<PublicLayout />}>
                    {/* <Route index element={<AccountLogin />} />
            <Route path="signup" element={<AccountSignup />} /> */}
                    {/* <Route path="dev-onboard" element={<DeveloperOnboard />} /> */}
                    <Route
                      path="withoutsubscription"
                      element={<WithoutSubscriptionScreen />}
                    />
                    <Route path="creatordashboard" element={<CreatorDashboard />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="askLusso" element={<AskLusso />} />
                    <Route path="admindashboard" element={<AdminDashboard />} />
                    <Route path="adminpanel" element={<AdminPanel />} />
                    <Route path="devdashboard" element={<DeveloperDashboard />} />
                    <Route path="appdetails" element={<AppDetails />} />
                    <Route path="creatordetails" element={<CreatorDetails />} />
                    <Route path="dashboard" element={<Dashboard />} />

                    {/* <Route path="*" element={<NoPage />} /> */}
                  </Route>
                  <Route path="dashboard" element={<PrivateLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="details/2" element={<AppDetailsNetflix />} />
                    <Route path="details/3" element={<AppDetailsLusso />} />
                    <Route path="details/4" element={<AppDetailsGoNextLevel />} />
                    <Route path="details/5" element={<AppDetailsGoNextLevel />} />
                    <Route path="details/6" element={<AppDetailsGoNextLevel />} />
                    <Route path="details/*" element={<AppDetails />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </EditModeProvider>
            </SessionProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </ReactQueryProvider >
      {/* )} */}
    </div>
  );
};

export default App;
