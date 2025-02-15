import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { LineDraw } from '../GameDetailsScreen';

interface dataType {
    title: string;
    data: any[];
    linkPath?: string;
    isVertical?: boolean;
    showMoreLink?: boolean;
    isService?: boolean
}

function InfoSection({
    title,
    data,
    linkPath,
    showMoreLink = true,
    isVertical = false,
    initialLimit = 5,
    isService = false
}: dataType & { initialLimit?: number }) {
    const [showFullContent, setShowFullContent] = useState(false);

    const shouldShowReadMore = data.length > initialLimit;
    // const displayedData = data
    const displayedData = showFullContent ? data : data?.slice(0, initialLimit);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-4 capitalize">{title}</h2>
            <LineDraw />
            {!data ? <h2>N/A</h2> : <>
                <ul
                    className={`list-inside text-gray-300 mb-3 grid grid-cols-1 md:grid-cols-2`}
                >
                    {displayedData?.map((item, index) => (
                        <li key={index} className="text-xl mb-1 flex items-center">
                            {isVertical ? (
                                <svg
                                    className="me-1.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                        fill="#6DDCFF"
                                        stroke="#6DDCFF"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M16.125 9.75L10.625 15L7.875 12.375"
                                        stroke="#16132B"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            ) : (
                                isService ? <CircleCheck color='#161328' fill='#6DDCFF' className='me-2' /> :
                                    !item?.icon && <span className="list-disc mr-2 h-6" style={{ fontSize: '2rem' }}>
                                        •
                                    </span>
                            )}
                            {item?.icon ? (
                                <div className="flex gap-5 items-center">
                                    <span className="w-5">
                                        <img src={item?.icon ?? ''} alt={`icon-${index}`} />
                                    </span>{' '}
                                    <span> {item?.text ?? ''}</span>
                                </div>
                            ) : (
                                item
                            )}
                            {/* {item} */}
                        </li>
                    ))}
                </ul>
                {shouldShowReadMore && showMoreLink && (
                    <button
                        onClick={toggleContent}
                        className="text-[#6DDCFF] font-semibold mt-3 text-lg"
                    >
                        {showFullContent ? 'Read less' : 'Read more'}
                    </button>
                )}
            </>}
        </div>
    );
}

export default InfoSection;
