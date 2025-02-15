import { useNavigate } from 'react-router-dom';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';

import SocialTile from '../../../../components/common/SocialTile';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import '../SocialAnalytics.scss';

// Sample Data for the graph
const socialData = [
    {
        title: 'Facebook',
        headerIcon: ICON_ENUM?.FACEBOOK?.icon,
        borderColor: ICON_ENUM?.FACEBOOK?.borderColor,
        count: '1852',
        bodyIcon: ICON_ENUM?.UP_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'Youtube',
        headerIcon: ICON_ENUM?.YOUTUBE?.icon,
        borderColor: ICON_ENUM?.YOUTUBE?.borderColor,
        count: '198',
        bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'Instagram',
        headerIcon: ICON_ENUM?.INSTAGRAM?.icon,
        borderColor: ICON_ENUM?.INSTAGRAM?.borderColor,
        count: '214',
        bodyIcon: ICON_ENUM?.UP_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'X',
        headerIcon: ICON_ENUM?.X?.icon,
        borderColor: ICON_ENUM?.X?.borderColor,
        count: '167',
        bodyIcon: ICON_ENUM?.UP_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'LinkedIn',
        headerIcon: ICON_ENUM?.LINKEDIN?.icon,
        borderColor: ICON_ENUM?.LINKEDIN?.borderColor,
        count: '1852',
        bodyIcon: ICON_ENUM?.UP_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'Tiktok',
        headerIcon: ICON_ENUM?.TIKTOK?.icon,
        borderColor: ICON_ENUM?.TIKTOK?.borderColor,
        count: '142',
        bodyIcon: ICON_ENUM?.UP_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'Twitch',
        headerIcon: ICON_ENUM?.TWITCH?.icon,
        borderColor: ICON_ENUM?.TWITCH?.borderColor,
        count: '715',
        bodyIcon: ICON_ENUM?.UP_TREND?.icon,
        text: '+8.2k increase/day',
    },
    {
        title: 'Behance',
        headerIcon: ICON_ENUM?.BEHANCE?.icon,
        borderColor: ICON_ENUM?.BEHANCE?.borderColor,
        count: '98',
        bodyIcon: ICON_ENUM?.DOWN_TREND?.icon,
        text: '+8.2k increase/day',
    },
];
const data = [
    { date: 'Jan 11', youtube: 1500, twitter: 1000, instagram: 800, linkedin: 1200 },
    { date: 'Jan 12', youtube: 1600, twitter: 1100, instagram: 900, linkedin: 1300 },
    { date: 'Jan 13', youtube: 400, twitter: 1150, instagram: 950, linkedin: 1400 },
    { date: 'Jan 14', youtube: 300, twitter: 1200, instagram: 1000, linkedin: 1500 },
    { date: 'Jan 15', youtube: 900, twitter: 1250, instagram: 1050, linkedin: 1600 },
    { date: 'Jan 16', youtube: 1000, twitter: 1300, instagram: 1100, linkedin: 1700 },
    { date: 'Jan 17', youtube: 2100, twitter: 1350, instagram: 1150, linkedin: 1800 },
];

const Followers = () => {
    const navigate = useNavigate();

    return (
        <div >

            {/* Followers Section */}
            <div className="followers-section p-4 border border-blue-400 rounded-md space-y-3 w-full md:w-1/2">
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2">
                    <span className="text-lg font-bold">Followers</span>
                    <div className="time-options flex space-x-4">
                        <span className="cursor-pointer text-sm">Daily</span>
                        <span className="cursor-pointer text-sm">Weekly</span>
                        <span className="cursor-pointer text-sm font-bold">Monthly</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center space-x-3">
                    <div className="flex w-full md:w-1/2">
                        <div className="bg-primary grid h-1 w-1/3" />
                        <div className="custom-insta-gradient-bg grid h-1 w-1/4" />
                        <div className="bg-[#FFFFFF33] grid h-1 w-full" />
                    </div>
                    {/* <div className="graph-line mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div> */}
                    <div className="followers-count mt-4 text-4xl font-bold flex flex-col">
                        <div className="flex justify-between gap-3">
                            <span>1851</span>
                            <img src={ICON_ENUM?.UP_TREND?.icon ?? ''} width={35} />
                        </div>
                        <span className="ml-2 text-sm text-gray-400">
                            +8.2k increase/day
                        </span>
                    </div>
                </div>
            </div>

            {/* Social Media Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 border border-blue-400 rounded-md">
                {socialData?.map(data => <SocialTile data={data} />)}
            </div>

            {/* Followers Section */}
            <div className="followers-section p-4 border border-blue-400 rounded-md mt-7">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Followers</span>
                    <div className="time-options flex space-x-4">
                        <span className="cursor-pointer text-sm">Daily</span>
                        <span className="cursor-pointer text-sm">Weekly</span>
                        <span className="cursor-pointer text-sm font-bold">Monthly</span>
                    </div>
                </div>
                <div className="followers-count mt-4 text-4xl font-bold flex items-center">
                    1852
                    <span className="ml-2 text-sm text-gray-400">+8.2k increase/day</span>
                </div>

                {/* Followers Graph */}
                <div className="followers-graph mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            {/* Horizontal Lines Only */}
                            <CartesianGrid
                                horizontal={true} // Enable horizontal grid lines
                                vertical={false}  // Ensure vertical grid lines are disabled
                                stroke="#ccc"     // Color of the horizontal grid lines
                                strokeDasharray="none" // Solid horizontal grid lines
                            />
                            <XAxis dataKey="date" />

                            {/* YAxis with no vertical line */}
                            <YAxis
                                domain={[0, 5000]}
                                ticks={[1000, 2000, 3000, 4000, 5000]}
                                axisLine={false}  // Remove the Y-axis vertical line
                                tickLine={false}  // Remove tick marks on the Y-axis
                            />
                            {/* <Tooltip /> */}

                            {/* Bold and fat line for followers (Twitter) */}
                            <Line
                                type="monotone"
                                dataKey="twitter"
                                stroke="white"
                                strokeWidth={4}  // Ensure a larger stroke width for a bolder line
                                dot={false}
                            />

                            {/* Other social media lines */}
                            <Line
                                type="monotone"
                                dataKey="youtube"
                                stroke="red"
                                strokeWidth={4}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="instagram"
                                stroke="purple"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="linkedin"
                                stroke="blue"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


            </div>
        </div>
    );
};

export default Followers;
