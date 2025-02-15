import { useState } from 'react';
import { Link } from 'react-router-dom';
import SampleCategory4 from '../../assets/images/SampleCategory4.svg';
import topTag from '../../assets/images/explore/top-tag.svg';
import './Card.css';
interface CardProps {
    category?: string;
    imageSrc: string;
    title: string;
    subtitle: string;
    productId: string;
    isBanner?: boolean;
}

const RecentCards: React.FC<CardProps> = ({ category, productId, imageSrc, title, subtitle, isBanner = false }) => {
    console.log("🚀 ~ category:", category)
    const [src, setSrc] = useState(imageSrc);


    const handleError = () => {
        setSrc(SampleCategory4);
        console.log('Failed to load image, displaying fallback image.');
    };
    let categoryPath =
        category?.toLowerCase() === 'ai products' ? 'movies' :
            category?.toLowerCase() === 'movie' ? 'movies' :
                category?.toLowerCase() === 'course' ? 'courses' :
                    category?.toLowerCase() === 'game' ? 'games' :
                        category?.toLowerCase() === 'service' ? 'services' :
                            category?.toLowerCase() === 'app' ? 'apps'
                                : title === 'RECOMMENDATIONS' ? 'apps' : category?.toLowerCase()


    console.log({ categoryPath })
    return (
        // OLD CODE
        // <div className="travel-buddy-card">
        //     <img src={src} alt={SampleCategory4} onError={handleError} className="card-image" />
        //     <div className="card-overlay">
        //         <h2 className="card-title">{title}</h2>
        //         <p className="card-subtitle">{subtitle}</p>
        //     </div>
        // </div>

        // New Code
        <div className='relative z-10 rounded-lg hover:border hover:p-1 overflow-hidden left-12'>
            <Link to={category ? `/explore/${categoryPath}/details/${productId}` : ''}>

                <div className="rounded-lg overflow-hidden">
                    <img src={src} alt={SampleCategory4} className={` ${isBanner ? 'w-[250px] h-[200px]' : 'w-full h-80'} object-cover`} />
                    <div className={`absolute top-0 ${isBanner ? 'right-0' : 'right-2'} text-white text-xs px-2 rounded`}>
                        <img src={topTag} alt='topTag' className={`${isBanner ? 'w-5' : 'w-10'}`} style={{ width: isBanner ? 25 : 35 }} />
                    </div>
                    <div className="bg-[#bfc2c2] bg-opacity-30 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                        <h3 className={`${isBanner ? 'text-xs' : 'text-lg'} font-semibold`}>{title}</h3>
                        <p className="text-xs">{subtitle}</p>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default RecentCards;
