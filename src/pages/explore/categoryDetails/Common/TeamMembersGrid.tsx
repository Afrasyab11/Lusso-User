import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { scrollLeft, scrollRight } from '../../../../hooks/common.utils';
import { LineDraw } from '../GameDetailsScreen';

interface TeamMember {
    name: string;
    surname: string;
    role: string;
    imageUrl: string;
    url?: string
}

interface TeamMembersGridProps {
    members: TeamMember[];
    title?: string
}

const TeamMembersGrid: React.FC<TeamMembersGridProps> = ({ members, title = null }) => {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Function to update arrow visibility
    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeft(scrollLeft > 0);
            setShowRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        updateArrowVisibility(); // Initial check
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            // Add event listener for scroll
            scrollContainer.addEventListener('scroll', updateArrowVisibility);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', updateArrowVisibility);
            }
        };
    }, [members]);

    if (members?.length === 0) {
        return <></>
    }

    return (
        <div className="mb-3 bg-[#161328] p-5 rounded-2xl">
            <h2 className="text-xl md:text-3xl font-bold mb-4 capitalize">{title || 'My team'}</h2>
            <LineDraw />
            {members?.length > 0 ? <div className="relative">
                {showLeft && (
                    <button
                        onClick={() => scrollLeft(scrollRef)}
                        className="z-20 absolute -left-3 md:-left-5 top-1/2 transform -translate-y-1/2 bg-[#5721B9] h-9 w-9 rounded-full ps-1"
                        style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}>
                        <ChevronLeft color='#00F0FB' />
                    </button>
                )}
                {showRight && members.length > 0 && (
                    <button
                        onClick={() => scrollRight(scrollRef)}
                        className="z-20 absolute -right-3 md:-right-5 top-1/2 transform -translate-y-1/2 bg-[#5721B9] h-9 w-9 rounded-full ps-1.5"
                        style={{ border: '1px solid var(--outline, rgba(108, 140, 255, 0.50))' }}>
                        <ChevronRight color='#00F0FB' />
                    </button>
                )}
                <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-none">
                    {members.map((member, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="relative w-full pb-[100%] rounded-2xl overflow-hidden mb-4 group">
                                <img
                                    src={member.imageUrl || member.url}
                                    alt={`${member.name} ${member.surname}`}
                                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform 
                                duration-300 ease-in-out group-hover:scale-110"
                                />
                            </div>
                            {/* <h3 className="text-white text-lg md:text-xl font-semibold w-[150px] mb-1">{member.name + ' ' + member?.surname}</h3> */}
                            <h3 className="text-white text-lg md:text-xl font-semibold w-[150px] mb-1">{member.name}</h3>
                            <p className="text-[#B1ADCD] text-md">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div> : <h2>N/A</h2>}
        </div>
    );
};

export default TeamMembersGrid;
