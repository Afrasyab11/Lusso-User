import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/images/LussoAiLogo.svg';
import MobileLogo from '../../assets/images/LussoLogovert.svg';
import './auth.scss';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userName, setUserName]: any = useState();
  const [invalidField, setInvalidField]: any = useState('');
  const [invalidError, setInvalidError]: any = useState('');
  const [isLoading, setIsLoading]: any = useState('');
  const [emailSent, setEmailSent]: any = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const validateFields = () => {
    if (
      !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(
        userName,
      )
    ) {
      setInvalidField('credserror');
      return false;
    }
    return true;
  };
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    handleReset();
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleReset = () => {
    if (!validateFields()) return;
    setIsLoading(true);
    setTimeLeft(60);

    axios
      .post(
        'https://api.lusso.dev/api/v1/sendResetPasswordMail?email=' + userName,
      )
      .then(response => {
        console.log('response', response);
        setIsLoading(false);
        setEmailSent(true);
        // localStorage.setItem("isAuthenticated", JSON.stringify(true));
        // navigate('/auth/resetPassword');
        // navigate("/dev/dashboard");
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
        setInvalidField('credserror');
      });
  };

  useEffect(() => {
    // Exit early if we reach 0
    if (!timeLeft) return;

    // Create a timer to decrement timeLeft every second
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear timeout if the component is unmounted or timeLeft is 0
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    localStorage.removeItem('isAuthenticated');
  }, []);
  return (
    <div className="w-full">
      <div className="w-full m-auto clearfix font-Jakarta-sans h-100 vh-100 flex items-center justify-center login-container login-banner">
        <div
          className="noMobile flex flex-1 items-end justify-end"
          style={{height: '100vh'}}
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
            <span className="text-white" style={{fontSize: '2rem'}}>
              {' '}
              {/* Increased font size */}
              <span style={{fontSize: '2rem'}}>EXPLORING</span> <br />
              <span style={{fontSize: '2rem'}}>THE WORLD OF</span> <br />
              <span
                style={{fontSize: '3rem'}}
                className="text-[#0FF] font-bold"
              >
                LUSSO
              </span>{' '}
              <br />
              <span style={{fontSize: '3rem'}}>UNIVERSE</span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center login-container-right">
          <div
            className="w-full flex flex-row justify-center items-center mb-5"
            style={{width: '100%'}}
          >
            <div className="/static/media/logo.a9d97f8a67185525ef2619183873d79a.svg">
              <a href="/">
                <img
                  src={isMobile ? MobileLogo : Logo}
                  alt="Logo"
                  style={{width: '100%', height: 'auto'}} // Adjust size as needed
                />
              </a>
            </div>
          </div>
          <div>
            {/* <img className="mb-12" style={{height:70}} src={Logo} alt="Logo" /> */}
            <h2 className="text-white text-[24px] mb-1 text-center mt-7">
              Forgot Password
            </h2>
            {emailSent ? (
              <div>
                <p className="text-white/90 text-base font-normal text-left mb-8">
                  Email Sent Successfully!
                  <br></br>Please find the link to reset your password
                </p>
              </div>
            ) : (
              <>
                <p
                  className="text-white/90 text-base font-normal text-center mb-8"
                  style={{wordSpacing: '0.1em'}}
                >
                  We'll Send You A Link To Reset Your Password
                </p>

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
                            border: `1px solid ${
                              invalidField === 'credserror'
                                ? '#F04438'
                                : '#A768FD'
                            }`,
                            background: 'rgba(4, 4, 4, 0.20)',
                          }}
                          onChange={e => {
                            setInvalidField('');
                            setUserName(e.target.value);
                          }}
                        />
                      </label>
                      <div>
                        {invalidField === 'credserror' && (
                          <span className="errorField">
                            Invalid email address
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="ac-login-btn mt-5"
                    style={{
                      borderRadius: 50,
                      border: 'none',
                      background: !isLoading
                        ? 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)'
                        : '',
                      textTransform: 'capitalize',
                      paddingLeft: 50,
                      paddingRight: 50,
                      position: 'relative',
                    }}
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
                    {!isLoading ? 'Reset Password' : ''}
                  </button>
                </form>
              </>
            )}
            <div className="flex flex-row items-center justify-center text-base font-normal mt-5 gap-4">
              <span className="text-white/50">
                Resend link in{' '}
                <em className="text-white font-bold not-italic">
                  00:{timeLeft}
                </em>
              </span>
              {timeLeft === 0 ? (
                <a
                  onClick={handleReset}
                  className="text-[#5E91FF] font-bold hover:underline"
                  style={{cursor: 'pointer'}}
                >
                  Resend Link
                </a>
              ) : (
                <a className="text-[#5E91FF] font-bold">Resend Link</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
