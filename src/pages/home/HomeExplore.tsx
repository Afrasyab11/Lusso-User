import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/css/home-explore.css';

// assets
import SampleMoviePoster1 from '../../assets/images/NewlyMoviePoster1.svg';
import SampleMoviePoster2 from '../../assets/images/NewlyMoviePoster2.svg';
import SampleMoviePoster3 from '../../assets/images/NewlyMoviePoster3.svg';
import SampleCategory2 from '../../assets/images/SampleCategory2.svg';
import podcastImage from '../../assets/images/SampleMoviePoster.svg';

// top trending
import brain from '../../assets/images/home/products/brain.png';
import camera from '../../assets/images/home/products/camera.png';
import men from '../../assets/images/home/products/men.png';
import phone from '../../assets/images/home/products/phone.png';
import mindEase from '../../assets/images/home/products/yoga.png';
// movies
import deadpool from '../../assets/images/home/products/deadpool.png';
import imax from '../../assets/images/home/products/imax.png';
import mendalorian from '../../assets/images/home/products/mandalorian.png';
import openheimar from '../../assets/images/home/products/openheimer.png';
import squidGame from '../../assets/images/home/products/squid-game.png';
// courses
import architecture from '../../assets/images/home/products/architecture.png';
import digitalMarketing from '../../assets/images/home/products/digital-marketing.png';
import lab from '../../assets/images/home/products/lab.png';
import uiUx from '../../assets/images/home/products/ui-ux.png';
import vr from '../../assets/images/home/products/vr.png';
// services
import appletv from '../../assets/images/apple-tv.png';
import disney from '../../assets/images/disney.png';
import hbo from '../../assets/images/hbomax.png';
import audit from '../../assets/images/home/products/audit.png';
import builders from '../../assets/images/home/products/builders.png';
import homeCleaning from '../../assets/images/home/products/home-cleaning.png';
import lawFirm from '../../assets/images/home/products/law-firm.png';
import movingBuddy from '../../assets/images/home/products/moving-buddy.png';
import hulu from '../../assets/images/hulu.png';
import prime from '../../assets/images/primevideo.svg';
// components
import { getCookies } from '../../utils/utils';
import BannerSection from '../explore/BannerSection';
import CategorySection from '../explore/CategorySection';
import ChatBot from '../explore/ChatBot';
import PlatformTopTen from '../explore/PlatformTopTen';
import NewlyAddedCategory from './NewlyAddedCategory';


export const topTrendingData = [
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '1' },
    { imageSrc: camera, title: 'Travel Buddy', subtitle: 'Itinerary Organizer | Adventure ', productId: '2' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '6' },
    { imageSrc: camera, title: 'Travel Buddy', subtitle: 'Itinerary Organizer | Adventure ', productId: '7' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '8' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '9' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '10' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '6' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '6' }
]

export const appNewData = [
    { imageSrc: disney, title: 'Disney+', subtitle: 'Streaming Service | Movies | Shows', productId: '1' },
    { imageSrc: hbo, title: 'HBO Max', subtitle: 'Movies | Series | Originals', productId: '2' },
    { imageSrc: prime, title: 'Prime Video', subtitle: 'Movies | TV Shows | Rentals', productId: '3' },
    { imageSrc: appletv, title: 'Apple TV+', subtitle: 'Originals | Movies | Shows', productId: '4' },
    { imageSrc: hulu, title: 'Hulu', subtitle: 'Live TV | Movies | Series', productId: '5' }
];

export const recomendationData = [
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '1' },
    { imageSrc: camera, title: 'Travel Buddy', subtitle: 'Itinerary Organizer | Adventure', productId: '2' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '1' },
    { imageSrc: camera, title: 'Travel Buddy', subtitle: 'Itinerary Organizer | Adventure', productId: '2' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '1' },
    { imageSrc: camera, title: 'Travel Buddy', subtitle: 'Itinerary Organizer | Adventure', productId: '2' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' },
    { imageSrc: mindEase, title: 'MindEase', subtitle: 'Meditation | Mental Wellness', productId: '1' },
    { imageSrc: camera, title: 'Travel Buddy', subtitle: 'Itinerary Organizer | Adventure', productId: '2' },
    { imageSrc: phone, title: 'Smart Life', subtitle: 'Focus | Time management | Course', productId: '5' },
    { imageSrc: men, title: 'Finance Guru', subtitle: 'Insights | Expense Tracking', productId: '3' },
    { imageSrc: brain, title: 'Jet Brains', subtitle: 'AI | Strategy | Apply', productId: '4' }
]

