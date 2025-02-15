import axios from 'axios';
import { allCountries } from 'country-region-data';
import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import showCustomToast from '../../components/common/CustomToast';
import { OptionType } from '../../components/common/select';
import Dropdown from '../../components/ui/Dropdown';
import Input from '../../components/ui/SettingInput';
import { getCookies } from '../../utils/utils';


const UserFields = ({ isEdit, setIsEdit }: any) => {
    const [userProfile, setUserProfile] = useState<any>({});
    const [editedProfile, setEditedProfile] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [stateOptions, setStateOptions] = useState<any>([]);
    const [ageError, setAgeError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<any>({});

    const getCustomStyles = (invalidField?: string): StylesConfig<OptionType> => ({
        control: (provided, state) => ({
            ...provided,
            borderRadius: '50px',
            border: `1px solid ${invalidField === 'credserror' ? '#F04438' : '#6C8CFF80'}`,
            backgroundColor: 'rgba(46, 36, 108, 0.1)',
            color: '#FFFFFF99',
            minHeight: 48,
            paddingLeft: 8,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#FFFFFF99',
            paddingLeft: 8,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#FFFFFF99',
            paddingLeft: 8,
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderRadius: 0,
            border: 'none',
            boxShadow: 'none',
            padding: 0,
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgba(167, 104, 253, 1)' : '#1d1447', // Background color for each option
            borderRadius: '50px',
            color: '#FFFFFF99',
            padding: '8px 12px',
            border: '1px solid rgb(182 138 255 / 99%)',
            marginBottom: '1px',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    });

    const styles = getCustomStyles(ageError ? 'credserror' : '');

    const ageGroupOptions = [
        { value: '', label: 'Select your age' },
        { value: '18-24', label: '18-24' },
        { value: '24-60', label: '24-60' },
        { value: '60+', label: '60+' },
    ]
    useEffect(() => {
        if (navigator.onLine) {
            getUserProfile();
        } else {
            console.warn('No internet connection');
        }
    }, []);

    useEffect(() => {
        setEditedProfile(userProfile);
    }, [userProfile]);

    const countryOptions = allCountries?.map((country: any) => ({
        value: country[1],
        label: country[0],
    }));

    const onCountryChange = (selectedOption: any) => {
        const newCountry = selectedOption?.label || '';

        setEditedProfile((prevProfile: any) => ({
            ...prevProfile,
            country: newCountry,
            state: '',
        }));

        const countryData = allCountries?.find(
            (item: any) => item[0] === newCountry,
        );

        if (countryData && countryData[2]?.length > 0) {
            const newStateOptions = countryData[2].map((region: any) => ({
                value: region[1],
                label: region[0],
            }));
            setStateOptions(newStateOptions);
        } else {
            setStateOptions([]);
        }
    };

    const onStateChange = (selectedOption: any) => {
        const newState = selectedOption?.label || '';
        setEditedProfile((prevProfile: any) => ({
            ...prevProfile,
            state: newState,
        }));
    };

    const getUserProfile = async () => {
        try {
            let token = getCookies('authToken');
            if (token) {
                let userDataResponse = await axios.get(
                    'https://api.lusso.dev/api/v1/userProfile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (userDataResponse) {
                    setUserProfile(userDataResponse.data);
                    setEditedProfile(userDataResponse.data);
                    // Set state options based on the user's country
                    if (userDataResponse.data.country) {
                        const countryData = allCountries?.find(
                            (item: any) => item[0] === userDataResponse.data.country,
                        );
                        if (countryData && countryData[2]?.length > 0) {
                            console.log(countryData, 'countryData')
                            const newStateOptions = countryData[2].map((region: any) => ({
                                value: region[1],
                                label: region[0],
                            }));
                            setStateOptions(newStateOptions);
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const validateAgeRange = (ageRange: string) => {
        const [start, end] = ageRange.split('-').map(Number);
        return (
            !isNaN(start) &&
            !isNaN(end) &&
            start >= 18 &&
            start <= 60 &&
            end >= 18 &&
            end <= 60 &&
            start <= end
        );
    };

    const validateFields = () => {
        const errors: any = {};
        const usernameRegex = /^[a-zA-Z0-9 _]*$/;

        if (!editedProfile.username?.trim()) {
            errors.username = 'Name is required.';
        } else if (!usernameRegex.test(editedProfile.username)) {
            errors.username = 'Name cannot contain special characters.';
        }

        if (!editedProfile.email?.trim()) {
            errors.email = 'Email is required.';
        } else {
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(editedProfile.email)) {
                errors.email = 'Please enter a valid email address.';
            }
        }

        if (!editedProfile.country?.trim()) {
            errors.country = 'Country is required.';
        }

        if (!editedProfile.state?.trim()) {
            errors.state = 'State is required.';
        }

        if (!editedProfile.ageGroup?.trim()) {
            errors.ageGroup = 'Age group is required.';
        } else if (!validateAgeRange(editedProfile.ageGroup)) {
            errors.ageGroup = 'Please enter a valid age between 18 and 60.';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const updatedUserProfile = async () => {
        if (!validateFields()) return;

        try {
            setAgeError(null);
            setLoading(true);
            let token = getCookies('authToken');
            let userDataResponse = await axios.put(
                'https://api.lusso.dev/api/v1/updateProfile',
                {
                    userName: editedProfile.username,
                    state: editedProfile.state,
                    country: editedProfile.country,
                    email: editedProfile.email,
                    ageGroup: editedProfile.ageGroup,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (userDataResponse) {
                setLoading(false);
                showCustomToast(userDataResponse?.data?.message, '#2F2386', 'white');
                getUserProfile();
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    const handleCancel = () => {
        setEditedProfile(userProfile);
        setIsEdit(false);
        setAgeError(null);
    };
    const handleAgeGroupChange = (selectedOption: any) => {
        const sanitizedValue = selectedOption?.value || '';
        setEditedProfile((prevProfile: any) => ({
            ...prevProfile,
            ageGroup: sanitizedValue,
        }));

        if (!sanitizedValue || validateAgeRange(sanitizedValue)) {
            setAgeError(null);
        } else {
            setAgeError('Please select a valid age range between 18 and 60.');
        }
    };
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFieldErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: undefined, // Clear error for the current field
        }));

        if (name === 'ageGroup') {
            const sanitizedValue = value.replace(/[^0-9-]/g, '');
            const [start, end] = sanitizedValue.split('-');

            if (start && start.length > 2) return;
            if (end && end.length > 2) return;

            setEditedProfile((prevProfile: any) => ({
                ...prevProfile,
                [name]: sanitizedValue,
            }));

            if (!sanitizedValue || validateAgeRange(sanitizedValue)) {
                setAgeError(null);
            } else {
                setAgeError('Please enter a valid age between 18 and 60.');
            }
        } else if (name === 'username') {
            const sanitizedValue = value.replace(/[^a-zA-Z\s-]/g, '').slice(0, 25);

            setEditedProfile((prevProfile: any) => ({
                ...prevProfile,
                [name]: sanitizedValue,
            }));
        } else {
            setEditedProfile((prevProfile: any) => ({
                ...prevProfile,
                [name]: value,
            }));
        }
    };

    return (
        <div className="rounded-2xl bg-gradient-to-r md:bg-none from-[#251E54] via-[#251E54] to-[#15dcfc57] p-[1px]">
            <div className="card-bg-dev rounded-2xl p-5 md:p-8 text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <Input
                        label="Name"
                        name="username"
                        value={editedProfile?.username}
                        placeholder="Enter your name"
                        onChange={handleInputChange}
                        readOnly={!isEdit}
                        required
                    />
                    {fieldErrors.username && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.username}</p>
                    )}
                </div>
                <div className="lg:col-span-2">
                    <Input
                        label="Email"
                        type="email"
                        value={editedProfile?.email}
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        readOnly={true}
                        required
                    />
                    {fieldErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                </div>

                <div className="z-10">
                    <Dropdown
                        label="Country/Region"
                        name="country"
                        options={countryOptions}
                        value={countryOptions?.find(
                            i => i?.label === editedProfile?.country,
                        )}
                        placeholder="Select Country"
                        borderColor="var(--outline, #6C8CFF80)"
                        required
                        onChange={onCountryChange}
                        disabled={!isEdit}
                    />
                    {fieldErrors.country && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.country}</p>
                    )}
                </div>
                <div>
                    <Dropdown
                        label="State"
                        name="state"
                        value={stateOptions?.find(
                            (i: any) => i?.label === editedProfile?.state,
                        )}
                        options={stateOptions}
                        placeholder="Select State"
                        borderColor="var(--outline, #6C8CFF80)"
                        required
                        onChange={onStateChange}
                        disabled={!isEdit}
                    />
                    {fieldErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.state}</p>
                    )}
                </div>

                <div className="lg:col-span-2">
                    {/* <Input
                        label="Age group"
                        value={editedProfile?.ageGroup}
                        name="ageGroup"
                        onChange={handleInputChange}
                        placeholder="Enter age group"
                        readOnly={!isEdit}
                        required
                    /> */}
                    <label>
                        <span className="text-white font-normal text-[14px]">Age Group<span className="text-[#F04438] ms-1">*</span></span>
                        <div className="AgeGroup"
                            style={{
                                //     // zIndex: 999,
                                position: 'relative',
                                //     display: 'inline-block',
                                //     width: '100%' /* Adjust width as needed */,
                            }}
                        >
                            <Select
                                isDisabled={!isEdit}
                                // className='z-40'
                                value={ageGroupOptions?.find(e => e?.value === editedProfile?.ageGroup)}
                                onChange={handleAgeGroupChange}
                                styles={styles}
                                options={ageGroupOptions}
                                placeholder="Select your age group"
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
                    {/* {ageError && <p className="text-red-500 text-sm mt-1">{ageError}</p>} */}
                    {fieldErrors.ageGroup && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.ageGroup}</p>
                    )}
                </div>

                {isEdit && (
                    <div className="flex gap-3 md:gap-12">

                        <button
                            type="button"
                            onClick={() => {
                                updatedUserProfile();
                            }}
                            className="bg-gradient-vertical w-full text-white uppercase rounded-lg px-3 py-2 h-[50px] flex justify-center items-center border focus:outline-none text-base font-normal transition-all min-w-[170px]"
                            style={{
                                borderRadius: 50,
                                border: 'none',
                                background: loading
                                    ? 'linear-gradient(178deg, #4300bd 6.78%, #792fff 46.97%, #ff77b0 98.12%)'
                                    : '',
                                textTransform: 'capitalize',
                                // paddingLeft: 50,
                                // paddingRight: 50,
                                position: 'relative',
                            }}
                            disabled={loading}
                        >
                            {loading && (
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
                            {!loading ? 'Save Changes' : ''}
                        </button>

                        <button
                            className="w-full md:w-fit px-3 md:px-8 py-2 rounded-3xl border-2 bg-transparent text-sm md:text-lg"
                            style={{
                                border: '2px solid var(--accent1, #7D3CF3)',
                                backgroundColor: 'transparent',
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                )
                }
            </div >
        </div >
    );
};


export default UserFields;

