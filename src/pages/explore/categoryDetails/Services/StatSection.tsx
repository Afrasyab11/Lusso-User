

// const StatsSection = ({ stats }: any) => {
//     return (
//         <div className="flex flex-col md:flex-row justify-between items-center 
//             text-white py-5 md:py-12 space-y-8 md:space-y-0 md:space-x-16">
//             {stats.map((stat: any, index: number) => (
//                 <div key={index} className="flex flex-col md:flex-row gap-2 md:space-x-2 items-center">
//                     <div className="text-6xl font-bold">{stat.value}</div>
//                     <div className="text-2xl w-[100px] font-semibold">{stat.label}</div>
//                 </div>
//             ))}
//         </div>
//     );
// };

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// export default StatsSection;


const StatCard = ({ number, description }: any) => (
    <div className="bg-gray-800 p-4 rounded-lg flex gap-3 flex-row items-center justify-center text-start w-full"
        style={{ background: 'linear-gradient(180deg, #262242 0%, rgba(38, 34, 66, 0) 100.32%)' }}>
        <span className="text-white text-6xl font-bold">{number}</span>
        <span className="text-xl w-[100px] font-semibold">{description}</span>
    </div>
);

const StatsSection = () => {
    const stats = [
        { number: '14', description: 'Years of Experience' },
        { number: '50+', description: 'Projects Completed' },
        { number: '1.5k', description: 'Happy Clients' },
    ];


    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        const container: any = scrollContainerRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 1
            );
        }
    };

    useEffect(() => {
        const container: any = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    const scroll = (direction: any) => {
        const container: any = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: direction * 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-3 rounded-2xl p-5 relative bg-[#161328]">
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-none"
            >
                {stats.map((stat, index) => (
                    <StatCard key={index} number={stat.number} description={stat.description} />
                ))}
            </div>

            {/* Scroll Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll(-1)}
                        className="p-2 bg-gray-800 rounded-full text-white opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                {showRightArrow && (
                    <button
                        onClick={() => scroll(1)}
                        className="p-2 bg-gray-800 rounded-full text-white opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default StatsSection;
