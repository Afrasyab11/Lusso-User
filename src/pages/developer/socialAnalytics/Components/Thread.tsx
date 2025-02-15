import analytics_img from '../../../../assets/images/creator/analytics-connect.svg';
import thread from '../../../../assets/images/social/social-thread.svg';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import '../SocialAnalytics.scss';

const Thread = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-5">
                <img src={thread} alt="Thread Icon" className="w-5 h-10" />
                <span className="text-[#FFFFFFCC] text-lg font-bold">Threads</span>
            </div>

            <div className="card-bg-dev rounded-xl p-4 w-full flex flex-col md:flex-row py-5">
                {/* Content on the left */}
                <div className="md:w-1/2 space-y-8 text-white">
                    <div className="text-2xl font-bold">Threads</div>
                    <p>
                        Measure the reach of your network and post content to your Pinterest
                        account, the newest app from creators of Instagram.
                    </p>
                    <button
                        className="text-[#FFFFFF99] rounded-md p-2 flex items-center justify-between"
                        style={{ background: ICON_ENUM?.TIKTOK?.borderColor }}
                    >
                        Create a Thread Account
                        <img src={thread} alt="Thread Icon" className="w-5 h-5 ms-7" />
                    </button>
                </div>

                {/* Graph card */}
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:py-12">
                    <div className="w-full md:w-4/5">
                        <img src={analytics_img} alt="analytics" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thread;
