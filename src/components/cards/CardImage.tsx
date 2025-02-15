import React, { useState, useEffect } from 'react';


const CardImage = ({ item, handleClick, fallbackSrc, handleMouseEnter, handleMouseLeave, categoryTitle, starIcon }: any) => {
    const [currentSrc, setCurrentSrc] = useState(item.imageSrc);
    useEffect(() => {
        const img = new Image();
        img.src = item.imageSrc;

        img.onload = () => setCurrentSrc(item.imageSrc);
        img.onerror = () => setCurrentSrc(fallbackSrc);
    }, [item.imageSrc, fallbackSrc]);

    return (
        <div
            key={item.id}
            className="w-[150px] md:w-[295px] lg:min-w-[295px] md:h-[320px] flex-shrink-0 flex flex-col rounded-2xl transition-all duration-300 
                           hover:border-white hover:border-2 hover:p-1 overflow-hidden cursor-pointer"
            onClick={() => handleClick(item)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="h-[220px] md:h-[320px] relative rounded-2xl bg-cover bg-center"
                style={{
                    backgroundImage: `url(${currentSrc})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="flex justify-between relative z-10 h-full">
                    <div
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
                        className="cardBGCt bg-[#e3f1f1] bg-opacity-80 flex-1 w-full p-2 md:px-3 md:pb-5 flex flex-col gap-y-2  absolute bg-transparent rounded-t-lg md:top-[70%] bottom-0">
                        <h3 className="text-white font-semibold text-sm uppercase">
                            {item.title}
                        </h3>
                        <p className="text-white text-xs font-normal">
                            {item.subtitle}
                        </p>
                        {/* <p className="flex gap-2 items-center justify-start"> */}
                        <div className="flex justify-between w-full py-1">
                            <p className="flex items-center py-1 h-4">
                                <label className="text-[#00F0FB] text-med">{item?.rating ? item?.rating?.toFixed(1) : 0}</label>
                                <img src={starIcon} alt="star" className="h-4 w-4 ml-1" />
                            </p>
                           {categoryTitle && <span className="bg-[#3B2C94] px-3 py-1 text-white text-xs rounded-2xl capitalize">
                                {categoryTitle}
                            </span>}
                        </div>
                        {/* </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardImage;
