import SampleMoviePoster1 from '../../assets/images/NewlyMoviePoster1.svg';
import SampleMoviePoster2 from '../../assets/images/NewlyMoviePoster2.svg';
import SampleMoviePoster3 from '../../assets/images/NewlyMoviePoster3.svg';
import podcastImage from '../../assets/images/SampleMoviePoster.svg';
import ExploreAllModalHeader from '../../components/layout/ExploreAllModalHeader';
import { ICON_ENUM } from '../../constants/icons.constant';
import { coursesData, moviesData, recomendationData, servicesData, topTrendingData } from "../../utils/utils";
import ChatBot from './ChatBot';
import FilterExplore from './FilterExplore';

import image2 from '../../assets/images/explore/banner/1.png';
import image3 from '../../assets/images/explore/banner/2.png';
import image4 from '../../assets/images/explore/banner/3.png';
import image1 from '../../assets/images/explore/banner/4.png';
import starIcon from '../../assets/images/home/star.svg';

import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import nextIcon from '../../assets/images/home/chevron-right.svg';
import { useCookieCheck } from '../../hooks/authHooks';
import '../home/Category.css';

interface ExploreAllModalProps {
    open: boolean;
    category: string;
    onClose: () => void
}

interface CategoryConfig {
    [key: string]: {
        sections: Array<{
            title: string;
            component: React.ComponentType<any>;
            props: {
                category: string;
                cards: any; // Assuming topTrendingData type is not provided
            };
        }>;
        banner: boolean;
        topTen: boolean;
        newlyAdded: boolean;
        newlyAddedInterval: number
    };
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

const CategorySection: React.FC<CategoryProps> = ({ title, cards, category = null, onExpoloreAllClick }) => {
    const navigate = useNavigate();
    const refData = useRef(title)
    const [isHovered, setIsHovered] = useState(false);
    const isLogged: any = useCookieCheck()

    console.log("CLICKER")

    const handleMouseEnter = () => {
        if (isHovered) return;
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!isHovered) return;
        setIsHovered(false);
    };

    // category title
    let categoryTitle = category ? category
        : title === 'RECOMMENDATIONS' ? 'Apps' : title


    // category path
    let categoryPath =
        category?.toLowerCase() === 'ai products' ? 'movies' :
            category?.toLowerCase() === 'movie' ? 'movies' :
                category?.toLowerCase() === 'course' ? 'courses' :
                    category?.toLowerCase() === 'game' ? 'games' :
                        category?.toLowerCase() === 'service' ? 'services' :
                            category?.toLowerCase() === 'app' ? 'apps'
                                : title === 'RECOMMENDATIONS' ? 'apps' : category?.toLowerCase()


    console.log({ categoryPath })
    // click action
    const handleClick = (item: any) => {
        if (isLogged) {
            navigate(categoryPath ? `/explore/${categoryPath}/details/${item?.productId}` : '')
        } else {
            navigate('/login')
        }
    }