export const moviesData = [
    { imageSrc: openheimar, title: 'Oppenheimer', subtitle: 'Action | Adventure | Comedy', productId: '1' },
    { imageSrc: deadpool, title: 'Deadpool & Wolverine', subtitle: 'Action | Adventure | Comedy', productId: '2' },
    { imageSrc: imax, title: 'Godzilla vs Kong', subtitle: 'Action | Adventure | Comedy', productId: '3' },
    { imageSrc: squidGame, title: 'Squid Game', subtitle: 'Action | Adventure | Comedy', productId: '4' },
    { imageSrc: mendalorian, title: 'Mandalorian', subtitle: 'Action | Adventure | Comedy', productId: '5' },
    { imageSrc: openheimar, title: 'Oppenheimer', subtitle: 'Action | Adventure | Comedy', productId: '1' },
    { imageSrc: deadpool, title: 'Deadpool & Wolverine', subtitle: 'Action | Adventure | Comedy', productId: '2' },
    { imageSrc: imax, title: 'Godzilla vs Kong', subtitle: 'Action | Adventure | Comedy', productId: '3' },
    { imageSrc: squidGame, title: 'Squid Game', subtitle: 'Action | Adventure | Comedy', productId: '4' },
    { imageSrc: mendalorian, title: 'Mandalorian', subtitle: 'Action | Adventure | Comedy', productId: '5' },
    { imageSrc: imax, title: 'Godzilla vs Kong', subtitle: 'Action | Adventure | Comedy', productId: '3' },
    { imageSrc: squidGame, title: 'Squid Game', subtitle: 'Action | Adventure | Comedy', productId: '4' },
    { imageSrc: mendalorian, title: 'Mandalorian', subtitle: 'Action | Adventure | Comedy', productId: '5' },
    { imageSrc: openheimar, title: 'Oppenheimer', subtitle: 'Action | Adventure | Comedy', productId: '1' },
    { imageSrc: deadpool, title: 'Deadpool & Wolverine', subtitle: 'Action | Adventure | Comedy', productId: '2' },
    { imageSrc: imax, title: 'Godzilla vs Kong', subtitle: 'Action | Adventure | Comedy', productId: '3' },
    { imageSrc: squidGame, title: 'Squid Game', subtitle: 'Action | Adventure | Comedy', productId: '4' },
    { imageSrc: mendalorian, title: 'Mandalorian', subtitle: 'Action | Adventure | Comedy', productId: '5' },
    { imageSrc: openheimar, title: 'Oppenheimer', subtitle: 'Action | Adventure | Comedy', productId: '1' },
    { imageSrc: deadpool, title: 'Deadpool & Wolverine', subtitle: 'Action | Adventure | Comedy', productId: '2' }
]

export const coursesData = [
    { imageSrc: uiUx, title: 'Mastering UI & IX Design', subtitle: 'Design | Development | App', productId: '1' },
    { imageSrc: lab, title: 'Micro Biology', subtitle: 'Cells | Science | Research', productId: '2' },
    { imageSrc: vr, title: 'Augmented Reality', subtitle: 'AR/VR | Training | Vision Pro', productId: '3' },
    { imageSrc: architecture, title: 'Architecture: 101', subtitle: 'Structues | Out of box | Learn', productId: '4' },
    { imageSrc: digitalMarketing, title: 'Online Digital Marketing', subtitle: 'Marketing | Social media | Digital', productId: '5' },
    { imageSrc: uiUx, title: 'Mastering UI & IX Design', subtitle: 'Design | Development | App', productId: '1' },
    { imageSrc: lab, title: 'Micro Biology', subtitle: 'Cells | Science | Research', productId: '2' },
    { imageSrc: vr, title: 'Augmented Reality', subtitle: 'AR/VR | Training | Vision Pro', productId: '3' },
    { imageSrc: architecture, title: 'Architecture: 101', subtitle: 'Structues | Out of box | Learn', productId: '4' },
    { imageSrc: digitalMarketing, title: 'Online Digital Marketing', subtitle: 'Marketing | Social media | Digital', productId: '5' },
    { imageSrc: architecture, title: 'Architecture: 101', subtitle: 'Structues | Out of box | Learn', productId: '4' },
    { imageSrc: digitalMarketing, title: 'Online Digital Marketing', subtitle: 'Marketing | Social media | Digital', productId: '5' },
    { imageSrc: uiUx, title: 'Mastering UI & IX Design', subtitle: 'Design | Development | App', productId: '1' },
    { imageSrc: lab, title: 'Micro Biology', subtitle: 'Cells | Science | Research', productId: '2' },
    { imageSrc: vr, title: 'Augmented Reality', subtitle: 'AR/VR | Training | Vision Pro', productId: '3' },
    { imageSrc: architecture, title: 'Architecture: 101', subtitle: 'Structues | Out of box | Learn', productId: '4' },
    { imageSrc: architecture, title: 'Architecture: 101', subtitle: 'Structues | Out of box | Learn', productId: '4' },
    { imageSrc: digitalMarketing, title: 'Online Digital Marketing', subtitle: 'Marketing | Social media | Digital', productId: '5' },
    { imageSrc: uiUx, title: 'Mastering UI & IX Design', subtitle: 'Design | Development | App', productId: '1' },
    { imageSrc: lab, title: 'Micro Biology', subtitle: 'Cells | Science | Research', productId: '2' },
    { imageSrc: vr, title: 'Augmented Reality', subtitle: 'AR/VR | Training | Vision Pro', productId: '3' },
    { imageSrc: architecture, title: 'Architecture: 101', subtitle: 'Structues | Out of box | Learn', productId: '4' },
]

