import React, { useState } from 'react';
import { LineDraw } from '../GameDetailsScreen';

interface FeatureSectionProps {
    productInfo: {
        [key: string]: string; // Expecting an object with string keys and string values
    };
    initialLimit?: number;
    title: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ productInfo, initialLimit = 5, title }) => {
    const [showFullContent, setShowFullContent] = useState(false);

    // Transform the productInfo into an array of features
    const features = Object.entries(productInfo ?? {})?.map(([key, value]) => ({
        title: key ?? '',
        description: value ?? '',
    }));

    const shouldShowReadMore = features.length > initialLimit;
    const displayedFeatures = showFullContent ? features : features.slice(0, initialLimit);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    if (displayedFeatures?.length === 0) {
        return <></>
    }

    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-4 capitalize">{title}</h2>
            <LineDraw />

            {!productInfo ? <h2>N/A</h2> : <>
                <ul className="list-inside text-gray-300 mb-3 grid grid-cols-1 gap-4">
                    {displayedFeatures?.map((feature, index) => (
                        <li key={index} className="text-xl mb-1">
                            {/* <h3 className="font-semibold mr-1">{feature.title}:</h3> */}
                            <div className='flex items-start'>
                                <div className="mt-1" dangerouslySetInnerHTML={{ __html: feature.description }} />
                            </div>
                        </li>
                    ))}
                </ul>

                {shouldShowReadMore && (
                    <button
                        onClick={toggleContent}
                        className="text-[#6DDCFF] font-semibold mt-3 text-lg"
                    >
                        {showFullContent ? 'Read less' : 'Read more'}
                    </button>
                )}

            </>
            }
        </div>
    );
};

export default FeatureSection;
