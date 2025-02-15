import * as Dialog from '@radix-ui/react-dialog';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface TextPopupProps {
    content: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    showReuseBtn: boolean;
}
const CustomCloseButton = ({ closeToast }: any) => (
    <span
        onClick={closeToast}
        style={{
            cursor: 'pointer',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
        }}
    >
        ✖ {/* Replace this with your desired icon */}
    </span>
);
const TextPopup: React.FC<TextPopupProps> = ({ content, isOpen, onOpenChange, showReuseBtn }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {

        try {
            await navigator.clipboard.writeText(content);
            setIsCopied(true);

            toast('Copied to clipboard!', {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                style: { backgroundColor: "#2F2386", color: "white" },
                closeButton: <CustomCloseButton />,
            });
            setTimeout(() => {
                setIsCopied(false);
                onOpenChange(false);
            }, 500);
        } catch (err) {
            toast.error("Failed to copy. Please try again.");
        }
    };

    return (
        <>
            <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 card-bg-dev text-white rounded-lg px-6  w-full max-w-2xl ">
                        <div className="text-sm leading-relaxed text-white mb-4 mt-3 min-h-[30vh] max-h-[40vh] overflow-y-auto">
                            {content ?? content}
                        </div>
                        <div className="w-full flex items-end justify-end gap-x-4 border-t-2  bottom-0  py-2 border-gray-300"
                        >
                            {showReuseBtn && (
                                <button
                                    className="flex items-center gap-2 px-4 py-1 text-white rounded"
                                >

                                    <FaCalendarAlt size={15} color='white' />

                                    Reuse text
                                </button>
                            )}
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-4 py-1 text-white rounded"
                            >
                                {isCopied ? (
                                    <Check className="h-4 w-4" color='white' />
                                ) : (
                                    <Copy className="h-4 w-4" color='white' />
                                )}
                                {isCopied ? 'Copied!' : 'Copy to clipboard'}
                            </button>
                        </div>

                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* <ToastContainer position="bottom-right" /> */}
        </>
    );
};

export default TextPopup;

