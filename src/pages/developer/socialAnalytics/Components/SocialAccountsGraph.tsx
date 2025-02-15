import Loading from "../../../../components/common/Loading";
import { ICON_ENUM } from "../../../../constants/icons.constant";

interface TileData {
    headerIcon?: any;
    title?: string;
    borderColor?: string;
    changedValue?: string;
    bodyIcon?: any;
    count?: string;
    text?: string;
    borderWidth?: string;
}
const PLATFORM_ICONS: any = {
    Instagram: ICON_ENUM?.INSTAGRAM?.icon,
    Facebook: ICON_ENUM?.FACEBOOK?.icon,
    Twitter: ICON_ENUM?.X?.icon,
    LinkedIn: ICON_ENUM?.LINKEDIN?.icon,
    Youtube: ICON_ENUM?.YOUTUBE?.icon,
    Twitch: ICON_ENUM?.TWITCH?.icon,
    Followers: ICON_ENUM?.BEHANCE?.icon,
};
const PLATFORM_BORDER_COLORS: any = {
    Instagram: ICON_ENUM?.INSTAGRAM?.borderColor,
    Facebook: ICON_ENUM?.FACEBOOK?.borderColor,
    Twitter: ICON_ENUM?.X?.borderColor,
    LinkedIn: ICON_ENUM?.LINKEDIN?.borderColor,
    Youtube: ICON_ENUM?.YOUTUBE?.borderColor,
    Twitch: ICON_ENUM?.TWITCH?.borderColor,
    Followers: ICON_ENUM?.BEHANCE?.borderColor,
    Tiktok: ICON_ENUM?.TIKTOK?.borderColor,
};
const SocialAccountsGraph = ({
    data,
    loading = false,
}: {
    data: TileData;
    loading?: boolean;
}) => {
    const iconSrc = data?.text === "UPWARDS"
        ? ICON_ENUM?.UP_TREND?.icon
        : data?.text === "DOWNWARDS"
            ? ICON_ENUM?.DOWN_TREND?.icon
            : "";

    const trendLabel = data?.text === "UPWARDS"
        ? "increase / day"
        : data?.text === "DOWNWARDS"
            ? "decrease / day"
            : "";
    const headerIcon = PLATFORM_ICONS[data?.title ?? ""]
    const borderColor = PLATFORM_BORDER_COLORS[data?.title ?? ""];
    return (
        <div
            className={`social-card rounded-lg ${data?.borderWidth ? 'p-[' + data?.borderWidth + ']' : 'p-1'
                }`}
            style={{
                borderColor: borderColor,
                backgroundImage: borderColor,
                backgroundOrigin: 'border-box',
                backgroundPosition: 'left,right',
                backgroundSize: '100% 100%, 100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="w-full h-full p-4 space-y-3 social-tile-bg rounded-lg">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            {headerIcon && (
                                <img src={headerIcon ?? ''} alt={data?.title} width={25} />
                            )}
                            <span className="font-bold">{data?.title ?? ''}</span>
                        </div>
                        <div>
                            <div className="flex space-x-10">
                                <div className="social-count text-3xl font-bold">
                                    {data?.count ?? '0'}
                                </div>
                                {iconSrc && (
                                    <img src={iconSrc} alt="Trend Icon" width={35} />
                                )}
                            </div>
                            <span className="increase text-blue-500">
                                {/* {data?.changedValue ?? ''} */}
                                {/* {data?.changedValue && `+${data?.changedValue} ${trendLabel}`} */}
                                {data?.changedValue && `${data?.text === "UPWARDS" ? "+" : ""}${data?.changedValue} ${trendLabel}`}

                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SocialAccountsGraph;