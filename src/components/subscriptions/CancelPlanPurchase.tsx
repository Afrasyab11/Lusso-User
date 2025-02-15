import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cross from '../../assets/icons/crosstick.svg';
import success from "../../assets/icons/success.svg";
import Button from '../ui/Button';

const IconTextItem = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex gap-3 items-center">
        <img src={icon} alt="icon" />
        <span className="text-sm text-[#B1ADCD] font-normal">{text}</span>
    </div>
);

const CancelPlanForm = ({
    label,
    placeholder,
    textareaStyles,
}: {
    label: string;
    placeholder: string;
    textareaStyles?: React.CSSProperties;
}) => (
    <div>
        <label htmlFor="reason" className="block text-sm font-medium">
            {label}
        </label>
        <textarea
            id="reason"
            placeholder={placeholder}
            className="w-full mt-2 p-3 rounded-lg bg-[#2E246C33] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={textareaStyles}
        ></textarea>
    </div>
);

const CancelPlanPurchase = () => {
    const [hasCancelled, setHasCancelled] = useState(false);
    const navigate = useNavigate()

    const items = [
        'Includes 50 digital products and complete customizable options.',
        'Perfect for freelancers and design enthusiasts.',
        'Free updates for 12 months.',
        'Priority customer support.',
    ];

    const handleCancelClick = () => {
        setHasCancelled(true);
    };

    if (hasCancelled) {
        return (
            <div className="flex flex-col justify-center items-center space-y-6 min-h-screen">
                <img src={success} alt="success" />
                <h2 className="text-lg font-bold text-center capitalize">Your subscription has been canceled.</h2>
                <span className="font-medium text-base text-center text-[#B1ADCD] capitalize">
                    you will still have access until May 31, 2024
                </span>
                <div>
                    <Button
                        id="close-view-history-drawer"
                        label="Go to Dashboard"
                        className="bg-gradient-vertical font-bold rounded-full px-2 py-2"
                        onClick={() => navigate("/dev/dashboard")}
                    />
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-5">
            <span className="text-xl font-bold">Cancel Plan</span>
            <div>
                <span className="text-base text-[#B1ADCD] font-medium">
                    By Canceling You'll Lose Access To:
                </span>
            </div>
            <div className="flex flex-col gap-3">
                {items?.map((item, index) => (
                    <IconTextItem key={index} icon={cross} text={item} />
                ))}
            </div>
            <CancelPlanForm
                label="Reason for cancel"
                placeholder="Reason "
                textareaStyles={{ border: '1px solid #6C8CFF80' }}
            />
            <div className="flex justify-center items-center gap-3">
                <div className="bg-gradient-vertical font-bold rounded-full py-2">
                    <Button
                        id="continue-cancel"
                        label="Continue to Cancel"
                        onClick={handleCancelClick}
                    />
                </div>
                <div className="cursor-pointer border-2 border-[#7D3CF3] font-bold py-2 rounded-full">
                    <span
                        id="keep-plan"
                        className="cursor-pointer py-2 px-12 w-full inline-block"
                    >
                        Keep My Plan
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CancelPlanPurchase;
