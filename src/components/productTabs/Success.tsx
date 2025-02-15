import React from "react";
import CompletedBadge from "../../assets/images/completed-badge.png";

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
    className?: string;
    isShow?: boolean;
}

interface SuccessProps {
    badgeImage?: string;
    title?: string;
    description?: string;
    buttons?: ButtonProps[];
}

const Success: React.FC<SuccessProps> = ({
    badgeImage = CompletedBadge,
    title = "Product Under Review",
    description = "Your product is under review state",
    buttons = [],
}) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 items-center justify-center pt-8">
                <img className="w-44" src={badgeImage} alt="Success Badge" />
                <p className="font-semibold md-lt:text-[20px] lg:text-[26px] text-[#00ffff]">
                    {title}
                </p>
                <p className="text-white md-lt:text-center">{description}</p>
            </div>
            <div className="border-[1px] border-white border-opacity-20 w-full rounded-full" />
            <div className="flex items-center gap-10 justify-center">
                {buttons?.map(({ label, onClick, style, className, isShow }, index) => (
                    isShow !== false && <button
                        key={index}
                        onClick={onClick}
                        style={style}
                        className={`cursor-pointer py-3 md-lt:w-[50%] md:w-[30%] lg:w-[40%] text-white font-bold md-lt:text-[10px] lg:text-[16px] rounded-full whitespace-nowrap ${className || ""
                            }`}
                    >
                        {label}
                    </button>

                ))}
            </div>
        </div>
    );
};

export default Success;
