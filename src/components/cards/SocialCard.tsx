import { ICON_ENUM } from "../../constants/icons.constant";

interface SocialCardProps {
    heading: string;
    value: string;
    trend: string;
    changeVal: string;
}

const SocialCard = ({ heading, value, trend, changeVal }: SocialCardProps) => {
    const iconSrc = trend === "UPWARDS"
        ? ICON_ENUM?.UP_TREND?.icon
        : trend === "DOWNWARDS"
            ? ICON_ENUM?.DOWN_TREND?.icon
            : "";

    const trendLabel = trend === "UPWARDS"
        ? "increase / day"
        : trend === "DOWNWARDS"
            ? "decrease / day"
            : "";

    return (
        <div className="flex-shrink-1 card-bg-dev rounded-2xl p-4 text-white md:w-1/3">
            <div className="text-lg font-semibold">{heading}</div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-3xl font-bold">{value}</p>
                {iconSrc && <img src={iconSrc} width={35} alt="Trend Icon" />}
            </div>
            <div className="text-sm mt-2">
                {changeVal && `${trend === "UPWARDS" ? "+" : ""}${changeVal} ${trendLabel}`}
            </div>

        </div>
    );
};

export default SocialCard;
