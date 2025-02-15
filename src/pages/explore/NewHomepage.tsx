// import newBanner from '../../assets/images/explore/banner1.png';
// import Promotion from '../../assets/images/Promotion.svg';
// import Promotion2 from '../../assets/images/Promotion2.svg';
import SampleCategory from '../../assets/images/sampleCategory.svg';
import SampleCategory2 from '../../assets/images/SampleCategory2.svg';
import SampleCategory3 from '../../assets/images/SampleCategory3.svg';
import SampleCategory4 from '../../assets/images/SampleCategory4.svg';

import SampleMoviePoster1 from '../../assets/images/NewlyMoviePoster1.svg';
import SampleMoviePoster2 from '../../assets/images/NewlyMoviePoster2.svg';
import SampleMoviePoster3 from '../../assets/images/NewlyMoviePoster3.svg';
import podcastImage from '../../assets/images/SampleMoviePoster.svg';
import MainCategoryCard from '../home/MainCategory';
import NewlyAddedCategory from '../home/NewlyAddedCategory';

import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchExploreData } from '../../redux/explore/exploreSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCookies } from '../../utils/utils';
import { appsData, coursesData, moviesData, servicesData } from '../home/HomeExplore';
import BannerSection from './BannerSection';
import CategorySection from './CategorySection';
import ExploreAllModal from './ExploreAllModal';
import './NewExplore.css';
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

