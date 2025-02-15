import { useEffect, useRef, useState } from 'react';
import SocialCard from '../../components/cards/SocialCard';

const SocialMediaCards = ({ socialStatsData }: any) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const scrollRef = useRef<any>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    return (
        <div className="relative">
            {showLeftArrow && (
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 card-bg-dev p-2 rounded-full shadow-lg"
                    onClick={scrollLeft}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </button>
            )}

            <div
                className="flex space-x-3 overflow-x-auto scrollbar-hide"
                ref={scrollRef}
                onScroll={checkScrollPosition}
            >

                {socialStatsData?.map((item: any, index: number) => (
                    <SocialCard
                        key={index}
                        heading={item?.title}
                        value={item?.value}
                        trend={item?.trend}
                        changeVal={item?.changedValue}
                    />
                ))}

            </div>

            {
                showRightArrow && (
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 card-bg-dev p-2 rounded-full shadow-lg"
                        onClick={scrollRight}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                )
            }
        </div >
    );
};

export default SocialMediaCards;
