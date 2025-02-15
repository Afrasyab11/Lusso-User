import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconEye from '../../assets/icons/eye';
import Logo from '../../assets/images/LussoAiLogo.svg';
import MobileLogo from '../../assets/images/LussoLogovert.svg';
import BecomeCreatorButton from '../../components/common/BecomeCreatorBtn';
import { apiEndpoints } from '../../constants/api-endpoints';
import useEncryptionHook from '../../hooks/useEncryption';
import useSearchParam from '../../hooks/useSearchParam';
import makeApiCall from '../../lib/apiCall';
import { checkNullOrEmpty, getCookies, setCookies } from '../../utils/utils';
import './auth.scss';

interface JwtPayload {
  role: string;
}

const AccountLogin = () => {
  const navigate = useNavigate();
  const { value: redirectRoute } = useSearchParam('redirect')
  const { encrypt } = useEncryptionHook()


  const [userName, setUserName]: any = useState();
  const [password, setPassword]: any = useState();
  const [invalidField, setInvalidField]: any = useState('');
  const [invalidError, setInvalidError]: any = useState('');
  const [isLoading, setIsLoading]: any = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    if (!validateFields()) return;
    // if(userName === 'admin.lussolabs@gmail.com' && password === 'AZaz09$$') {
    //   navigate("/dev/dashboard");
    // }

    const encryptedPassword = encrypt(password);
    // alert(encryptedPassword)

    setIsLoading(true);
    let apiRequest = {
      email: userName,
      // password,
      password: encryptedPassword,
    };
    axios
      .post('https://api.lusso.dev/api/v1/login', apiRequest)
      .then(async (response) => {
        let authToken = response.data?.token;
        setCookies('authToken', authToken);
        if (response.data.isNewUser) {
          navigate('/verify');
        } else {
          let token = getCookies('authToken');
          if (token) {
            const loggedinUser = await makeApiCall(apiEndpoints.userProfile)
            // const payload = jwtDecode<JwtPayload>(token);
            setCookies('authUser', loggedinUser);

            if (loggedinUser?.type === 'user') {
              if (redirectRoute && !checkNullOrEmpty(redirectRoute)) {
                navigate(redirectRoute)
              } else {
                navigate('/explore');
              }
            } else if (loggedinUser?.type === 'developer') {
              // let isSubscribed = Cookies.get('subscription');
              if (!checkNullOrEmpty(loggedinUser?.analyticsId)) {
                navigate('/dev/dashboard');
              } else {
                navigate('/subscribe');
              }
            }
          }
        }
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
        setInvalidField('credserror');
      });

  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    handleLogin();
  };

  const isWebView = window.innerWidth >= 768;
  const validateFields = () => {
    if (
      !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(
        userName,
      )
    ) {
      setInvalidField('credserror');
      return false;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      )
    ) {
      setInvalidField('credserror');
      return false;
    }
    return true;
  };
  useEffect(() => {
    localStorage.removeItem('isAuthenticated');
  }, []);
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full m-auto clearfix font-Jakarta-sans h-100 vh-100 flex items-center justify-center login-container login-banner">
        <div
          className="noMobile flex flex-1 items-end justify-end"
          style={{ height: '100vh' }}
        >
          {/* <img src={LoginBannerSlide} alt="Banner" /> */}
          <div
            className="flex flex-1 justify-center uppercase font-bold"
            style={{
              letterSpacing: 12,
              fontSize: '2.5rem',
              paddingBottom: '30px',
              paddingRight: '50px',
              position: 'relative',
            }}
          >
            <span className="text-white" style={{ fontSize: '2rem' }}>
              {' '}
              {/* Increased font size */}
              <span style={{ fontSize: '2rem' }}>EXPLORING</span> <br />
              <span style={{ fontSize: '2rem' }}>THE WORLD OF</span> <br />
              <span style={{ fontSize: '3rem' }} className="text-[#0FF] font-bold">
                LUSSO
              </span>{' '}
              <br />
              <span style={{ fontSize: '3rem' }}>UNIVERSE</span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between login-container-right">
          <div
            className="auth-top-container w-full flex flex-row justify-between items-center"
            style={{
              marginBottom: isWebView ? '80px' : '',
            }}
          >
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: isWebView ? 'center' : '',
                  marginBottom: isWebView ? '0px' : '16px',
                }}
              >
                <img
                  src={isMobile ? MobileLogo : Logo}
                  alt="Logo"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </Link>

            <div className="auth-become-creator">

              <BecomeCreatorButton />
            </div>
          </div>


          <div>
            {/* <img className="mb-12" style={{height:70}} src={Logo} alt="Logo" /> */}
            <div className="auth-create-acc-title w-full flex flex-col justify-center items-start mt-5">
              <h2 className="text-[#00FFFF] text-[20px] font-bold  text-left">
                Hello
              </h2>
              <h2
                className="text-white text-[20px]  text-left"
                style={{ letterSpacing: '0.3em' }}
              >
                Welcome<span style={{ marginLeft: '0.5rem' }}>back!</span>
              </h2>

              <p className="text-white/70 text-sm font-light text-left mb-8">
                Please enter your details to Log In
              </p>

            </div>

            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-6">
                <div>
                  <label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your email"
                      className="ac-frm-input rounded-pill badge h-[50px]"
                      value={userName || ''}
                      style={{
                        borderRadius: 50,
                        border: `1px solid ${invalidField === 'credserror' ? '#F04438' : 'rgb(137 108 255 / 80%)'}`,
                        background: 'rgba(46, 36, 108, 0.1)',
                        color: '#fff',
                      }}
                      onChange={e => {
                        setInvalidField('');
                        setUserName(e.target.value);
                      }}
                    />
                  </label>
                  <div>
                    {invalidField === 'credserror' && (
                      <span className="errorField">Please enter a valid email address</span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="off"
                      placeholder="Enter your password"
                      className="ac-frm-input h-[50px] pl-12 pr-12"
                      value={password || ''}
                      style={{
                        borderRadius: 50,
                        border: `1px solid ${invalidField === 'credserror' ? '#F04438' : 'rgb(137 108 255 / 80%)'}`, // Border color with 80% opacity
                        background: 'rgba(46, 36, 108, 0.1)',
                        color: '#fff',
                      }}
                      onChange={e => {
                        setInvalidField('');
                        setPassword(e.target.value);
                      }}
                    />
                  </label>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    style={{ zIndex: 10 }}
                  >
                    <IconEye color={showPassword ? "#A768FD" : "#888"} />
                  </span>
                  <div className="absolute bottom-[-20px] w-full">
                    {' '}
                    {/* Position error message below the input */}
                    {invalidField === 'credserror' && (
                      <span className="text-red-500 text-xs">Please enter a valid password</span>
                    )}
                  </div>
                </div>

              </div>

              <div className="w-full text-right mt-1.5">
                <Link
                  to="/forgot"
                  style={{ color: '#5E91FF', fontWeight: 'bold' }}
                  className="text-sm"
                >
                  Forgot Password
                </Link>
              </div>


              <button
                type="submit"
                className="ac-login-btn mt-6"
                style={{
                  borderRadius: 50,
                  border: 'none',
                  background: !isLoading
                    ? 'linear-gradient(178deg, #4300bd 6.78%, #792fff 46.97%, #ff77b0 98.12%)'
                    : '',
                  textTransform: 'capitalize',
                  paddingLeft: 50,
                  paddingRight: 50,
                  position: 'relative',
                }}
                disabled={isLoading}
              >
                {isLoading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                    }}
                  >
                    {/* Add your loader component here */}
                    <div className="loader"></div>
                  </div>
                )}
                {!isLoading ? 'Login' : ''}
              </button>
            </form>
            <div className="text-center text-base font-normal mt-16">
              <span className="text-white/50">
                Not yet part of the Lusso Community?
              </span>{' '}
              <Link
                to="/signup"
                className="text-[#5E91FF] font-bold hover:underline"
              >
                Sign up
              </Link>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountLogin;
