import CloseButtonIcon from '../../../assets/icons/closeBlack.svg';

export const PostDrawer = ({ isOpen, onClose, content }: any) => {
    return (
        <div
            className={`absolute top-0 right-0 h-full z-10 bg-[#1a1343] transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } w-[32%] lg:w-[38%] md:w-[42%] flex flex-col`}
        >
            <div className="flex justify-end px-4 py-2">
                <button
                    onClick={onClose}
                    className="bg-[#b0adca] rounded-full w-11 h-11 flex items-center justify-center"
                >
                    <img src={CloseButtonIcon} alt="Close" className="w-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">{content}</div>
        </div>
    );
};
