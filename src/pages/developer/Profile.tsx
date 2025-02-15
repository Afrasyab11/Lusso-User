import { allCountries } from 'country-region-data';
import { useState } from "react";
import Select from 'react-select';
import './dev.scss';

const Profile = () => {
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [developerName, setDeveloperName]: any = useState('');
    const [developerState, setDeveloperState]: any = useState('');
    const [developerCountry, setDeveloperCountry]: any = useState('');
    const [developerZipcode, setDeveloperZipcode]: any = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [industry, setIndustry] = useState('');
    const [expertise, setExpertise] = useState('');
    const [linkedin, setLinkedIn] = useState('');
    const [youtube, setYoutube] = useState('');
    const [website, setWebsite] = useState('');
    const [instagram, setInstagram] = useState('');

    const [errorInputField, setErrorInputField] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [isChecked, setIsChecked]: any = useState(false);

    const [regions, setRegions] = useState<OptionType[]>([]);

    type OptionType = {
        value: string;
        label: string;
    };

    const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          borderRadius: 50,
          border: `1px solid #A768FD`,
          backgroundColor:'none',
          color: '#FFFFFF99',
          minHeight: 48,
          marginTop:10
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

      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
    
    const erase = () => {
        setErrorInputField('');
        setErrorMessage('');
    }

    return (
        <div className="container price-background-banner">
            <div className="left"></div>
                <div className="right" style={{paddingTop:10}}>
                    <div className="pl-3 pt-3 pb-3">
                        <span className="text-white font-semi-bold text-[18px]">
                            Developer Details
                        </span>
                    </div>
                    <div>
                        <div className="horizontal-divider-light mb-8"></div>
                    </div>
                    <div className="flex flex-row gap-12">
                        <div className="flex flex-1 flex-col gap-y-6">
                            <div>
                            <label>
                                <span className="text-white font-normal text-[14px]">
                                Your Name
                                <span style={{color: 'red'}}>*</span>
                                </span>
                                <input
                                type="text"
                                autoComplete="off"
                                placeholder="Enter Name"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={developerName || ''}
                                style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                    errorInputField === 'developerName'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                }}
                                onChange={e => {
                                    setDeveloperName(e.target.value);
                                    erase();
                                }}
                                />
                            </label>
                            {errorInputField === 'developerName' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </div>
                            <label>
                            <span className="text-white font-normal text-[14px]">
                                Email Address
                                <span style={{color: 'red'}}>*</span>
                            </span>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Enter your email"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={email || ''}
                                style={{
                                borderRadius: 50,
                                border: `1px solid ${
                                    errorInputField === 'email' ? '#F04438' : '#A768FD'
                                }`,
                                background: 'rgba(4, 4, 4, 0.20)',
                                marginTop: 10,
                                }}
                                onChange={e => {
                                setEmail(e.target.value);
                                erase();
                                }}
                            />
                            {errorInputField === 'email' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </label>
                            <label>
                            <span className="text-white font-normal text-[14px]">
                                Phone
                                <span style={{color: 'red'}}>*</span>
                            </span>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Enter here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={phoneNumber || ''}
                                style={{
                                borderRadius: 50,
                                border: `1px solid ${
                                    errorInputField === 'phoneNumber' ? '#F04438' : '#A768FD'
                                }`,
                                background: 'rgba(4, 4, 4, 0.20)',
                                marginTop: 10,
                                }}
                                onChange={e => {
                                setPhoneNumber(e.target.value);
                                erase();
                                }}
                            />
                            {errorInputField === 'phoneNumber' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </label>
                        </div>
                        <div className='flex flex-col gap-y-6'>
                            <div>
                            <label>
                                <span className="text-white font-normal text-[14px]">
                                Enter Password <span style={{color: 'red'}}>*</span>
                                </span>
                                <input
                                type="password"
                                autoComplete="off"
                                placeholder="Enter here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={password || ''}
                                style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                    errorInputField === 'password'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                }}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    erase();
                                }}
                                />
                            </label>
                            {errorInputField === 'password' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </div>
                            <div>
                            <label>
                                <span className="text-white font-normal text-[14px]">
                                Re-Enter Password <span style={{color: 'red'}}>*</span>
                                </span>
                                <input
                                type="password"
                                autoComplete="off"
                                placeholder="Enter here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={confirmpassword || ''}
                                style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                    errorInputField === 'confirmpassword'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                }}
                                onChange={e => {
                                    setConfirmPassword(e.target.value);
                                    erase();
                                }}
                                />
                            </label>
                            {errorInputField === 'confirmpassword' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className="pl-3 pt-6 pb-3">
                        <span className="text-white font-semibold text-[18px]">
                            Contact Information
                        </span>
                    </div>
                    <div>
                        <div className="horizontal-divider-light mb-8">
                        </div>
                    </div>
                    <div className="flex flex-row gap-12">
                        <div className="flex flex-1 flex-col gap-y-6">
                        <div>
                                <label>
                                <span className="text-white font-normal text-[14px]">
                                Country <span style={{color: 'red'}}>*</span>
                                </span>
                                <Select
                                // className="ac-frm-select-input rounded-pill badge h-[50px]"
                                value={developerCountry}
                                styles={customStyles}
                                options={countryOptions}
                                onChange={handleCountryChange}
                                />
                                </label>
                            </div>
                                <div>
                                <label>
                                <span className="text-white font-normal text-[14px]">
                                State <span style={{color: 'red'}}>*</span>
                                </span>
                                    <Select
                                    // className="ac-frm-select-input rounded-pill badge h-[50px]"
                                    value={developerState}
                                    styles={customStyles}
                                    options={regions}
                                    onChange={handleRegionChange}
                                    />
                                </label>
                                </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-y-6">
                            <label>
                                <span className="text-white font-normal text-[14px]">
                                    Zip Code <span style={{color: 'red'}}>*</span>
                                </span>
                                <select
                                    className="ac-frm-select-input rounded-pill badge h-[50px]"
                                    value={developerZipcode || ''}
                                    style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                        errorInputField === 'developerZipcode'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                    }}
                                    onChange={e => {
                                    setDeveloperZipcode(e.target.value);
                                    erase();
                                    }}
                                >
                                    <option value="">Select your zipcode</option>
                                    <option value="11111">11111</option>
                                    <option value="22222">22222</option>
                                    <option value="33333">33333</option>
                                </select>
                                {errorInputField === 'developerZipcode' && (
                                    <span className="errorField">{errorMessage}</span>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="pl-3 pt-3 pb-3 mt-4">
                        <span className="text-white font-semi-bold text-[18px]">
                            Additional Info
                        </span>
                    </div>
                    <div>
                        <div className="horizontal-divider-light mb-4"></div>
                    </div>
                    <div className="flex flex-row gap-12">
                        <div className="flex flex-1 flex-col gap-y-6">
                            <div>
                            <label>
                                <span className="text-white font-normal text-[14px]">
                                Industry
                                
                                </span>
                                <input
                                type="text"
                                autoComplete="off"
                                placeholder="Enter Here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={industry || ''}
                                style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                    errorInputField === 'industry'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                }}
                                onChange={e => {
                                    setIndustry(e.target.value);
                                    erase();
                                }}
                                />
                            </label>
                            {errorInputField === 'industry' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </div>
                            <label>
                            <span className="text-white font-normal text-[14px]">
                                Your website
                                
                            </span>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Enter here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={website || ''}
                                style={{
                                borderRadius: 50,
                                border: `1px solid ${
                                    errorInputField === 'website' ? '#F04438' : '#A768FD'
                                }`,
                                background: 'rgba(4, 4, 4, 0.20)',
                                marginTop: 10,
                                }}
                                onChange={e => {
                                setWebsite(e.target.value);
                                erase();
                                }}
                            />
                            {errorInputField === 'website' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </label>
                            <label>
                            <span className="text-white font-normal text-[14px]">
                                LinkedIn
                                
                            </span>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Enter profile link /url"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={linkedin || ''}
                                style={{
                                borderRadius: 50,
                                border: `1px solid ${
                                    errorInputField === 'linkedin' ? '#F04438' : '#A768FD'
                                }`,
                                background: 'rgba(4, 4, 4, 0.20)',
                                marginTop: 10,
                                }}
                                onChange={e => {
                                setLinkedIn(e.target.value);
                                erase();
                                }}
                            />
                            {errorInputField === 'linkedin' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </label>
                        </div>
                        <div className='flex flex-col gap-y-6'>
                            <div>
                            <label>
                                <span className="text-white font-normal text-[14px]">
                               Industry Expertise
                                </span>
                                <input
                                type="password"
                                autoComplete="off"
                                placeholder="Enter here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={expertise || ''}
                                style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                    errorInputField === 'expertise'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                }}
                                onChange={e => {
                                    setExpertise(e.target.value);
                                    erase();
                                }}
                                />
                            </label>
                            {errorInputField === 'expertise' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </div>
                            <div>
                            <label>
                                <span className="text-white font-normal text-[14px]">
                                Youtube
                                </span>
                                <input
                                type="password"
                                autoComplete="off"
                                placeholder="Enter here"
                                className="ac-frm-input rounded-pill badge h-[50px]"
                                value={youtube || ''}
                                style={{
                                    borderRadius: 50,
                                    border: `1px solid ${
                                    errorInputField === 'youtube'
                                        ? '#F04438'
                                        : '#A768FD'
                                    }`,
                                    background: 'rgba(4, 4, 4, 0.20)',
                                    marginTop: 10,
                                }}
                                onChange={e => {
                                    setYoutube(e.target.value);
                                    erase();
                                }}
                                />
                            </label>
                            {errorInputField === 'youtube' && (
                                <span className="errorField">{errorMessage}</span>
                            )}
                            </div>
                            <div>
                                <label>
                                    <span className="text-white font-normal text-[14px]">
                                    Instagram
                                    </span>
                                    <input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Enter here"
                                    className="ac-frm-input rounded-pill badge h-[50px]"
                                    value={instagram || ''}
                                    style={{
                                        borderRadius: 50,
                                        border: `1px solid ${
                                        errorInputField === 'youtube'
                                            ? '#F04438'
                                            : '#A768FD'
                                        }`,
                                        background: 'rgba(4, 4, 4, 0.20)',
                                        marginTop: 10,
                                    }}
                                    onChange={e => {
                                        setInstagram(e.target.value);
                                        erase();
                                    }}
                                    />
                                </label>
                                {errorInputField === 'instagram' && (
                                    <span className="errorField">{errorMessage}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;