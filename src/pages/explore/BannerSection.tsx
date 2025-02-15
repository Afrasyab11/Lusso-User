import { useEffect, useRef, useState } from 'react';
// import bannerBg1 from '../../assets/images/explore/banner1.png';

// recent watch list assets
import image2 from '../../assets/images/explore/banner/1.png';
import image3 from '../../assets/images/explore/banner/2.png';
import image4 from '../../assets/images/explore/banner/3.png';
import image1 from '../../assets/images/explore/banner/4.png';

import axios from 'axios';

import { getCookies } from '../../utils/utils';

import { useNavigate } from 'react-router-dom';

export const TopCardData = [
    {
        imageSrc: image1, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image2, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image3, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image4, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image1, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image2, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image3, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
    {
        imageSrc: image4, title: 'Title Here', subtitle: 'Saloon | Refresh'
    },
];

interface Product {
    productId: string;
    isLeft: boolean;
    title: string;
    genres: string;
    description?: string;
    details: string;
    logo?: any;
    background?: any;
}
interface ProductRecentWishlist {
    productId: string;
    category: string;
    name: string;
    subtitle: string;
    exploreImage?: any;

}

const BannerSection = () => {
    const router = useNavigate(); // Initialize the router for redirection

    const [bannerData, setBannerData] = useState<Product[] | any>([]);
    const [recentData, setRecent] = useState<ProductRecentWishlist[]>([]);
    console.log("🚀 ~ BannerSection ~ recentData:", recentData)

    const fetchWishlistProducts = async () => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get(`https://api.lusso.dev/api/v1/products/productOfDay`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const product = response.data;
            console.log(product, 'pp')
            const bannerData1 = [{
                ...product,
                productId: product.productId,
                isLeft: true,
                background: product.bannerImage,
                logo: product.exploreImage || '',
                title: product.name,
                genres: `${product.category} | ${product.subCategory}`,
                description: product.description,
                details: product.tagLine
            }];

            setBannerData(bannerData1);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log("Unauthorized access - redirecting to login.")

                // router('/login');
            } else {
                console.error("Error fetching trending products:", error);

                console.error("Error fetching wishlist products:", error);
            }
        }
    };

    const fetchRecent = async () => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get(`https://api.lusso.dev/api/v1/products/recentWishlist`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const product = response.data.products;

            setRecent(product);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log("Unauthorized access - redirecting to login.")

                router('/login');
            } else {
                console.error("Error fetching trending products:", error);

                console.error("Error fetching wishlist products:", error);
            }
        }
    };

    useEffect(() => {
        if (navigator.onLine) {
            fetchWishlistProducts();
            fetchRecent();
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, []);


    // static banner data
    // const bannerData =wishlistProductsData
    //  [
    //     // {
    //     //     isLeft: false,
    //     //     background: bannerBg1,
    //     //     button: <img src={productBtn} alt='product of the day' />,
    //     //     title: <h3 className="text-3xl md:text-6xl font-bold mb-6">
    //     //         ONE GLOBAL <br /><span className="text-[#00F0FB]">MARKETPLACE</span>
    //     //     </h3>,
    //     //     description: 'It all starts here, the beginning of a journey filled with endless possibilities'
    //     // },
    //     {
    //         isLeft: true,
    //         background: bannerBg2,
    //         logo: (
    //             <svg xmlns="http://www.w3.org/2000/svg" width="93" height="26" viewBox="0 0 93 26" fill="none">
    //                 <path d="M61.8772 0.25V18.4027C64.1222 18.5067 66.3613 18.6329 68.5942 18.7813V22.6301C65.0528 22.3945 61.5078 22.2158 57.9606 22.094V0.25H61.8772ZM93 0.252174L87.9001 12.0446L92.9987 25.1674L92.9931 25.1697C91.5065 24.9588 90.0185 24.7581 88.5291 24.5678L85.6659 17.2025L82.7754 23.8841C81.4042 23.733 80.0321 23.5904 78.6591 23.4565L83.6308 11.9656L79.0776 0.252355H83.3144L85.8637 6.80743L88.6984 0.252174H93ZM44.5188 21.9033V0.251993H55.4518V4.13533H48.4354V9.16794H53.7442V13.0167H48.4354V21.9025L44.5188 21.9033ZM29.8944 4.13551V0.251812H42.008V4.13533H37.9093V22.0085C36.602 22.0429 35.2962 22.0832 33.9931 22.1322V4.13551H29.8944ZM16.5053 23.2511V0.252536H27.3838V4.13569H20.4213V9.39583C22.0208 9.37536 24.2952 9.35236 25.7101 9.35562V13.2047C23.939 13.183 21.9396 13.229 20.4213 13.244V19.0708C22.7404 18.8886 25.0614 18.7303 27.3838 18.5962V22.4453C23.7534 22.6542 20.1268 22.9229 16.5053 23.2514M8.82247 14.354L8.82228 0.251812H12.7388V23.6141C11.3071 23.761 9.87804 23.917 8.45156 24.0822L3.91617 11.0877V24.6388C2.60836 24.8086 1.30297 24.9859 0 25.1707V0.252174H3.722L8.82247 14.354ZM71.8252 22.8621V0.252174H75.742V23.1848C74.438 23.0688 73.1329 22.9618 71.8252 22.8621Z" fill="#DB202C" />
    //             </svg>
    //         ),
    //         genres: "SCI-FI | ADVENTURE | ACTION",
    //         title: "The Mandalorian",
    //         details: "2020 | DIRECTOR: Jon Favreau | SEASONS: 2",
    //         description: "A lone gunfighter makes his way through the outer reaches of the galaxy, far from the authority of the New Republic.",
    //     },
    // ];

    const [currentIndex, setCurrentIndex] = useState(0);
    // const [showInfo, setShowInfo] = useState(bannerData[0]);


    const scrollContainerRef = useRef(null);

    const scroll = (direction: string) => {
        const container: any = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -300 : 300; // Adjust this value as needed
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     setShowInfo(bannerData[currentIndex]);
    // }, [currentIndex]);

    // render
    const truncateDescription = (text: any, wordLimit: any) => {
        if (!text) return '';
        const words = text?.split(' ');
        return words?.length > wordLimit ? words?.slice(0, wordLimit)?.join(' ') + '...' : text;
    };

    const navigate = useNavigate()

    const redirect = (category: string, productId: string) => {
        const categoryPath = category?.toLowerCase();
        console.log(categoryPath, 'ct path')
        let basePath = "apps";

        switch (categoryPath) {
            case "games":
            case "game":
                basePath = "games";
                break;
            case "movies":
            case "movie":
                basePath = "movies";
                break;
            case "courses":
            case "course":
                basePath = "courses";
                break;
            case "apps":
            case "app":
            case "appps":
                basePath = "apps";
                break;
            case "ai":
            case "ai-products":
                basePath = "ai";
                break;
            case "services":
            case "service":
                basePath = "services";
                break;
            default:
                console.error("Unknown category:", category);
                return;
        }

        navigate(`/explore/${basePath}/details/${productId}`);
    };
    return (
        <section className="cursor-pointer relative h-[30rem] md:h-[50rem] object-cover bg-no-repeat bg-center"
            onClick={() => redirect(bannerData?.[0]?.category, bannerData?.[0]?.productId)}
            style={{
                backgroundImage: `url(${bannerData?.[0]?.background})`, backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
            }}>
            <div className="absolute inset-0 block overflow-hidden" style={{
                background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) 41.71%, #000000 100%)'
            }}>
                <div className="flex flex-col justify-center md:justify-between items-center md:items-start h-full py-4 md:py-16 md:px-12 text-white">
                    {/* Left side Info */}
                    {bannerData?.[0]?.isLeft ?
                        <div className="flex flex-col px-4 md:px-0 md:ps-5">
                            {/* <div className='mb-8 max-w-fit p-1 rounded-lg' style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                            {bannerData?.[0]?.logo && (
                                <img
                                    src={bannerData[0].logo}
                                    alt={bannerData[0].title}
                                    style={{ width: '120px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            )}
                        </div> */}
                            <div className="mb-4 md:text-start text-center">
                                <span className="text-md uppercase md:text-4xl font-semibold p-1 rounded-lg md:max-w-fit text-center md:text-start">{bannerData?.[0]?.genres}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-2 p-1 rounded-lg md:max-w-fit uppercase text-center md:text-start"
                                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                            >{bannerData?.[0]?.title}</h1>
                            {/* {bannerData?.[0]?.category === 'Movie' && <p>2019 | DIRECTOR: the Duffer Brothers | SEASONS: 3</p>} */}
                            <div className="md:hidden text-center text-sm md:text-base font-medium mb-4 p-1 rounded-lg md:max-w-fit" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                                {bannerData?.[0]?.details}
                            </div>
                            <p className="md:hidden text-center text-sm md:text-base mb-8 p-1 rounded-lg md:max-w-6xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                                {truncateDescription(bannerData?.[0]?.description, 100)}
                            </p>
                        </div> :
                        <div className="absolute right-[50px] mt-[120px] flex flex-col px-4 md:px-0 items-end p-1 rounded-lg max-w-fit" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                            <div className='mb-8 text-end'>
                                {/* {showInfo?.button} */}
                            </div>
                            <div className="mb-4 text-end p-1 rounded-lg max-w-fit" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                                {bannerData?.[0]?.title}
                            </div>
                            {/* <p className="text-sm md:text-xl mb-8 max-w-5xl text-end p-1 rounded-lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                                {truncateDescription(bannerData?.[0]?.description, 100)}
                            </p> */}
                        </div>}

                    {/* Most Searched This Week */}
                    {/* <div className="md:mt-auto lg:w-[50%] p-2 rounded-xl">
                        <div className="flex justify-between items-center mb-4 px-4 md:px-0">
                            <h2 className="text-lg md:text-xl font-semibold md:mb-4 flex gap-1.5 items-center">Recent Wishlist
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <g clip-path="url(#clip0_3383_54226)">
                                        <path d="M4.88672 13.4844L10.7578 7.6133L4.88672 1.74219" stroke="white" stroke-width="1.17422" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3383_54226">
                                            <rect width="14.0907" height="14.0907" fill="white" transform="translate(0.777344 0.570312)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={() => scroll('left')} className='ltArrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 22" fill="none">
                                        <path d="M12.1432 17.3203L13.0781 16.3301L8.87436 11.6333L13.0781 6.96065L12.1432 5.94623L6.91304 11.6333L12.1432 17.3203Z" fill="black" />
                                        <path d="M10.4644 1.68128C12.2746 1.68128 14.0442 2.26497 15.5494 3.35855C17.0546 4.45213 18.2277 6.00647 18.9205 7.82502C19.6132 9.64357 19.7945 11.6446 19.4413 13.5752C19.0882 15.5058 18.2164 17.2791 16.9364 18.671C15.6563 20.0628 14.0255 21.0107 12.25 21.3947C10.4745 21.7787 8.63418 21.5816 6.96171 20.8284C5.28925 20.0751 3.85978 18.7995 2.85405 17.1628C1.84832 15.5262 1.31152 13.602 1.31152 11.6336C1.31429 8.99501 2.27949 6.46535 3.99538 4.59958C5.71127 2.7338 8.03772 1.68429 10.4644 1.68128ZM10.4644 20.1642C12.016 20.1642 13.5328 19.6639 14.823 18.7265C16.1131 17.7892 17.1187 16.4569 17.7124 14.8981C18.3062 13.3394 18.4616 11.6241 18.1589 9.96938C17.8562 8.31461 17.109 6.79461 16.0118 5.60159C14.9146 4.40857 13.5167 3.59611 11.9949 3.26695C10.4731 2.9378 8.89563 3.10674 7.46209 3.75239C6.02855 4.39805 4.80329 5.49143 3.94124 6.89428C3.07919 8.29712 2.61907 9.94642 2.61907 11.6336C2.62149 13.8952 3.44882 16.0635 4.91957 17.6627C6.39032 19.2619 8.3844 20.1615 10.4644 20.1642Z" fill="black" />
                                    </svg>
                                </button>
                                <button onClick={() => scroll('right')} className='rtArrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 22" fill="none">
                                        <path d="M8.72797 5.85938L7.87891 6.77353L11.6967 11.1094L7.87891 15.4229L8.72797 16.3594L13.478 11.1094L8.72797 5.85938Z" fill="white" />
                                        <path d="M10.2539 20.2969C8.60985 20.2969 7.00272 19.758 5.63573 18.7485C4.26875 17.739 3.20331 16.3041 2.57416 14.6253C1.94501 12.9465 1.78039 11.0992 2.10113 9.31699C2.42187 7.53479 3.21356 5.89773 4.37608 4.61284C5.53861 3.32794 7.01975 2.45292 8.63222 2.09841C10.2447 1.74391 11.9161 1.92586 13.435 2.62124C14.9539 3.31662 16.2521 4.4942 17.1655 6.00508C18.0789 7.51595 18.5664 9.29226 18.5664 11.1094C18.5639 13.5452 17.6873 15.8805 16.129 17.6029C14.5706 19.3252 12.4578 20.2941 10.2539 20.2969ZM10.2539 3.23438C8.84472 3.23438 7.46717 3.69624 6.29547 4.56156C5.12377 5.42687 4.21054 6.65678 3.67127 8.09575C3.13199 9.53472 2.9909 11.1181 3.26581 12.6457C3.54073 14.1733 4.21932 15.5765 5.21577 16.6778C6.21222 17.7792 7.48178 18.5292 8.86389 18.8331C10.246 19.1369 11.6786 18.981 12.9805 18.3849C14.2825 17.7889 15.3952 16.7795 16.1781 15.4845C16.961 14.1895 17.3789 12.6669 17.3789 11.1094C17.3767 9.02155 16.6253 7.01992 15.2896 5.5436C13.9539 4.06728 12.1429 3.23681 10.2539 3.23438Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div ref={scrollContainerRef} className="lg:-ml-[90px] flex space-x-4 overflow-x-auto pb-4 scrollbar-hide h-full">
                            {recentData?.map((item, i) => (
                                <div key={i} className='min-w-[135px] h-[175px]'>
                                    <RecentCards category={item?.category} productId={item?.productId} imageSrc={item.exploreImage} title={item.name} subtitle={item.subtitle} isBanner={true} />
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default BannerSection;