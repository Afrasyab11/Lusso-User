import { Close } from "@mui/icons-material";

const DeleteModal = ({ isOpen, onClose, onConfirm, title, description, isLoading }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
            <div className="bg-[#201A4C] text-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        className="text-gray-400 hover:text-white"
                        onClick={onClose}
                    >
                        <Close />
                    </button>
                </div>
                <p className="mt-4">{description}</p>
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        className="bg-[#191430] px-4 py-2 rounded-lg text-white"
                        onClick={onClose}
                    >
                        No, don’t delete it
                    </button>
                    <button
                        className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? <div className="loader-sm" /> : 'Delete account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
