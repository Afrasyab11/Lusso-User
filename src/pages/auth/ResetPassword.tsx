import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/LussoAiLogo.svg';
import MobileLogo from '../../assets/images/LussoLogovert.svg';
import Tick from '../../assets/images/tick-icon.svg';
import "./auth.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword]: any = useState();
  const [newPassword, setNewPassword]: any = useState();
  const [invalidField, setInvalidField]: any = useState('');
  const [invalidError, setInvalidError]: any = useState('');
  const [changeSuccess, setChangeSuccess]: any = useState(false);
  const [emailSent, setEmailSent]: any = useState(false);
  const [token, setToken]: any = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const handleReset = () => {
    if (!validateFields()) return;

    let apiRequest = {
      "newPassword": newPassword
    }
    axios.post(`https://api.lusso.dev/api/v1/resetPassword?token=${token}`, apiRequest)
      .then((response) => {
        console.log('response', response);
        setChangeSuccess(true);
        // localStorage.setItem("isAuthenticated", JSON.stringify(true));
        // navigate('/');
        // navigate("/home");
      })
      .catch((error) => {
        console.log('error', error);
      })
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    handleReset();
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };


  const validateFields = () => {
    if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      .test(password)) {
      setInvalidField('credserror');
      return false;
    }
    if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      .test(newPassword)) {
      setInvalidField('credserror');
      return false;
    }

    if (password !== newPassword) {
      setInvalidField('notsameerror');
    }
    return true;
  }
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    console.log('token$$$$$$$$$$$$$$$$$$$$$$$$$check', token);
    setToken(token);
  }, []);
  return (
    <div className="w-full">
      <div className="w-full m-auto clearfix font-Jakarta-sans h-100 vh-100 flex items-center justify-center login-container login-banner">
        <div className="noMobile flex flex-1 items-end justify-end" style={{ height: '100vh' }}>
          {/* <img src={LoginBannerSlide} alt="Banner" /> */}
          <div className="flex flex-1 justify-center uppercase font-bold" style={{
            letterSpacing: 12,
            fontSize: '2.5rem',
            paddingBottom: '30px',
            paddingRight: '50px',
            position: 'relative',
          }}>
            <span className="text-white" style={{ fontSize: '2rem' }}> {/* Increased font size */}
              <span style={{ fontSize: '2rem' }}>EXPLORING</span> <br />
              <span style={{ fontSize: '2rem' }}>THE WORLD OF</span> <br />
              <span style={{ fontSize: '3rem' }} className="text-[#0FF] font-bold">
                LUSSO
              </span> <br />
              <span style={{ fontSize: '3rem' }}>UNIVERSE</span>
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center login-container-right">
          <div className="w-full flex flex-row justify-center items-center mb-5" style={{ width: '100%' }}>
            <div className="/static/media/logo.a9d97f8a67185525ef2619183873d79a.svg">
              <a href="/">
                <img
                  src={isMobile ? MobileLogo : Logo}
                  alt="Logo"
                  style={{ width: '100%', height: 'auto' }} // Adjust size as needed
                />
              </a>
            </div>
          </div>
          <div>
            {/* <img className="mb-12" style={{height:70}} src={Logo} alt="Logo" /> */}

            {
              changeSuccess ?
                <>
                  <div className="flex flex-row justify-center items-center gap-x-2">
                    <img style={{ width: 24, height: 24 }} src={Tick} alt='' />
                    <h2 className="text-white text-[24px] mb-1 text-left">
                      Password Changed!
                    </h2>
                  </div>
                  <p className="text-white/90 text-[12px] font-normal text-left mb-8">
                    Your password has been changed sucessfully
                  </p>
                  <div>
                    <button
                      onClick={() => { navigate('/login') }}
                      className="ac-login-btn mt-5"
                      style={{
                        borderRadius: 50,
                        border: '1px solid #A768FD',
                        background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                        textTransform: 'capitalize'
                      }}
                    >
                      Back to Login
                    </button>
                  </div>
                </>
                :
                <>
                  <h2 className="text-white text-[24px] mb-7 text-center mt-7">
                    Reset Password
                  </h2>
                  {/* <p className="text-white/90 text-[12px] font-normal text-left mb-8">
                    Please enter your password and confirm password
                  </p> */}
                  <form autoComplete="off" onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="flex flex-col gap-y-6 w-[350px]">
                      <div>
                        <label>
                          <input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter New Password"
                            className="ac-frm-input rounded-pill badge h-[50px]"
                            value={password || ""}
                            style={{
                              borderRadius: 50,
                              border: `1px solid ${invalidField === 'credserror' ? '#F04438' : '#A768FD'}`,
                              background: 'rgba(4, 4, 4, 0.20)',
                            }}
                            onChange={(e) => {
                              setInvalidField('');
                              setPassword(e.target.value)
                            }
                            }
                          />
                        </label>
                        <div>
                          {
                            invalidField === 'credserror' &&
                            <span className='errorField'>Invalid password</span>
                          }
                        </div>
                      </div>
                      <div>
                        <label>
                          <input
                            type="text"
                            autoComplete="off"
                            placeholder="Re-Enter New Password"
                            className="ac-frm-input rounded-pill badge h-[50px]"
                            value={newPassword || ""}
                            style={{
                              borderRadius: 50,
                              border: `1px solid ${invalidField === 'credserror' ? '#F04438' : '#A768FD'}`,
                              background: 'rgba(4, 4, 4, 0.20)',
                            }}
                            onChange={(e) => {
                              setInvalidField('');
                              setNewPassword(e.target.value)
                            }
                            }
                          />
                        </label>
                        <div>
                          {
                            invalidField === 'credserror' &&
                            <span className='errorField'>Invalid confirm password</span>
                          }
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="ac-login-btn mt-5"
                      style={{
                        borderRadius: 50,
                        border: '1px solid #A768FD',
                        background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                        textTransform: 'capitalize'
                      }}
                    >
                      Change Password
                    </button>
                  </form>
                </>

            }
            <div className="text-center text-base font-normal mt-16">
              <span className="text-white/50">
                Not yet part of the Lusso Community??
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
export default ResetPassword;
