import axios from 'axios';
import { allCountries } from 'country-region-data';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/LussoAiLogo.svg';
import arrow_circle_right from '../../assets/images/rightArrowIcon.svg';
import Button from '../../components/ui/Button';
import { setCookies } from '../../utils/utils';
import './dev.scss';

const DeveloperOnboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('company');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [developerName, setDeveloperName]: any = useState('');
  const [developerState, setDeveloperState]: any = useState('');
  const [developerCountry, setDeveloperCountry]: any = useState('');
  const [developerZipcode, setDeveloperZipcode]: any = useState('');
  const [State, setState]: any = useState('');
  const [country, setCountry]: any = useState('');
  const [zipCode, setZipCode]: any = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [industry, setIndustry] = useState('');
  const [webURL, setWebURL] = useState('');

  const [errorInputField, setErrorInputField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isChecked, setIsChecked]: any = useState(false);
  const [invalidField, setInvalidField]: any = useState('');
  const [invalidError, setInvalidError]: any = useState('');
  const [regions, setRegions] = useState<OptionType[]>([]);

  // Redesigned Changes
  const [tab, setTab] = useState(0);

  type OptionType = {
    value: string;
    label: string;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setErrorMessage('')
    }
  };

  const handleCountryChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    setDeveloperCountry(selectedOption);
    setDeveloperState(null); // Clear region selection when country changes

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

  const handleRegionChange = (selectedOption: any) => {
    setDeveloperState(selectedOption);
  };

  const countryOptions = allCountries.map(country => ({
    value: country[1],
    label: country[0],
  }));

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 50,
      border: `1px solid #A768FD`,
      backgroundColor: 'none',
      color: '#FFFFFF99',
      minHeight: 48,
      marginTop: 10,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#FFFFFF99',
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'rgba(4, 4, 4)',
      borderRadius: 10,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused
        ? 'rgba(167, 104, 253, 0.8)'
        : 'rgba(4, 4, 4)',
      color: '#FFFFFF99',
    }),
  };

  const validateDeveloperFields = () => {
    console.log(
      'checking all dimesions',
      developerName,
      email,
      phoneNumber,
      password,
      confirmpassword,
      developerCountry.value,
      developerState.value,
      developerZipcode,
      isChecked,
    );
    if (!developerName.trim()) {
      setErrorInputField('developerName');
      setErrorMessage('Developer name is required');
      return false;
    }
    if (
      !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(
        email,
      )
    ) {
      setErrorInputField('email');
      setErrorMessage('Invalid email provided');
      return false;
    }

    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      setErrorInputField('phoneNumber');
      setErrorMessage('Invalid phoneNumber provided');
      return false;
    }
    console.log(
      'checking$$$$$$$$$$$$$$',
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      ),
    );
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      )
    ) {
      setErrorInputField('password');
      // setInvalidError('Password should contain atleast 1 lowercase, 1 uppercase, 1 digit, 1 special character and minimum 8 characters long');
      setErrorMessage('Invalid password provided');
      return false;
    }

    console.log('end$$$$$$$$$$$$');

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        confirmpassword,
      )
    ) {
      setErrorInputField('confirmpassword');
      // setInvalidError('Password should contain atleast 1 lowercase, 1 uppercase, 1 digit, 1 special character and minimum 8 characters long');
      setErrorMessage('Invalid password provided');
      return false;
    }

    if (password !== confirmpassword) {
      setErrorInputField('matchpassword');
      setErrorMessage(
        `Password and confirm password should match with each other`,
      );
      return false;
    }

    if (!developerCountry.value) {
      setErrorInputField('developerCountry');
      setErrorMessage('Country should be selected');
      return false;
    }
    console.log('$#######track');
    if (!developerState.value) {
      setErrorInputField('developerState');
      setErrorMessage('State should be selected');
      return false;
    }

    if (!/^\d{5}(?:-\d{4})?$/.test(developerZipcode)) {
      setErrorInputField('developerZipcode');
      setErrorMessage('Invalid zipcode provided');
      return false;
    }
    if (!isChecked) {
      return false;
    }

    return true;
  };

  const CreateDevAccount = () => {
    setIsLoading(true);
    if (!validateDeveloperFields()) {
      console.log('$$$$$$$$$yes');
      setIsLoading(false);
      return;
    }
    console.log('$$$$$$$$$no');
    let apiRequest = {
      username: developerName,
      email: email,
      password: password,
      zipcode: developerZipcode,
      state: developerState?.label,
      country: developerCountry?.label,
    };
    axios
      .post('https://api.lusso.dev/api/v1/developer/register', apiRequest)
      .then(response => {
        console.log('response', response);
        setIsLoading(false);
        let authToken = response.data?.token;
        setCookies('authToken', authToken);
        Cookies.set('email', email, { expires: 1 });
        if (response.data.isNewUser) {
          navigate('/verify');
        } else {
          navigate('/dev/dashboard');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const erase = () => {
    setErrorInputField('');
    setErrorMessage('');
  };

  const saveAndContinue = () => {
    console.log('chekc%%%%%', !validateDeveloperFields());
    if (!validateDeveloperFields()) return;
    setActiveTab('developer');
  };

  const Save = () => {
    if (!validateDeveloperFields()) return;
    navigate('/dev/pricing');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNavigation = () => {
    if (isChecked) {
      navigate('/devonboard/stepper');
    } else {
      setErrorMessage('You must agree to the terms and conditions and privacy policy.')
    }
  };

  return (
    <div className="container background-banner" style={{ display: 'flex' }}>
      <div className="left" style={{ flex: 1 }}></div>
      <div
        className={`right opacity-95 flex flex-col items-center gap-20 w-full overflow-x-hidden	`}
        style={{
          flex: 1.3,
        }}
      >
        <div className='md:w-[384px] md:h-[78.26px] sm:w-full'>
          <Link to="/">
            <img
              src={Logo}
              className="mobileRes"
              alt="Logo"
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-10">
          <h3 className="font-extrabold text-[#FFF] tracking-[.3em] text-2xl">
            CREATOR <span className="text-[#00FFFF]">ONBOARDING</span>
          </h3>
          <p className="text-[#E1E1E1] text-center max-w-[65ch] mx-auto leading-snug">
            Welcome to our AI-powered platform! Upload your products to unlock tailored marketing services, including engaging social media posts and insightful analytics that boost your visibility and reach.
          </p>
          <Button
            label="Register As Creator"
             className="bg-gradient-vertical hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:scale-5 hover:shadow-lg transition-all duration-300 ease-in-out"
            icon={{
              position: 'end',
              component: (
                <img src={arrow_circle_right} width="24px" height="24px" />
              ),
            }}
            onClick={handleNavigation}
          />
        </div>
        {/* <div className='flex flex-row justify-end items-center'>
          <div>
            {/* <button
              onClick={() => {
                navigate('/auth');
              }}
              className="back-to-btn"
              style={{
                borderRadius: 50,
                border: '1px solid #A768FD',
                background:
                  'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                textTransform: 'none',
              }}
            >
              Back to User &nbsp;&nbsp;&nbsp;&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
              >
                <path
                  d="M17.2089 1.00744C16.6162 0.448787 15.6829 0.476363 15.1243 1.06903C14.5656 1.6617 14.5932 2.59504 15.1858 3.15369L17.2089 1.00744ZM20.3553 5.99987L21.3669 7.073C21.6625 6.79435 21.8301 6.40611 21.8301 5.99987C21.8301 5.59364 21.6625 5.20539 21.3669 4.92675L20.3553 5.99987ZM15.1858 8.84605C14.5932 9.40471 14.5656 10.338 15.1243 10.9307C15.6829 11.5234 16.6162 11.551 17.2089 10.9923L15.1858 8.84605ZM1.64453 4.52515C0.830066 4.52515 0.169812 5.18541 0.169812 5.99987C0.169812 6.81434 0.830066 7.47459 1.64453 7.47459L1.64453 4.52515ZM15.1858 3.15369L19.3438 7.073L21.3669 4.92675L17.2089 1.00744L15.1858 3.15369ZM19.3438 4.92675L15.1858 8.84605L17.2089 10.9923L21.3669 7.073L19.3438 4.92675ZM20.3553 4.52515L1.64453 4.52515L1.64453 7.47459L20.3553 7.47459V4.52515Z"
                  fill="white"
                />
              </svg>
            </button> */}
        {/* <img className='w-[250px]' src={logo} alt="" /> */}
        {/* <div className="flex flex-col justify-center items-center "> */}
        <div className="flex flex-col justify-center items-center">
          <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer items-center">
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
            <p className="font-inter text-[12px] font-medium leading-[14.52px] text-left text-white">
              I have read and accept{' '}
              <span className="text-[#5E91FF]">Terms and conditions</span>{' '}
              and <span className="text-[#5E91FF]">privacy policy</span>
            </p>
          </label>
        </div>
        {errorMessage && <p className='text-red-600 font-medium'>{errorMessage}</p>}
        {/* </div> */}
      </div>
    </div >
  );
};

export default DeveloperOnboard;