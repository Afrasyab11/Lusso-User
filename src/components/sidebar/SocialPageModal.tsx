import React from 'react';
import { ICON_ENUM } from '../../constants/icons.constant';
import Spinner from '../common/Spinner';
import UserAvator from '../common/UserAvator';

interface OptionType {
    value: string;
    label: string;
}

interface SocialPageModalProps {
    platform: string;
    options: OptionType[];
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onConfirm: (page: any) => void;
}

const SocialPageModal: React.FC<SocialPageModalProps> = ({
    platform,
    loading,
    open,
    options,
    onClose,
    onConfirm,
}) => {

    return (
        <dialog className="modal" open={open}>
            <div className="modal-box text-white card-bg-dev max-w-2xl space-y-3">
                <div className="flex flex-row gap-x-2 justify-start items-center border-b border-b-[#6C8CFF80] pb-5">
                    <div>
                        <img
                            className="w-8"
                            src={
                                ICON_ENUM[platform.toUpperCase() as keyof typeof ICON_ENUM]
                                    ?.icon ?? ''
                            }
                            alt={platform}
                        />
                    </div>
                    <p className="text-white capitalize text-2xl">{platform ?? ''}</p>
                </div>
                <p>Select a page you’ll like to connect to this Brand</p>
                <ul className="p-5 border border-[#6C8CFF80] rounded-lg space-y-3 h-60 overflow-y-auto">
                    {options?.map((option: any, index: number) => (
                        <li
                            key={option?.id + '_' + index}
                            className="flex justify-between items-center"
                        >
                            <div className="flex items-center space-x-2">
                                <UserAvator
                                    className="object-contain w-10 h-10"
                                    img={option?.imageUrl}
                                />
                                <span className="font-bold">{option?.name ?? ''}</span>
                            </div>
                            <button
                                type="button"
                                className="text-whilte font-bold rounded px-5 py-2 social-pages-btn"
                                onClick={() => onConfirm(option?.id)}
                                disabled={loading}
                            >
                                <Spinner spin={loading}> Select</Spinner>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="modal-action justify-start">
                    <button
                        type="button"
                        className="text-whilte font-bold rounded px-5 py-2 social-pages-btn"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default SocialPageModal;
