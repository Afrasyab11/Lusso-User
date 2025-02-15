import { ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nextIcon from '../../assets/images/home/chevron-right.svg';
import starIcon from '../../assets/images/home/star.svg';
import placeholderImg from '../../assets/images/placeholder-potrait.png';
import CardImage from "../../components/cards/CardImage";
import { useCookieCheck } from '../../hooks/authHooks';
import '../home/Category.css';

type CardData = {
    imageSrc: string;
    title: string;
    subtitle: string;
    productId: string;
};

type CategoryProps = {
    title: string;
    cards: CardData[];
    category?: null | string;
    onExpoloreAllClick?: (cat: string) => void
};

const CategorySectionWithoutHover: React.FC<CategoryProps> = ({
    title,
    cards,
    category = null,
    onExpoloreAllClick,
}) => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const isLogged: any = useCookieCheck();
    const [isHovered, setIsHovered] = useState(false);

    let dragTimeout: NodeJS.Timeout;

    // Handle mouse down for dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scrollContainerRef.current) {
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
            setIsDragging(false);
            clearTimeout(dragTimeout); // Clear any existing timeout
        }
    };

    // Handle mouse movement for dragging
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current || startX === 0) return;

        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed

        if (Math.abs(walk) > 5) {
            setIsDragging(true); // Set dragging to true after significant movement
        }

        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    // Reset dragging state
    const handleMouseUp = () => {
        dragTimeout = setTimeout(() => setIsDragging(false), 100); // Prevent drag state from lingering briefly
        setStartX(0);
    };

    const handleMouseLeave = () => {
        setStartX(0);
        setIsDragging(false);
    };

    // Determine category path
    const getCategoryPath = (category: string) => {
        switch (category.toLowerCase()) {
            case "ai":
                return "ai";
            case "movie":
                return "movies";
            case "course":
                return "courses";
            case "game":
                return "games";
            case "service":
                return "services";
            case "app":
                return "apps";
            default:
                return "apps";
        }
    };

    const handleClick = (item: any) => {
        const category = item?.category
        if (isDragging) return; // Prevent navigation if scrolling
        const categoryPath =
            category?.toLowerCase() === "ai"
                ? "movies"
                : category?.toLowerCase() === "movie"
                    ? "movies"
                    : category?.toLowerCase() === "course"
                        ? "courses"
                        : category?.toLowerCase() === "game"
                            ? "games"
                            : category?.toLowerCase() === "service"
                                ? "services"
                                : category?.toLowerCase() === "app"
                                    ? "apps"
                                    : title === "RECOMMENDATIONS"
                                        ? "apps"
                                        : category?.toLowerCase();

        console.log({ categoryPath, category: category?.toLowerCase() })

        if (isLogged) {
            navigate(categoryPath ? `/explore/${categoryPath}/details/${item?.productId}` : "");
        } else {
            navigate("/login");
        }
    };

    const handleMouseEnter = () => {
        if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeaveHover = () => {
        if (isHovered) setIsHovered(false);
    };


    return (
        <div className="category">
            <TitleBar
                title={title}
                isLeft={true}
                path={category}
                onExpoloreAllClick={onExpoloreAllClick}
            />
            <div
                ref={scrollContainerRef}
                style={{ display: "flex", overflowX: "scroll", cursor: isDragging ? "grabbing" : "grab" }}
                className="scrollbar-none md:gap-[20px] gap-3"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave} // Stop dragging if mouse leaves the container
            >
                {cards.map((item: any) => (
                    // <div
                    //     key={item.id}
                    //     className="w-[150px] md:w-[295px] lg:min-w-[295px] md:h-[320px] flex-shrink-0 flex flex-col rounded-2xl transition-all duration-300 
                    //     hover:border-white hover:border-2 hover:p-1 overflow-hidden cursor-pointer"
                    //     onClick={() => handleCardClick(item)} // Prevent navigation during drag
                    // >
                    //     <div
                    //         className="h-[220px] md:h-[320px] relative rounded-2xl bg-cover bg-center"
                    //         style={{ backgroundImage: `url(${item.imageSrc || placeholderImg})` }}
                    //     >
                    //         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    //         <div className="flex justify-between relative z-10 h-full">
                    //             <div
                    //                 style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
                    //                 className="bg-[#e3f1f1] bg-opacity-80 flex-1 w-full p-2 md:px-3 md:pb-5 flex flex-col gap-y-2 absolute bg-transparent rounded-lg md:top-[70%] top-[50%]"
                    //             >
                    //                 <h3 className="text-white font-semibold text-sm uppercase">
                    //                     {item.title}
                    //                 </h3>
                    //                 <p className="text-white text-xs font-normal">{item.subtitle}</p>
                    //                 <div className="flex justify-between w-full py-1">
                    //                     <p className="flex items-center py-1 h-4">
                    //                         <label className="text-[#00F0FB] text-med">4.6</label>
                    //                         <img src={starIcon} alt="star" className="h-4 w-4 ml-1" />
                    //                     </p>
                    //                     <span className="bg-[#3B2C94] px-3 py-1 text-white text-xs rounded-2xl capitalize">
                    //                         {category || title}
                    //                     </span>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>

                    <CardImage
                        key={item.id}
                        item={item}
                        handleClick={handleClick}
                        fallbackSrc={placeholderImg}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeaveHover}
                        categoryTitle={item?.category}
                        starIcon={starIcon}
                    />
                ))}
            </div>
        </div>
    );
};

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
export default CategorySectionWithoutHover;
