import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../../assets/images/LussoAiLogo.svg';
import CustomStepper from '../../../components/stepper/CustomStepper';
import { stepsArr } from '../../../components/stepper/Stepper';
import useEncryptionHook from '../../../hooks/useEncryption';
import { cn } from '../../../lib/utils';
import {
    checkNullOrEmpty,
    getCookies,
    setCookies,
    tokenDecode,
} from '../../../utils/utils';
import AddressForm from '../AddressFormComp';
import ContactInfo from '../ContactInfoComp';
import CreatePassword from '../CreatePasswordComp';
import CreativeName from '../CreativeNameComp';
import '../dev.scss';
import OrganizationalType from '../OrganizationalTypeComp';
import { creatorValidatInput, creatorValidator } from '../validation';

interface ValidationStep {
    [key: string]: {
        error: boolean;
        errorMessage: string;
        required: boolean;
        type?: undefined | string;
        field?: string;
        equalLength?: number;
    };
}

interface FormValidation {
    [key: number]: ValidationStep;
}

const emailOtpValue = {
    error: false,
    errorMessage: '',
    required: true,
    field: 'OTP',
    equalLength: 6,
};

const DeveloperOrgStepper = () => {
    const { encrypt } = useEncryptionHook();

    const isMobile = window?.innerWidth < 768;
    const navigate = useNavigate();
    const [emailOtpErr, setEmailOtpErr] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [activeStep, setActiveStep] = useState(0);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [highestStepVisited, setHighestStepVisited] = useState(0);
    const [formData, setFormData] = useState({
        orgType: 'ORGANIZATION',
        email: '',
        password: '',
        businessType: '',
        businessWebsiteUrl: '',
        businessDescription: '',
        operationalLocation: '',
        channelName: '',
        businessCategory: '',
        city: '',
        address: '',
        aptSuit: '',
        country: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        fullName: '',
        username: '',
        emailVerify: false,
        emailOtp: false,
        emailOtpValue: '',
        phoneOtpValue: '',
        phoneVerify: false,
        phoneOtp: false,
        confirmedPassword: '',
        acceptTermsAndConditions: true,
    });
    const [formValidation, setFormValidation] = useState<FormValidation>({
        0: {
            orgType: {
                error: false,
                errorMessage: '',
                required: true,
                field: 'organization type',
            },
        },
        1: {
            username: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'username',
                field: 'username',
            },
            acceptTermsAndConditions: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'checkbox',
                field: 'terms and conditions',
            },
        },
        2: {
            channelName: {
                error: false,
                errorMessage: '',
                required: true,
                field: 'Channel Name',
            },
            businessType: {
                error: false,
                errorMessage: '',
                required: true,
                field: 'business Type',
            },
            businessDescription: {
                error: false,
                errorMessage: '',
                required: true,
                field: 'business Description',
            },
            businessWebsiteUrl: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'url',
                field: 'businessWebsite Url',
            },
            address: {
                error: false,
                errorMessage: '',
                required: true,
                field: 'address',
            },
            country: { error: false, errorMessage: '', required: true },
            state: { error: false, errorMessage: '', required: true },
            city: { error: false, errorMessage: '', required: true, field: 'city' },
            zipCode: {
                error: false,
                errorMessage: '',
                required: true,
                equalLength: 5,
                type: 'number',
                field: 'zip code',
            },
            acceptTermsAndConditions: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'checkbox',
                field: 'terms and conditions',
            },
        },
        3: {
            email: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'email',
                field: 'email address',
            },
            password: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'password',
                field: 'password',
            },
            confirmedPassword: {
                error: false,
                errorMessage: '',
                required: false,
            },
            acceptTermsAndConditions: {
                error: false,
                errorMessage: '',
                required: true,
                type: 'checkbox',
                field: 'terms and conditions',
            },
        },
        4: {},
    });

    useEffect(() => {
        const savedState = localStorage.getItem('developerOrgStepperState');
        if (savedState) {
            const { formData: savedFormData, activeStep: savedActiveStep, highestStepVisited: savedHighestStep } = JSON.parse(savedState);
            setFormData(savedFormData);
            setActiveStep(savedActiveStep);
            setHighestStepVisited(savedHighestStep);
        }
    }, []);

    const saveState = (newFormData: any, newActiveStep: number) => {

        const newHighestStep = Math.max(newActiveStep, highestStepVisited);
        setHighestStepVisited(newHighestStep);
        localStorage.setItem('developerOrgStepperState', JSON.stringify({
            formData: newFormData,
            activeStep: newActiveStep,
            highestStepVisited: newHighestStep
        }));
    };

    const onChangeHandle = async (e: any) => {
        const { name, value, checked } = e.target;
        const newData = {
            ...formData,
            [name]: value,
        };

        setFormData(newData);
        saveState(newData, activeStep);

        const newVal =
            name === 'email'
                ? formData?.orgType === 'ORGANIZATION'
                    ? { ...formValidation[activeStep][name], type: 'organization_email' }
                    : { ...formValidation[activeStep][name], type: 'email' }
                : { ...formValidation[activeStep][name] };

        const newValidation = await creatorValidatInput(value, newVal);
        setFormValidation(prevValidation => ({
            ...prevValidation,
            [activeStep]: { ...prevValidation[activeStep], [name]: newValidation },
        }));
        if (name === 'confirmedPassword') {
            checkPassValidation(value);
        }
    };

    const onChangePropertyHandle = async (name: string, value: any) => {
        
        const newData = {
            ...formData,
            [name]: value,
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    

        saveState(newData, activeStep);


        const newValidation = await creatorValidatInput(
            value,
            formValidation[activeStep][name],
        );
        setFormValidation(prevValidation => ({
            ...prevValidation,
            [activeStep]: {
                ...prevValidation[activeStep],
                [name]: {
                    ...prevValidation[activeStep][name],
                    ...newValidation,
                },
            },
        }));
    };

    const onSavePassword = () => {
        const authToken = getCookies('authToken');
        if (!checkNullOrEmpty(authToken) && !checkNullOrEmpty(formData?.password)) {
            const encryptedPass = encrypt(formData?.password);
            axios
                .put(
                    'https://api.lusso.dev/api/v1/updatePassword',
                    { isNewUser: 'true', newPassword: encryptedPass },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    },
                )
                .then(response => {
                    console.log('onSavePassword:', response?.data);
                    setIsLoading(false);
                    localStorage.removeItem('developerOrgStepperState');
                    navigate('/devonboard/success');
                })
                .catch(error => {
                    setIsLoading(false);
                    console.error('Error:', error);
                });
        } else {
            setIsLoading(false);
        }
    };

    const verificationToken = () => {
        const authToken = getCookies('authToken');
        if (!checkNullOrEmpty(authToken)) {
            axios
                .post(
                    'https://api.lusso.dev/api/v1/sendEmailVerification',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    },
                )
                .then(response => {
                    console.log('sendEmailVerification:', response.data);
                    setFormData(prevData => ({
                        ...prevData,
                        emailOtp: true,
                        emailVerify: false,
                    }));
                    open();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const onSendVerificationHandle = async (email = true) => {
        let apiRequest = {
            username: formData?.username ?? '',
            email: formData?.email ?? '',
            password: '',
            state: formData?.state ?? '',
            country: formData?.country ?? '',
            zipcode: formData?.zipCode ?? '',
            phoneNumber: formData?.phoneNumber ?? '',
            fullName: formData?.fullName ?? '',
            creatorCategory: formData?.orgType ?? '',
            city: formData?.city ?? '',
            address: formData?.address ?? '',
            aptSuite: formData?.aptSuit ?? '',
            channelName: formData?.channelName ?? '',
            businessDescription: formData?.businessDescription ?? '',
            businessWebsiteUrl: formData?.businessWebsiteUrl ?? '',
            businessType: formData?.businessType ?? ''
        };
        axios
            .post('https://api.lusso.dev/api/v1/developer/register', apiRequest)
            .then(response => {
                let authToken = response.data?.token;
                const user = tokenDecode(authToken);
                console.log('tokenDecode', user);

                setCookies('authToken', authToken);
                setCookies('authUser', { ...user, username: formData?.username ?? '' });
                verificationToken();
            })
            .catch(error => {
                console.error('error', error);
                setFormValidation(prevValidation => ({
                    ...prevValidation,
                    [activeStep]: {
                        ...prevValidation[activeStep],
                        email: {
                            ...prevValidation[activeStep].email,
                            error: true,
                            errorMessage: error?.response?.data?.message,
                        },
                    },
                }));
            });
    };

    const onOtpVerify = () => {
        const authToken = getCookies('authToken');
        if (!checkNullOrEmpty(authToken) && !checkNullOrEmpty(formData?.emailOtpValue)) {
            const encryptedOtp = encrypt(formData?.emailOtpValue)
            axios
                .post(
                    'https://api.lusso.dev/api/v1/verifyEmail',
                    { token: encryptedOtp },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    },
                )
                .then(async response => {
                    console.log('onOtpVerify:', response.data);
                    setFormData(prevData => ({
                        ...prevData,
                        emailVerify: true,
                    }));
                    setVerifyEmail(true);
                    await onChangePropertyHandle('emailOtpValue', '');
                    await close();
                    setEmailOtpErr('');
                    toast('Email is Verified Successfully');
                })
                .catch(error => {
                    setEmailOtpErr(error?.response?.data?.message);
                    console.error('Error:', error);
                });
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    const checkPassValidation = (confirmedPassword = '') => {
        let isValid = checkNullOrEmpty(confirmedPassword)
            ? formData?.password === formData?.confirmedPassword
            : formData?.password === confirmedPassword;
        setFormValidation(prevValid => ({
            ...prevValid,
            [activeStep]: {
                ...prevValid[activeStep],
                confirmedPassword: {
                    ...prevValid[activeStep].confirmedPassword,
                    error: !isValid,
                    errorMessage: isValid
                        ? ''
                        : 'Re-Enter password must be match with password',
                },
            },
        }));
        return isValid ?? false;
    };

    const onNextHandle = async () => {
        const newVali =
            activeStep === 4 && formData?.emailOtp
                ? { ...formValidation[activeStep], emailOtpValue }
                : formValidation[activeStep];


        const validation = await creatorValidator(formData, newVali);


        setFormValidation(prevValidation => ({
            ...prevValidation,
            [activeStep]: { ...validation.validation },
        }));

        if (validation?.isValid) {
            setIsLoading(true);
            if (activeStep === 3) {
                const isValidPass = checkPassValidation();
                if (isValidPass) {
                    onSavePassword();
                }
            } else {
                setIsLoading(false);
                setActiveStep(prevStep => {
                    const newStep = prevStep + 1;
                    saveState(formData, newStep);
                    return newStep;
                });
            }
        }
    };

    const getSteps = () => {
        return (
            <>
                <div className="w-full md:w-3/4 pl-12">
                    <CustomStepper
                        steps={stepsArr}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        highestStepVisited={highestStepVisited}
                        onComplete={handleCompletion}
                    />
                </div>
            </>
        );
    };

    const getFormSection = () => {
        return (
            <>
                <div
                    className={`md:self-end self-auto ${activeStep === 2 && 'text-right-align'}`}
                >
                    <Link to="/">
                        <img
                            src={Logo}
                            className="mobileRes"
                            alt="Logo"
                            style={{
                                width: activeStep === 2 ? 'auto' : '100%',
                                height: 'auto',
                            }}
                        />
                    </Link>
                </div>

                {activeStep === 2 && !isMobile ? (
                    <div className="flex justify-center my-14">{getSteps()}</div>
                ) : (
                    getSteps())}

                <div className="flex flex-col gap-10 text-white w-full">
                    {activeStep === 0 ? (
                        <OrganizationalType
                            data={formData}
                            validation={formValidation[activeStep] ?? {}}
                            onChange={onChangeHandle}
                        />
                    ) : activeStep === 1 ? (
                        <CreativeName
                            data={formData}
                            validation={formValidation[activeStep] ?? {}}
                            onChange={onChangeHandle}
                        />
                    ) : activeStep === 2 ? (
                        <AddressForm
                            data={formData}
                            validation={formValidation[activeStep] ?? {}}
                            onChange={onChangeHandle}
                            onChangeProperty={onChangePropertyHandle}

                        />
                    ) : activeStep === 3 ? (
                        <ContactInfo
                            data={formData}
                            validation={formValidation[activeStep] ?? {}}
                            onChange={onChangeHandle}
                            onChangeProperty={onChangePropertyHandle}
                            onSendCode={onSendVerificationHandle}
                            onResendCode={verificationToken}
                            verifyEmail={verifyEmail}
                            onOtpVerify={onOtpVerify}
                            opened={opened}
                            open={open}
                            close={close}
                            emailOtpErr={emailOtpErr}
                            setEmailOtpErr={setEmailOtpErr}
                        />
                    ) : activeStep === 4 ? (
                        <CreatePassword
                            data={formData}
                            validation={formValidation[activeStep] ?? {}}
                            onChange={onChangeHandle}
                        />
                    ) : null}
                    <div className={`flex justify-center gap-2.5`}>
                        <button
                            type="button"
                            onClick={() => {
                                if (activeStep > 0) {
                                    setActiveStep(prevStep => {
                                        const newStep = prevStep - 1;
                                        saveState(formData, newStep);
                                        return newStep;
                                    });
                                    setVerifyEmail(false);
                                } else {
                                    window.history.go(-1);
                                    return false;
                                }
                            }}
                            className="py-2.5 px-8 shadow-[0px_1px_2px_0px_#1018280D] border border-[#A768FD] rounded-2xl bg-transparent text-white transition-all duration-300 hover:text-[#F572B6] hover:shadow-lg"
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={onNextHandle}
                            className="hidden md:block border hover:bg-custom-gradient border-[#A768FD] rounded-3xl bg-gradient-to-r from-[#4B03CE] to-[#F572B6] py-2.5 px-16"
                        >
                            Next
                        </button>
                        <button
                            type="button"
                            onClick={onNextHandle}
                            className="block md:hidden border border-[#A768FD] rounded-3xl bg-gradient-to-r from-[#4B03CE] to-[#F572B6] py-2.5 px-16"
                            disabled={isLoading || (activeStep === 3 && !formData?.emailOtp)}
                        >
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="loader"></div>
                                </div>
                            )}
                            {!isLoading ? 'Next' : ''}
                        </button>
                    </div>
                    {(activeStep === 1 || activeStep === 3) && (
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                                {formValidation[activeStep]?.acceptTermsAndConditions
                                    ?.error && (
                                        <span className="errorField">
                                            {formValidation[activeStep]?.acceptTermsAndConditions
                                                ?.errorMessage ?? ''}
                                        </span>
                                    )}
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={formData?.acceptTermsAndConditions}
                                        onChange={() =>
                                            onChangePropertyHandle(
                                                'acceptTermsAndConditions',
                                                !formData?.acceptTermsAndConditions,
                                            )
                                        }
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className={cn(
                                            'w-5 h-5 border rounded-sm bg-[#353057]',
                                            formValidation[activeStep]?.acceptTermsAndConditions
                                                ?.error
                                                ? 'border-rose-600'
                                                : 'border-[#464070]',
                                        )}
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-sm text-[#C1C1C1] select-none break-all">
                                        I have read and accept{' '}
                                        <span className="text-[#5E91FF]">Terms and conditions</span>{' '}
                                        and{' '}
                                        <span className="text-[#5E91FF] inline-block">
                                            privacy policy
                                        </span>
                                    </p>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    };

    const handleCompletion = () =>
        'You have successfully completed all the steps!';

    return (
        <div className="container background-banner h-screen" style={{ display: 'flex' }}>
            <div
                className={`left flex flex-col justify-end gap-5 p-24`}
                style={{ flex: 1 }}
            >
                <h3 className="font-extrabold text-[#FFF] tracking-[.3em] text-2xl flex flex-col">
                    CREATOR <span className="text-[#00FFFF]">ONBOARDING</span>
                </h3>

                <p className="text-[#E1E1E1] w-[400px] h-[96px] font-medium text-[20px] leading-[24px]">
                    Welcome to our AI-powered platform! Upload your products to unlock
                    tailored marketing services, including engaging social media posts and
                    insightful analytics that boost your visibility and reach.
                </p>
            </div>

            <div className={`right opacity-95 flex flex-col gap-20 stepper overflow-y-scroll`} style={{ flex: 2 }}>
                {activeStep === 2 && !isMobile ? (
                    <div className="w-full overflow-y-scroll h-[100vh] scrollbar-hide">
                        <div className="w-[100%]">{getFormSection()}</div>
                    </div>
                ) : (
                    getFormSection()
                )}
            </div>
        </div>
    );
};

export default DeveloperOrgStepper;

