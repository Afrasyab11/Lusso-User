import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertPopup from '../../components/common/AlertPopup';
import UserAvator from '../../components/common/UserAvator';
import { apiEndpoints } from '../../constants/api-endpoints';
import { validatePasswords } from '../../hooks/common.utils';
import useEncryptionHook from '../../hooks/useEncryption';
import makeApiCall from '../../lib/apiCall';
import { getCookies, setCookies } from '../../utils/utils';
import SettingDrawer from '../userProfile/components/settingDrawer/settingDrawer';
import { PasswordFormData } from '../userProfile/types/types';
import SwitchComponent from './components/SwitchComponent';
import { AccountItems, billItems, ContentItems, feedbackItems, generalItems } from './components/switchItems';
import './settings.scss';
import { Edit } from 'lucide-react';

const initialState: PasswordFormData = {
    oldPassword: "",
    newPassword: '',
    confirmPassword: '',
}

const Settings = () => {
    const navigate = useNavigate();
    const { encrypt } = useEncryptionHook();

    const [opened, { open, close }] = useDisclosure(false);
    const [passOpened, { open: openPass, close: closePass }] = useDisclosure(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [devAuthentication, setDevAuthentication] = useState({
        popup: false,
        message: '',
        redirect: '',
        title: ""
    });
    const [profile, setProfileData] = useState<{ [key: string]: any }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [deletProcess, setDeletProcess] = useState(false);
    const [check, setCheck]: any = useState(false);
    const [checked, setChecked] = useState(true);
    const [formData, setFormData] = useState<PasswordFormData>(initialState);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [toastError, setToastError] = useState("")
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });




    const passhandleCancel = () => {
        close();
        closePass()
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };
    const handleSubmit = async () => {
        if (!validateInputs()) return;
        // alert("hittint")

        const currentEncryptedPass = encrypt(currentPassword)
        const newEncryptedPass = encrypt(newPassword)

        try {
            setLoading(true);
            let token = getCookies('authToken');
            let passwordUpdateResponse = await axios.put('https://api.lusso.dev/api/v1/updatePassword', {
                isNewUser: "false",
                oldPassword: currentEncryptedPass,
                newPassword: newEncryptedPass
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (passwordUpdateResponse) {
                setLoading(false);
                toast.success('Password updated Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {
                        background: '#2E246C',
                        color: 'white',
                        fontWeight: 700,
                        borderRadius: '8px',
                        padding: '16px',
                        marginTop: 50
                    }
                });
                passhandleCancel();
            }
        } catch (err: any) {
            setLoading(false);
            setToastError(err.response?.data?.message);
            setTimeout(() => {
                setToastError("");
            }, 2000);
        }
    };

    const onDeleteAccount = async () => {
        setDeletProcess(true)
        await makeApiCall(apiEndpoints?.deleteUser);
        await close()
        setDeletProcess(false)
        setDevAuthentication({
            popup: true,
            message: 'Account deleted',
            redirect: '/login',
            title: "Delete Account"
        });
    }

    const handleCancel = (flag: string) => {
        if (flag === "delete") {
            close();
        } else {
            closePass()

        }
    };

    const handleReasonChange = (event: any) => {
        setSelectedReason(event.target.value);
    };
    useLayoutEffect(() => {
        fetchCreatorProfile()
    }, []);

    const fetchCreatorProfile = async () => {
        const resp = await makeApiCall(apiEndpoints.userProfile);
        const data: any = {
            fullName: resp?.fullName,
            creatorName: resp?.channelName ?? '',
            email: resp?.email ?? '',
            phoneNumber: resp?.phoneNumber ?? '',
        }
        setFormData(data)
        setProfileData(resp ?? {})
        if (resp) {
            setCookies('authUser', resp)
        }
    }
    const handleCurrentPasswordChange = (val: string) => {
        setCurrentPassword(val);
        // setErrors(prev => ({ ...prev, currentPassword: "" }));
        setErrors(validatePasswords(val, newPassword, confirmPassword));

    };

    const handleNewPasswordChange = (val: string) => {
        setNewPassword(val);
        // setErrors(prev => ({ ...prev, newPassword: "" }));
        setErrors(validatePasswords(currentPassword, val, confirmPassword));
    };

    const handleConfirmPasswordChange = (val: string) => {
        setConfirmPassword(val);
        // setErrors(prev => ({ ...prev, confirmPassword: "" }));
        setErrors(validatePasswords(currentPassword, newPassword, val));
    };

    const validateInputs = () => {
        let isValid = true;
        const newErrors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        };

        // Validate Current Password
        if (!currentPassword) {
            newErrors.currentPassword = "Current Password is required.";
            isValid = false;
        } else {
            newErrors.currentPassword = ""; // No error
            isValid = true;
        }

        // Validate New Password
        if (newPassword === currentPassword) {
            newErrors.newPassword = "New Password must be different from Current Password.";
            isValid = false;
        } else if (!newPassword) {
            newErrors.newPassword = "New Password is required.";
            isValid = false;
        } else {
            newErrors.newPassword = ""; // No error
            isValid = true;
        }

        // Validate Confirm Password
        if (confirmPassword === currentPassword) {
            newErrors.confirmPassword = "Confirm Password must be different from Current Password.";
            isValid = false;
        } else if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required.";
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "New Password and Confirm Password must match.";
            isValid = false;
        } else {
            newErrors.confirmPassword = ""; // No error
            isValid = true;
        }


        setErrors(newErrors);
        return isValid;
    };
    const fields = [
        {
            label: "Reason for Leaving",
            name: "reason",
            type: "select",
            options: [
                { label: "Privacy concerns", value: "privacy" },
                { label: "Too many notifications", value: "notifications" },
                { label: "Switching to another platform", value: "switch" },
                { label: "Other", value: "other" }
            ],
            className: "",
            placeholder: "Select Reason",
            onChange: handleReasonChange
        },
    ];

    const buttons = [
        {
            label: "Delete Account",
            className: "bg-gradient-vertical px-4 py-2 text-white border border-0 rounded",
            onClick: onDeleteAccount
        },
        {
            label: "Cancel",
            className: "px-8 py-2 rounded border-2 bg-transparent",
            onClick: () => handleCancel("delete"),
            style: {
                border: '2px solid var(--accent1, #7D3CF3)',
                backgroundColor: 'transparent',
            }
        },
    ];

    const passButtons = [
        {
            label: "Save Changes",
            className: `bg-gradient-vertical px-4 py-2 text-white border border-0 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
            onClick: handleSubmit,
            disabled: loading,
        },
        {
            label: "Cancel",
            className: "px-8 py-2 rounded border-2 bg-transparent",
            onClick: passhandleCancel,
            style: {
                border: '2px solid var(--accent1, #7D3CF3)',
                backgroundColor: 'transparent',
            }
        },
    ];

    const passFields = [
        {
            label: "Current Password",
            name: "currentPassword",
            type: "password",
            onClick: handleCurrentPasswordChange,
            value: currentPassword,
            placeholder: "Current Password",
            className: "border border-gray-600 rounded p-2",
            error: errors.currentPassword,
            autoComplete: "new-password"
        },
        {
            label: "New Password",
            name: "newPassword",
            type: "password",
            onClick: handleNewPasswordChange,
            value: newPassword,
            placeholder: "New Password",
            className: "border border-gray-600 rounded p-2",
            error: errors.newPassword,
            autoComplete: "new-password"
        },
        {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            onClick: handleConfirmPasswordChange,
            value: confirmPassword,
            placeholder: "Confirm Password",
            className: "border border-gray-600 rounded p-2",
            error: errors.confirmPassword,
            autoComplete: "new-password"
        },
    ];


    return (
        <div className='creator-details-container md:p-4'>
            <AlertPopup
                open={devAuthentication?.popup}
                message={devAuthentication?.message}
                title={devAuthentication?.title}
                onClose={() => {
                    setDevAuthentication({ popup: false, message: '', redirect: '', title: "" })
                    navigate(devAuthentication?.redirect)
                }}
            />
            <SettingDrawer
                opened={opened}
                close={close}
                title="Delete Account"
                fields={fields}
                buttons={buttons}
            />
            <SettingDrawer
                opened={passOpened}
                close={close}
                title="Change Password"
                fields={passFields}
                buttons={passButtons}
                toastError={toastError}
            />
            <div className="text-white font-bold text-[24px] mb-8">
                <span className="bg-gradient-to-r from-[#985FFF] to-[#FF99EF] bg-clip-text text-transparent">
                    Settings
                </span>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='card-bg-dev flex flex-col rounded-lg lg:pr-10 space-y-10 px-5  lg:px-10 py-5'>
                    <div className='flex justify-between items-center'>
                        <h2 className="profile-info text-xl text-[#FFFFFF]">Personal Info</h2>
                        <button type='button'
                            onClick={() => navigate('/dev/manageprofile')}
                            className='w-fit flex gap-1 items-center text-white text-opacity-70 text-lg font-normal'>
                            <Edit size={16} /> Edit
                        </button>
                    </div>

                    <div className="grid grid-cols-12 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12  gap-6 md:gap-8">
                        <div className='col-span-12 md:col-span-4 lg:col-span-12 xl:col-span-4 flex justify-center lg:justify-center xl:justify-start'>
                            <UserAvator
                                className="object-contain border-4 max-h-[120px] max-w-[120px] border-sky-500 rounded-full"
                            />
                        </div>
                        <div className=" col-span-12 md:col-span-8 lg:col-span-12 xl:col-span-8  flex  flex-col items-center justify-center xl:justify-start xl:items-start gap-y-3 text-white/60">
                            <h1 className="text-2xl md:text-3xl font-medium">
                                {profile?.fullName || 'User Name'}
                            </h1>
                            <div className="space-y-2 text-sm md:text-base">
                                <p className="flex flex-row md:flex-row md:items-center gap-1 md:gap-2">
                                    <span className="text-white/40">Email:</span>
                                    <code className="font-mono">{profile?.email || 'N/A'}</code>
                                </p>
                                <p className="flex flex-row md:flex-row md:items-center gap-1 md:gap-2">
                                    <span className="text-white/40">Phone Number:</span>
                                    <code className="font-mono">{profile?.phoneNumber || 'N/A'}</code>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className='space-y-3 flex gap-12  align-middle'>
                        <div className=' align-middle' >
                            
                            <UserAvator className="object-contain border-4 border-sky-500 rounded-full" />
                        </div>
                        <div className='flex flex-col space-y-2 text-white align-middle' style={{ marginTop: "30px" }}>
                            <h1 className='font-normal text-3xl text-[#FFFFFF99]'>{profile?.fullName}</h1>
                            <p className='text-[#FFFFFF99]'>Email: <code>{profile?.email}</code></p>
                            <p className='text-[#FFFFFF99]'>Phone Number: <code>{profile?.phoneNumber}</code></p>
                        </div>
                    </div> */}
                    <div className='space-y-3 pb-2'>
                        <div className="cursor-pointer" onClick={() => openPass()}>
                            <label
                                className="input input-bordered flex justify-between items-center gap-2 mt-6 text-white cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                                    border: "1px solid var(--outline, #6C8CFF80)",
                                }}
                            >
                                <input
                                    type="text"
                                    className="grow bg-transparent text-white placeholder-white cursor-pointer"
                                    placeholder="Update Password"
                                    readOnly
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70 text-white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.354 8.354a.5.5 0 0 1 0 .707l-4 4a.5.5 0 0 1-.708-.707L10.293 8l-3.647-3.646a.5.5 0 1 1 .708-.707l4 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                        <div className="cursor-pointer" onClick={() => open()}>
                            <label
                                className="input input-bordered flex justify-between items-center gap-2 mt-6 text-white cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                                    border: "1px solid var(--outline, #6C8CFF80)",
                                }}
                            >
                                <input
                                    type="text"
                                    className="grow bg-transparent text-white placeholder-white cursor-pointer"
                                    placeholder="Delete Account"
                                    readOnly
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70 text-white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.354 8.354a.5.5 0 0 1 0 .707l-4 4a.5.5 0 0 1-.708-.707L10.293 8l-3.647-3.646a.5.5 0 1 1 .708-.707l4 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='card-bg-dev flex flex-col rounded-lg lg:pr-10 space-y-10 px-5 md:px-10 py-5'>
                    <h2 className="profile-info text-xl text-[#FFFFFF]">Notifications</h2>
                    <div className='space-y-4'>
                        <SwitchComponent title="General Notifications:" switchItems={generalItems} />
                        <SwitchComponent title="Content Recommendations:" switchItems={ContentItems} />
                        <SwitchComponent title="Account Security:" switchItems={AccountItems} />
                        <SwitchComponent title="Billing and Subscriptions:" switchItems={billItems} />
                        <SwitchComponent title="Feedback and Surveys:" switchItems={feedbackItems} />
                    </div>
                </div>
                {/* <div className="flex flex-row justify-between items-start settings-container">
                    <div className="flex flex-1 flex-col gap-4">
                        <div>
                            <span className="header-shadow-small">Notifications</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="sub-header-shadow">General Notifications</span>
                            <div className="flex flex-col gap-3">
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Receive notifications for important updates and announcements.
                                    </p>
                                </label>
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Receive notifications for important updates and announcements.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="sub-header-shadow">Content Recommendations:</span>
                            <div className="flex flex-col gap-3">
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Receive personalized recommendations based on your viewing or
                                        browsing history.
                                    </p>
                                </label>
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Get notified when new content is added to your favorite
                                        categories or genres.
                                    </p>
                                </label>
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Get alerts for mentions of your username or handle in public
                                        posts.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="sub-header-shadow">Account Security:</span>
                            <div className="flex flex-col gap-3">
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Receive notifications for account activity alerts (e.g.,
                                        suspicious login attempts).
                                    </p>
                                </label>
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Receive alerts for successful login attempts from new devices
                                        or locations.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="sub-header-shadow">Billing and Subscription:</span>
                            <div className="flex flex-col gap-3">
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Receive notifications for upcoming subscription renewals and
                                        payment reminders.
                                    </p>
                                </label>
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Get alerts for changes in subscription pricing or plan
                                        upgrades.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="sub-header-shadow">Feedback and Surveys:</span>
                            <div className="flex flex-col gap-3">
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Get alerted to participate in user research studies or
                                        usability testing.
                                    </p>
                                </label>
                                <label className="ll-checkbox-outline flex gap-x-2 cursor-pointer">
                                    <input
                                        checked={check}
                                        onChange={e => setCheck(!check)}
                                        type="checkbox"
                                        className="hidden"
                                    />
                                    <span
                                        className="w-4 h-4 border border-[#464070] rounded-sm bg-[#353057]"
                                        style={{ borderRadius: 4 }}
                                    ></span>
                                    <p className="text-[#FFF] font-normal text-[12px]">
                                        Get notified when your feedback leads to changes or
                                        improvements on the platform.
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-col">
                            <div>
                                <span className="header-shadow-small">Change Password</span>
                            </div>
                            <div className="mt-3">
                                <label>
                                    <span className="text-white font-normal text-[12px]">
                                        Current Password
                                    </span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="oldPassword"
                                        placeholder="Password"
                                        className="settings-frm-input badge h-[50px]"
                                        value={formData.oldPassword || ''}
                                        style={{
                                            borderRadius: 8,
                                            border: `1px solid #A768FD`,
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 5,
                                        }}
                                        onChange={onChangeHandle}
                                    />
                                    {validation?.oldPassword?.error && (
                                        <span className="errorField mt-3">
                                            {validation?.oldPassword?.errorMessage ?? ''}
                                        </span>
                                    )}
                                </label>
                            </div>
                            <div className="mt-3">
                                <label>
                                    <span className="text-white font-normal text-[12px]">
                                        New Password
                                    </span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="newPassword"
                                        placeholder="New Password"
                                        className="settings-frm-input badge h-[50px]"
                                        value={formData.newPassword || ''}
                                        style={{
                                            borderRadius: 8,
                                            border: `1px solid #A768FD`,
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 5,
                                        }}
                                        onChange={onChangeHandle}
                                    />
                                    {validation?.newPassword?.error && (
                                        <span className="errorField mt-3">
                                            {validation?.newPassword?.errorMessage ?? ''}
                                        </span>
                                    )}
                                </label>
                            </div>
                            <div className="mt-3">
                                <label>
                                    <span className="text-white font-normal text-[12px]">
                                        Confirm Password
                                    </span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="settings-frm-input badge h-[50px]"
                                        value={formData.confirmPassword || ''}
                                        style={{
                                            borderRadius: 8,
                                            border: `1px solid #A768FD`,
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 5,
                                        }}
                                        onChange={onChangeHandle}
                                    />
                                    {validation?.confirmPassword?.error && (
                                        <span className="errorField mt-3">
                                            {validation?.confirmPassword?.errorMessage ?? ''}
                                        </span>
                                    )}
                                </label>
                            </div>
                            <div>
                                <button
                                    className="saveContinue mt-3"
                                    style={{
                                        borderRadius: 8,
                                        border: '1px solid #A768FD',
                                        background:
                                            'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                                        textTransform: 'capitalize',
                                    }}
                                    onClick={onUpdatePassword}
                                    disabled={isLoading}
                                >
                                    <Spinner spin={isLoading}>Update Password</Spinner>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col mt-8">
                            <div>
                                <span className="header-shadow-small">Delete Account</span>
                            </div>
                            <div className="mt-3">
                                <span className="text-white font-normal text-[12px]">
                                    Permanently remove your account and all associated data from the
                                    platform. Please note that this action is irreversible and will
                                    result in the loss of all account-related content and
                                    information.
                                </span>
                            </div>
                            <div>
                                <button
                                    className="saveContinue mt-3"
                                    style={{
                                        borderRadius: 8,
                                        border: '1px solid #A768FD',
                                        background:
                                            'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                                        textTransform: 'capitalize',
                                    }}
                                    onClick={onDeleteAccount}
                                    disabled={deletProcess}
                                >
                                    <Spinner spin={deletProcess}>Delete Account</Spinner>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div >
        </div >
    );
};

export default Settings;
