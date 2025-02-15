import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import showCustomToast from "../../components/common/CustomToast";
import DeleteModal from "../../components/common/DeleteModal";
import SettingDrawer from "./components/settingDrawer/settingDrawer";

const DeleteAccountSection = () => {
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [reasonError, setReasonError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCancel = () => {
        setSelectedReason('')
        setReasonError(false)
        close();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleDelete = async () => {
        try {
            const token = Cookies.get("authToken");
            const isEmpty = !selectedReason.trim();
            setReasonError(isEmpty);

            if (token && !isEmpty) {
                setLoading(true);
                const response = await axios.delete(
                    "https://api.lusso.dev/api/v1/userProfile",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        data: { reason: selectedReason },
                    }
                );

                if (response) {
                    setIsModalOpen(false);
                    setLoading(false);
                    showCustomToast(response?.data?.message, "#2F2386", "white");
                    Cookies.remove("authToken");
                    document.cookie = 'authToken=; path=/;';
                    navigate("/login");
                }
            }
        } catch (err) {
            setLoading(false);
            console.error("Error deleting account", err);
        }
    };

    const handleReasonChange = (option: any) => {
        setSelectedReason(option?.value);
        setReasonError(false);
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
            onChange: handleReasonChange,
            error: reasonError
        },
    ];
    const buttons = [
        {
            label: "Delete Account",
            className: `bg-gradient-vertical px-4 py-2 text-white border border-0 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
            onClick: () => setIsModalOpen(true),
            disabled: loading,
            isLoading: loading,
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
                title="Delete Account"
                fields={fields}
                buttons={buttons}
            />
            <div className="z-0 rounded-2xl bg-gradient-to-r md:bg-none from-[#251E54] via-[#251E54] to-[#15dcfc57] p-[1px]">
                <div className="card-bg-dev rounded-2xl p-5 md:p-8 opacity-70 text-white" onClick={() => open()}>
                    <label>
                        <span className="text-base font-normal text-[#FFFFFF99]">Delete Account</span>
                    </label>

                    <label className="input input-bordered flex justify-between items-center gap-2 mt-6 text-white hover:cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                            border: "1px solid var(--outline, #6C8CFF80)"
                        }}>
                        {/* <input type="text" className="grow text-white text-sm" placeholder="Delete Account Permanently" /> */}
                        <span className="text-white text-sm font-semibold">Delete Account Permanently</span>
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

            <DeleteModal
                isLoading={loading}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    handleDelete();
                }}
                title="Delete your profile"
                description="Are you sure you want to delete your profile? This action is destructive and you will have to contact support to restore your data."
            />
        </>
    );
};

export default DeleteAccountSection;
