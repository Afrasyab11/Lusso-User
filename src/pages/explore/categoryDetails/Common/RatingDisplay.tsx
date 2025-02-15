import { useState } from "react";
import arrow from "../../../../assets/images/products/icons/arror.png";
interface StarDistribution {
    avaerageRating: number;
    memeberToRate: number;
}

const CustomStar = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
        <path
            d="M8.65625 0L11.7721 4.7114L17.2158 6.21885L13.6978 10.6381L13.9463 16.2812L8.65625 14.301L3.36618 16.2812L3.6147 10.6381L0.0967417 6.21885L5.5404 4.7114L8.65625 0Z"
            fill={filled ? "#ffd71e" : "none"}
            stroke="#ffd71e"
        />
    </svg>
);

const RatingDisplay = ({ starDistribution }: { starDistribution: StarDistribution }) => {

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<CustomStar key={i} filled={i <= rating} />);
        }
        return stars;
    };
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="text-white rounded-lg max-w-md md:mx-auto p-4  shadow-lg">
            <div className='flex flex-col gap-4 items-start'>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{starDistribution?.avaerageRating?.toFixed(1)}</span>
                        <div className="flex gap-[0.5px]">
                            {renderStars(starDistribution?.avaerageRating)} {/* Render custom stars */}
                        </div>
                        <div className="border-[1px] border-l-[#d963c6] border-r-[#8525f3] border-t-[#d963c6] border-b-[#8525f3] px-2 py-[10px] rounded-md bg-[#615f6d] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            <img className={`h-2 `} src={arrow} alt="" />
                        </div>
                    </div>
                    {isOpen ? <span className="text-sm font-semibold">{starDistribution?.memeberToRate} Global Ratings</span> : ""}
                </div>

                {/* Star distribution section */}
                {isOpen ? <div className="space-y-2 min-w-[250px] md:min-w-[300px] ease-in">
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center">
                            <span className="w-8 text-sm flex items-center">
                                {stars}
                                <svg className='ml-1' xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                    <path d="M8.65625 0L11.7721 4.7114L17.2158 6.21885L13.6978 10.6381L13.9463 16.2812L8.65625 14.301L3.36618 16.2812L3.6147 10.6381L0.0967417 6.21885L5.5404 4.7114L8.65625 0Z" fill="#ffd71e" />
                                </svg>
                            </span>
                            <div className="flex-grow rounded-full h-4 ml-2" style={{ background: '#281d39' }}>
                                <div
                                    className="bg-gradient-to-r from-[#8525f3] to-[#d963c6] h-4 rounded-full"
                                    style={{ width: `${(stars / 5) * 100}%` }} // Adjust percentage dynamically
                                ></div>
                            </div>
                            <span className="text-sm ml-2">{(stars / 5) * 100}%</span> {/* Replace with actual data */}
                        </div>
                    ))}
                </div> : ""}
            </div>
        </div>
    );
};

export default RatingDisplay;
