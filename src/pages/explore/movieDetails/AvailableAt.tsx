import fourKIcon from '../../../assets/images/explore/category/games/4k.svg';
import ccIcon from '../../../assets/images/explore/category/games/cc.svg';
import dolbyIcon from '../../../assets/images/explore/category/games/dolby.svg';
import pgIcon from '../../../assets/images/explore/category/movies/PG12.png';
import { LineDraw } from './MovieDetailsScreen';

function AvailableAt({ selectedOption, setSelectedOption, sourceLinks }: any) {

    let png = {
        "youtube": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/youtube.png",
        "X-Box": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/x+box.png",
        "Steam": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/Steam.png",
        "Play Store": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/plat+store.png",
        "Peacock": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/Peacock.png",
        "Netflix": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/netflix.png",
        "Hulu": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/hulu.png",
        "HBO max": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/hbo+max.png",
        "google play movies": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/google+play+movies.png",
        "fandago at home": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/fandango+at+home.png",
        "Disney": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/disnep+%2B.png",
        "Apple TV": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/apple+tv.png",
        "App Store": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/app+store.png",
        "Amazon prime video ": "https://lusso-marketplace-dev.s3.us-east-2.amazonaws.com/products/mediaplatform/amazon+prime+video.png",
    };

    const availabilityOptions = ['All', 'Subscription', 'Buy', 'Rent', 'Free'];

    const platformInfo: any[] = [];

    sourceLinks?.forEach((platforms: any) => {
        Object.keys(platforms)?.forEach((platformName) => {
            const platform = platforms[platformName];

            const logo = Object.keys(png).find(key =>
                platformName.toLowerCase().includes(key.toLowerCase())
            );

            const price = platform.paymentPlan === 'Free' ? '0.00' : platform.price;
            platformInfo.push({
                logo: logo ? png[logo as keyof typeof png] : '',
                description: 'Violence, Bad Language',
                purchaseTxt: 'In-Game Purchases',
                price: `${price}/ month`,
                subtext: 'Offers In-App Purchases',
                link: platform.link
            });
        });
    });


    const handleVisitNowClick = (url: string) => {
        window.open(url, '_blank');
    };

    if (platformInfo?.length === 0) {
        return <></>
    }

    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-4 text-white">Available At</h2>
            <LineDraw />
            <div className="flex space-x-2 mb-4 overflow-x-auto flex-wrap md:flex-nowrap 
                justify-center md:justify-normal gap-y-3 md:gap-y-0 items-center">
                {availabilityOptions?.map((option) => (
                    <button
                        key={option}
                        className={`px-5 py-2 rounded-[30px] text-md font-semibold ${selectedOption === option
                            ? 'bg-[#5721B9] text-white'
                            : 'border-[#7D3CF3] border-2 text-[#F2F0FF]'
                            }`}
                        onClick={() => setSelectedOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {platformInfo?.length > 0 ? platformInfo.map((platform: any, index: any) => (
                <div key={index} className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 py-5 border-2 border-[#a145e7]
 md:border-0 rounded-[16px] md:rounded-0 mb-4 md:mb-0"
                >
                    <div className="md:w-1/6 flex items-center justify-center">
                        <div>
                            <img src={platform.logo} alt='Platform Logo' className='w-auto max-w-[5rem] max-h-[4rem]' />
                        </div>
                    </div>
                    <div className='md:w-2/6 flex flex-col gap-2'>
                        <div className='flex gap-3 flex-wrap md:flex-nowrap items-center'>
                            <div>
                                <img src={ccIcon} alt='ccIcon' className='h-5' />
                            </div>
                            <div>
                                <img src={fourKIcon} alt='4K Icon' className='h-5' />
                            </div>
                            <div>
                                <img src={pgIcon} alt='PG Icon' className='h-5' />
                            </div>
                            <div>
                                <img src={dolbyIcon} alt='Dolby Icon' className='h-5' />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400">{platform.description}</p>
                        <p className="text-xs text-gray-400">{platform.purchaseTxt}</p>
                    </div>
                    <div className="md:w-1/6 text-left">
                        <p className="text-white text-md font-bold">{platform.price}</p>
                        <p className="text-xs text-white">{platform.subtext}</p>
                    </div>
                    <div className="md:w-2/6 flex items-center justify-end">
                        <button
                            className=" text-white px-5 py-2 rounded-full text-sm flex items-center
                            border-[#7D3CF3] border-2 font-medium"
                            onClick={() => handleVisitNowClick(platform.link)}
                        >
                            Visit Now
                            <svg className='ms-1' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M12.5 2.75C10.5716 2.75 8.68657 3.32183 7.08319 4.39317C5.47982 5.46451 4.23013 6.98726 3.49218 8.76884C2.75422 10.5504 2.56114 12.5108 2.93735 14.4021C3.31355 16.2934 4.24215 18.0307 5.60571 19.3943C6.96928 20.7579 8.70656 21.6865 10.5979 22.0627C12.4892 22.4389 14.4496 22.2458 16.2312 21.5078C18.0127 20.7699 19.5355 19.5202 20.6068 17.9168C21.6782 16.3134 22.25 14.4284 22.25 12.5C22.2473 9.91498 21.2192 7.43661 19.3913 5.60872C17.5634 3.78084 15.085 2.75273 12.5 2.75ZM12.5 20.75C10.8683 20.75 9.27326 20.2661 7.91655 19.3596C6.55984 18.4531 5.50242 17.1646 4.878 15.6571C4.25358 14.1496 4.0902 12.4908 4.40853 10.8905C4.72685 9.29016 5.51259 7.82015 6.66637 6.66637C7.82016 5.51259 9.29017 4.72685 10.8905 4.40852C12.4909 4.09019 14.1497 4.25357 15.6571 4.87799C17.1646 5.50242 18.4531 6.55984 19.3596 7.91655C20.2661 9.27325 20.75 10.8683 20.75 12.5C20.7475 14.6873 19.8775 16.7843 18.3309 18.3309C16.7843 19.8775 14.6873 20.7475 12.5 20.75ZM16.7806 11.9694C16.8504 12.039 16.9057 12.1217 16.9434 12.2128C16.9812 12.3038 17.0006 12.4014 17.0006 12.5C17.0006 12.5986 16.9812 12.6962 16.9434 12.7872C16.9057 12.8783 16.8504 12.961 16.7806 13.0306L13.7806 16.0306C13.6399 16.1714 13.449 16.2504 13.25 16.2504C13.051 16.2504 12.8601 16.1714 12.7194 16.0306C12.5786 15.8899 12.4996 15.699 12.4996 15.5C12.4996 15.301 12.5786 15.1101 12.7194 14.9694L14.4397 13.25H8.75C8.55109 13.25 8.36033 13.171 8.21967 13.0303C8.07902 12.8897 8 12.6989 8 12.5C8 12.3011 8.07902 12.1103 8.21967 11.9697C8.36033 11.829 8.55109 11.75 8.75 11.75H14.4397L12.7194 10.0306C12.5786 9.88989 12.4996 9.69902 12.4996 9.5C12.4996 9.30098 12.5786 9.11011 12.7194 8.96937C12.8601 8.82864 13.051 8.74958 13.25 8.74958C13.449 8.74958 13.6399 8.82864 13.7806 8.96937L16.7806 11.9694Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))
                : <h2>N/A</h2>
            }
        </div>
    );
}

export default AvailableAt;
