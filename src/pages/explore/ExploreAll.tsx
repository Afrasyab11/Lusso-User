import '../../assets/css/home-explore.css';

// assets
import SampleMoviePoster1 from '../../assets/images/NewlyMoviePoster1.svg';
import SampleMoviePoster2 from '../../assets/images/NewlyMoviePoster2.svg';
import SampleMoviePoster3 from '../../assets/images/NewlyMoviePoster3.svg';
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
import audit from '../../assets/images/home/products/audit.png';
import builders from '../../assets/images/home/products/builders.png';
import homeCleaning from '../../assets/images/home/products/home-cleaning.png';
import lawFirm from '../../assets/images/home/products/law-firm.png';
import movingBuddy from '../../assets/images/home/products/moving-buddy.png';
// components
import { useLocation } from 'react-router-dom';
import CategorySection from '../explore/CategorySection';
import ChatBot from '../explore/ChatBot';
import NewlyAddedCategory from '../home/NewlyAddedCategory';
import FilterExplore from './FilterExplore';


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
function ExploreAll() {

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


    const location = useLocation()
    const pathSegments = location.pathname.split('/');
    const type = pathSegments[2]; // This should be 'apps', 'courses', or 'games'

    // static data
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
                { title: "Action", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
                { title: "Adventure", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
                { title: "Animation", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
                { title: "Anime", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
                { title: "Comedy", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
                { title: "Drama", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
                { title: "Kids & Family", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
                { title: "Documentary", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
                { title: "Horror", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
                { title: "Romance", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
                { title: "Romantic Comedy", component: CategorySection, props: { category: 'Movie', cards: coursesData } },
                { title: "Sci-Fi/Fantasy", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
                { title: "Sports", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
                { title: "Thriller", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
                { title: "Mystery", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
                { title: "Stand-Up", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
                { title: "Independent", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
                { title: "Reality", component: CategorySection, props: { category: 'Movie', cards: coursesData } },
                { title: "Suspense", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
                { title: "Crime", component: CategorySection, props: { category: 'Movie', cards: recomendationData } },
                { title: "Fantasy", component: CategorySection, props: { category: 'Movie', cards: topTrendingData } },
                { title: "International", component: CategorySection, props: { category: 'Movie', cards: moviesData } },
                { title: "LGBTQ", component: CategorySection, props: { category: 'Movie', cards: servicesData } },
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

    const config = categoryConfig[type] || {};

    // render based on category
    const renderSections = () => {
        let newlyAddedCount = 0;
        const maxNewlyAdded = 2;
        const sections: JSX.Element[] = [];

        config.sections.forEach((section: any, index: number) => {
            sections.push(
                <div key={`section-${index}`} className='py-5'>
                    <section.component title={section.title} {...section.props} />
                </div>
            );

            // Add "Newly Added" section after every newlyAddedInterval sections
            if ((index + 1) % config.newlyAddedInterval === 0 && newlyAddedCount < maxNewlyAdded) {
                sections.push(
                    <div key={`newly-added-${newlyAddedCount}`} className='py-5'>
                        <NewlyAddedCategory title='Newly Added' cards={newlyAddedData} />
                    </div>
                );
                newlyAddedCount++;
            }
        });

        return sections;
    };

    return (
        <>

            {/* Heading */}
            <div className="category-header flex justify-center items-center my-[50px]">
                <p className="text-4xl md:text-5xl lg:text-6xl text-white font-semibold uppercase tracking-wide">
                    {/* Category Selected: */}
                    <span className="text-yellow-400 font-bold ml-3">
                        {type}
                    </span>
                </p>
            </div>


            {/* Filter Section */}
            <FilterExplore />


            {/* Sub Categories */}
            {renderSections()}

            <ChatBot />
        </>
    );

}

export default ExploreAll