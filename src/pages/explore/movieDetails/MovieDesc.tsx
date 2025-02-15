import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { scrollRight } from '../../../hooks/common.utils';
import { enableHorizontalScroll } from '../../../lib/ScrollHelper';

function MovieDesc() {
    const allGenres = ['Epic', 'Historical Epic', 'Period Drama', 'Psychological Drama', 'Biography', 'Drama', 'War', 'Psychological Drama', 'Biography', 'Drama', 'War'];
    const visibleGenres = allGenres.slice(0, 6);
    const hasMoreGenres = allGenres.length > 10;
    const [showRight, setShowRight] = useState(true);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        const handleScroll = () => checkScrollPosition();

        const currentScrollRef = scrollRef.current;

        // Ensure the ref exists before adding the event listener
        if (currentScrollRef) {
            currentScrollRef.addEventListener('scroll', handleScroll);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (currentScrollRef) {
                currentScrollRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        // Ensure scrollRef.current is not null before calling enableHorizontalScroll
        if (scrollRef.current) {
            const cleanup = enableHorizontalScroll(scrollRef.current);

            return () => {
                if (cleanup) cleanup();
            };
        }
    }, []);

    return (
        <div className="bg-[#161328] text-white p-5 rounded-2xl mb-3 relative">
            {showRight && (
                <button
                    onClick={() => scrollRight(scrollRef)}
                    className="
                    z-20 absolute right-0 md:right-0 top-10 transform -translate-y-1/2 bg-[#161328] rounded-full p-2.5 py-2"
                >
                    <ChevronRight size={30} />
                </button>
            )}

            <div className="flex items-center mb-4 overflow-x-auto scrollbar-none pe-10" ref={scrollRef}>
                <div className="flex gap-2 flex-nowrap">
                    {allGenres.map((genre, index) => (
                        <span key={index} className="flex-1 cursor-pointer px-4 py-1 border-2 border-[#7D3CF3] rounded-full text-lg hover:bg-[#7D3CF3] hover:text-white whitespace-nowrap">
                            {genre}
                        </span>
                    ))}
                </div>
            </div>

            <p className="text-lg mb-4 border-b border-b-[#454253] py-2">
                The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
            </p>

            <div className="flex flex-col justify-center">
                <div className="flex border-b border-b-[#454253] py-2 items-center">
                    <span className="font-semibold w-24">Director</span>
                    <span className="text-[#6DDCFF]">Christopher Nolan</span>
                </div>
                <div className="flex border-b border-b-[#454253] py-2 items-center">
                    <span className="font-semibold w-24">Writer</span>
                    <span className="text-[#6DDCFF]">Christopher Nolan, Kai Bird</span>
                </div>
                <div className="flex py-2 items-center">
                    <span className="font-semibold w-24">Stars</span>
                    <span className="text-[#6DDCFF]">Cillian Murphy, Emiley, Matt Damon</span>
                </div>
            </div>
        </div>

    )
}

export default MovieDesc