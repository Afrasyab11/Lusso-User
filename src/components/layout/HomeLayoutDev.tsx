import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiEndpoints } from '../../constants/api-endpoints';
import { ROUTES_ENUM } from '../../constants/routes.constant';
import makeApiCall from '../../lib/apiCall';
import { checkNullOrEmpty, getCookies } from '../../utils/utils';
import AlertPopup from '../common/AlertPopup';
import { ScrollProvider } from '../common/ScrollContext';
import Sidebar from '../sidebar/SideBarNew';
import TopBar from '../topbar/TopBar';

const HomeLayout = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [devAuthentication, setDevAuthentication] = useState({
    popup: false,
    message: '',
    redirect: '',
  });

  let refreshTab = '';

  if (location.pathname.includes('/addproduct')) {
    refreshTab = 'addproducts';
  }
  if (location.pathname.includes('/manageprofile')) {
    refreshTab = 'manageprofile';
  }
  location.pathname.includes('/manageprofile');

  useEffect(() => {
    getCurrentPlan()
  }, [navigate])

  const getCurrentPlan = async () => {
    const user = await getCookies('authUser');

    let payload = { ...apiEndpoints.getCurrentPackage }
    payload.endpoint = payload.endpoint + '?customerId=' + user?.userId
    let resp = await makeApiCall(payload);

    if (checkNullOrEmpty(resp)) {
      navigate(ROUTES_ENUM.CREATOR_SUBSCRIBE);
    } else if (checkNullOrEmpty(user?.analyticsId)) {
      navigate(ROUTES_ENUM.CREATOR_PROFILE);
    }

  }

  // init
  // useEffect(() => {
  //   const authToken = getCookies('authToken');
  //   const authUser = getCookies('authUser');

  //   if (authToken && authUser) {
  //     if (authUser?.type === 'developer') {
  //       if (checkNullOrEmpty(authUser?.analyticsId)) {
  //         setDevAuthentication({
  //           popup: true,
  //           message: 'Please enable creator subcription',
  //           redirect: '/subscribe',
  //         });
  //       }
  //     } else {
  //       setDevAuthentication({
  //         popup: true,
  //         message: 'Please login with creator account',
  //         redirect: '/login',
  //       });
  //     }
  //   } else {
  //     navigate('/login');
  //   }
  // }, []);


  // render
  return (
    <ScrollProvider>
      <div className="h-screen" style={{ display: 'flex' }}>
        <AlertPopup open={devAuthentication.popup} message={devAuthentication.message} onClose={() => {
          setDevAuthentication({ popup: false, message: '', redirect: '' })
          navigate(devAuthentication.redirect)
        }} />
        <Sidebar shouldRefresh={refreshTab} />
        <TopBar />
      </div>
    </ScrollProvider>
  );
};

export default HomeLayout;