    // render
    return (
        <div className="category">
            <TitleBar title={title} isLeft={true} isHover={isHovered} path={categoryPath} onExpoloreAllClick={onExpoloreAllClick} />
            <div className="w-full">
                <div
                    style={{ display: 'flex', overflowX: 'scroll' }}
                    className='scrollbar-none md:gap-[20px] gap-3'
                    // className="horizontal-scroll flex overflow-x-auto scrollbar-hide gap-5"
                    ref={refData as any}
                >
                    {cards.map((item: any) => (
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
                                style={{ backgroundImage: `url(${item.imageSrc})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="flex justify-between relative z-10 h-full">
                                    <div
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
                                        className="bg-[#e3f1f1] bg-opacity-80 flex-1 w-full p-2 md:px-3 md:pb-5 flex flex-col gap-y-2  absolute bg-transparent rounded-lg md:top-[70%] top-[70%]">
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
                                            <span className="bg-[#3B2C94] px-3 py-1 text-white text-xs rounded-2xl capitalize">
                                                {categoryTitle}
                                            </span>
                                        </div>
                                        {/* </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
}
const appsData = topTrendingData;

const newlyAddedData = [
    { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
    { imageSrc: SampleMoviePoster1, title: 'TEXAS CAFE' },
    { imageSrc: SampleMoviePoster2, title: 'TEXAS STYLES & CO.' },
    { imageSrc: SampleMoviePoster3, title: 'TEXAS BOUQETS' },
    { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
    { imageSrc: SampleMoviePoster1, title: 'TEXAS CAFE' },
    { imageSrc: SampleMoviePoster2, title: 'TEXAS STYLES & CO.' },
    { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
    { imageSrc: SampleMoviePoster1, title: 'TEXAS CAFE' },
    { imageSrc: SampleMoviePoster2, title: 'TEXAS STYLES & CO.' },
    { imageSrc: SampleMoviePoster3, title: 'TEXAS BOUQETS' },
    { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
    { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
    { imageSrc: SampleMoviePoster1, title: 'TEXAS CAFE' },
    { imageSrc: SampleMoviePoster2, title: 'TEXAS STYLES & CO.' },
    { imageSrc: SampleMoviePoster3, title: 'TEXAS BOUQETS' },
    { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
];

const categoryConfig: CategoryConfig = {
    ai: {
        sections: [
            { title: "Camera", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Education", component: CategorySection, props: { category: 'App', cards: topTrendingData } },
            { title: "Entertainment", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Weather", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Security", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Shopping", component: CategorySection, props: { category: 'App', cards: servicesData } },
            { title: "Social", component: CategorySection, props: { category: 'App', cards: topTrendingData } },
            { title: "Sports", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Travel", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Others", component: CategorySection, props: { category: 'App', cards: servicesData } },
        ],
        banner: true,
        topTen: true,
        newlyAdded: true,
        newlyAddedInterval: 3
    },
    apps: {
        sections: [
            { title: "Books", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Camera", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Education", component: CategorySection, props: { category: 'App', cards: topTrendingData } },
            { title: "Entertainment", component: CategorySection, props: { category: 'App', cards: servicesData } },
            { title: "Food & Dining", component: CategorySection, props: { category: 'App', cards: recomendationData } },
            { title: "Hotels", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Health & Fitness", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Kids", component: CategorySection, props: { category: 'App', cards: servicesData } },
            { title: "Lifestyle", component: CategorySection, props: { category: 'App', cards: recomendationData } },
            { title: "Media", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Music", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Navigation", component: CategorySection, props: { category: 'App', cards: servicesData } },
            { title: "News", component: CategorySection, props: { category: 'App', cards: topTrendingData } },
            { title: "Photos", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Videos", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Weather", component: CategorySection, props: { category: 'App', cards: servicesData } },
            { title: "Security", component: CategorySection, props: { category: 'App', cards: topTrendingData } },
            { title: "Shopping", component: CategorySection, props: { category: 'App', cards: coursesData } },
            { title: "Social", component: CategorySection, props: { category: 'App', cards: moviesData } },
            { title: "Sports", component: CategorySection, props: { category: 'App', cards: servicesData } },
            { title: "Travel", component: CategorySection, props: { category: 'App', cards: topTrendingData } },
            { title: "Others", component: CategorySection, props: { category: 'App', cards: recomendationData } },
        ],
        banner: true,
        topTen: true,
        newlyAdded: true,
        newlyAddedInterval: 3
    },
    games: {
        sections: [
            { title: "Action", component: CategorySection, props: { category: 'Game', cards: recomendationData } },
            { title: "Adventures", component: CategorySection, props: { category: 'Game', cards: topTrendingData } },
            { title: "Kids", component: CategorySection, props: { category: 'Game', cards: coursesData } },
            { title: "Educational", component: CategorySection, props: { category: 'Game', cards: servicesData } },
            { title: "Classics", component: CategorySection, props: { category: 'Game', cards: coursesData } },
            { title: "Card", component: CategorySection, props: { category: 'Game', cards: topTrendingData } },
            { title: "Board", component: CategorySection, props: { category: 'Game', cards: recomendationData } },
            { title: "Puzzle", component: CategorySection, props: { category: 'Game', cards: servicesData } },
            { title: "Racing", component: CategorySection, props: { category: 'Game', cards: moviesData } },
            { title: "Shooting", component: CategorySection, props: { category: 'Game', cards: topTrendingData } },
            { title: "Sports", component: CategorySection, props: { category: 'Game', cards: recomendationData } },
            { title: "Casino", component: CategorySection, props: { category: 'Game', cards: coursesData } },
            { title: "Multi player", component: CategorySection, props: { category: 'Game', cards: servicesData } },
        ],
        banner: true,
        newlyAdded: false,
        topTen: false,
        newlyAddedInterval: 3
    },
    movies: {
        sections: [
            { title: "Recommendation", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
            { title: "Action", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
            { title: "Adventure", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
            { title: "Animation", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
            { title: "Comedy", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
            // { title: "Anime", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
            // { title: "Drama", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
            // { title: "Kids & Family", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
            // { title: "Documentary", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
            // { title: "Horror", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
            // { title: "Romance", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
            // { title: "Romantic Comedy", component: CategorySection, props: { category: 'Movie', cards: coursesData } },
            // { title: "Sci-Fi/Fantasy", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
            // { title: "Sports", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
            // { title: "Thriller", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
            // { title: "Mystery", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
            // { title: "Stand-Up", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
            // { title: "Independent", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
            // { title: "Reality", component: CategorySection, props: { category: 'Movie', cards: coursesData } },
            // { title: "Suspense", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
            // { title: "Crime", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
            // { title: "Fantasy", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
            // { title: "International", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
            // { title: "LGBTQ", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
        ],
        banner: true,
        newlyAdded: true,
        topTen: true,
        newlyAddedInterval: 3
    },
    courses: {
        sections: [
            { title: "Development", component: CategorySection, props: { category: 'Course', cards: coursesData } },
            { title: "Business", component: CategorySection, props: { category: 'Course', cards: moviesData } },
            { title: "Finance & Accounting", component: CategorySection, props: { category: 'Course', cards: topTrendingData } },
            { title: "IT & Software", component: CategorySection, props: { category: 'Course', cards: servicesData } },
            { title: "Office Productivity", component: CategorySection, props: { category: 'Course', cards: coursesData } },
            { title: "Personal Development", component: CategorySection, props: { category: 'Course', cards: recomendationData } },
            { title: "Design", component: CategorySection, props: { category: 'Course', cards: servicesData } },
            { title: "Marketing", component: CategorySection, props: { category: 'Course', cards: topTrendingData } },
            { title: "Lifestyle", component: CategorySection, props: { category: 'Course', cards: coursesData } },
            { title: "Photography & Video", component: CategorySection, props: { category: 'Course', cards: moviesData } },
            { title: "Health & Fitness", component: CategorySection, props: { category: 'Course', cards: servicesData } },
            { title: "Music", component: CategorySection, props: { category: 'Course', cards: coursesData } },
            { title: "Teaching & Academics", component: CategorySection, props: { category: 'Course', cards: topTrendingData } },
        ],
        banner: true,
        newlyAdded: false,
        topTen: false,
        newlyAddedInterval: 3
    },
    services: {
        sections: [
            { title: "Strategy Consulting", component: CategorySection, props: { category: 'Service', cards: servicesData } },
            { title: "Management Consulting", component: CategorySection, props: { category: 'Service', cards: topTrendingData } },
            { title: "Legal Service", component: CategorySection, props: { category: 'Service', cards: recomendationData } },
            { title: "Health Care", component: CategorySection, props: { category: 'Service', cards: moviesData } },
            { title: "Financial Consulting", component: CategorySection, props: { category: 'Service', cards: coursesData } },
            { title: "Accounting", component: CategorySection, props: { category: 'Service', cards: servicesData } },
            { title: "Operations Consulting", component: CategorySection, props: { category: 'Service', cards: recomendationData } },
            { title: "IT & Computer Support", component: CategorySection, props: { category: 'Service', cards: topTrendingData } },
            { title: "Project Management", component: CategorySection, props: { category: 'Service', cards: moviesData } },
            { title: "Tax Services", component: CategorySection, props: { category: 'Service', cards: servicesData } },
            { title: "Insurance Services", component: CategorySection, props: { category: 'Service', cards: recomendationData } },
        ],
        banner: true,
        newlyAdded: false,
        topTen: false,
        newlyAddedInterval: 3
    },
};

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
    category: string;
    name: string;
    createdBy: string;
    createdOn: string;
    subCategory: string;
    exploreImage?: string;
    rating?: string;
}

const ExploreAllModal = ({ open, onClose, category }: ExploreAllModalProps) => {
    const [exploreModal, setExploreModal] = useState<boolean>(false)
    const [exploreModalCat, setExploreModalCat] = useState<string>('')

    const onExpoloreAllClick = (cat: string) => {
        setExploreModal(true);
        setExploreModalCat(cat);
    };

    const [filteredData, setFilteredData] = useState([]);
    const recommendedData1 = filteredData.map((product: Product) => ({
        imageSrc: product.exploreImage || '',
        title: product.name,
        subtitle: `${product.category} | ${product.subCategory}`,
        productId: product.productId,
    }));

    const getSingleCategory = (data: typeof recommendedData1): string => {
        if (data.length > 0) {
            return data[0].subtitle.split(' | ')[0]; // Return the first category from the first item
        }
        return ''; // Return an empty string if no data is available
    };
    const singleCategory = getSingleCategory(recommendedData1);
    // Callback function to receive filtered data from FilterExplore
    const handleFilteredData = (data: any) => {
        setFilteredData(data);
    };
    const config = categoryConfig[category] || {};

    const renderSections = () => {
        let newlyAddedCount = 0;
        const maxNewlyAdded = 2;
        const sections: JSX.Element[] = [];

        // sections.push(
        //     <div className="md:mt-auto">
        //         <TitleBar title='Platform’s Top 10' isLeft={true} isHover={false} path='movies' />
        //         <div className="lg:-ml-[90px] flex space-x-4 overflow-x-auto pb-4 scrollbar-hide h-full">
        //             {TopCardData.map((item, i) => (
        //                 <div key={i} className='min-w-[135px] h-[175px]'>
        //                     <Card imageSrc={item.imageSrc} title={item.title} subtitle={item.subtitle} isBanner={true} />
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // )
        config?.sections?.forEach((section: any, index: number) => {
            if (index === 0) {
                // sections.push(
                //     <div key={`newly-added-${newlyAddedCount}`} className='py-5'>
                //         <NewlyAddedCategory title='Newly Added' cards={newlyAddedData} />
                //     </div>
                // );
                newlyAddedCount++;
            } else {
                sections.push(
                    <div key={`section-${index}`} className='py-5'>
                        <section.component title={section.title} {...section.props} />
                    </div>
                );
            }

            // Add "Newly Added" section after every newlyAddedInterval sections
            // if ((index + 1) % config.newlyAddedInterval === 0 && newlyAddedCount < maxNewlyAdded) {
            //     sections.push(
            //         <div key={`newly-added-${newlyAddedCount}`} className='py-5'>
            //             <NewlyAddedCategory title='Newly Added' cards={newlyAddedData} />
            //         </div>
            //     );
            //     newlyAddedCount++;
            // }
        });

        return sections;
    };

    return <dialog className="modal" open={open}>
        <div className="modal-box bg-[#18142D] rounded-none text-white px-10 py-3 h-full max-w-full">
            <ExploreAllModalHeader onClose={onClose}>
                <div className="space-y-5">
                    <div className="flex flex-col bg-explore-all-banner py-16 text-white">
                        <div className="flex items-center py-2 px-10 gap-2 w-1/4" style={{ background: 'linear-gradient(270deg, rgba(217, 217, 217, 0) 20.4%, rgba(217, 217, 217, 0.1) 39%, rgba(243, 243, 243, 0.1274) 87.5%, rgba(255, 255, 255, 0.14) 100%)' }}>
                            <div><img src={ICON_ENUM.MOVIES_TV.icon} alt="icon" className='h-8' /></div>
                            <span className='text-2xl font-bold capitalize'>{category}</span>
                        </div>
                        <div className="flex flex-col p-8 mb-20 space-y-3 w-2/5">
                            <p className="font-bold">THRILLER | HORROR | TEEN PROGRAM</p>
                            <h1 className="text-5xl font-bold tracking-wide">Stranger Things</h1>
                            <p className='text-sm font-bold'>2019 | DIRECTOR: the Duffer Brothers | SEASONS: 3</p>
                            <p className='text-[#818181]'>The thrilling Netflix orignal drama star global winning actress Winona
                                Ryder, who lives in small town </p>
                        </div>
                    </div>


                    <div className="flex justify-end items-center">
                        <FilterExplore onApplyFilter={handleFilteredData} />
                        <ChatBot />
                    </div>



                    {/* Sub Categories */}
                    {!filteredData.length && renderSections()}
                    {filteredData.length > 0 && (
                        <div className="mb-5">
                            <CategorySection
                                title={singleCategory}
                                cards={recommendedData1}
                                category={singleCategory}
                                onExpoloreAllClick={onExpoloreAllClick}
                            />
                        </div>
                    )}

                </div>
            </ExploreAllModalHeader>
        </div>
    </dialog>
}

export default ExploreAllModal;
