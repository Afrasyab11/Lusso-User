import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import nextIcon from '../../assets/images/home/chevron-right.svg';

function TitleBar({ title, isLeft = false, isExplore = false, path = null, isHover = null, onExpoloreAllClick, isPopup = false }: any) {
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
            <h3 className={`font-[700] ${isExplore ? 'text-xl md:text-2xl mb-[10px] md:mb-3' : isLeft ? 'text-xl md:text-[30px] mb-[10px] md:mb-5 text-start' : 'text-xl md:text-[40px] mb-[10px] md:mb-10 text-center'} text-white uppercase fontFamily-work-sans`}>
                {title}
            </h3>

            <span
                onClick={() => onExpoloreAllClick ? onExpoloreAllClick(path) : navigate(path ? '/explore/' + path?.toLowerCase() + '/all' : '')}
                className="md:hidden flex md:gap-2 md:pd-0 pb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#985FFF] to-[#FF99EF] md:mb-3">
                See all
                <ChevronRight color='#985FFF' />
            </span>
            {
                (isHovered === true && isPopup === false) &&
                <h2 onClick={() => onExpoloreAllClick ? onExpoloreAllClick(path) : navigate(path ? '/explore/' + path?.toLowerCase() + '/all' : '')}
                    className={`hidden md:block cursor-pointer ${isExplore ? 'text-md mb-3.5' : isLeft ? 'text-[20px] -mt-5' : 'text-[30px] -mt-10 '}`}
                    style={{ color: 'violet', fontWeight: 700 }}>EXPLORE ALL</h2>
            }
            {isPopup === false && <div className={`hidden md:block ${isExplore ? 'w-[15px] -mt-[13px]' : isLeft ? '-mt-[20px]' : '-mt-[35px]'}`}>
                <img src={nextIcon} alt=''
                    style={{ width: 20, height: 20 }} />
            </div>}
        </div>
    )
}

export default TitleBar