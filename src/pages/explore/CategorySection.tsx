import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import starIcon from '../../assets/images/home/star.svg';
import placeholderImg from '../../assets/images/placeholder-potrait.png';
import CardImage from '../../components/cards/CardImage';
import TitleBar from '../../components/common/TitleBar';
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
    isPopup?: boolean
};

const CategorySection: React.FC<CategoryProps> = ({
    title,
    cards,
    category = null,
    onExpoloreAllClick,
    isPopup = false,
}) => {
    const navigate = useNavigate();
    const refData = useRef(title);
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const isLogged: any = useCookieCheck();

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    let scrollTimeout: NodeJS.Timeout;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scrollContainerRef.current) {
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
            setIsScrolling(false); // Reset scrolling state on mouse down
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current || startX === 0) return;

        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed

        if (Math.abs(walk) > 5) {
            setIsScrolling(true); // Set scrolling state when movement is significant
        }

        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        // Use a short delay to reset scrolling state
        scrollTimeout = setTimeout(() => setIsScrolling(false), 100);
        setStartX(0);
    };

    const handleMouseLeave = () => {
        setStartX(0);
        setIsScrolling(false);
    };

    const handleClick = (item: any) => {
        if (isScrolling) return; // Prevent navigation if scrolling
        let categoryTitle = item?.category || category
        // console.log(item, 'item')
        const categoryPath =
            categoryTitle?.toLowerCase() === "ai" || categoryTitle?.toLowerCase() === "ai products"
                ? "ai"
                : categoryTitle?.toLowerCase() === "movie"
                    ? "movies"
                    : categoryTitle?.toLowerCase() === "course" || category?.toLowerCase() === "courses"
                        ? "courses"
                        : categoryTitle?.toLowerCase() === "game" || categoryTitle?.toLowerCase() === "games"
                            ? "games"
                            : categoryTitle?.toLowerCase() === "service" || category?.toLowerCase() === "services"
                                ? "services"
                                : categoryTitle?.toLowerCase() === "app" || categoryTitle?.toLowerCase() === "apps"
                                    ? "apps"
                                    : title === "RECOMMENDATIONS"
                                        ? "apps"
                                        : categoryTitle?.toLowerCase();

        console.log({ categoryPath })

        if (!categoryPath) {
            console.log("Category is undefined", { categoryPath })
            return
        }

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

    // console.log(cards, 'item')
    return (
        <div className="category">
            <TitleBar
                title={title}
                isLeft={true}
                isHover={isHovered}
                path={category}
                onExpoloreAllClick={onExpoloreAllClick}
                isPopup={isPopup}
            />
            <div className="w-full">
                <div
                    style={{ display: "flex", overflowX: "scroll" }}
                    className="scrollbar-none md:gap-[20px] gap-3"
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave} // Handle reset on leaving container
                >
                    {cards.map((item: any) => (
                        <CardImage
                            key={item.id}
                            item={item}
                            handleClick={handleClick}
                            fallbackSrc={placeholderImg}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeaveHover}
                            categoryTitle={item?.category || category}
                            starIcon={starIcon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