export const appsData = topTrendingData

export const servicesData = [
    { imageSrc: homeCleaning, title: 'Home Cleaning', subtitle: 'Deep cleaning | Plants | Machine wash', productId: '1' },
    { imageSrc: audit, title: 'Texas Audit', subtitle: 'Tax | Records | Filing | Profits', productId: '2' },
    { imageSrc: builders, title: 'Phoenix Builders & Co', subtitle: 'Industry | Contractor', productId: '3' },
    { imageSrc: movingBuddy, title: 'Moving Buddy', subtitle: 'Packaging | Delivery } Transport ', productId: '4' },
    { imageSrc: lawFirm, title: 'McCoy Law Firm', subtitle: 'Law | Legal Services | Immigration', productId: '5' },
    { imageSrc: homeCleaning, title: 'Home Cleaning', subtitle: 'Deep cleaning | Plants | Machine wash', productId: '1' },
    { imageSrc: audit, title: 'Texas Audit', subtitle: 'Tax | Records | Filing | Profits', productId: '2' },
    { imageSrc: builders, title: 'Phoenix Builders & Co', subtitle: 'Industry | Contractor', productId: '3' },
    { imageSrc: movingBuddy, title: 'Moving Buddy', subtitle: 'Packaging | Delivery } Transport ', productId: '4' },
    { imageSrc: lawFirm, title: 'McCoy Law Firm', subtitle: 'Law | Legal Services | Immigration', productId: '5' },
    { imageSrc: audit, title: 'Texas Audit', subtitle: 'Tax | Records | Filing | Profits', productId: '2' },
    { imageSrc: builders, title: 'Phoenix Builders & Co', subtitle: 'Industry | Contractor', productId: '3' },
    { imageSrc: movingBuddy, title: 'Moving Buddy', subtitle: 'Packaging | Delivery } Transport ', productId: '4' },
    { imageSrc: lawFirm, title: 'McCoy Law Firm', subtitle: 'Law | Legal Services | Immigration', productId: '5' },
    { imageSrc: homeCleaning, title: 'Home Cleaning', subtitle: 'Deep cleaning | Plants | Machine wash', productId: '1' },
    { imageSrc: audit, title: 'Texas Audit', subtitle: 'Tax | Records | Filing | Profits', productId: '2' },
    { imageSrc: audit, title: 'Texas Audit', subtitle: 'Tax | Records | Filing | Profits', productId: '2' },
    { imageSrc: builders, title: 'Phoenix Builders & Co', subtitle: 'Industry | Contractor', productId: '3' },
    { imageSrc: movingBuddy, title: 'Moving Buddy', subtitle: 'Packaging | Delivery } Transport ', productId: '4' },
    { imageSrc: lawFirm, title: 'McCoy Law Firm', subtitle: 'Law | Legal Services | Immigration', productId: '5' },
    { imageSrc: homeCleaning, title: 'Home Cleaning', subtitle: 'Deep cleaning | Plants | Machine wash', productId: '1' },
    { imageSrc: audit, title: 'Texas Audit', subtitle: 'Tax | Records | Filing | Profits', productId: '2' },
]

