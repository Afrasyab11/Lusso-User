import { allCountries } from "country-region-data";
import { useEffect, useState } from 'react';
import UserAvator from '../../../components/common/UserAvator';
import Button from '../../../components/ui/Button';
import Dropdown from "../../../components/ui/Dropdown";
import Input from '../../../components/ui/Input';
import { apiEndpoints } from '../../../constants/api-endpoints';
import { ICON_ENUM } from '../../../constants/icons.constant';
import useEncryptionHook from "../../../hooks/useEncryption";
import makeApiCall from '../../../lib/apiCall';
import { checkNullOrEmpty, setCookies } from "../../../utils/utils";
import '../../developer/dev.scss';
import { creatorValidatInput, creatorValidator } from '../validation';
import { toast } from "react-toastify";


const validationSchema = {
    error: false,
    errorMessage: '',
    required: true,
};
const initialState = {
    orgType: "",
    fullName: "",
    creatorName: '',
    email: '',
    phoneNumber: '',
    state: '',
    zipCode: '',
    address: '',
    country: "",
    apt: '',
    city: '',
    createPassword: "",
    newPassword: "",
    confirmPassword: ""
};

const passwordState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}

const ManageProfile = () => {
    const { encrypt } = useEncryptionHook();

    const [profile, setProfileData] = useState<{ [key: string]: any }>({});
    const [stateOptions, setStateOptions] = useState<any>([]);
    const [formData, setFormData] = useState(initialState);
    const [passFormData, setPassFormData] = useState(passwordState);
    const [isLoading, setIsLoading] = useState(false)
    const [passValidation, setPassValidation] = useState({
        oldPassword: {
            error: false,
            errorMessage: '',
            required: true,
            field: 'old password',
        },
        newPassword: {
            error: false,
            errorMessage: '',
            required: true,
            type: 'password',
            field: 'new password',
        },
        confirmPassword: {
            error: false,
            errorMessage: '',
            required: true,
            field: 'confirm password',
        },
    });

    const [validation, setValidation] = useState({
        orgType: {
            ...validationSchema,
            field: 'organization type',
        },
        creatorName: {
            ...validationSchema,
            field: 'creator name',
        },
        email: {
            ...validationSchema,
            type: 'email',
            field: 'email',
        },
        phoneNumber: {
            ...validationSchema,
            type: 'phone',
            field: 'phone',
        },
        state: {
            ...validationSchema,
            field: 'state',
        },
        zipCode: {
            ...validationSchema,
            minLength: 5,
            type: 'number',
            field: 'zip code',
        },
        fullName: {
            ...validationSchema,
            field: 'full name',
        },
        country: {
            ...validationSchema,
            field: 'country',
        },
        address: {
            ...validationSchema,
            field: 'address',
        },
        city: {
            ...validationSchema,
            field: 'city',
        },
    });

    useEffect(() => {
        fetchCreatorProfile()
    }, []);

    const fetchCreatorProfile = async () => {
        const resp = await makeApiCall(apiEndpoints.userProfile);
        const data: any = {
            fullName: resp?.fullName,
            creatorName: resp?.channelName ?? '',
            email: resp?.email ?? '',
            phoneNumber: resp?.phoneNumber ?? '',
            state: resp?.state ?? '',
            zipCode: resp?.zipcode ?? '',
            address: resp?.address ?? '',
            country: resp?.country ?? '',
            city: resp?.city ?? '',
            apt: resp?.aptSuite ?? "",
            orgType: resp?.businessCategory ?? '',
        }
        setFormData(data)
        const country = resp?.country ?? '';
        const stateOptions = getStateOptions(country);
        setStateOptions(stateOptions);
        setProfileData(resp ?? {})
        if (resp) {
            setCookies('authUser', resp)
        }
    }
    const getStateOptions = (country: string) => {
        const countryData = allCountries?.find(item => item[0] === country);
        if (countryData && countryData[2]?.length > 0) {
            return countryData[2].map((region: any) => ({
                value: region[1],
                label: region[0],
            }));
        }
        return [];
    }
    const updateProfile = async () => {
        let content = { ...apiEndpoints.updateProfile }
        // const payload = {
        content.payload.fullName = formData?.fullName ?? "";
        content.payload.userName = formData?.creatorName ?? "";
        content.payload.phoneNumber = formData?.phoneNumber ?? ""
        content.payload.country = formData?.country ?? "";
        content.payload.zipcode = formData?.zipCode ?? "";
        content.payload.state = formData?.state ?? "";
        content.payload.address = formData?.address ?? "";
        content.payload.city = formData?.city ?? "";
        content.payload.aptSuite = formData?.apt ?? "";
        content.payload.businessWebsiteUrl = profile?.businessWebsiteUrl ?? "";
        content.payload.businessCategory = formData?.orgType ?? "";
        content.payload.businessType = profile?.businessType ?? "";
        content.payload.businessDescription = profile?.businessDescription ?? "";
        content.payload.channelName = formData?.creatorName ?? "";
        // }
        setIsLoading(true);
        const resp = await makeApiCall(content);
        if (resp) {
            toast.success(resp?.message ? resp?.message : 'Profile update successful', { theme: 'dark' })

            if (checkNullOrEmpty(profile?.analyticsId)) {
                makeApiCall(apiEndpoints.createBrand)
                    .then(brandId => {
                        if (brandId) {
                            let newContent = { ...apiEndpoints.updateBrandName };
                            newContent.params.path.brandId = brandId;
                            newContent.params.query.name = formData?.creatorName ?? '';
                            makeApiCall(newContent);
                            fetchCreatorProfile()
                        }
                    })
                    .catch(error => console.error('create brand error: ', error));
            } else {
                fetchCreatorProfile()
            }
        }
        setIsLoading(false);
    }

    const onChange = async (e: any) => {
        const { name, value } = e.target;
        const newVal = value//.trim();

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
        if (name !== "email" && specialCharRegex.test(newVal)) {
            return; // Ignore updates with special characters
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: newVal,
        }));
        const newValidation = await creatorValidatInput(
            newVal,
            validation[name as keyof typeof validation],
        );
        setValidation(prevValidation => ({
            ...prevValidation,
            [name]: {
                ...prevValidation[name as keyof typeof validation],
                ...newValidation,
            },
        }));

    };
    useEffect(() => {
        if (formData?.zipCode) {
            validateZipCode(formData?.zipCode);
        }
    }, [formData.zipCode]);
    const validateZipCode = async (zipCode: string) => {
        const newValidation = await creatorValidatInput(
            zipCode,
            validation?.zipCode
        );
        setValidation(prevValidation => ({
            ...prevValidation,
            zipCode: {
                ...prevValidation.zipCode,
                ...newValidation,
            },
        }));
    };
    const onChangePassHandle = async (e: any) => {
        const { name, value } = e.target;
        const newVal = value.trim();
        setPassFormData(prevData => ({
            ...prevData,
            [name]: newVal,
        }));
        const newValidation = await creatorValidatInput(
            newVal,
            passValidation[name as keyof typeof passValidation],
        );
        setPassValidation(prevValidation => ({
            ...prevValidation,
            [name]: {
                ...prevValidation[name as keyof typeof passValidation],
                ...newValidation,
            },
        }));
    };

    const onUpdatePassword = async () => {
        try {
            const valid = await creatorValidator(passFormData, passValidation);
            setPassValidation(prev => ({ ...prev, ...valid.validation }));

            if (valid.isValid) {
                const newPassValid = passFormData?.newPassword === passFormData?.confirmPassword;
                if (newPassValid) {
                    setIsLoading(true);

                    const oldEncryptedPass = encrypt(passFormData.oldPassword)
                    const newEncryptedPass = encrypt(passFormData.newPassword)

                    let content = { ...apiEndpoints.updatePassword };
                    content.payload.oldPassword = oldEncryptedPass;
                    content.payload.newPassword = newEncryptedPass;

                    const resp = await makeApiCall(content);
                    setIsLoading(false);
                    setPassFormData(passwordState);

                    console.log('Password updated successfully:', resp);
                } else {
                    setPassValidation({
                        ...passValidation,
                        confirmPassword: {
                            ...passValidation.confirmPassword,
                            error: true,
                            errorMessage: "Confirm password must match the new password",
                        },
                    });
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating password:', error);
            setPassValidation(prev => ({
                ...prev,
                apiError: {
                    error: true,
                    errorMessage: 'An error occurred while updating the password. Please try again.',
                },
            }));
        } finally {
            setIsLoading(false)
        }
    };



    // const onCountryChange = async (selectedOption: any) => {
    //     const newCountry = selectedOption?.label || "";

    //     setFormData((prevData) => ({
    //         ...prevData,
    //         country: newCountry === '' ? null : newCountry,
    //     }));
    //     const newValidation = await creatorValidatInput(
    //         newCountry,
    //         validation["country"]
    //     );
    //     setValidation((prevValidation) => ({
    //         ...prevValidation,
    //         country: {
    //             ...prevValidation["country"],
    //             ...newValidation,
    //         },
    //     }));

    //     const countryData = allCountries?.find(
    //         (item: any) => item[0] === newCountry
    //     );

    //     if (countryData && countryData[2]?.length > 0) {
    //         const stateOptions = countryData[2]?.map((region: any) => ({
    //             value: region[1],
    //             label: region[0],
    //         }));
    //         setStateOptions(stateOptions);
    //     } else {
    //         setStateOptions([]);
    //     }
    // };


    const handleSaveFormData = async () => {
        const validations = await creatorValidator(formData, validation);
        setValidation((prevValidation) => ({
            ...prevValidation,
            ...validations.validation,
        }));
        if (validations?.isValid) {
            await updateProfile();
        }
    };

    const handleOrgTypeChange = (selectedOption: any) => {
        setFormData((prevData) => ({
            ...prevData,
            orgType: selectedOption ? selectedOption.value : "",
        }));
    };

    const countryOptions = allCountries?.map((country: any) => ({
        value: country[1],
        label: country[0],
    }));

    const onCountryChange = async (selectedOption: any) => {
        const newCountry = selectedOption?.label || "";

        setFormData((prevData) => ({
            ...prevData,
            country: newCountry,
        }));

        const newValidation = await creatorValidatInput(
            newCountry,
            validation["country"]
        );
        setValidation((prevValidation) => ({
            ...prevValidation,
            country: {
                ...prevValidation["country"],
                ...newValidation,
            },
        }));

        const countryData = allCountries?.find(
            (item: any) => item[0] === newCountry
        );

        if (countryData && countryData[2]?.length > 0) {
            const stateOptions = countryData[2].map((region: any) => ({
                value: region[1],
                label: region[0],
            }));
            setStateOptions(stateOptions);
        } else {
            setStateOptions([]);
        }
    };

    const onStateChange = async (selectedOption: any) => {
        const newState = selectedOption?.label || "";

        setFormData((prevData) => ({
            ...prevData,
            state: newState,
        }));

        const newValidation = await creatorValidatInput(
            newState,
            validation["state"]
        );
        setValidation((prevValidation) => ({
            ...prevValidation,
            state: {
                ...prevValidation["state"],
                ...newValidation,
            },
        }));
    };

    const orgOptions = [
        { value: 'Individual', label: 'Individual' },
        { value: 'Organization', label: 'Organization' }
    ];

    return (
        <div className="creator-details-container p-4">
            {/* Heading */}
            <div className="text-white font-bold text-[24px] mb-8">
                <span className="bg-gradient-to-r from-[#985FFF] to-[#FF99EF] bg-clip-text text-transparent">
                    Manage Profile
                </span>
            </div>

            {/* Main Settings Section */}
            <div className="settings-grid flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-6">
                    <div className="card-bg-dev flex flex-col md:flex-col gap-5 lg:flex-row md:justify-center lg:justify-between items-center py-10 px-16 rounded-lg">
                        <div className="flex flex-col md:flex-row items-center md:space-x-10 gap-5 md:gap-0">
                            <UserAvator className="w-[130px] h-[131px] md:w-auto rounded-full border-4 border-sky-500" />

                            <div className="profile-info text-[#FFFFFF99] flex flex-col justify-center md:justify-start items-center md:items-start">
                                <p className="text-xl capitalize">{checkNullOrEmpty(profile?.fullName) ? profile?.channelName ?? '' : profile?.fullName}</p>
                                <p>{profile?.businessType ?? ''}</p>
                            </div>
                        </div>
                        <Button
                            label="Edit Picture"
                            className="bg-gradient-vertical"
                            icon={{
                                position: 'start',
                                component: (
                                    <img
                                        src={ICON_ENUM.EDIT.icon}
                                        width="24px"
                                        height="24px"
                                        alt="edit"
                                    />
                                ),
                            }}
                        // onClick={handleNavigation}
                        />
                    </div>

                    {/* General Settings Card */}
                    <div className="card-bg-dev p-10 rounded-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col lg:border-r lg:border-r-[#6C8CFF80] lg:pr-10 space-y-10">
                                <p className="profile-info text-[#FFFFFF99]">Organization</p>
                                <div className="space-y-3">
                                    <div>
                                        {/* <label className="block text-sm font-medium text-white mb-2">
                                            Organization Type
                                        </label>
                                        <Select
                                            name="orgType"
                                            value={orgOptions?.find((i) => i?.label === formData?.orgType)}
                                            options={orgOptions}
                                            classNamePrefix="react-select"
                                            styles={customStyles}
                                            placeholder="Organization"
                                            onChange={handleOrgTypeChange}
                                        /> */}
                                        <Dropdown
                                            label="Organization Type"
                                            name="orgType"
                                            value={orgOptions?.find((i) => i?.label === formData?.orgType)}
                                            options={orgOptions}
                                            // options={[
                                            //     { value: '', label: 'Please Select' },
                                            //     ...orgOptions,
                                            // ]}
                                            // value={
                                            //     formData?.orgType
                                            //         ? orgOptions?.find((i) => i?.label === formData?.orgType)
                                            //         : { value: '', label: 'Please Select' }
                                            // }
                                            placeholder="Select Organization"
                                            borderColor="var(--outline, #6C8CFF80)"
                                            required
                                            error={validation?.orgType?.error ?? false}
                                            errorMessage={validation?.orgType?.errorMessage ?? ''}
                                            onChange={handleOrgTypeChange}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="profile-info text-[#FFFFFF99]">Creator Details</p>
                                    <Input
                                        label="Creator Name"
                                        name="creatorName"
                                        borderColor="#6C8CFF80"
                                        className="text-[#FFFFFF99]"
                                        value={formData?.creatorName ?? ''}
                                        onChange={onChange}
                                        error={validation?.creatorName?.error ?? false}
                                        errorMessage={validation?.creatorName?.errorMessage ?? ''}
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        borderColor="#6C8CFF80"
                                        disabled
                                        value={formData?.email ?? ''}
                                        onChange={onChange}
                                        error={validation?.email?.error ?? false}
                                        errorMessage={validation?.email?.errorMessage ?? ''}
                                        required
                                    />
                                    <Input
                                        label="Phone"
                                        name="phoneNumber"
                                        borderColor="#6C8CFF80"
                                        value={formData?.phoneNumber ?? ''}
                                        onChange={onChange}
                                        error={validation?.phoneNumber?.error ?? false}
                                        errorMessage={validation?.phoneNumber?.errorMessage ?? ''}
                                        required
                                    />
                                </div>
                                <p className="profile-info text-[#FFFFFF99]">Legal Name and Country</p>
                                <div className="space-y-3">
                                    <Input
                                        label="Full Name"
                                        name="fullName"
                                        borderColor="#6C8CFF80"
                                        value={formData?.fullName ?? ''}
                                        onChange={onChange}
                                        error={validation?.fullName?.error ?? false}
                                        errorMessage={validation?.fullName?.errorMessage ?? ''}
                                        required
                                        maxLength={30}
                                    />
                                    <div>
                                        {/* <label className="block text-sm font-medium text-white mb-2">
                                            Country/region
                                        </label>
                                        <Select
                                            value={countryOptions?.find((i) => i?.label === formData?.country)}
                                            name="country"
                                            options={countryOptions}
                                            classNamePrefix="react-select"
                                            styles={customStyles}
                                            placeholder="Select Country"
                                            onChange={onCountryChange}
                                        /> */}
                                        <Dropdown
                                            label="Country/Region"
                                            name="country"
                                            options={countryOptions}
                                            value={countryOptions?.find((i) => i?.label === formData?.country)}
                                            // options={[
                                            //     { value: '', label: 'Please Select' },
                                            //     ...countryOptions,
                                            // ]}
                                            // value={
                                            //     formData?.country
                                            //         ? countryOptions?.find((i) => i?.label === formData?.country)
                                            //         : { value: '', label: 'Please Select' }
                                            // }
                                            placeholder="Select Country"
                                            borderColor="var(--outline, #6C8CFF80)"
                                            required
                                            error={validation?.country?.error ?? false}
                                            errorMessage={validation?.country?.errorMessage ?? ''}
                                            onChange={onCountryChange}
                                        />

                                    </div>
                                </div>
                            </div>
                            {isLoading && (
                                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                                </div>
                            )}
                            <div className="flex flex-col lg:ps-10 space-y-10">
                                <p className="profile-info text-[#FFFFFF99]">Additional Details</p>
                                <div className="space-y-3">
                                    <Input
                                        label="Street Address"
                                        name="address"
                                        borderColor="#6C8CFF80"
                                        value={formData?.address ?? ''}
                                        onChange={onChange}
                                        error={validation?.address?.error ?? false}
                                        errorMessage={validation?.address?.errorMessage ?? ''}
                                        required
                                    />
                                    <Input
                                        label="Apt, Suite... (Optional)"
                                        name="apt"
                                        borderColor="#6C8CFF80"
                                        value={formData?.apt ?? ''}
                                        onChange={onChange}
                                    // error={validation?.apt?.error ?? false}
                                    // errorMessage={validation?.apt?.errorMessage ?? ''}
                                    />

                                    <Input
                                        label="City"
                                        name="city"
                                        borderColor="#6C8CFF80"
                                        value={formData?.city ?? ''}
                                        onChange={onChange}
                                        error={validation?.city?.error ?? false}
                                        errorMessage={validation?.city?.errorMessage ?? ''}
                                        required
                                    />
                                </div>
                                <div className="flex justify-between space-x-5">
                                    {/* <Input
                                        label="State"
                                        name="state"
                                        borderColor="#6C8CFF80"
                                        value={formData?.state ?? ''}
                                        onChange={onChange}
                                        error={validation?.state?.error ?? false}
                                        errorMessage={validation?.state?.errorMessage ?? ''}
                                        required
                                    /> */}
                                    <div className="flex-1">
                                        {/* <label className="block text-sm font-medium text-white mb-3">
                                            State
                                        </label>
                                        <Select
                                            name="state"
                                            value={stateOptions?.find((i: any) => i?.label === formData?.state)}
                                            options={stateOptions}
                                            classNamePrefix="react-select"
                                            styles={customStyles}
                                            placeholder="Please State"
                                            onChange={onStateChange}
                                        /> */}
                                        <Dropdown
                                            label="State"
                                            name="state"
                                            value={stateOptions?.find((i: any) => i?.label === formData?.state)}
                                            options={stateOptions}
                                            placeholder="Select State"
                                            borderColor="var(--outline, #6C8CFF80)"
                                            required
                                            error={validation?.state?.error ?? false}
                                            errorMessage={validation?.state?.errorMessage ?? ''}
                                            onChange={onStateChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Zip Code"
                                            name="zipCode"
                                            borderColor="#6C8CFF80"
                                            value={formData?.zipCode ?? ''}
                                            onChange={onChange}
                                            error={validation?.zipCode?.error ?? false}
                                            errorMessage={validation?.zipCode?.errorMessage ?? ''}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button
                                        label="Save"
                                        className="bg-gradient-vertical hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition duration-300"
                                        onClick={handleSaveFormData}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card-bg-dev p-10 rounded-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col lg:pr-10 space-y-10">
                                <div className="space-y-3">
                                    <p className="profile-info text-[#FFFFFF99]">Change Password</p>
                                    <Input
                                        type="password"
                                        label="Old Password"
                                        name="oldPassword"
                                        borderColor="#6C8CFF80"
                                        className="text-[#FFFFFF99]"
                                        value={passFormData?.oldPassword ?? ''}
                                        onChange={onChangePassHandle}
                                        error={passValidation?.oldPassword?.error ?? false}
                                        errorMessage={passValidation?.oldPassword?.errorMessage ?? ''}
                                        required
                                    />

                                </div>
                            </div>
                            <div className="flex flex-col lg:ps-10 space-y-5">
                                <Input
                                    type="password"
                                    label="New Password"
                                    name="newPassword"
                                    borderColor="#6C8CFF80"
                                    value={passFormData?.newPassword ?? ''}
                                    onChange={onChangePassHandle}
                                    error={passValidation?.newPassword?.error ?? false}
                                    errorMessage={passValidation?.newPassword?.errorMessage ?? ''}
                                    required
                                />

                                <Input
                                    type="password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    borderColor="#6C8CFF80"
                                    value={passFormData?.confirmPassword ?? ''}
                                    onChange={onChangePassHandle}
                                    error={passValidation?.confirmPassword?.error ?? false}
                                    errorMessage={passValidation?.confirmPassword?.errorMessage ?? ''}
                                    required
                                />

                            </div>
                        </div>
                        <div className="flex mt-10 justify-end">
                            <Button
                                label="Save"
                                className="bg-gradient-vertical"
                                onClick={onUpdatePassword}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ManageProfile;
