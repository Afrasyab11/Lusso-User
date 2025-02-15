import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import OtpDrawer from "../settingDrawer/otpDrawer";
import SettingDrawer from "../settingDrawer/settingDrawer";

const Account2StepsVerification = () => {
    const [checked, setChecked] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [openedOtp, { open: openOtp, close: closeOTP }] = useDisclosure(false);
    const [codeSent, setCodeSent] = useState(false);

    const handleCancel = () => {
        close()
    };

    const initialFields = [
        {
            label: "Mobile Phone",
            name: "phone",
            placeholder: "000 000 000 000",
            className: "border border-gray-600 rounded p-2"
        },
    ];
    const initialButtons = [
        {
            label: "Send Code",
            className: "bg-gradient-vertical px-4 py-2 text-white border border-0 rounded",
            onClick: () => {
                setCodeSent(true);
                close()
                openOtp()
            },
        },
        {
            label: "Cancel",
            className: "px-8 py-2 rounded",
            onClick: handleCancel,
            style: {
                border: '2px solid var(--accent1, #7D3CF3)',
                backgroundColor: 'transparent',
            }
        },
    ];

    return (
        <>
            <SettingDrawer
                opened={opened}
                close={close}
                title="Phone Verification"
                fields={initialFields}
                buttons={initialButtons}
            />
            <OtpDrawer
                opened={openedOtp}
                close={closeOTP}
                title={"Phone Verification"}
            />
            {/* <div className="card-bg-dev rounded-2xl md:px-8 md:py-6 opacity-70 text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
                <span className="">TWO FACTOR AUTHENTICATION</span>
                <div className="lg:col-span-2">
                    <Switch
                        checked={checked}
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                        styles={(theme) => ({
                            track: {
                                background: checked
                                    ? "linear-gradient(90deg, rgba(132, 35, 244, 0.2) 0%, rgba(255, 153, 239, 0.172) 100%)"
                                    : theme.colors.gray[4],
                                borderRadius: '20px',
                                border: 'none',
                            },
                            thumb: {
                                background: checked
                                    ? "linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)"
                                    : theme.colors.gray[6],
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            },
                        })}
                    />
                </div>
                <div className="lg:col-span-2">
                    <p className="text-sm text-[#FFFFFF]">To help keep your account secure, we'll ask you to submit a code when using a new device to log in. We'll send the code via email or Lusso notification.
                        Verify your mobile phone to be able to receive the code via SMS.</p>
                </div>
                <div className="lg:col-span-2">
                    <label className="input input-bordered flex justify-between items-center gap-2 mt-6"
                        style={{
                            background:
                                "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                            border: "1px solid var(--outline, #6C8CFF80)"
                        }}
                        onClick={() => open()}
                    >
                        <input type="text" className="grow" placeholder="Phone Verification" />
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
            </div> */}
        </>
    )
}

export default Account2StepsVerification