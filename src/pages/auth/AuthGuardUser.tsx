import { Navigate, useLocation } from 'react-router-dom';
import { decodeToken, getTokenFromCookies } from '../../hooks/common.utils';
import { toast } from 'react-toastify';

const AuthGuardUser = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const token: any = getTokenFromCookies();

  

    const decodedToken = decodeToken(token);
    const userRole = decodedToken?.role; 

    // Restrict dev routes to developers only
    if (location.pathname.startsWith('/explore') && userRole !== 'user') {
        return <Navigate to="/dev/dashboard" />;
    }

    return children;
};


export default AuthGuardUser