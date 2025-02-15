import { useEffect, useRef, useState } from 'react';
import OnePostCard from './components/OnePostCard';

interface PostsCardProps {
    onClick: (postType: string) => void;
    postCounts?: any
}

const PostsCard = ({ onClick, postCounts }: PostsCardProps) => {
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
                {/* Scheduled Post */}
                <OnePostCard
                    heading="Scheduled Posts"
                    value={postCounts?.PENDING}
                    increase="8.2k increase/day"
                    onClick={() => onClick("PENDING")}
                />

                {/* Queued Post */}
                {/* <OnePostCard
                    heading="Queued Posts"
                    value="09"
                    increase="8.2k increase/day"
                    onClick={() => onClick("Queued Posts")}
                /> */}

                {/* Published Post */}
                <OnePostCard
                    heading="Published Posts"
                    value={postCounts?.PUBLISHED}
                    increase="8.2k increase/day"
                    onClick={() => onClick("PUBLISHED")}
                />
            </div>

            {showRightArrow && (
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 card-bg-dev p-2 rounded-full shadow-lg"
                    onClick={scrollRight}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            )}
        </div>
    );
};

export default PostsCard;
