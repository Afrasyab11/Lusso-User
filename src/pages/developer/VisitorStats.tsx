import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import downArrowIcon from '../../assets/images/dev/down-array.svg';

const calculateTotal = (platform: string, visitorData: any) => {
    return visitorData?.reduce((acc: any, day: any) => acc + day[platform], 0);
};

const calculateTrend = (platform: any, visitorData: any) => {
    const lastDay = visitorData[visitorData.length - 1][platform];
    const secondLastDay = visitorData[visitorData.length - 2][platform];
    const difference = lastDay - secondLastDay;
    const trend = difference >= 0 ? `+${(difference / 1000).toFixed(1)}k` : `${(difference / 1000).toFixed(1)}k`;
    return { difference, trend };
};

const VisitorStatistics = ({ visitorData }: any) => {
    const [showMore, setShowMore] = useState(false);

    const facebookTotal = calculateTotal('Facebook', visitorData);
    const instagramTotal = calculateTotal('Instagram', visitorData);
    const twitterTotal = calculateTotal('Twitter', visitorData);

    const facebookTrend = calculateTrend('Facebook', visitorData);
    const instagramTrend = calculateTrend('Instagram', visitorData);
    const twitterTrend = calculateTrend('Twitter', visitorData);

    const additionalContent = (
        <div className="space-y-2 mt-2">
            {/* You can add any additional information here */}
            <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-md mr-2"></div>
                <span>Facebook</span>
                <span className="ml-auto text-white text-xs">+120k Visitors/day</span>
                <span className="ml-1"><ArrowUp color='#6AC92F' /></span>
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 rounded-md mr-2"></div>
                <span>Instagram</span>
                <span className="ml-auto text-white text-xs">-90k Visitors/day</span>
                <span className="ml-1"><ArrowDown color='#C9382F' /></span>
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-cyan-600 rounded-md mr-2"></div>
                <span>Twitter</span>
                <span className="ml-auto text-white text-xs">+150k Visitors/day</span>
                <span className="ml-1"><ArrowUp color='#6AC92F' /></span>
            </div>
        </div>
    );

    return (
        <div className="text-white mx-auto my-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-4 text-center ">
                <div>
                    <h3 className="text-xl font-semibold">{(facebookTotal / 1000).toFixed(2)}k</h3>
                    <p className='text-xs'>Facebook</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{(instagramTotal / 1000).toFixed(2)}k</h3>
                    <p className='text-xs'>Instagram</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{(twitterTotal / 1000).toFixed(2)}k</h3>
                    <p className='text-xs'>Twitter</p>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-md mr-2"></div>
                    <span>Facebook</span>
                    <span className={`ml-auto text-xs ${facebookTrend.difference >= 0 ? 'text-white' : 'text-white'}`}>
                        {facebookTrend.trend} Visitors/day
                    </span>
                    <span className="ml-1">{facebookTrend.difference >= 0 ? <ArrowUp color='#6AC92F' /> : <ArrowDown color='#C9382F' />}</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-600 rounded-md mr-2"></div>
                    <span>Instagram</span>
                    <span className={`ml-auto text-xs ${instagramTrend.difference >= 0 ? 'text-white' : 'text-white'}`}>
                        {instagramTrend.trend} Visitors/day
                    </span>
                    <span className="ml-1">{instagramTrend.difference >= 0 ? <ArrowUp color='#6AC92F' /> : <ArrowDown color='#C9382F' />}</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-cyan-600 rounded-md mr-2"></div>
                    <span>Twitter</span>
                    <span className={`ml-auto text-xs ${twitterTrend.difference >= 0 ? 'text-white' : 'text-white'}`}>
                        {twitterTrend.trend} Visitors/day
                    </span>
                    <span className="ml-1">{twitterTrend.difference >= 0 ? <ArrowUp color='#6AC92F' /> : <ArrowDown color='#C9382F' />}</span>
                </div>
            </div>
            {showMore && additionalContent}
            <div className="flex justify-center items-center gap-2 mt-4 text-center text-[#6DDCFF] cursor-pointer" onClick={() => setShowMore(!showMore)}>
                <p>Show {showMore ? 'less' : 'more'}</p>
                <p>{showMore ?
                    <img src={downArrowIcon} alt='up' className='rotate-[180deg]' />
                    :
                    <img src={downArrowIcon} alt='down' />
                }</p>
            </div>
        </div>
    );
};

export default VisitorStatistics;
