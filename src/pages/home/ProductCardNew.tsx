import React, { useEffect, useState } from 'react';
import starIcon from '../../assets/images/home/star.svg';
import placeholderImg from '../../assets/images/placeholder-potrait.png';

interface Item {
  id: number;
  icon: string;
  title: string;
  genre: string;
  rating?: any;
  category?: any;
}

interface ProductCardProps {
  item: Item;
  navigateDetails: (id: number) => void;
  width?: string;
  height?: string;
  homeTrending?: boolean;
}

const ProductCardNew: React.FC<ProductCardProps> = ({
  item,
  navigateDetails,
  width = '',
  height = '',
  homeTrending = false,
}) => {
  const [currentSrc, setCurrentSrc] = useState(placeholderImg);

  // console.log("🚀 ~ item:", item)
  let isDragging = false;

  const handleMouseDown = () => {
    isDragging = false;
  };

  const handleMouseMove = () => {
    isDragging = true;
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      navigateDetails(item.id);
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = item.icon;

    img.onload = () => setCurrentSrc(item.icon);
    img.onerror = () => setCurrentSrc(placeholderImg);
  }, [item.icon, placeholderImg]);

  return (
    <div>
      {/* Mobile View */}
      <div className="block sm:block md:hidden lg:hidden">
        <div className="flex flex-wrap gap-2 justify-center mx-auto">
          {/* Adjusting the card size dynamically */}
          <div className="cursor-pointer relative rounded-xl group overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] max-[378px]:w-[90px] max-[378px]:h-[90px] 769-1100:w-[110px] 769-1100:h-[110px] mx-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>

            <div
              className="h-full w-full relative overflow-hidden bg-cover bg-center"
              onClick={() => navigateDetails(item.id)}
              style={{
                backgroundImage: `url(${currentSrc})`,
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

              <div className="flex flex-col justify-between relative z-10 h-full p-1 sm:p-2">
                {/* Content container */}
                <div className="bg-black bg-opacity-60 w-full flex flex-col gap-y-1 p-1 absolute bottom-0 left-0">
                  <h3 className="text-white text-[6px] sm:text-[8px] font-medium truncate">
                    {item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title}
                  </h3>
                  <p className="text-white text-[5px] sm:text-[6px]">
                    {item.genre}
                  </p>
                  {/* Tightened rating and star icon */}
                  <p className="flex items-center gap-[1px]">
                    <span className="text-[#00F0FB] text-[5px] sm:text-[6px]">
                      {item.rating}
                    </span>
                    <img
                      src={starIcon}
                      alt="star"
                      className={`h-[5px] sm:h-[6px] ${width !== '250px' ? 'w-[13px!important]' : 'w-auto'}`}

                    />
                  </p>
                </div>

                {/* Category badge */}
                <div className="absolute bottom-1 right-1">
                  <span className="bg-[#3B2C94] px-1 py-[1px] text-white rounded-2xl text-[5px] sm:text-[6px]">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Web View */}
      <div className="hidden md:block">
        <div
          className="cursor-pointer relative rounded-xl group overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className={`h-[${height || '299px'
              }] w-[${width}] relative overflow-hidden customcard max-[378px]:h-[90px] 769-1100:w-[200px] 769-1100:h-[200px] `}
            onClick={() => navigateDetails(item.id)}
            style={{
              backgroundImage: `url(${item.icon})`,
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="flex justify-between relative z-10 h-full p-3">
              <div className="bg-[#e3f1f1] bg-opacity-80 flex-1 w-full p-2 md:px-3 md:pb-5 flex flex-col gap-y-2 absolute md:p-[15px] p-[10px] bottom-0 left-0" style={{ top: '60%', backgroundColor: 'rgba(0, 0, 0, 0.55)' }} >
                <h3 className="text-white text-xs md:text-xl md:font-medium">
                  {item.title.length > 12
                    ? item.title.substring(0, 12) + '...'
                    : item.title}
                </h3>
                <p
                  className={`text-white font-normal pb-1 ${width !== '250px' ? 'text-[10px]' : 'text-xs text-8'
                    }`}
                >
                  {item.genre}
                </p>
                <p className="flex gap-2 items-center justify-start">
                  <span
                    className={`text-[#00F0FB] ${width !== '250px' && 'text-xs'
                      } text-xs`}
                  >
                    {item?.rating}
                  </span>
                  <div className="merginminus">
                    <img
                      src={starIcon}
                      alt="star"
                      className={`h-3 ${width !== '250px' ? 'w-[13px!important]' : 'w-auto'
                        }`}
                    />
                  </div>

                </p>
              </div>
              <div
                className={`absolute ${homeTrending
                  ? width !== '250px'
                    ? 'bottom-[15px] right-4'
                    : 'bottom-[15px] right-4'
                  : 'bottom-4 right-2'
                  }`}
              >
                <span
                  className={`bg-[#3B2C94] px-4 py-1 text-white rounded-2xl ${width !== '250px' ? 'text-[9px]' : 'text-[10px]'

                    }`}
                >
                  {item?.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductCardNew;
