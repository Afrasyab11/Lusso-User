import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import nextIcon from '../../assets/images/home/chevron-right.svg';
import NewlyAddedCard from "./NewlyAddedCard";

type CardData = {
    imageSrc: string;
    title: string;
};

type CategoryProps = {
    title: string;
    cards: CardData[];
    category?: string
    onExpoloreAllClick?: any
    isPopup?: boolean
};

const NewlyAddedCategory: React.FC<CategoryProps> =
    ({ title, cards, category = null, onExpoloreAllClick, isPopup = false }) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollLeft, setScrollLeft] = useState(0);
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseDown = (e: React.MouseEvent) => {
            if (scrollContainerRef.current) {
                setIsDragging(true);
                setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
                setScrollLeft(scrollContainerRef.current.scrollLeft);
            }
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            if (!isDragging || !scrollContainerRef.current) return;
            e.preventDefault();
            const x = e.pageX - scrollContainerRef.current.offsetLeft;
            const walk = (x - startX) * 1.5; // Adjust scroll speed
            scrollContainerRef.current.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleMouseEnter = () => {
            if (!isHovered) setIsHovered(true);
        };

        const handleMouseLeaveHover = () => {
            if (isHovered) setIsHovered(false);
        };

        return (
            <div className="category">
                <TitleBar title={title} isLeft={true} />
                {/* <TitleBar
                    title={title}
                    isLeft={true}
                    isHover={isHovered}
                    path={category}
                    onExpoloreAllClick={onExpoloreAllClick}
                    isPopup={isPopup}
                /> */}
                <div style={{ width: '100%' }}>
                    <div
                        ref={scrollContainerRef}
                        style={{
                            display: 'flex',
                            gap: 6,
                            overflowX: 'scroll',
                            WebkitOverflowScrolling: 'touch',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {cards.map((card, index) => (
                            <div key={index} className="me-4"
                                style={{
                                    flex: "0 0 auto", // Ensure cards are not shrinking
                                }}>
                                <NewlyAddedCard card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
function TitleBar({ title, isLeft = false, isExplore = false, path = null, isHover = null, onExpoloreAllClick }: any) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    const handleMouseEnter = () => {
        if (isHovered) return;
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!isHovered) return;
        setIsHovered(false);
    };

    useEffect(() => {
        if (isHover) {
            setIsHovered(isHover)
        }
    }, [isHover])
    return (
        <div onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} className={`flex items-center ${isLeft ? 'justify-between md:justify-start' : 'justify-between md:justify-center'} ${isExplore ? 'gap-2' : 'gap-5'}`}>
            <h3 className={`font-[700] ${isExplore ? 'text-xl md:text-2xl mb-[10px] md:mb-3' : isLeft ? 'text-xl md:text-[30px] mb-[10px] md:mb-5' : 'text-xl md:text-[40px] mb-[10px] md:mb-10'} text-white text-center uppercase fontFamily-work-sans`}>
                {title}
            </h3>

            <span
                onClick={() => navigate(path ? '/explore/' + path?.toLowerCase() + '/all' : '')}
                className="md:hidden flex md:gap-2 md:pd-0 pb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#985FFF] to-[#FF99EF] md:mb-3">
                See all
                <ChevronRight color='#985FFF' />
            </span>
            {/* {
                isHovered === true &&
                <h2 onClick={() => onExpoloreAllClick ? onExpoloreAllClick(path) : navigate(path ? '/explore/' + path?.toLowerCase() + '/all' : '')}
                    className={`hidden md:block cursor-pointer ${isExplore ? 'text-md mb-3.5' : isLeft ? 'text-[20px] -mt-5' : 'text-[30px] -mt-10 '}`}
                    style={{ color: 'violet', fontWeight: 700 }}>EXPLORE ALL</h2>
            } */}
            <div className={`hidden md:block ${isExplore ? 'w-[15px] -mt-[13px]' : isLeft ? '-mt-[20px]' : '-mt-[35px]'}`}>
                <img src={nextIcon} alt=''
                    style={{ width: 20, height: 20 }} />
            </div>
        </div>
    )
}
export default NewlyAddedCategory;
