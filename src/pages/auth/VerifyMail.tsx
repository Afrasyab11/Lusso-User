import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/LussoAiLogo.svg';
import MobileLogo from '../../assets/images/LussoLogovert.svg';
import DashBoardActiveIcon from '../../assets/images/dashboard-icon-active.svg';
import useEncryptionHook from '../../hooks/useEncryption';
import { getCookies } from '../../utils/utils';
import './auth.scss';
import { toast } from 'react-toastify';

interface JwtPayload {
  role: string;
  // Add other properties if needed
}

const VerifyMail = () => {
  const navigate = useNavigate();
  const { encrypt } = useEncryptionHook()

  const [userName, setUserName]: any = useState();
  const [invalidField, setInvalidField]: any = useState('');
  const [invalidError, setInvalidError]: any = useState('');
  const [isLoading, setIsLoading]: any = useState('');
  const [verified, setVerified]: any = useState(false);
  const [otp, setOTP] = useState<string[]>(Array(6).fill(''));
  const [isChecked, setIsChecked]: any = useState(false);
  const [clientMail, setClientMail]: any = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [errorMsg, setErrorMsg] = useState<any>();
  const [checkboxError, setCheckboxError] = useState<string | null>(null);

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value, selectionStart } = e.target;
    const newOTP = [...otp];

    if (/^[A-Za-z0-9]?$/.test(value)) {
      // Ensure input is valid
      newOTP[index] = value;
      setOTP(newOTP);

      // Move focus to the next input field if a character is entered
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }

    // Handle backspace
    if (value === '' && selectionStart === 0 && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        // Move focus to the previous input field
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const validateFields = () => {
    if (!otp.every(char => /^[A-Za-z0-9]{1}$/.test(char))) {
      // Updated regex
      setInvalidField('otperror');
      return false;
    }
    return true;
  };

  const [timeLeft, setTimeLeft] = useState<number>(60);



  useEffect(() => {
    // Function to check and update screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setCheckboxError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) {
      setCheckboxError("Please accept the terms of service and privacy policy to proceed.");
      return;
    }
    handleVerify();
  };

  const handleVerify = () => {
    if (!validateFields()) return;
    setCheckboxError(null);
    setIsLoading(true);
    let token = getCookies('authToken');

    let headers = {
      Authorization: `Bearer ${token}`,
    };

    const otpString = otp.join('');
    const encryptedOtp = encrypt(otpString)

    axios
      .post(
        'https://api.lusso.dev/api/v1/verifyEmail',
        { token: encryptedOtp },
        { headers: headers },
      )
      .then(response => {
        console.log('response', response);
        setIsLoading(false);
        Cookies.remove('email');
        setVerified(true);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
        setInvalidField('otperror');
      });
  };

  const clickContinue = () => {
    if (!isChecked) {
      setCheckboxError("Please accept the terms and conditions to continue.");
      return;
    }
    setCheckboxError(null);
    let token = getCookies('authToken');
    if (token) {
      const payload = jwtDecode<JwtPayload>(token);
      if (payload.role === 'user') {
        navigate('/explore');
      } else if (payload.role === 'developer') {
        let isSubscribed = Cookies.get('subscription');
        if (isSubscribed === 'yes') {
          navigate('/dev/dashboard');
        } else {
          navigate('/subscribe');
        }
      }
    }
  };

  const Resend = () => {
    let token = getCookies('authToken');
    if (!token) {
      navigate('/auth');
    }
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        'https://api.lusso.dev/api/v1/sendEmailVerification',
        {},
        { headers: headers },
      )
      .then(response => {
        console.log('response', response);
        setTimeLeft(60);
        setOTP(Array(6).fill(''));
        setInvalidField('');
      })
      .catch(error => {
        console.log('error', error);
      });
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
        // localStorage.setItem("isAuthenticated", JSON.stringify(true));
        navigate('/reset');
        // navigate("/dev/dashboard");
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
        setInvalidField('credserror');
      });
  };

  useEffect(() => {
    let clientMail = Cookies.get('email');
    if (clientMail) {
      setClientMail(clientMail);
    }
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
              <span
                style={{ fontSize: '3rem' }}
                className="text-[#0FF] font-bold"
              >
                LUSSO
              </span>{' '}
              <br />
              <span style={{ fontSize: '3rem' }}>UNIVERSE</span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center login-container-right">
          <div
            className="w-full flex flex-row justify-center items-center mb-5"
            style={{ width: '100%' }}
          >
            <div>
              <a href="/">
                <img
                  src={isMobile ? MobileLogo : Logo}
                  alt="Logo"
                  style={{ width: '100%', height: 'auto' }}
                />
              </a>
            </div>
          </div>
          {!verified ? (
            <div className="flex flex-col items-center justify-center">
              {/* <img className="mb-12" style={{height:70}} src={Logo} alt="Logo" /> */}
              <h2 className="text-white text-[24px] mb-1 text-left">
                Please verify your mail
              </h2>
              <p className="text-white/90 font-bold text-left mb-4 text-[12px]">
                Enter Confirmation code
              </p>
              <p className="text-white/90 font-normal text-left mb-8 text-[10px]">
                A 6-digit code was sent
                {clientMail ? ` to ${clientMail}` : ''}
              </p>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-6">
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {otp?.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`otp-input-${index}`}
                        className="ac-frm-input"
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '8px',
                          border: '1px solid #FFFFFF',
                          background: 'rgba(4, 4, 4, 0.20)',
                          textAlign: 'center',
                          fontSize: '16px',
                          color: '#FFFFFF',
                          padding: '0',
                          boxSizing: 'border-box',
                        }}
                        value={digit}
                        onChange={e => handleOTPChange(e, index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                        maxLength={1}
                      />
                    ))}
                  </div>
                  {/* <div>
                                <OTPInput numInputs={6} onChange={handleOTPChange} />
                            </div> */}
                </div>
                <div className="flex flex-row items-center justify-center mt-5">
                  {invalidField === 'otperror' && (
                    <span className="errorField">Invalid Code</span>
                  )}
                </div>
                <div className="flex flex-col items-center text-center justify-center text-base font-normal mt-5">
                  <span className="text-white/50">
                    Resend link in{' '}
                    <em className="text-white font-bold not-italic">
                      {' '}
                      00:{timeLeft}
                    </em>
                  </span>
                  {timeLeft === 0 ? (
                    <a
                      onClick={Resend}
                      className="text-[#5E91FF] font-bold hover:underline"
                      style={{ cursor: 'pointer' }}
                    >
                      Resend Link
                    </a>
                  ) : (
                    <a className="text-[#5E91FF] font-bold">Resend Link</a>
                  )}
                </div>

                <div className="flex flex-1 flex-row items-center justify-center gap-x-4">
                  <button
                    onClick={() => {
                      Cookies.remove('email');
                      navigate(-1);
                    }}
                    className="saveContinue mt-10"
                    style={{
                      borderRadius: 50,
                      border: '1px solid #FFF',
                      textTransform: 'capitalize',
                      paddingLeft: 36,
                      paddingRight: 36,
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="ac-login-btn mt-10"
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
                      height: 36,
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
                        <div className="loader"></div>
                      </div>
                    )}
                    <span
                      className={`button-text ${isMobile ? 'hidden' : 'block'}`}
                    >
                      Verify and Continue
                    </span>
                    <span
                      className={`button-text-mobile ${isMobile ? 'block' : 'hidden'
                        }`}
                    >
                      Next
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-y-10 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-white text-[18px] mb-1 text-left">
                  You have successfully created your account!
                </h2>
              </div>
              <div
                onClick={clickContinue}
                className="flex flex-row gap-x-2 p-3"
                style={{
                  background:
                    'linear-gradient(89.97deg, rgba(0, 255, 255, 0.42) 0.03%, rgba(0, 240, 251, 0) 99.97%)',
                  cursor: 'pointer',
                }}
              >
                <img src={DashBoardActiveIcon} alt="" />
                <span className="text-[18px] text-[#FFF]">CONTINUE</span>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center items-center mt-6">
            {errorMsg ? (
              <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                {errorMsg}
              </span>
            ) : (
              ''
            )}
            <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer p-3">
              <input
                checked={isChecked}
                onChange={handleCheckboxChange}
                type="checkbox"
                className="hidden"
              />
              <span
                className="w-5 h-5 border border-[#464070] rounded-sm bg-[#353057]"
                style={{ borderRadius: 4 }}
              ></span>
              <p className="text-sm text-[#C1C1C1] select-none">
                I have read and accept{' '}
                <span className="text-[#5E91FF]">Terms and conditions</span> and
                <span className="hidden md:inline">
                  <br />
                </span>{' '}
                {/* Hide on mobile, show on web */}
                <span className="text-[#5E91FF]">privacy policy</span>
              </p>
            </label>
            {checkboxError && (
              <span className="text-red-500 text-xs mt-2">{checkboxError}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyMail;