function HomeExplore() {
    const [apps, setApps]: any = useState([]);
    const [games, setGames]: any = useState([]);
    const [movies, setMovies]: any = useState([]);
    const [courses, setCourses]: any = useState([]);
    const [services, setServices]: any = useState([]);
    const [AIproduct, setAIproduct]: any = useState([]);
    const [loading, setLoading]: any = useState(true);

    // const cardData = [
    //     { imageSrc: SampleCategory4, title: 'COD: BLACK OPS', subtitle: 'ACTION | ADVENTURE | STRATEGY', productId: '1' },
    //     { imageSrc: SampleCategory, title: 'RED DEAD REDEMPTION II', subtitle: 'ACTION | ADVENTURE | AAA', productId: '1' },
    //     { imageSrc: SampleCategory3, title: 'Dead Pool & Wolverin', subtitle: 'ACTION | PVP | COMEDY', productId: '1' },
    //     { imageSrc: SampleCategory4, title: 'COD: BLACK OPS', subtitle: 'ACTION | ADVENTURE | STRATEGY', productId: '1' },
    //     { imageSrc: SampleCategory4, title: 'COD: BLACK OPS', subtitle: 'ACTION | ADVENTURE | STRATEGY', productId: '1' },
    //     { imageSrc: SampleCategory2, title: 'AMAZING SPIDER MAN', subtitle: 'ACTION | PVP | COMEDY', productId: '1' }
    // ];


    const newlyAddedData = [
        { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
        { imageSrc: SampleMoviePoster1, title: 'TEXAS CAFE' },
        { imageSrc: SampleMoviePoster2, title: 'TEXAS STYLES & CO.' },
        { imageSrc: SampleMoviePoster3, title: 'TEXAS BOUQETS' },
        { imageSrc: podcastImage, title: 'TEXAS PODCAST SERVICES' },
        { imageSrc: SampleMoviePoster1, title: 'TEXAS CAFE' },
        { imageSrc: SampleMoviePoster2, title: 'TEXAS STYLES & CO.' },
    ];



    const getExploreData = () => {
        setLoading(true);
        const token = getCookies('authToken');

        axios
            .get('https://api.lusso.dev/api/v1/products?size=1000', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                let products: any[] = response.data.products;
                console.log('response.data.products', response.data.products)
                let tempApps: any[] = [];
                let tempGames: any[] = [];
                let tempMovies: any[] = [];
                let tempCourses: any[] = [];
                let tempServices: any[] = [];
                let tempAIProducts: any[] = [];
                products.map((product) => {
                    let requiredData = {
                        imageSrc: product?.exploreImage ? product?.exploreImage : SampleCategory2,
                        title: product?.name,
                        subtitle: Array.isArray(product?.additionalInfo?.genre) ? product?.additionalInfo?.genre?.join(' | ') : typeof (product?.additionalInfo?.genre) === 'string' ? product?.additionalInfo?.genre : 'LUSSO | SAMPLES',
                        productId: product?.productId
                    }
                    console.log('requiredData', requiredData);
                    console.log('product.category', product?.productSpecs?.category);
                    let category = product?.productSpecs?.category;
                    if (category === 'APPS') {
                        tempApps.push(requiredData);
                    } else if (category === 'GAMES') {
                        tempGames.push(requiredData);
                    } else if (category === 'MOVIES') {
                        tempMovies.push(requiredData);
                    } else if (category === 'COURSES') {
                        tempCourses.push(requiredData);
                    } else if (category === 'SERVICES') {
                        tempServices.push(requiredData);
                    } else if (category === 'AI PRODUCT') {
                        tempAIProducts.push(requiredData);
                    }
                });
                setApps(tempApps);
                setGames(tempGames);
                setMovies(tempMovies);
                setCourses(tempCourses);
                setServices(tempServices);
                setAIproduct(tempAIProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error)
                setLoading(false);
            });
    };

    useEffect(() => {

        getExploreData()

    }, []);


    console.log({ topTrendingData })

    return (
        <>
            {/* Banner */}
            <div>
                <BannerSection />
            </div>

            {/* Platform Top 10 */}
            <div className='py-5'>
                <PlatformTopTen />
            </div>

            {/* Top Trending */}
            <div className='py-5'>
                <CategorySection title="Top Trending" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Recommendation */}
            <div className='py-5'>
                <CategorySection title="Recommendation" cards={recomendationData} category={'Apps'} />
            </div>

            {/* Newly Added */}
            <div className='mb-5'>
                <NewlyAddedCategory title='Newly Added' cards={newlyAddedData.concat(newlyAddedData)} />
            </div>

            {/* Action */}
            <div className='py-5'>
                <CategorySection title="Action" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Adventure */}
            <div className='py-5'>
                <CategorySection title="Adventure" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Animation */}
            <div className='py-5'>
                <CategorySection title="Animation" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Newly Added */}
            <div className='mb-5'>
                <NewlyAddedCategory title='Newly Added' cards={newlyAddedData.concat(newlyAddedData)} />
            </div>

            {/* Anime */}
            <div className='py-5'>
                <CategorySection title="Anime" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Comedy */}
            <div className='py-5'>
                <CategorySection title="Comedy" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Kids & Family */}
            <div className='py-5'>
                <CategorySection title="Kids & Family" cards={topTrendingData} category={'Apps'} />
            </div>

            {/* Chat Bot */}
            <ChatBot />
        </>
    )
}

export default HomeExplore