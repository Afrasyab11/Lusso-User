import { FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import ChevronRight from '../../assets/images/ChevronRight.png';
import profileImg from '../../assets/images/profile.png';
import '../developer/dev.scss'; // Assume custom CSS goes here

const CreatorDetails = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const handleToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    return (
        <div className="creator-details-container p-4">
            {/* Heading */}
            <div className='text-white font-bold text-[24px] mb-8'>
                <span className='bg-gradient-to-r from-[#985FFF] to-[#FF99EF] bg-clip-text text-transparent'>
                    Settings
                </span>
            </div>

            {/* Main Settings Section */}
            <div className="settings-grid flex flex-col lg:flex-row justify-between gap-8">

                <div className="left-container w-full lg:w-[1498px] h-[970px] flex flex-col gap-6">

                    {/* Profile Settings Card */}
                    {/* <div className="profile-card w-full h-[765px] border-gradient p-4 rounded-lg">
                        <div className="profile-settings flex items-center">
                        
                            <div className="profile-image-container mr-8">
                                <img
                                    src={profileImg}
                                    alt="Profile"
                                    className="w-[130px] h-[131px] rounded-full border-4 border-sky-500"
                                />
                            </div>

                            <div className="profile-info text-[#FFFFFF99] flex flex-col">
                                <p className="text-[24px]">David Lucas</p>
                                <p>Email: davidlucus@123.com</p>
                                <p>Phone Number: 0 000 000 0000</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="profile-card w-full h-[705px] border-gradient p-4 rounded-lg">
                        <div className='text-white  text-[24px] mb-6'>
                            Personal Info
                        </div>
                        <div className="profile-settings flex items-center">
                            {/* Profile Image on the left */}
                            <div className="profile-image-container mr-8">
                                <img
                                    src={profileImg}
                                    alt="Profile"
                                    className="w-[130px] h-[131px] rounded-full border-4 border-sky-500"
                                />
                            </div>

                            {/* User Information in the center */}
                            <div className="profile-info text-[#FFFFFF99] flex flex-col">
                                <p className="text-[24px]">David Lucas</p>
                                <p>Email: davidlucus@123.com</p>
                                <p>Phone Number: 0 000 000 0000</p>
                            </div>
                        </div>

                        {/* Action Fields */}
                        <div className="action-fields flex flex-col mt-6">
                            {/* Field for Update Password */}
                            <div className="field flex justify-between items-center w-full h-[70px] border border-[#6C8CFF80] rounded-lg bg-[#00000033] mb-4">
                                <span className="text-white pl-4">Update Password</span>
                                <img src={ChevronRight} alt="Chevron" className="w-[10px] h-[10px] mr-4" />
                            </div>

                            {/* Field for Request a Copy of Personal Info */}
                            <div className="field flex justify-between items-center w-full h-[70px] border border-[#6C8CFF80] rounded-lg bg-[#00000033] mb-4">
                                <span className="text-white pl-4">Request a Copy of Personal Info</span>
                                <img src={ChevronRight} alt="Chevron" className="w-[10px] h-[10px] mr-4" />
                            </div>

                            {/* Field for Adjust Parenting Controls */}
                            <div className="field flex justify-between items-center w-full h-[70px] border border-[#6C8CFF80] rounded-lg bg-[#00000033] mb-4">
                                <span className="text-white pl-4">Adjust Parenting Controls</span>
                                <img src={ChevronRight} alt="Chevron" className="w-[10px] h-[10px] mr-4" />
                            </div>

                            {/* Field for Delete Account */}
                            <div className="field flex justify-between items-center w-full h-[70px] border border-[#6C8CFF80] rounded-lg bg-[#00000033]">
                                <span className="text-white pl-4">Delete Account</span>
                                <img src={ChevronRight} alt="Chevron" className="w-[10px] h-[10px] mr-4" />
                            </div>
                        </div>
                    </div>


                    {/* General Settings Card */}
                    <div className="general-settings-card w-full h-[372px] border-gradient p-4 rounded-lg">
                        <div className='text-white text-[24px] mb-4'>
                            General Settings
                        </div>

                        <div className="general-settings">
                            {/* Language Selection */}
                            <div className="mb-6">
                                <label htmlFor="language" className="text-white text-[16px] mb-2 block">
                                    Language
                                </label>
                                <select
                                    id="language"
                                    className="rounded-full w-full h-[40px] bg-transparent text-[#FFFFFF99] border border-[#6C8CFF80] px-4"
                                >
                                    <option value="enabled">
                                        Choose a language
                                    </option>

                                    {/* <option value="" disabled selected>
                                        Choose a language
                                    </option> */}
                                    {/* <option value="en">English</option>
                                    <option value="fr">French</option>
                                    <option value="es">Spanish</option>
                                    <option value="de">German</option> */}
                                </select>
                            </div>

                            {/* Feature Testing Selection */}
                            <div className="mb-4">
                                <label htmlFor="feature-testing" className="text-white text-[16px] mb-2 block">
                                    Feature Testing
                                </label>
                                <select
                                    id="feature-testing"
                                    className="rounded-full w-full h-[40px] bg-transparent text-[#FFFFFF99] border border-[#6C8CFF80] px-4"
                                >
                                    <option value="enabled">Enabled</option>
                                    {/* <option value="disabled">Disabled</option> */}
                                </select>
                            </div>
                        </div>

                    </div>



                </div>

                {/* Right Section: Notification Settings Card */}
                <NotificationSettings />


            </div>
        </div>
    );
};

