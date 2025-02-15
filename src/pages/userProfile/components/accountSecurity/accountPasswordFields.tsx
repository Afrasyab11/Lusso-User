import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useEncryptionHook from "../../../../hooks/useEncryption";
import { getCookies } from "../../../../utils/utils";
import SettingDrawer from "../settingDrawer/settingDrawer";

const AccountPasswordFields = () => {
    const { encrypt } = useEncryptionHook();

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [toastError, setToastError] = useState("")
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleCancel = () => {
        close();
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setLoading(false)
    };

    const handleCurrentPasswordChange = (val: string) => {
        setCurrentPassword(val);
        setErrors(prev => ({ ...prev, currentPassword: "" }));
    };

    const handleNewPasswordChange = (val: string) => {
        setNewPassword(val);
        setErrors(prev => ({ ...prev, newPassword: "" }));
    };

    const handleConfirmPasswordChange = (val: string) => {
        setConfirmPassword(val);
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
    };

    const validateInputs = () => {
        let isValid = true;
        const newErrors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        };

        if (!currentPassword) {
            newErrors.currentPassword = "Current password is required";
            isValid = false;
        }

        if (!newPassword) {
            newErrors.newPassword = "New password is required";
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        setToastError("");
        if (!validateInputs()) return;
        // alert("hittint")

        const encryptedOldPass = encrypt(currentPassword)
        const encryptedNewPass = encrypt(newPassword)

        try {
            setLoading(true);
            let token = getCookies('authToken');
            let passwordUpdateResponse = await axios.put('https://api.lusso.dev/api/v1/updatePassword', {
                isNewUser: "false",
                oldPassword: encryptedOldPass,
                newPassword: encryptedNewPass
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
                handleCancel();
            }
        } catch (err: any) {
            setLoading(false);
            setToastError(err.response?.data?.message);
            // setTimeout(() => {
            //     setToastError("");
            // }, 2000);
        }
    };

    const fields = [
        {
            label: "Current Password",
            name: "currentPassword",
            type: "password",
            onClick: handleCurrentPasswordChange,
            value: currentPassword,
            placeholder: "Current Password",
            className: "border border-gray-600 rounded p-2",
            error: errors.currentPassword,
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
        },
    ];

    const buttons = [
        {
            label: "Save Changes",
            className: `bg-gradient-vertical px-4 py-2 text-white border border-0 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
            onClick: handleSubmit,
            disabled: loading,
        },
        {
            label: "Cancel",
            className: "px-8 py-2 rounded border-2 bg-transparent",
            onClick: handleCancel,
            style: {
                border: '2px solid var(--accent1, #7D3CF3)',
                backgroundColor: 'transparent',
            },
        },
    ];

    return (
        <>
            <SettingDrawer
                opened={opened}
                close={close}
                title="Change Password"
                fields={fields}
                buttons={buttons}
                toastError={toastError}
            />
            <div className="card-bg-dev rounded-2xl p-3 md:px-8 md:py-6 md:opacity-70 text-white grid grid-cols-1 lg:grid-cols-2 md:gap-6">
                <span>Set Password</span>
                <div className="lg:col-span-2" onClick={() => open()}>
                    <label className="input input-bordered flex justify-between items-center gap-2 md:mt-6 cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                            border: "1px solid var(--outline, #6C8CFF80)"
                        }}>
                        <input className="cursor-pointer grow" type="text" placeholder="Change Password" readOnly />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
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
        </>
    );
};

export default AccountPasswordFields;

