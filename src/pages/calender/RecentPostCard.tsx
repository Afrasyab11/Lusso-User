import PropTypes from "prop-types";
import profile from "../../assets/images/calender/hoverImg.svg";
import Lusso from "../../assets/images/calender/lusso.svg";

const RecentPostCard = ({
    title = "Lusso.ai",
    postTime = "marketing agency",
    impressions = 2345,
    engagement = 623,
    clicks = 500,
    image = Lusso,
    centerImage = Lusso,
}) => {
    const handleError = (e: any, image: any) => {
        e.preventDefault()
        e.target.src = image;
    };
    return (
        <div
            className="p-4 rounded-xl cursor-pointer"
            style={{
                background:
                    "linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)",
                border: "1px solid rgba(108, 140, 255, 0.5)",
                boxShadow: "0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)",
            }}
        >
            <div className="flex items-center space-x-2 mb-6">
                {/* <div> */}

                <img src={image || Lusso} alt={title} className="w-7 h-7"
                // onError={(e) => handleError(e, image)} 
                />
                {/* </div> */}
                <div className="flex flex-col w-4/5">
                    <span className="text-[#FFFFFF] font-medium text-base truncate max-w-xs">{title}</span>
                    <small className="text-xs font-medium text-gray-400">{postTime}</small>
                </div>
            </div>
            <div className="mb-6">
                <img src={centerImage ?? profile} alt="center image" className="w-full"
                // onError={(e) => handleError(e, centerImage)} 
                />
            </div>
            {/* <div className="flex justify-between items-center mt-2 text-sm">
                <div className="flex flex-col items-start">
                    <span className="text-sm md:text-lg text-start font-bold text-[#FFFFFF]">
                        {impressions}
                    </span>
                    <span className="text-xs font-medium text-[#FFFFFF99]">Impressions</span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-sm md:text-lg text-start font-bold text-[#FFFFFF]">
                        {engagement}
                    </span>
                    <span className="text-xs font-medium text-[#FFFFFF99]">Engagement</span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-sm md:text-lg text-start font-bold text-[#FFFFFF]">
                        {clicks}
                    </span>
                    <span className="text-xs font-medium text-[#FFFFFF99]">Clicks</span>
                </div>
            </div> */}
        </div>
    );
};

RecentPostCard.propTypes = {
    title: PropTypes.string,
    postTime: PropTypes.string,
    impressions: PropTypes.number,
    engagement: PropTypes.number,
    clicks: PropTypes.number,
    image: PropTypes.string,
    centerImage: PropTypes.string,
};

export default RecentPostCard;