export default CreatorDetails;

const NotificationSettings = () => {
    // Define state for each notification setting
    const [generalNotificationsEnabled, setGeneralNotificationsEnabled] = useState(false);
    const [generalNotificationsUpdatesEnabled, setGeneralNotificationsUpdatesEnabled] = useState(false);
    const [contentRecommendationsEnabled, setContentRecommendationsEnabled] = useState(false);
    const [activityBasedRecommendationsEnabled, setActivityBasedRecommendationsEnabled] = useState(false);
    const [toggleThree, setToggleThree] = useState(false);
    const [accountSecurityEnabled, setAccountSecurityEnabled] = useState(false);
    const [passwordChangeNotificationEnabled, setPasswordChangeNotificationEnabled] = useState(false);
    const [billingSubscriptionEnabled, setBillingSubscriptionEnabled] = useState(false);
    const [renewalReminderEnabled, setRenewalReminderEnabled] = useState(false);
    const [feedbackSurveysEnabled, setFeedbackSurveysEnabled] = useState(false);
    const [postTransactionFeedbackEnabled, setPostTransactionFeedbackEnabled] = useState(false);

    return (
        <div className="p-5 lg:w-[550px] h-[970px] border-gradient">
            <div className='text-white text-[24px] mb-4'>
                Notification
            </div>

            <div className="py-4 rounded-lg h-full flex flex-col justify-between">
                {/* Notification Options */}
                <div className="notification-options space-y-4">
                    <NotificationOption
                        title="General Notifications"
                        descriptions={[
                            "Important updates and announcements.",
                            "Changes in terms of service or privacy policy."
                        ]}
                        toggleStates={[generalNotificationsEnabled, generalNotificationsUpdatesEnabled]}
                        handleToggles={[
                            setGeneralNotificationsEnabled,
                            setGeneralNotificationsUpdatesEnabled
                        ]}
                    />
                    <NotificationOption
                        title="Content Recommendations"
                        descriptions={[
                            "Recommendations based on your  browsing history.",
                            "Allow new content to your favorite categories or genres.",
                            "Mentions of your username or handle in public posts."
                        ]}
                        toggleStates={[contentRecommendationsEnabled, activityBasedRecommendationsEnabled, toggleThree]}
                        handleToggles={[
                            setContentRecommendationsEnabled,
                            setActivityBasedRecommendationsEnabled,
                            setToggleThree
                        ]}
                    />
                    <NotificationOption
                        title="Account Security"
                        descriptions={[
                            "Account activity alerts (e.g., suspicious login attempts).",
                            "Successful login attempts from new devices or locations."
                        ]}
                        toggleStates={[accountSecurityEnabled, passwordChangeNotificationEnabled]}
                        handleToggles={[
                            setAccountSecurityEnabled,
                            setPasswordChangeNotificationEnabled
                        ]}
                    />
                    <NotificationOption
                        title="Billing and Subscription"
                        descriptions={[
                            "Upcoming subscription renewals and payment reminders.",
                            "Changes in subscription pricing or plan upgrades."
                        ]}
                        toggleStates={[billingSubscriptionEnabled, renewalReminderEnabled]}
                        handleToggles={[
                            setBillingSubscriptionEnabled,
                            setRenewalReminderEnabled
                        ]}
                    />
                    <NotificationOption
                        title="Feedback and Surveys"
                        descriptions={[
                            "Participate in user research studies or usability testing.",
                            "Your feedback leads to improvements on the platform."
                        ]}
                        toggleStates={[feedbackSurveysEnabled, postTransactionFeedbackEnabled]}
                        handleToggles={[
                            setFeedbackSurveysEnabled,
                            setPostTransactionFeedbackEnabled
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};



interface NotificationOptionProps {
    title: string;
    descriptions: string[]; // Array of descriptions
    toggleStates: boolean[]; // Array of toggle states
    handleToggles: React.Dispatch<React.SetStateAction<boolean>>[]; // Array of toggle handlers
}

const NotificationOption: React.FC<NotificationOptionProps> = ({
    title,
    descriptions,
    toggleStates,
    handleToggles
}) => {
    return (
        <div className="notification-option w-[520px] h-auto border-gradient p-4 rounded-lg flex flex-col justify-between">
            <p className="text-[#FFFFFF99] text-[16px]">{title}:</p>
            {descriptions.map((description, index) => (
                <div key={index} className="switch-label flex items-center mt-2">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={toggleStates[index]}
                                onChange={() => handleToggles[index](prev => !prev)} // Toggle the respective state
                                color="primary"
                            />
                        }
                        label={''}
                        className="text-white"
                    />
                    <p className="text-white ml-[15px]">{description}</p> {/* 15px gap */}
                </div>
            ))}
        </div>
    );
};
// import { Alert, Snackbar } from '@mui/material';
// import axios from 'axios';
// import { allCountries } from 'country-region-data';
// import Cookies from 'js-cookie';
// import { useEffect, useState } from 'react';
// import Select from 'react-select';
// import ImageIcon from '../../assets/images/image-icon.svg';
// import '../developer/dev.scss';

// const CreatorDetails = () => {
//     const [activeTab, setActiveTab] = useState('Apps');
//     const [priceTab, setPriceTab] = useState('free');
//     const [creatorName, setCreatorName] = useState('');
//     const [email, setEmail] = useState('');
//     const [category, setCategory] = useState('');
//     const [tags, setTags] = useState([]);
//     const [productImages, setProductImages] = useState([]);
//     const [productDemo, setProductDemo] = useState('');
//     const [pricing, setPricing] = useState('Free');
//     const [userType, setUserType] = useState('');
//     const [youtubeLink, setYoutubeLink] = useState('');
//     const [linkedInLink, setLinkedInLink] = useState('');
//     const [websiteLink, setWebsiteLink] = useState('');
//     const [errorInputField, setErrorInputField] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isEditon, setEditOn]: any = useState(false);
//     const [developerState, setDeveloperState]: any = useState('');
//     const [developerCountry, setDeveloperCountry]: any = useState('');
//     const [stateInfo, setStateInfo] = useState('');
//     const [countryInfo, setCountryInfo] = useState('');
//     const [developerZipcode, setDeveloperZipcode]: any = useState('');
//     const [phoneNumber, setPhoneNumber]: any = useState('');
//     const [snackOpen, setSnackOpen] = useState(false);
//     const [images, setImages] = useState([
//         1
//     ])
//     const [demoVideos, setDemoVideos] = useState([
//         1, 2, 3, 4, 5
//     ])

//     const [industry, setIndustry]: any = useState('');
//     const [industryExp, setIndustryExp]: any = useState('');
//     const [instagram, setInstagram]: any = useState('');

//     const SnackBar = () => {
//         return (
//             <Snackbar
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                 open={snackOpen} autoHideDuration={6000} onClose={() => { setSnackOpen(false) }}>
//                 <Alert
//                     onClose={() => { setSnackOpen(false) }}
//                     severity="success"
//                     variant="filled"
//                     sx={{ width: '100%' }}
//                 >
//                     Profile updated successfully
//                 </Alert>
//             </Snackbar>
//         )
//     }

//     const handleTabClick = (tab: string) => {
//         setActiveTab(tab);
//     };
//     const handlePriceTabClick = (tab: string) => {
//         setPriceTab(tab);
//     };

//     useEffect(() => {
//         let token = Cookies.get('authToken');
//         if (token) {
//             let headers = {
//                 Authorization: `Bearer ${token}`
//             }
//             axios.get('https://api.lusso.dev/api/v1/userProfile', { headers: headers })
//                 .then((response) => {
//                     console.log('response', response);
//                     let apiResponse = response?.data;
//                     setCreatorName(apiResponse?.username ?? '-');
//                     setUserType(apiResponse?.type ?? 'user');
//                     setEmail(apiResponse?.email ?? '-');
//                     setPhoneNumber(apiResponse?.phonenumber ?? '-');
//                     setDeveloperCountry(apiResponse?.country ?? '-');
//                     setDeveloperState(apiResponse?.state ?? '-');
//                     setCountryInfo(apiResponse?.country ?? '-');
//                     setStateInfo(apiResponse?.state ?? '-');
//                     setDeveloperZipcode(apiResponse?.zipcode ?? '-');
//                     if (apiResponse.companyInfo !== null) {
//                         let companyInfo = apiResponse.companyInfo;
//                         setIndustry(companyInfo?.industry ?? '-');
//                         setIndustryExp(companyInfo?.industryExpertise ?? '-');
//                         setYoutubeLink(companyInfo?.youtubeLink ?? '-');
//                         setInstagram(companyInfo?.instagram ?? '-');
//                         setLinkedInLink(companyInfo?.linkedIn ?? '-');
//                         setWebsiteLink(companyInfo?.websiteLink ?? '-');
//                     }

//                 })
//                 .catch((error) => {
//                     console.log('error', error)
//                 })
//         }
//     }, [])
//     const [regions, setRegions] = useState<OptionType[]>([]);

//     type OptionType = {
//         value: string;
//         label: string;
//     };
//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // const files: File[] = Array.from(e.target.files || []);
//         // setProductImages(files);
//     };

//     const handleCountryChange = (selectedOption: {
//         label: string;
//         value: string;
//     }) => {
//         setDeveloperCountry(selectedOption);
//         setCountryInfo(selectedOption.label);
//         setDeveloperState(null); // Clear region selection when country changes

//         const countryData = allCountries.find(
//             item => item[0] === selectedOption.label,
//         );
//         if (countryData && countryData[2].length > 0) {
//             const regionOptions = countryData[2].map(region => ({
//                 value: region[1],
//                 label: region[0],
//             }));
//             setRegions(regionOptions);
//         } else {
//             setRegions([]);
//         }
//     };

//     const handleRegionChange = (selectedOption: any) => {
//         setStateInfo(selectedOption.label);
//         setDeveloperState(selectedOption);
//     };

//     const countryOptions = allCountries.map(country => ({
//         value: country[1],
//         label: country[0],
//     }));

//     const handleSave = () => {
//         // Add validations
//         if (!validateFields()) return;
//         // Add your save logic here
//         let requestBody;
//         if (userType !== "developer") {
//             requestBody = {
//                 'state': stateInfo,
//                 'country': countryInfo,
//                 'zipcode': developerZipcode,
//             };
//         } else {
//             requestBody = {
//                 'state': stateInfo,
//                 'country': countryInfo,
//                 'zipcode': developerZipcode,
//                 'industryExpertise': industryExp,
//                 'industry': industry,
//                 'instagram': instagram,
//                 'youtubeLink': youtubeLink,
//                 'websiteLink': websiteLink,
//                 'linkedIn': linkedInLink
//             };
//         }

//         let token = Cookies.get('authToken');
//         if (token) {
//             let headers = {
//                 Authorization: `Bearer ${token}`
//             }
//             axios.put('https://api.lusso.dev/api/v1/updateProfile', requestBody, { headers: headers }).then((response) => {
//                 console.log('Updated Profile successfully')
//                 setSnackOpen(true);
//             })
//                 .catch((error) => {
//                     console.log('Error in updating profile');
//                 })
//         }
//     };

//     const erase = () => {
//         setErrorInputField('');
//         setErrorMessage('');
//     }

//     const customStyles = {
//         control: (provided: any, state: any) => ({
//             ...provided,
//             borderRadius: 50,
//             border: `1px solid #A768FD`,
//             backgroundColor: 'none',
//             color: '#FFFFFF99',
//             minHeight: 48,
//             marginTop: 10
//         }),
//         singleValue: (provided: any) => ({
//             ...provided,
//             color: '#FFFFFF99',
//         }),
//         placeholder: (provided: any) => ({
//             ...provided,
//             color: '#FFFFFF99',
//         }),
//         menu: (provided: any) => ({
//             ...provided,
//             background: 'rgba(4, 4, 4)',
//             borderRadius: 10,
//         }),
//         option: (provided: any, state: any) => ({
//             ...provided,
//             background: state.isFocused
//                 ? 'rgba(167, 104, 253, 0.8)'
//                 : 'rgba(4, 4, 4)',
//             color: '#FFFFFF99',
//         }),
//     };

//     const validateFields = () => {
//         // Add validations for all fields
//         // For example:
//         if (!creatorName.trim()) {
//             setErrorInputField('creatorName');
//             setErrorMessage('Product name is required');
//             return false;
//         }
//         // Add more validations for other fields as needed
//         return true;
//     };

//     return (
//         <div className="container price-background-banner">
//             <div className="left"></div>
//             <div className="right">
//                 <div className='text-white font-bold text-[20px]'>
//                     <span>Creator Details</span>
//                 </div>
//                 <div>
//                     <div className="horizontal-divider-light mt-4 mb-4"></div>
//                 </div>
//                 <div className='flex flex-row gap-24 field-row-container'>
//                     <div className="flex flex-1 flex-col gap-y-6">
//                         <div>
//                             <label className='flex  flex-col'>
//                                 <span className='text-white font-normal text-[14px]'>Creator Name <span style={{ color: 'red' }}>*</span></span>
//                                 {
//                                     isEditon ?
//                                         <input
//                                             type="text"
//                                             autoComplete="off"
//                                             placeholder="Enter creator name"
//                                             className="ac-frm-input rounded-pill badge h-[50px]"
//                                             value={creatorName || ""}
//                                             style={{
//                                                 borderRadius: 50,
//                                                 border: `1px solid ${errorInputField === 'creatorName' ? '#F04438' : '#A768FD'}`,
//                                                 background: 'rgba(4, 4, 4, 0.20)',
//                                                 marginTop: 10
//                                             }}
//                                             onChange={(e) => {
//                                                 setCreatorName(e.target.value);
//                                                 erase();
//                                             }}
//                                         />
//                                         :
//                                         <span className='text-white font-normal text-[14px]'>{creatorName} </span>
//                                 }
//                             </label>
//                             {errorInputField === 'creatorName' &&
//                                 <span className='errorField'>{errorMessage}</span>
//                             }
//                         </div>
//                         <div>
//                             <label className='flex flex-col'>
//                                 <span className='text-white font-normal text-[14px]'>Email<span style={{ color: 'red' }}>*</span></span>
//                                 {
//                                     isEditon ?
//                                         <input
//                                             type="text"
//                                             autoComplete="off"
//                                             placeholder="Enter email"
//                                             className="ac-frm-input rounded-pill badge h-[50px]"
//                                             value={email || ""}
//                                             style={{
//                                                 borderRadius: 16,
//                                                 border: `1px solid ${errorInputField === 'email' ? '#F04438' : '#A768FD'}`,
//                                                 background: 'rgba(4, 4, 4, 0.20)',
//                                                 marginTop: 10
//                                             }}
//                                             onChange={(e) => { setEmail(e.target.value); erase(); }}
//                                         />
//                                         :
//                                         <span className='text-white font-normal text-[14px]'>{email}</span>
//                                 }
//                             </label>
//                             {errorInputField === 'email' &&
//                                 <span className='errorField'>{errorMessage}</span>
//                             }
//                         </div>
//                     </div>
//                     <div className="flex flex-1 flex-col gap-y-6 justify-between">
//                         <div>
//                             <label>
//                                 <span className='text-white font-normal text-[14px]'>Profile Picture/Avatar<span style={{ color: 'red' }}>*</span></span>
//                                 <div className='flex flex-row gap-2 pt-4'>
//                                     {
//                                         images.map((image) => {
//                                             return (
//                                                 <div style={{
//                                                     padding: 8, borderRadius: 5,
//                                                     border: '0.625px solid rgba(255, 255, 255, 0.34)',
//                                                     background: 'rgba(255, 255, 255, 0.06)'
//                                                 }}>
//                                                     <img src={ImageIcon} alt="" />
//                                                 </div>
//                                             )
//                                         })
//                                     }
//                                 </div>
//                             </label>
//                         </div>
//                         <div>
//                             <label className='flex flex-col'>
//                                 <span className='text-white font-normal text-[14px]'>Phone <span style={{ color: 'red' }}>*</span></span>
//                                 {
//                                     isEditon ?
//                                         <input
//                                             type="text"
//                                             autoComplete="off"
//                                             placeholder="Enter Phone number"
//                                             className="ac-frm-input rounded-pill badge h-[50px]"
//                                             value={phoneNumber || ""}
//                                             style={{
//                                                 borderRadius: 16,
//                                                 border: `1px solid ${errorInputField === 'email' ? '#F04438' : '#A768FD'}`,
//                                                 background: 'rgba(4, 4, 4, 0.20)',
//                                                 marginTop: 10
//                                             }}
//                                             onChange={(e) => { setPhoneNumber(e.target.value); erase(); }}
//                                         />
//                                         :
//                                         <span className='text-white font-normal text-[14px]'>{phoneNumber}</span>
//                                 }
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='pt-8 pb-3'>
//                     <span className='text-white font-semibold text-[18px]'>Address</span>
//                 </div>
//                 <div>
//                     <div className="horizontal-divider-light mb-4"></div>
//                 </div>
//                 <div className='flex flex-row gap-24 field-row-container'>
//                     <div className="flex flex-1 flex-col gap-y-6">
//                         <div>
//                             <label className='flex flex-col'>
//                                 <span className='text-white font-normal text-[14px]'>Country<span style={{ color: 'red' }}>*</span></span>
//                                 {
//                                     isEditon ?
//                                         <Select
//                                             // className="ac-frm-select-input rounded-pill badge h-[50px]"
//                                             value={developerCountry}
//                                             styles={customStyles}
//                                             options={countryOptions}
//                                             onChange={handleCountryChange}
//                                         />
//                                         :
//                                         <span className='text-white font-normal text-[14px]'>{developerCountry}</span>
//                                 }
//                             </label>
//                             {errorInputField === 'category' &&
//                                 <span className='errorField'>{errorMessage}</span>
//                             }
//                         </div>
//                         <div>
//                             <label className='flex flex-col'>
//                                 <span className='text-white font-normal text-[14px]'>State<span style={{ color: 'red' }}>*</span></span>
//                                 {
//                                     isEditon
//                                         ?
//                                         <Select
//                                             // className="ac-frm-select-input rounded-pill badge h-[50px]"
//                                             value={developerState}
//                                             styles={customStyles}
//                                             options={regions}
//                                             onChange={handleRegionChange}
//                                         />
//                                         :
//                                         <span className='text-white font-normal text-[14px]'>{developerState}</span>
//                                 }
//                             </label>
//                             {errorInputField === 'category' &&
//                                 <span className='errorField'>{errorMessage}</span>
//                             }
//                         </div>
//                     </div>
//                     <div className='flex flex-1'>
//                         <label className='flex-1 flex flex-col'>
//                             <span className='text-white font-normal text-[14px]'>Zipcode<span style={{ color: 'red' }}>*</span></span>
//                             {
//                                 isEditon ?
//                                     <input
//                                         type="text"
//                                         autoComplete="off"
//                                         placeholder="Enter ZipCode"
//                                         className="ac-frm-input rounded-pill badge h-[50px]"
//                                         value={developerZipcode || ""}
//                                         style={{
//                                             borderRadius: 16,
//                                             border: `1px solid ${errorInputField === 'email' ? '#F04438' : '#A768FD'}`,
//                                             background: 'rgba(4, 4, 4, 0.20)',
//                                             marginTop: 10
//                                         }}
//                                         onChange={(e) => { setDeveloperZipcode(e.target.value); erase(); }}
//                                     />
//                                     // <select
//                                     //     className="ac-frm-select-input rounded-pill badge h-[50px]"
//                                     //     value={category || ""}
//                                     //     style={{
//                                     //         borderRadius: 50,
//                                     //         border: `1px solid ${errorInputField === 'category' ? '#F04438' : '#A768FD'}`,
//                                     //         background: 'rgba(4, 4, 4, 0.20)',
//                                     //         marginTop: 10,
//                                     //         width:'100%'
//                                     //     }}
//                                     //     onChange={(e) => {setCategory(e.target.value); erase();}}
//                                     // >
//                                     //     <option value="">Select zipcode</option>
//                                     //     <option value="USA">USA</option>
//                                     //     <option value="Canada">Canada</option>
//                                     //     <option value="UK">UK</option>
//                                     // </select>
//                                     :
//                                     <span className='text-white font-normal text-[14px]'>{developerZipcode}</span>
//                             }
//                         </label>
//                         {errorInputField === 'category' &&
//                             <span className='errorField'>{errorMessage}</span>
//                         }
//                     </div>
//                 </div>
//                 {userType === 'developer' && (<>
//                     <div className='pl-3 pt-6 pb-3'>
//                         <span className='text-white font-semibold text-[18px]'>Additional Information</span>
//                     </div>
//                     <div>
//                         <div className="horizontal-divider-light mb-4"></div>
//                     </div>
//                     <div className='flex flex-row gap-24'>
//                         <div className="flex flex-1 flex-col gap-y-6">
//                             <div>
//                                 <label className='flex flex-col'>
//                                     <span className='text-white font-normal text-[14px]'>Industry<span style={{ color: 'red' }}>*</span></span>
//                                     {
//                                         isEditon ?
//                                             <input
//                                                 type="text"
//                                                 autoComplete="off"
//                                                 placeholder="Enter Industry"
//                                                 className="ac-frm-input rounded-pill badge h-[50px]"
//                                                 value={industry || ""}
//                                                 style={{
//                                                     borderRadius: 50,
//                                                     border: `1px solid ${errorInputField === 'industry' ? '#F04438' : '#A768FD'}`,
//                                                     background: 'rgba(4, 4, 4, 0.20)',
//                                                     marginTop: 10
//                                                 }}
//                                                 onChange={(e) => {
//                                                     setIndustry(e.target.value);
//                                                     erase();
//                                                 }}
//                                             />
//                                             :
//                                             <span className='text-white font-normal text-[14px]'>{industry}</span>
//                                     }
//                                 </label>
//                                 {errorInputField === 'appStoreLink' &&
//                                     <span className='errorField'>{errorMessage}</span>
//                                 }
//                             </div>
//                             <div>
//                                 <label className='flex flex-col'>
//                                     <span className='text-white font-normal text-[14px]'>Your Website<span style={{ color: 'red' }}>*</span></span>
//                                     {
//                                         isEditon ?
//                                             <input
//                                                 type="text"
//                                                 autoComplete="off"
//                                                 placeholder="Enter your website link"
//                                                 className="ac-frm-input rounded-pill badge h-[50px]"
//                                                 value={websiteLink || ""}
//                                                 style={{
//                                                     borderRadius: 50,
//                                                     border: `1px solid ${errorInputField === 'websiteLink' ? '#F04438' : '#A768FD'}`,
//                                                     background: 'rgba(4, 4, 4, 0.20)',
//                                                     marginTop: 10
//                                                 }}
//                                                 onChange={(e) => {
//                                                     setWebsiteLink(e.target.value);
//                                                     erase();
//                                                 }}
//                                             />
//                                             :
//                                             <span className='text-white font-normal text-[14px]'>{websiteLink}</span>
//                                     }
//                                 </label>
//                                 {errorInputField === 'appStoreLink' &&
//                                     <span className='errorField'>{errorMessage}</span>
//                                 }
//                             </div>
//                             <div>
//                                 <label className='flex flex-col'>
//                                     <span className='text-white font-normal text-[14px]'>LinkedIn<span style={{ color: 'red' }}>*</span></span>
//                                     {
//                                         isEditon ?
//                                             <input
//                                                 type="text"
//                                                 autoComplete="off"
//                                                 placeholder="Enter Linkedin link"
//                                                 className="ac-frm-input rounded-pill badge h-[50px]"
//                                                 value={linkedInLink || ""}
//                                                 style={{
//                                                     borderRadius: 50,
//                                                     border: `1px solid ${errorInputField === 'linkedInLink' ? '#F04438' : '#A768FD'}`,
//                                                     background: 'rgba(4, 4, 4, 0.20)',
//                                                     marginTop: 10
//                                                 }}
//                                                 onChange={(e) => {
//                                                     setLinkedInLink(e.target.value);
//                                                     erase();
//                                                 }}
//                                             />
//                                             :
//                                             <span className='text-white font-normal text-[14px]'>{linkedInLink}</span>
//                                     }
//                                 </label>
//                                 {errorInputField === 'appStoreLink' &&
//                                     <span className='errorField'>{errorMessage}</span>
//                                 }
//                             </div>
//                         </div>
//                         <div className='flex-1 flex flex-col gap-y-6'>
//                             <div>
//                                 <label className='flex flex-col'>
//                                     <span className='text-white font-normal text-[14px]'>Industry Expertise<span style={{ color: 'red' }}>*</span></span>
//                                     {
//                                         isEditon
//                                             ?
//                                             <input
//                                                 type="text"
//                                                 autoComplete="off"
//                                                 placeholder="Enter industry expertise"
//                                                 className="ac-frm-input rounded-pill badge h-[50px]"
//                                                 value={industryExp || ""}
//                                                 style={{
//                                                     borderRadius: 50,
//                                                     border: `1px solid ${errorInputField === 'industryExp' ? '#F04438' : '#A768FD'}`,
//                                                     background: 'rgba(4, 4, 4, 0.20)',
//                                                     marginTop: 10
//                                                 }}
//                                                 onChange={(e) => {
//                                                     setIndustryExp(e.target.value);
//                                                     erase();
//                                                 }}
//                                             />
//                                             :
//                                             <span className='text-white font-normal text-[14px]'>{
//                                                 industryExp
//                                             }
//                                             </span>
//                                     }
//                                 </label>
//                                 {errorInputField === 'playStoreLink' &&
//                                     <span className='errorField'>{errorMessage}</span>
//                                 }
//                             </div>
//                             <div>
//                                 <label className='flex flex-col'>
//                                     <span className='text-white font-normal text-[14px]'>Youtube<span style={{ color: 'red' }}>*</span></span>
//                                     {
//                                         isEditon
//                                             ?
//                                             <input
//                                                 type="text"
//                                                 autoComplete="off"
//                                                 placeholder="Enter youtube link"
//                                                 className="ac-frm-input rounded-pill badge h-[50px]"
//                                                 value={youtubeLink || ""}
//                                                 style={{
//                                                     borderRadius: 50,
//                                                     border: `1px solid ${errorInputField === 'youtubeLink' ? '#F04438' : '#A768FD'}`,
//                                                     background: 'rgba(4, 4, 4, 0.20)',
//                                                     marginTop: 10
//                                                 }}
//                                                 onChange={(e) => {
//                                                     setYoutubeLink(e.target.value);
//                                                     erase();
//                                                 }}
//                                             />
//                                             :
//                                             <span className='text-white font-normal text-[14px]'>{youtubeLink}</span>
//                                     }
//                                 </label>
//                                 {errorInputField === 'youtubeLink' &&
//                                     <span className='errorField'>{errorMessage}</span>
//                                 }
//                             </div>
//                             <div>
//                                 <label className='flex flex-col'>
//                                     <span className='text-white font-normal text-[14px]'>Instagram<span style={{ color: 'red' }}>*</span></span>
//                                     {
//                                         isEditon ?
//                                             <input
//                                                 type="text"
//                                                 autoComplete="off"
//                                                 placeholder="Enter Instagram link"
//                                                 className="ac-frm-input rounded-pill badge h-[50px]"
//                                                 value={instagram || ""}
//                                                 style={{
//                                                     borderRadius: 50,
//                                                     border: `1px solid ${errorInputField === 'instagram' ? '#F04438' : '#A768FD'}`,
//                                                     background: 'rgba(4, 4, 4, 0.20)',
//                                                     marginTop: 10
//                                                 }}
//                                                 onChange={(e) => {
//                                                     setInstagram(e.target.value);
//                                                     erase();
//                                                 }}
//                                             />
//                                             :
//                                             <span className='text-white font-normal text-[14px]'>{instagram}</span>
//                                     }
//                                 </label>
//                                 {errorInputField === 'instagram' &&
//                                     <span className='errorField'>{errorMessage}</span>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </>)}
//                 <div>
//                     <div className="horizontal-divider-light-full mt-8"></div>
//                 </div>
//                 <div className='flex flex-row justify-center items-center'>
//                     <div className='flex flex-row justify-center items-center gap-12 add-product-btn-container'>
//                         <button
//                             onClick={() => {
//                                 if (isEditon) {
//                                     setEditOn(false);
//                                 }
//                             }}
//                             className="saveContinue mt-10"
//                             style={{
//                                 borderRadius: 50,
//                                 border: '1px solid #FFF',
//                                 textTransform: 'capitalize',
//                                 paddingLeft: 36,
//                                 paddingRight: 36,
//                                 flex: 1,
//                                 whiteSpace: "nowrap"
//                             }}
//                         >
//                             Back
//                         </button>
//                         <button
//                             className="saveContinue mt-10"
//                             onClick={() => {
//                                 if (!isEditon) {
//                                     setEditOn(true);
//                                 }

//                                 if (isEditon) {
//                                     handleSave();
//                                 }
//                             }}
//                             style={{
//                                 borderRadius: 50,
//                                 border: '1px solid #A768FD',
//                                 background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
//                                 textTransform: 'capitalize',
//                                 paddingLeft: 36,
//                                 paddingRight: 36,
//                                 flex: 1,
//                                 whiteSpace: "nowrap"

//                             }}
//                         >
//                             {
//                                 isEditon ?
//                                     'Save'
//                                     :
//                                     'Edit Details'

//                             }
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {
//                 <SnackBar />
//             }
//         </div>
//     )
// };

// export default CreatorDetails;
