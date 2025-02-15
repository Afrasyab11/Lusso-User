import axios from 'axios';
import { allCountries } from 'country-region-data';
import Cookies from 'js-cookie';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import IconEye from '../../assets/icons/eye';
import IconInfoCircle from '../../assets/icons/info';
import Logo from '../../assets/images/LussoAiLogo.svg';
import MobileLogo from '../../assets/images/LussoLogovert.svg';
import BecomeCreatorButton from '../../components/common/BecomeCreatorBtn';
import CustomSelect from '../../components/common/select';
import { apiEndpoints } from '../../constants/api-endpoints';
import useEncryptionHook from '../../hooks/useEncryption';
import makeApiCall from '../../lib/apiCall';
import { setCookies } from '../../utils/utils';
import './auth.scss';

const AccountSignup = () => {
  const navigate = useNavigate();
  const { encrypt } = useEncryptionHook();

  const [userName, setUserName]: any = useState<any>('');
  const [password, setPassword]: any = useState<any>('');
  const [confirmpassword, setConfirmPassword]: any = useState('');
  const [email, setEmail]: any = useState<any>('');
  const [age, setAge]: any = useState<any>('');
  const [state, setState]: any = useState<any>('');
  const [country, setCountry]: any = useState<any>('');
  const [isChecked, setIsChecked]: any = useState<any>(false);
  const [invalidField, setInvalidField]: any = useState('');
  const [invalidError, setInvalidError]: any = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [regions, setRegions] = useState<OptionType[]>([]);
  const [errorMsg, setErrorMsg] = useState<any>();
  const [checkboxError, setCheckboxError] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [captchaValue, setCaptchaValue] = useState(null);

  type OptionType = {
    value: string;
    label: string;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleCountryChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    setCountry(selectedOption);
    setState(null); // Clear region selection when country changes

    const countryData = allCountries.find(
      item => item[0] === selectedOption.label,
    );
    if (countryData && countryData[2].length > 0) {
      const regionOptions = countryData[2].map(region => ({
        value: region[1],
        label: region[0],
      }));
      setRegions(regionOptions);
    } else {
      setRegions([]);
    }
  };

  const handleRegionChange = (selectedOption: { label: string; value: string }) => {
    if (selectedOption) {
      setState(selectedOption);
      if (invalidField === 'state') {
        setInvalidField('');
        setInvalidError('');
      }
    }
  };



  const countryOptions = allCountries.map(country => ({
    value: country[1],
    label: country[0],
  }));
  console.log("State during validation:", state);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCheckboxError(isChecked && "")
  };

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value); // Store the CAPTCHA value
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // console.log(invalidError, invalidField);

  //   if (!captchaValue) {
  //     toast.info('Please complete the CAPTCHA before submitting.', { theme: 'dark' });
  //     return;
  //   }

  //   setIsLoading(true);
  //   setErrorMsg('');
  //   if (!validateFields()) {
  //     setIsLoading(false);
  //     return;
  //   }
  //   const encryptedPass = encrypt(password);

  //   let apiRequest = {
  //     username: userName,
  //     email: email,
  //     password: encryptedPass,
  //     ageGroup: age,
  //     state: state.label,
  //     country: country.label,
  //   };
  //   axios
  //     .post('https://api.lusso.dev/api/v1/register', apiRequest)
  //     .then(response => {
  //       console.log('response', response);
  //       setIsLoading(false);
  //       let authToken = response.data?.token;
  //       setCookies('authToken', authToken);
  //       Cookies.set('email', email, { expires: 1 });
  //       if (response.data.isNewUser) {
  //         navigate('/verify');
  //       } else {
  //         navigate('/dev/dashboard');
  //       }
  //     })
  //     .catch(error => {
  //       setIsLoading(false);
  //       console.log('error', error);
  //       setErrorMsg(error?.response?.data?.message);
  //     });
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValue) {
      // console.log('captcha error')
      // toast.info('Please complete the CAPTCHA before submitting.', { theme: 'dark' });
      setErrorMsg('Please complete the CAPTCHA before submitting.');
      return;
    } else {

      setIsLoading(true);
      setErrorMsg('');

      // Validate fields
      if (!validateFields()) {
        setIsLoading(false);
        return;
      }

      try {
        // Verify CAPTCHA with backend
        // const captchaResponse = await axios.post('/verify-captcha', { token: captchaValue });

        // if (!captchaResponse.data.success) {
        //   toast.error('CAPTCHA verification failed. Please try again.', { theme: 'dark' });
        //   setIsLoading(false);
        //   return;
        // }

        const encryptedPass = encrypt(password);

        // API Request payload
        const apiRequest = {
          username: userName,
          email: email,
          password: encryptedPass,
          ageGroup: age,
          state: state?.label ?? '',
          country: country?.label ?? '',
        };

        // Proceed with registration API
        const response = await axios.post('https://api.lusso.dev/api/v1/register', apiRequest);
        console.log('response', response);
        setIsLoading(false);

        const authToken = response.data?.token;
        setCookies('authToken', authToken);
        const loggedinUser = await makeApiCall(apiEndpoints.userProfile)
        setCookies('authUser', loggedinUser);
        Cookies.set('email', email, { expires: 1 });

        if (response.data.isNewUser) {
          navigate('/verify');
        } else {
          navigate('/dev/dashboard');
        }
      } catch (error: any) {
        setIsLoading(false);

        if (error.response?.data?.message) {
          setErrorMsg(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again.', { theme: 'dark' });
        }

        console.log('error', error);
      }
    }

  };

  const validateFields = () => {
    const newErrors: any = {};

    if (!userName.trim()) {
      newErrors.username = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(email)
    ) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must include an uppercase letter';
      }
      if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must include a lowercase letter';
      }
      if (!/[0-9@$!%*?&]/.test(password)) {
        newErrors.password = 'Password must include a number or special character';
      }
    }

    if (confirmpassword !== password) {
      newErrors.confirmpassword = 'Passwords do not match';
    }

    if (!age) {
      newErrors.age = 'Age is required';
    }

    if (!country) {
      newErrors.country = 'Country is required';
    }

    if (regions?.length > 0 && !state) {
      newErrors.state = 'State is required';
      setInvalidField('state');
    }

    if (!isChecked) {
      newErrors.checkbox = 'You must accept the terms of services and privacy policy to proceed';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 50,
      border: `1px solid ${state.selectProps.invalidField === 'credserror'
        ? '#F04438'
        : 'rgb(137 108 255 / 80%)'
        }`, // Conditional border color
      backgroundColor: 'rgba(46, 36, 108, 0.1)', // Updated background color
      color: '#FFFFFF99',
      minHeight: 48,
      paddingLeft: 8, // Fixed typo from padddingLeft to paddingLeft
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
      paddingLeft: 8, // Fixed typo from padddingLeft to paddingLeft
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
      paddingLeft: 8, // Fixed typo from padddingLeft to paddingLeft
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'rgba(4, 4, 4)',
      borderRadius: 10,
      padding: 0, // Remove any extra padding if needed
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0, // Remove any extra padding if needed
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused
        ? 'rgba(167, 104, 253, 0.8)'
        : 'rgba(4, 4, 4)',
      color: '#FFFFFF99',
      padding: '8px 12px', // Adjust padding if needed
    }),
    indicatorSeparator: () => ({
      display: 'none', // Hide the indicator separator
    }),
  };

  return (
    <div className="w-full">
      <div className="w-full m-auto font-Jakarta-sans h-100 vh-100 flex items-center xl:justify-between md:justify-end  login-container login-banner">
        <div
          className="noMobile flex xl:flex-1 xl:static  lg:items-end md:items-center justify-end"
          style={{ height: '100vh' }}
        >
          {/* <img src={LoginBannerSlide} alt="Banner" /> */}
          <div
            className="flex flex-1 justify-center uppercase font-bold lg:mt-[0rem] md:mt-[5rem]  xl:pr-[20px] xl:pl-[20px] xl:pb-[20px]  md:pr-[20px] md:pl-[20px] md:pb-[20px]"
            style={{
              letterSpacing: 12,
              position: 'relative',
            }}
          >
            <span className="text-white lg:text-[2rem] md:text-[1rem]" >
              {' '}
              {/* Increased font size */}
              <span className='lg:text-[1.8rem] md:text-[1.3rem]' >EXPLORING</span> <br />
              <span className='lg:text-[1.8rem] md:text-[1.3rem]'>THE WORLD OF</span> <br />
              <span

                className="text-[#0FF] font-bold  lg:text-[2.5rem] md:text-[1.6rem]"
              >
                LUSSO
              </span>{' '}
              <br />
              <span className='lg:text-[2.5rem] font-bold md:text-[1.6rem]'>UNIVERSE</span>
            </span>
          </div>
        </div>
        <div className="flex 2xl:w-[55%] xl:w-[60%] lg:w-[80%]  md:w-[62%]  right-0 w-[100%] items-center justify-between">
          <div className="login-container-right">
            <div className="auth-top-container w-full flex flex-row justify-between items-center">
              <div style={{ textDecoration: 'none' }} className='md:mr-[2rem]'>
                <div className="/static/media/logo.a9d97f8a67185525ef2619183873d79a.svg">
                  <img
                    src={isMobile ? MobileLogo : Logo}
                    alt="Logo"
                    style={{ width: '100%', height: 'auto' }} // Adjust size as needed
                  />
                </div>
              </div>

              <div className="auth-become-creator">

                <BecomeCreatorButton />
              </div>
            </div>
            <div className="auth-create-acc-title w-full flex flex-col justify-center items-center mt-7">
              <h2 className="text-[#00FFFF] text-[20px] font-bold  text-center">
                Create Account
              </h2>
              <p className="text-white/90 text-base font-normal text-center mb-8">
                Sign Up today to join a Niche, Tech-Savy community of creators
                from all around the globe!
              </p>
            </div>




            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="SignUpForm auth-form-container"
            >
              <div className="auth-input-container w-full flex flex-row justify-between items-start">
                <div className="flex flex-col gap-y-6">
                  <div>
                    <label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your name"
                        className="ac-frm-input rounded-pill badge h-[50px]"
                        value={userName || ''}
                        style={{
                          borderRadius: 50,
                          border: `1px solid ${errors.username
                            ? '#F04438'
                            : 'rgb(137 108 255 / 80%)'
                            }`,
                          background: 'rgba(46, 36, 108, 0.1)',
                          color: '#fff',
                        }}
                        onChange={e => {
                          setInvalidField('');
                          setInvalidError('');
                          setUserName(e.target.value);
                        }}
                      />
                    </label>
                    {errors.username && <span className="errorField">{errors.username}</span>}
                  </div>
                  <div>
                    <label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your email"
                        className="ac-frm-input rounded-pill badge h-[50px]"
                        value={email || ''}
                        style={{
                          borderRadius: 50,
                          border: `1px solid ${errors.email
                            ? '#F04438'
                            : 'rgb(137 108 255 / 80%)'
                            }`,
                          background: 'rgba(46, 36, 108, 0.1)',
                          color: '#fff',
                        }}
                        onChange={e => {
                          setInvalidField('');
                          setInvalidError('');
                          setEmail(e.target.value);
                        }}
                      />
                    </label>
                    {errors.email && <span className="errorField">{errors.email}</span>}
                  </div>
                  <div className="relative">
                    <label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Enter your password"
                        className="ac-frm-input h-[50px] pl-12 pr-12"
                        value={password || ''}
                        maxLength={20}
                        style={{
                          borderRadius: 50,
                          border: `1px solid ${errors.password
                            ? '#F04438'
                            : 'rgb(137 108 255 / 80%)'
                            }`,
                          background: 'rgba(46, 36, 108, 0.1)',
                          color: '#fff',
                        }}
                        onChange={e => {
                          setInvalidField('');
                          setInvalidError('');
                          setPassword(e.target.value);
                        }}
                      />
                    </label>
                    <span
                      onClick={() => setShowTooltip(!showTooltip)}
                      className={`absolute right-12 ${errors.password ? "top-[36%]" : "top-1/2"} transform -translate-y-1/2 cursor-pointer`}


                      style={{ zIndex: 10 }}
                    >
                      <IconInfoCircle color="#888" />
                    </span>
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      // className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      className={`absolute right-4 ${errors.password ? " top-[36%]" : "top-[48%]"} transform -translate-y-1/2 cursor-pointer`}
                      style={{ zIndex: 10 }}
                    >
                      <IconEye color={showPassword ? '#A768FD' : '#888'} />
                    </span>
                    {showTooltip && (
                      <div className="absolute z-50 top-full mt-2 w-full p-3 bg-white border border-gray-300 shadow-lg rounded-lg text-sm text-gray-700">
                        <ul className="list-disc pl-4">
                          <li className={
                            password.match(/[\d@$!%*?&]/)
                              ? 'text-light-blue'
                              : 'text-red-500'
                          }>
                            At least one number or special character
                          </li>
                          <li
                            className={
                              password.match(/[A-Z]/)
                                ? 'text-light-blue'
                                : 'text-red-500'
                            }
                          >
                            At least one upper case letter
                          </li>
                          <li
                            className={
                              password.match(/[a-z]/)
                                ? 'text-light-blue'
                                : 'text-red-500'
                            }
                          >
                            At least one lower case letter
                          </li>
                          <li
                            className={
                              password?.length >= 8
                                ? 'text-light-blue'
                                : 'text-red-500'
                            }
                          >
                            Min 8 characters long
                          </li>
                          <li
                            className={
                              password?.length <= 20
                                ? 'text-light-blue'
                                : 'text-red-500'
                            }
                          >
                            Max 20 characters long
                          </li>
                        </ul>
                      </div>
                    )}
                    <div className=" bottom-[-20px] w-full">
                      {errors.password && <span className="errorField">{errors.password}</span>}
                    </div>
                  </div>

                  <div className="relative">
                    <label>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Re-enter your password"
                        className="ac-frm-input h-[50px] pl-12 pr-12"
                        value={confirmpassword || ''}
                        maxLength={20}
                        style={{
                          borderRadius: 50,
                          border: `1px solid ${errors.confirmpassword

                            ? '#F04438'
                            : 'rgb(137 108 255 / 80%)'
                            }`,
                          background: 'rgba(46, 36, 108, 0.1)',
                          color: '#fff',
                        }}
                        onChange={e => {
                          setInvalidField('');
                          setInvalidError('');
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </label>
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      style={{ zIndex: 10 }}
                    >
                      <IconEye
                        color={showConfirmPassword ? '#A768FD' : '#888'}
                      />
                    </span>
                    <div className="absolute bottom-[-20px] w-full">
                      {errors.confirmpassword && <span className="errorField">{errors.confirmpassword}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-6">
                  <div>
                    <label>
                      <div className="AgeGroup"
                        style={{
                          position: 'relative',
                          display: 'inline-block',
                          width: '100%' /* Adjust width as needed */,
                        }}
                      >
                        <CustomSelect
                          value={age ? { value: age, label: age } : null} // Pass null when no value is selected
                          onChange={(newValue, actionMeta) => {
                            console.log('New Value:', newValue);

                            if (
                              newValue &&
                              typeof newValue === 'object' &&
                              'value' in newValue
                            ) {
                              setInvalidField('');
                              setAge(newValue.value); // Extract the value property
                              console.log('Updated Age:', newValue.value);
                            } else {
                              setAge(null); // or some default value
                            }
                          }}
                          invalidField={invalidField}
                        />

                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFFFFF99"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </label>

                    {errors.age && <span className="errorField">{errors.age}</span>}
                  </div>

                  <div className="relative">
                    <Select
                      placeholder="Select Country"
                      value={country}
                      styles={customStyles}
                      options={countryOptions}
                      onChange={handleCountryChange}
                    />
                    {errors.country && <span className="errorField">{errors.country}</span>}
                  </div>

                  {regions.length > 0 && (
                    <div>
                      <label>
                        <Select
                          // className="ac-frm-select-input rounded-pill badge h-[50px]"
                          placeholder="Select State"
                          value={state}
                          styles={customStyles}
                          options={regions}
                          onChange={handleRegionChange}
                        />
                      </label>
                      {errors.state && <span className="errorField">{errors.state}</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-6">
                {errorMsg ? (
                  <span
                    style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}
                  >
                    {errorMsg}
                  </span>
                ) : (
                  ''
                )}
                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer p-4">
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
                    <span className="text-[#5E91FF]">Terms and conditions</span>{' '}
                    and
                    <span className="hidden md:inline">
                      <br />
                    </span>{' '}
                    {/* Hide on mobile, show on web */}
                    <span className="text-[#5E91FF]">privacy policy</span>
                  </p>
                </label>
                {errors.checkbox && (
                  <span className="text-red-500 text-xs mt-2">{errors.checkbox}</span>
                )}
              </div>
              {/* <div className="flex justify-center items-center mt-6">
                <button
                  type="submit"
                  className="ac-signup-btn"
                  style={{
                    borderRadius: 50,
                    border: 'none',
                    background: !isLoading
                      ? 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)'
                      : '',
                    textTransform: 'capitalize',
                    paddingLeft: 50,
                    paddingRight: 50,
                    width: window.innerWidth >= 768 ? '500px' : '300px', // Adjust width based on screen size
                    position: 'relative', // Add position relative to button
                  }}
                  disabled={isLoading} // Disable button when loading
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
                  {!isLoading ? 'Create Account' : ''}
                </button>
              </div> */}

              <div className="flex flex-col justify-center items-center mt-5">
                <div className="flex justify-center mb-3">
                  <ReCAPTCHA
                    sitekey="6LeMgakqAAAAAPzoOBRXLSvPh222aXWnS_b93agG"
                    onChange={handleCaptchaChange}
                  />
                </div>
                <button
                  type="submit"
                  className="ac-signup-btn"
                  style={{
                    borderRadius: 50,
                    border: 'none',
                    background: !isLoading
                      ? 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)'
                      : '',
                    textTransform: 'capitalize',
                    paddingLeft: 50,
                    paddingRight: 50,
                    width: window.innerWidth >= 768 ? '500px' : '300px',
                    position: 'relative',
                  }}
                  disabled={isLoading} // Disable button if loading or CAPTCHA not completed
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
                  {!isLoading ? 'Create Account' : ''}
                </button>
              </div>
            </form>
            <div
              className="text-center text-base font-normal mt-7"
              style={{
                marginTop: window.innerWidth < 768 ? '0.02rem' : '1.75rem',
              }}
            >
              <span className="text-white/50">Already have an account?</span>{' '}
              <Link
                to="/login"
                className="text-[#5E91FF] hover:underline font-bold"
              >
                Log In
              </Link>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountSignup;
