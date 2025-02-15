import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import starIcon from '../../assets/images/home/star.svg';
import Number1 from '../../assets/images/Number1.svg';
import Number2 from '../../assets/images/Number2.svg';
import Number3 from '../../assets/images/Number3.svg';
import Number4 from '../../assets/images/Number4.svg';
import Number5 from '../../assets/images/Number5.svg';
import SampleOverLap1 from '../../assets/images/SOP1.svg';
import SampleOverLap3 from '../../assets/images/SOP3.svg';
import SampleOverLap4 from '../../assets/images/SOP4.svg';
import TitleBar from '../../components/common/TitleBar';
import './Category.css';
import ImageOverlap from './ImageOverlap';


type CardData = {
    imageSrc: string;
    title: string;
    subtitle: string;
    productId: string;
};

type CategoryProps = {
    title: string;
    cards: CardData[];
    isExplore?: boolean
    category?: null | string
};

const Category: React.FC<CategoryProps> = ({ title, cards, isExplore = false, category = null }) => {
    const navigate = useNavigate();
    const TopCategories = [
        {
            imageSrc1: Number1,
            imageSrc2: SampleOverLap1,
            title: "TEXA'S STYLESS",
            subtitle: 'SALOON | REFRESH'
        },
        {
            imageSrc1: Number2,
            imageSrc2: SampleOverLap3,
            title: "TEXA'S STYLESS",
            subtitle: 'SALOON | REFRESH'
        },
        {
            imageSrc1: Number3,
            imageSrc2: SampleOverLap4,
            title: "TEXA'S STYLESS",
            subtitle: 'SALOON | REFRESH'
        },
        {
            imageSrc1: Number4,
            imageSrc2: SampleOverLap1,
            title: "TEXA'S STYLESS",
            subtitle: 'SALOON | REFRESH'
        },
        {
            imageSrc1: Number5,
            imageSrc2: SampleOverLap4,
            title: "TEXA'S STYLESS",
            subtitle: 'SALOON | REFRESH'
        }
    ]

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        if (isHovered) return;
        setIsHovered(true);
        // Add any additional hover functionality here
        console.log('Hovering over arrow');
    };

    const handleMouseLeave = () => {
        if (!isHovered) return;
        setIsHovered(false);
        // Add any additional off-hover functionality here
        console.log('No longer hovering over arrow');
    };

    if (title === 'PLATFORM’S TOP 10 ') {
        console.log(TopCategories, 'top cat')
    }

    let data = isExplore ? cards : cards.slice(0, 5)
    return (
        <div className="category">
            <TitleBar title={title} isLeft={true} />

            {
                title === 'PLATFORM’S TOP 10 ' ?
                    <div style={{ width: '100%' }}>
                        <div className="card-container h-[100%] min-h-[400px] overflow-y-auto overflow-y-none" style={{ gap: 150 }}>
                            {
                                TopCategories.map((card, index) => (
                                    <div>
                                        <ImageOverlap image1Src={card.imageSrc1} image2Src={card.imageSrc2} title={card.title} subtitle={card.subtitle} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    :
                    // <div style={{ width: '100%' }}>
                    //     <div className="card-container horizontal-scroll">
                    //         {data.map((item: any) => (
                    //             <div className='w-full lg:w-[300px] lg:min-w-fit h-[305px] float-left flex flex-col rounded-3xl transition-all duration-300 
                    //             hover:border-white hover:border-2 hover:p-1.5 overflow-hidden 
                    //             cursor-pointer'>
                    //                 <div
                    //                     key={item.id}
                    //                     className="lg:min-w-fit h-[305px] relative lg:max-w-[300px] rounded-3xl"
                    //                     onClick={() => { navigate(`/newproductdetails/${item?.productId}`) }}
                    //                     style={{
                    //                         backgroundImage: `url(${item.imageSrc})`,
                    //                         backgroundSize: 'cover'
                    //                     }}
                    //                 >

                    //                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                    //                     <div className="flex justify-between relative z-10 h-full p-3">
                    //                         <div className="flex-1 w-full flex flex-col gap-y-1 rounded-b-3xl absolute bottom-0 mt-[30px] bg-transparent" style={{ top: "60%" }}>
                    //                             <h3 className="text-white font-semibold text-10 uppercase whitespace-normal">
                    //                                 {item.title}
                    //                             </h3>
                    //                             <p className="text-white text-xs font-normal text-8 whitespace-normal">
                    //                                 {item.subtitle}
                    //                             </p>
                    //                             <p className="flex gap-2 items-center justify-start">
                    //                                 <span className="text-[#00F0FB]">4.6</span>
                    //                                 <p className='flex justify-between w-[80%]'>
                    //                                     <div>
                    //                                         <img src={starIcon} alt="star" className="h-4 w-auto" />
                    //                                     </div>
                    //                                     {/* <div className="flex-0 absolute bottom-5 right-3"> */}
                    //                                     <span className="bg-[#3B2C94] px-3 py-1 text-white text-xs rounded-2xl capitalize">{category ? category : title}</span>
                    //                                     {/* </div> */}
                    //                                 </p>

                    //                             </p>
                    //                         </div>

                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         ))}
                    //     </div>
                    // </div>
                    <div style={{ width: '100%' }}>
                        <div className="card-container horizontal-scroll">
                            {data.map((item: any) => (
                                <div
                                    key={item.id}
                                    className='w-full sm:w-[200px] md:w-[250px] lg:w-[300px] h-[305px] float-left flex flex-col rounded-3xl transition-all duration-300 
                                        hover:border-white hover:border-2 hover:p-1.5 overflow-hidden cursor-pointer'
                                >
                                    <div
                                        className="h-[305px] relative lg:max-w-[300px] rounded-3xl"
                                        onClick={() => { navigate(`/newproductdetails/${item?.productId}`) }}
                                        style={{
                                            backgroundImage: `url(${item.imageSrc})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center', // Ensure the image is centered
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                        <div className="flex justify-between relative z-10 h-full p-3">
                                            <div className="flex-1 w-full flex flex-col gap-y-1 rounded-b-3xl absolute bottom-0 mt-[30px] bg-transparent" style={{ top: "60%" }}>
                                                <h3 className="text-white font-semibold text-10 uppercase whitespace-normal">
                                                    {item.title}
                                                </h3>
                                                <p className="text-white text-xs font-normal text-8 whitespace-normal">
                                                    {item.subtitle}
                                                </p>
                                                <p className="flex gap-2 items-center justify-start">
                                                    <span className="text-[#00F0FB]">{item?.rating ? item?.rating?.toFixed(1) : 0}</span>
                                                    <p className='flex justify-between w-[80%]'>
                                                        <div>
                                                            <img src={starIcon} alt="star" className="h-4 w-auto" />
                                                        </div>
                                                        <span className="bg-[#3B2C94] px-3 py-1 text-white text-xs rounded-2xl capitalize">
                                                            {category ? category : title}
                                                        </span>
                                                    </p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

            }
        </div>
    );
}

export default Category;
