import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginPopup from '../components/popups/LoginPopup';
import { apiEndpoints } from '../constants/api-endpoints';
import { PROXY_USER, SESSION_KEYS } from '../constants/global.constants';
import { ROUTES_ENUM } from '../constants/routes.constant';
import useEncryptionHook from '../hooks/useEncryption';
import makeApiCall from '../lib/apiCall';
import { checkNullOrEmpty, getCookies, getSessionItem } from '../utils/utils';

interface SessionContextType {
    isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};

interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const { decrypt } = useEncryptionHook();
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [open, setOpen] = useState(false)

    let user = getCookies('authUser');
    let token = getCookies('authToken');

    // useEffect(() => {
    //     if (user?.type === "developer" && token) {
    //         if (location.pathname === "/dev") {
    //             navigate("/dev/dashboard", { replace: true });
    //         } else if (!location.pathname.startsWith("/dev")) {
    //             navigate("/dev/dashboard", { replace: true });
    //         }
    //     }
    //     // if (user?.type === "user" && token) {
    //     //     const allowedRoutes = ["/explore", "/userProfile", "/kids", "/subscribe", "/wishList"];
    //     //     if (!allowedRoutes.includes(location.pathname)) {
    //     //         navigate("/explore", { replace: true });
    //     //     }
    //     // }
    // }, [user, token, navigate, location]);

    useEffect(() => {
        checkProxyAuthorization()
        const checkLoginSession = async () => {
            try {
                const token = await getCookies('authToken');
                const user = await getCookies('authUser');

                if (!location.pathname.startsWith(ROUTES_ENUM.CREATOR_SOCIAL_CALLBACK)) {
                    if (token && user) {
                        if (
                            user?.type === 'developer' &&
                            !location.pathname.startsWith('/dev/')
                        ) {
                            if (!checkNullOrEmpty(user?.analyticsId)) {
                                navigate(ROUTES_ENUM.CREATOR_ROOT);
                            } else {
                                navigate(ROUTES_ENUM.CREATOR_SUBSCRIBE);
                            }
                        }
                    } else if (token) {
                        const loggedinUser = await makeApiCall(apiEndpoints.userProfile);
                        if (
                            loggedinUser?.type === 'developer' &&
                            !location.pathname.startsWith('/dev/')
                        ) {
                            if (!checkNullOrEmpty(loggedinUser?.analyticsId)) {
                                navigate(ROUTES_ENUM.CREATOR_ROOT);
                            } else {
                                navigate(ROUTES_ENUM.CREATOR_SUBSCRIBE);
                            }
                        }
                    }
                }

                setIsAuthenticated(!!token);
            } catch (error) {
                console.error('Error checking login session', error);
                navigate(ROUTES_ENUM.LOGIN);
            }
        };

        checkLoginSession();
    }, [location]);

    const checkProxyAuthorization = async () => {
        let loopBreak = false
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const plainKey = decrypt(key as string);

            if (plainKey === SESSION_KEYS.PROXY_AUTH) {
                const { password, expiresAt }: any = await JSON.parse(decrypt(getSessionItem(key)));
                if (password !== PROXY_USER.password || Date.now() > expiresAt) {
                    sessionStorage.removeItem(key as string)
                    setOpen(true)
                }
                loopBreak = true
                break;
            }
        }
        if (!loopBreak) {
            setOpen(true)
        }
        // else {
        //     document.addEventListener('visibilitychange', () => {
        //         if (document.visibilityState === 'visible') {
        //             sessionStorage.clear()
        //             setOpen(true)
        //         }
        //     });
        // }
    }

    return (
        <SessionContext.Provider value={{ isAuthenticated }}>
            {open &&
                <LoginPopup open={true} onClose={() => setOpen(!open)} />
            }
            {children}
        </SessionContext.Provider>
    );
};
