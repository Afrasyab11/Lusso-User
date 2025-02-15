import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES_ENUM } from '../../constants/routes.constant';
import { checkNullOrEmpty, getCookies } from '../../utils/utils';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const user = getCookies('authUser');

    // Restrict user routes to user only
    if (location.pathname.startsWith('/dev') && user?.type !== 'developer') {
        return <Navigate to="/explore" />;
    }

    const { businessCategory, channelName, email, phoneNumber, fullName, country, address, city, state, zipcode } = getCookies('authUser');
    // console.log("user analyticsId", user?.analyticsId)
    // if (!token) {
    //     toast.error('Please log in first', {
    //         position: 'top-right',
    //         autoClose: 3000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //     });
    //     return <Navigate to="/login" />;
    // }

    // const decodedToken = decodeToken(token);
    // const userRole = decodedToken?.role;
    // const user = getCookies('authUser');

    // if (!location.pathname.startsWith('/dev') && userRole !== 'developer') {
    //     return <Navigate to="/explore" />;
    // } else 


    if (
        (checkNullOrEmpty(businessCategory) || checkNullOrEmpty(channelName) || checkNullOrEmpty(email)
            || checkNullOrEmpty(phoneNumber) || checkNullOrEmpty(fullName) || checkNullOrEmpty(country)
            || checkNullOrEmpty(address) || checkNullOrEmpty(city) || checkNullOrEmpty(state) || checkNullOrEmpty(zipcode))
        &&
        !location.pathname.startsWith(ROUTES_ENUM.CREATOR_PROFILE)

    ) {
        return <Navigate to={ROUTES_ENUM.CREATOR_PROFILE} />;
    }

    // if (
    //     checkNullOrEmpty(user?.analyticsId) &&
    //     !location.pathname.startsWith(ROUTES_ENUM.CREATOR_PROFILE)
    // ) {
    //     return <Navigate to={ROUTES_ENUM.CREATOR_PROFILE} />;
    // }

    return children;
};

export default AuthGuard;
