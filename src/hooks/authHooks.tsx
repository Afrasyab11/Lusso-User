import { useNavigate } from "react-router-dom";
import { getTokenFromCookies } from "./common.utils";

interface AuthCheckProps {
  checkAuth: () => void;
}

const useAuthCheck = (): AuthCheckProps => {
  const navigate = useNavigate();

  const checkAuth = () => {
    if (localStorage.getItem("isAuthenticated") === null) {
      // navigate("/");
    }
  };

  return { checkAuth };
};


const useCookieCheck = () => {
  const token = getTokenFromCookies();
  if (!token) {
    return false
  } else return true

};
export { useAuthCheck, useCookieCheck };

