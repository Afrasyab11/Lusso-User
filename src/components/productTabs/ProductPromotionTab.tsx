import { useState } from "react";
import { FiExternalLink, FiFacebook, FiGlobe, FiInstagram } from "react-icons/fi";
import { IoIosArrowDropright } from "react-icons/io";

interface ProductPromotionTabProps {
    setCurrentStep: (step: number) => void;
    currentStep: number;
}

const ProductPromotionTab: React.FC<ProductPromotionTabProps> = ({ setCurrentStep, currentStep }) => {

    const [selectedBoxes, setSelectedBoxes] = useState<string[]>([]);

    const toggleBoxSelection = (boxName: string) => {
        setSelectedBoxes((prevSelected) =>
            prevSelected.includes(boxName)
                ? prevSelected.filter((name) => name !== boxName)
                : [...prevSelected, boxName]
        );
    };
    const isBoxSelected = (boxName: string) => selectedBoxes.includes(boxName);


    return (
        <div>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-10'>
                    <div className="flex flex-col gap-6">
                        <p className="font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]">Product Promotion</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { name: "Facebook Ads", icon: <FiFacebook /> },
                                { name: "Instagram Ads", icon: <FiInstagram /> },
                                { name: "Google Ads", icon: <FiGlobe /> },
                                { name: "Email Marketing", icon: <FiExternalLink /> },
                            ].map((box) => (
                                <div
                                    key={box.name}
                                    className={`w-full sm:w-[48%] h-52 flex flex-col justify-between py-5 px-3 text-white rounded-xl border-[1px] border-[#A768FD] cursor-pointer ${isBoxSelected(box.name) ? "bg-opacity-40 bg-[#A768FD]" : "bg-[#040404] bg-opacity-20"
                                        }`}
                                    onClick={() => toggleBoxSelection(box.name)}
                                >
                                    <p className="text-[20px] font-semibold">{box.name}</p>
                                    <p className="font-light">Schedule posts, analyze performance, and grow your presence on social media.</p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[30px]">{box.icon}</div>
                                        <button
                                            style={{
                                                background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 80%)',
                                            }}
                                            className="px-5 py-1 rounded-full text-[18px] font-medium flex items-center gap-1"
                                        >
                                            <p>{isBoxSelected(box.name) ? "Depromote" : "Promote"}</p>
                                            {!isBoxSelected(box.name) ? <IoIosArrowDropright className="text-[23px]" /> : ""}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='border-[1px] border-white border-opacity-20 w-full rounded-full' />
                <div className='flex items-center gap-10 justify-start'>
                    <button onClick={() => {
                        setCurrentStep(currentStep - 1)
                    }}
                        className="relative py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]"
                    >
                        Back
                    </button>
                    <button onClick={() => {
                        if (currentStep <= 5) {
                            setCurrentStep(currentStep + 1);
                        }
                    }} style={{
                        background:
                            'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)',
                    }} className='py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full'>
                        Save & Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPromotionTab;