const NewHomepage: React.FC<{ section?: string }> = ({ section }) => {
    const [trendingData, setTrendingData] = useState([]);
    const [trendingData1, setTrendingData1] = useState([]);
    const [recommendedData1, setRecommendedData1] = useState([]);
    const [recommendedData, setRecommendedData] = useState([]);
    const router = useNavigate(); // Initialize the router for redirection

    const safeApiCall = async (apiFunction: () => Promise<any>) => {
        try {
            return await apiFunction();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error occurred:", error.message);
            } else {
                console.error("Unexpected error occurred:", error);
            }
            return null; // Return null to avoid throwing
        }
    };

    const topTrendingData = async () => {
        const token = getCookies('authToken');
        const response = await safeApiCall(() =>
            axios.get('https://api.lusso.dev/api/v1/products/trending', {
                headers: { Authorization: `Bearer ${token}` },
            })
        );

        if (response) {
            // Transform data into the required format
            const trendingData = response.data.products.map((product: Product) => ({
                imageSrc: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                category: product.category,
            }));

            setTrendingData(trendingData);
            const trendingData1 = response.data.products.map((product: Product) => ({
                image: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                rating: 4.7

            }));

            setTrendingData1(trendingData1);
        }
    };

    const recommendedDataFn = async () => {
        const token = getCookies('authToken');
        const response = await safeApiCall(() =>
            axios.get('https://api.lusso.dev/api/v1/products/recommendations', {
                headers: { Authorization: `Bearer ${token}` },
            })
        );

        if (response) {
            const recommendedData = response.data.products.map((product: Product) => ({
                image: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                rating: product.rating

            }));
            setRecommendedData(recommendedData)
            const recommendedData1 = response.data.products.map((product: Product) => ({
                imageSrc: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                category: product.category,

            }));

            setRecommendedData1(recommendedData1);
        }
    };

    useEffect(() => {
        if (navigator.onLine) {

            topTrendingData()
            recommendedDataFn()
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, []);

    const appsRef = useRef<HTMLDivElement>(null);
    const gamesRef = useRef<HTMLDivElement>(null);
    const moviesTvsRef = useRef<HTMLDivElement>(null);
    const coursesRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const artificialRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const { loading, error, apps, games, movies, courses, services, aiProducts } = useAppSelector(state => state.explore);

    const [exploreModal, setExploreModal] = useState<boolean>(false)
    const [exploreModalCat, setExploreModalCat] = useState<string>('')
    const [newProducts, setNewProducts]: any = useState([]);


    const getnewAddedData = async () => {
        const token = getCookies('authToken');
        const response = await safeApiCall(() =>
            axios.get('https://api.lusso.dev/api/v1/products/new', {
                headers: { Authorization: `Bearer ${token}` },
            })
        );

        if (response?.data) {
            setNewProducts(response?.data?.products?.map((el: any, index: number) => ({ ...el, imageSrc: el.bannerImage, title: el.name })))
        }
    };

    useEffect(() => {
        dispatch(fetchExploreData());
        if (navigator.onLine) {

            getnewAddedData()
        } else {
            console.warn("No internet connection, API calls skipped.");
        }

    }, [dispatch]);

    const location = useLocation();

    useEffect(() => {
        const scrollToSection = (section: string | undefined) => {
            const topBarHeight = 80;
            let element: HTMLElement | null = null;

            switch (location.hash.slice(1)) {
                case 'aiRef':
                    element = artificialRef.current;
                    break;
                case 'apps':
                    element = appsRef.current;
                    break;
                case 'games':
                    element = gamesRef.current;
                    break;
                case 'movies-tvs':
                    element = moviesTvsRef.current;
                    break;
                case 'courses':
                    element = coursesRef.current;
                    break;
                case 'services':
                    element = servicesRef.current;
                    break;
                default:
                    // window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
            }
            console.log(location.hash) //output : #games/#apps
            if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - topBarHeight;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        };
        scrollToSection(section);
    }, [section, location]);

    const cardData = [
        {
            imageSrc: SampleCategory,
            title: 'RED DEAD REDEMPTION II',
            subtitle: 'ACTION | ADVENTURE | AAA',
            productId: '1',
        },
        {
            imageSrc: SampleCategory2,
            title: 'AMAZING SPIDER MAN',
            subtitle: 'ACTION | PVP | COMEDY',
            productId: '1',
        },
        {
            imageSrc: SampleCategory3,
            title: 'CLASH OF CLANS',
            subtitle: 'ACTION | PVP | COMEDY',
            productId: '1',
        },
        {
            imageSrc: SampleCategory4,
            title: 'COD: BLACK OPS',
            subtitle: 'ACTION | ADVENTURE | STRATEGY',
            productId: '1',
        },
        {
            imageSrc: SampleCategory4,
            title: 'COD: BLACK OPS',
            subtitle: 'ACTION | ADVENTURE | STRATEGY',
            productId: '1',
        },
        {
            imageSrc: SampleCategory4,
            title: 'COD: BLACK OPS',
            subtitle: 'ACTION | ADVENTURE | STRATEGY',
            productId: '1',
        },
    ];

    const newlyAddedData = [
        {
            imageSrc: podcastImage,
            title: 'TEXAS PODCAST SERVICES',
        },
        {
            imageSrc: SampleMoviePoster1,
            title: 'TEXAS CAFE',
        },
        {
            imageSrc: SampleMoviePoster2,
            title: 'TEXAS STYLES & CO.',
        },
        {
            imageSrc: SampleMoviePoster3,
            title: 'TEXAS BOUQETS',
        },
        {
            imageSrc: podcastImage,
            title: 'TEXAS PODCAST SERVICES',
        },
        {
            imageSrc: SampleMoviePoster1,
            title: 'TEXAS CAFE',
        },
        {
            imageSrc: SampleMoviePoster2,
            title: 'TEXAS STYLES & CO.',
        },
        {
            imageSrc: SampleMoviePoster3,
            title: 'TEXAS BOUQETS',
        },
        {
            imageSrc: podcastImage,
            title: 'TEXAS PODCAST SERVICES',
        },
        {
            imageSrc: SampleMoviePoster1,
            title: 'TEXAS CAFE',
        },
        {
            imageSrc: SampleMoviePoster2,
            title: 'TEXAS STYLES & CO.',
        },
        {
            imageSrc: SampleMoviePoster3,
            title: 'TEXAS BOUQETS',
        },
    ];

    // Flag to check data
    let AI_DATA = aiProducts?.length > 0 ? aiProducts : appsData;
    let SERVICE_DATA = services?.length > 0 ? services : servicesData;
    let COURSE_DATA = courses?.length > 0 ? courses : coursesData;
    let GAMES_DATA = games?.length > 0 ? games : moviesData;
    let APPS_DATA = apps?.length > 0 ? apps : appsData;
    let MOVIES_DATA = movies?.length > 0 ? movies : moviesData;

    const onExpoloreAllClick = (cat: string) => {
        // console.log(cat, 'cat')
        setExploreModal(true);
        setExploreModalCat(cat);
    };

    // console.log({ trendingData })

    return (
        <>
            <div className="mb-10 mt-5">
                {/* <SlickSlider
                    imageList={banners}
                    isExplore={true}
                /> */}
                <BannerSection />
            </div>
            <div className='content mx-auto' style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <ExploreAllModal
                    open={exploreModal}
                    category={exploreModalCat}
                    onClose={() => {
                        setExploreModal(false);
                        setExploreModalCat('');
                    }}
                />
                {/* <div>
                <img src={Promotion} alt='' />
            </div> */}


                {/* Categories */}
                <div className="mb-5">
                    <MainCategoryCard />
                </div>

                {/* Top 10 */}
                {/* <div className='mb-5'>
                <Category title="PLATFORM’S TOP 10 " cards={cardData} />
            </div> */}

                {/* Top Trending */}
                <div className="mb-5">
                    <CategorySection
                        title="Top Trending"
                        cards={trendingData}
                        category={'trending'}
                        onExpoloreAllClick={onExpoloreAllClick}
                    />
                </div>

                {/* Recommendations */}
                <div>
                    <CategorySection
                        title="RECOMMENDATIONS"
                        cards={recommendedData1}
                        category={'recommendations'}
                        onExpoloreAllClick={onExpoloreAllClick}
                    />
                </div>

                {/* Newly Added */}
                {newProducts?.length > 0 &&
                    <div className='mb-5'>
                        <NewlyAddedCategory title='Newly Added'
                            cards={newProducts}
                            category={'new'}
                            onExpoloreAllClick={onExpoloreAllClick}

                        />
                    </div>}

                {/* AI Products */}
                {AI_DATA?.length > 0 && (
                    <div className="mb-5" ref={artificialRef}>
                        <CategorySection
                            title="AI Products"
                            cards={AI_DATA}
                            category={'AI'}
                            onExpoloreAllClick={onExpoloreAllClick}
                        />
                    </div>
                )}

                {/* Services */}
                {SERVICE_DATA?.length > 0 && (
                    <div className="mb-5" ref={servicesRef}>
                        <CategorySection
                            title="Services"
                            cards={SERVICE_DATA}
                            category={'Service'}
                            onExpoloreAllClick={onExpoloreAllClick}
                        />
                    </div>
                )}

                {/* Courses */}
                {COURSE_DATA?.length > 0 && (
                    <div className="mb-5" ref={coursesRef}>
                        <CategorySection
                            title="Courses"
                            cards={COURSE_DATA}
                            category={'Course'}
                            onExpoloreAllClick={onExpoloreAllClick}
                        />
                    </div>
                )}

                {/* Games */}
                {GAMES_DATA?.length > 0 && (
                    <div className="mb-5" ref={gamesRef}>
                        <CategorySection
                            title="Games"
                            cards={GAMES_DATA}
                            category={'Game'}
                            onExpoloreAllClick={onExpoloreAllClick}
                        />
                    </div>
                )}

                {/* Apps */}
                {APPS_DATA?.length > 0 && (
                    <div className="mb-5" ref={appsRef}>
                        <CategorySection
                            title="Apps"
                            cards={APPS_DATA}
                            category={'Apps'}
                            onExpoloreAllClick={onExpoloreAllClick}
                        />
                    </div>
                )}

                {/* Movies & Tv */}
                {MOVIES_DATA?.length > 0 && (
                    <div className="mb-5" ref={moviesTvsRef}>
                        <CategorySection
                            title="Movies & Tv"
                            cards={MOVIES_DATA}
                            category={'Movie'}
                            onExpoloreAllClick={onExpoloreAllClick}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default NewHomepage;
