import { useEffect, useState } from 'react';
import cillian from '../../../assets/images/explore/category/courses/Cillian Morphy.png';
import emilley from '../../../assets/images/explore/category/courses/Emiley Blunt.png';
import matt from '../../../assets/images/explore/category/courses/Matt Morphy.png';
import ss1 from '../../../assets/images/explore/category/courses/course-ss-1.png';
import ss2 from '../../../assets/images/explore/category/courses/course-ss-2.png';
import logo from '../../../assets/images/explore/category/courses/logo.png';
import demo1 from '../../../assets/images/explore/category/games/img1.png';
import demo2 from '../../../assets/images/explore/category/games/img2.png';
import demo3 from '../../../assets/images/explore/category/games/img3.png';
import courseraIcon from '../../../assets/images/icons/coursera.svg';
import udemyIcon from '../../../assets/images/icons/udemy.svg';
import AdditionalInfo from '../categoryDetails/Common/AdditionalInfo';
import AvailableAt from '../categoryDetails/Common/AvailableAt';
import Screenshots from '../categoryDetails/Common/Screenshots';

import { Client } from "@stomp/stompjs";
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import teamMember1 from '../../../assets/images/explore/category/team/1.png';
import teamMember2 from '../../../assets/images/explore/category/team/2.png';
import teamMember3 from '../../../assets/images/explore/category/team/3.png';
import certificateIcon from '../../../assets/images/icons/certificate.svg';
import downloadIcon from '../../../assets/images/icons/download.svg';
import keyIcon from '../../../assets/images/icons/key.svg';
import lifetimeIcon from '../../../assets/images/icons/lifetime-@.svg';
import playIcon from '../../../assets/images/icons/play-with-circle.svg';
import tvScreenIcon from '../../../assets/images/icons/tv-screen.svg';
import { getCookies } from '../../../utils/utils';
import CategorySection from '../CategorySection';
import MainBannerWithHeader from '../categoryDetails/Common/MainBannerWithHeader';
import RatingSection from '../categoryDetails/Common/RatingSection';
import Storyline from '../categoryDetails/Common/Storyline';
import TeamMembersGrid from '../categoryDetails/Common/TeamMembersGrid';
import Sidebar from '../categoryDetails/Common/sidebar';
import { getCategoryName } from '../categoryDetails/GameDetailsScreen';
import CourseInfo from './CourseInfo';
export interface Tag {
    name?: string;
    selected?: boolean;
}

export interface HeaderDataType {
    logo?: string;
    title?: string;
    subTitle?: string;
    year?: string;
    duration?: string;
    lectures?: string;
    sections?: string;
    rating?: number;
    ratingCount?: string;
    category?: string;
    author?: string;
    tags?: Tag[];
    ageRating: string;
    desc: string;
    storyline?: string
    titleHeader?: string
}
interface AdditionalInfoDataType {
    trailerVideos: string[];
    publisher: string;
    genres: string;
    category: string;
    productSize: string;
    ageRating: string;
    support: {
        phoneNumber?: string;
        website?: string;
        email: string;
    };
    compatibility: {
        devices: string[];
        requirements: string[];
    };
}
export const LineDraw = () => (
    <svg
        className="mb-5"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 1077 2"
        fill="none"
    >
        <path opacity="0.2" d="M4.37222e-08 0.999906L1077 1" stroke="white" />
    </svg>
);

export const screenshotData = [
    ss1,
    ss2,
    demo2,
    demo3,
    {
        video:
            'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1,
    },
    demo2,
    demo3,
    {
        video:
            'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1,
    },
    demo2,
    demo3,
    {
        video:
            'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1,
    },
    demo2,
    demo3,
];

export const characterData = [
    {
        img: cillian,
        title: 'Cillian Morphy',
        subTitle: 'Instructor',
    },
    {
        img: emilley,
        title: 'Emilley Blunt',
        subTitle: 'Co-Instructor',
    },
    {
        img: matt,
        title: 'Matt Morphy',
        subTitle: 'Co-Instructor',
    },
];

export const availableAtInfo = [
    {
        logo: udemyIcon,
        description:
            'English, Hindi, German, French, Hungarian, Korean, Turkish, Czech, Spanish...',
        purchaseTxt: '',
        price: '10.99/ month',
        subtext: 'Offers In-App Purchases',
    },
    {
        logo: courseraIcon,
        description:
            'English, Hindi, German, French, Hungarian, Korean, Turkish, Czech, Spanish...',
        purchaseTxt: '',
        price: '10.99/ month',
        subtext: 'Offers In-App Purchases',
    },
];

const courseIncludedData = {
    title: "Course Includes",
    data: [
        { icon: playIcon, text: '14 sections • 82 lectures • 4h 32m total length' },
        { icon: downloadIcon, text: '43 downloadable resources' },
        { icon: tvScreenIcon, text: 'Access on mobile and TV' },
        { icon: keyIcon, text: 'Full lifetime access' },
        { icon: lifetimeIcon, text: 'Audio description in existing audio' },
        { icon: certificateIcon, text: 'Certificate of completion' }
    ],
};

export const teamMembersData = [
    {
        name: 'Cillian',
        surname: 'Murphy',
        role: 'Manager',
        imageUrl: teamMember1,
    },
    {
        name: 'Emiley',
        surname: 'Blunt',
        role: 'Relevant field',
        imageUrl: teamMember2,
    },
    {
        name: 'Matt',
        surname: 'Murphy',
        role: 'Relevant field',
        imageUrl: teamMember3,
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


const CourseDetailsScreen = ({ isCreator = false }: { isCreator?: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation()
    const segments = location?.pathname?.split('/');
    const category = segments?.[2];

    const filterRelatedData = (data: any) => {
        // console.log(data, 'filter')
        let filterData = data?.filter((e: any) => e.category?.toLowerCase() === getCategoryName(category)?.toLowerCase())
        return filterData
    }
    const [selectedOption, setSelectedOption] = useState('Subscription');
    const [reviewStats, setReviewStats] = useState({ rating: 0, ratingCount: '0' });
    const [product, setProduct] = useState("")
    const [additionalInfoData1, setAdditionalInfoData1] = useState<AdditionalInfoDataType>({
        trailerVideos: [],
        publisher: '',
        genres: '',
        category: '',
        productSize: '',
        ageRating: '',
        support: { phoneNumber: '', website: '', email: '' },
        compatibility: { devices: [], requirements: [] }
    });
    const [headerData, setHeaderData] = useState<HeaderDataType>({
        logo: logo, // Static fallback
        title: 'Human Computer Interaction', // Static fallback
        titleHeader: 'Teaching & Academics - Science - Renewable Energy', // Static fallback
        subTitle: 'Learning how technology impacts us, and how we impact it',
        year: '2023',
        duration: '3h',
        lectures: '16',
        sections: '3',
        rating: 4.5,
        ratingCount: '330k',
        ageRating: "19",
        category: 'Course',
        author: 'Johnathan Miller',
        tags: [{ name: 'Educational' }, { name: 'Ai' }],
        desc: `Default description.`, // Static fallback
        storyline: `Default storyline.`
    });

    const [mediaData, setMediaData]: any[] = useState([]);
    const [sourceLinks, setSourceLinks]: any = useState([]);

    const [bannerImg, setBannerImg] = useState('');
    const [createdOn, setCreatedOn] = useState('');
    const [creator, setCreator] = useState('');
    const [teamInfo, setTeamInfo] = useState([]);
    const [tags, setTags] = useState([]);
    const [website, setWebsite] = useState('');

    const { id }: { id?: string } = useParams();
    const productId = id;
    const [client, setClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("");
    const [trendingData, setTrendingData] = useState([]);
    const [trendingData1, setTrendingData1] = useState([]);
    const [recommendedData1, setRecommendedData1] = useState([]);
    const [recommendedData, setRecommendedData] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState<any[]>([]); // Adjust type as needed
    const [userData, setUserData] = useState<any>(null);


    const topTrendingData = async () => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get('https://api.lusso.dev/api/v1/products/trending', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Transform data into the required format
            const trendingData = response.data.products.map((product: Product) => ({
                ...product,
                imageSrc: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                category: product.category,
            }));

            setTrendingData(trendingData);
            const trendingData1 = response.data.products.map((product: Product) => ({
                ...product,
                image: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                rating: 4.7,
                category: product.category,
            }));

            setTrendingData1(trendingData1);

        } catch (error) {
            console.error("Error fetching trending products:", error);
            throw error;
        }
    };
    const recommendedDataFn = async () => {
        const token = getCookies('authToken');

        try {
            const response = await axios.get('https://api.lusso.dev/api/v1/products/recommendations', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
            }));

            setRecommendedData1(recommendedData1);
        } catch (error) {
            console.error("Error fetching trending products:", error);
            throw error;
        }
    };
    useEffect(() => {
        const authUser = getCookies('authUser');

        setUserData(authUser);

    }, []);

    // useEffect(() => {
    //     const stompClient = new Client({
    //         brokerURL: "wss://api.lusso.dev/ws",
    //         debug: (str) => {
    //             console.log(str);
    //         },
    //         reconnectDelay: 5000,
    //         heartbeatIncoming: 4000,
    //         heartbeatOutgoing: 4000,
    //         webSocketFactory: () => new SockJS("https://api.lusso.dev/ws"),
    //     });

    //     stompClient.onConnect = (frame) => {
    //         console.log("Connected: " + frame);
    //         setConnected(true);

    //         // Subscribe to the product's progress update topic
    //         stompClient.subscribe(`/topic/progress/${productId}`, (message: Message) => {
    //             const progressUpdate = JSON.parse(message.body);
    //             setReceivedMessages((prevMessages) => [...prevMessages, progressUpdate]);

    //             // topTrendingData();
    //             // recommendedDataFn();
    //         });
    //     };

    //     stompClient.onDisconnect = () => {
    //         console.log("Disconnected");
    //         setConnected(false);
    //     };

    //     stompClient.activate();
    //     setClient(stompClient);

    //     // Cleanup on component unmount
    //     return () => {
    //         stompClient.deactivate();
    //     };
    // }, [productId]);
    useEffect(() => {
        if (client && connected && userData?.userId) {
            const eventPayload = {
                productId,
                userId: userData?.userId,
                eventType: "Click", // Click | Search | Redirect
                timestamp: new Date().getTime(),
            };

            client.publish({
                destination: "/app/product/events",
                body: JSON.stringify(eventPayload),
            });
        }
    }, [client, connected, productId]);

    // Send message handler
    const sendMessage = () => {
        if (client && connected) {

            const eventPayload = {
                productId,
                userId: userData?.userId,
                eventType: "Click",
                timestamp: new Date().getTime(),
            };


            // Send event to the backend
            client.publish({
                destination: "/app/product/events",
                body: JSON.stringify(eventPayload),
            });

            setMessage("");
        }
    };
    const [loading, setLoading]: any = useState(true);
    const [reviews, setReviews]: any = useState([]);
    const [starDistributions, setStarDistributions] = useState([
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 },
    ]);
    const ratingData = {
        starDistribution: starDistributions,
        ratings: reviewStats.rating,
        ratingTotal: reviewStats.ratingCount,
        reviews
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [1]);
    const GetMovieData = () => {
        setIsLoading(true);

        const token = getCookies('authToken');
        axios
            .get(`https://api.lusso.dev/api/v1/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const product = response.data;
                setProduct(product);
                setSourceLinks(product?.sourceLinks);

                // Dynamically set the data, with fallback to static defaults
                setReviewStats({
                    rating: product?.rating || headerData.rating, // Fallback to static
                    ratingCount: product?.ratingCount || headerData.ratingCount // Fallback
                });

                setHeaderData({
                    logo: product?.exploreImage, // Dynamic or fallback
                    title: product?.name || 'N/A',
                    rating: product?.rating || headerData.rating || 'N/A',
                    ratingCount: product?.ratingCount && product?.ratingCount + ' Downloads' || headerData.ratingCount + ' Downloads' || 'N/A',
                    category: product?.category || headerData.category || 'N/A',
                    ageRating: product?.additionalInfo?.audience?.age[0] || headerData.ageRating || 'N/A',
                    desc: product?.description || headerData.desc || 'N/A',
                    storyline: product?.storyline || headerData.storyline || 'N/A',
                    author: product?.createdBy || 'N/A',
                });
                setAdditionalInfoData1({
                    publisher: product?.createdBy || additionalInfoData1.publisher || 'Unknown Publisher',
                    trailerVideos: Array.isArray(product?.trailerVideos) && product.trailerVideos.length > 0
                        ? product.trailerVideos
                        : additionalInfoData1.trailerVideos || [],
                    genres: product?.subCategory || additionalInfoData1.genres || 'Unknown Genre',
                    category: product?.category || additionalInfoData1.category || 'Unknown Category',
                    productSize: product?.additionalInfo?.productSize || additionalInfoData1.productSize || 'N/A', // Added this line
                    ageRating: product?.additionalInfo?.audience?.age[0] || additionalInfoData1.ageRating || 'Not Rated',
                    support: {
                        phoneNumber: product?.additionalInfo?.supportInfo?.PHONE || additionalInfoData1.support.phoneNumber || 'N/A',
                        website: product?.additionalInfo?.supportInfo?.WEBSITE || additionalInfoData1.support.website || 'N/A',
                        email: product?.additionalInfo?.supportInfo?.EMAIL || additionalInfoData1.support.email || 'support@example.com',
                    },
                    compatibility: {
                        devices: Array.isArray(product?.additionalInfo?.productComability) && product.additionalInfo.productComability.length > 0
                            ? product.additionalInfo.productComability
                            : additionalInfoData1.compatibility.devices || ['N/A'],
                        requirements: additionalInfoData1.compatibility.requirements || [],
                    }
                });

                let mediaData: any = [];
                if (product?.mediaLinks) {
                    mediaData = [...product?.mediaLinks?.map((media: any) => media?.url)]; // Just the image URLs
                }

                if (product?.trailerVideos) {
                    mediaData = [
                        ...product?.trailerVideos?.map((trailer: any) => ({
                            video: trailer.url,
                            img: 'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg' // Replace with the actual thumbnail or placeholder
                        })), // Add videos with corresponding images
                        ...mediaData
                    ]
                }

                setMediaData(mediaData); // Fallback to static data
                setBannerImg(product?.bannerImage || bannerImg); // Dynamic or static
                setCreatedOn(product?.createdOn || createdOn);
                setTags(product?.tags || tags);
                setTeamInfo(product?.teamInfo.cast || teamInfo);
                setWebsite(product?.websiteLink || website);
                setCreator(product?.createdBy || creator);
                setIsLoading(false);

            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    };

    useEffect(() => {
        sendMessage()

        if (navigator.onLine) {

            GetMovieData();
            if (!isCreator) {
                topTrendingData()
                recommendedDataFn()
            }
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, [productId]);
    const getReviews = () => {
        setLoading(true);
        const token = getCookies('authToken');
        axios
            .get(
                `https://api.lusso.dev/api/v1/reviews?productId=${productId}&page=0&size=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(response => {
                let reviews: any = response.data?.reviews;
                setReviews(reviews);
                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                setLoading(false);
            });
    };
    useEffect(() => {
        if (navigator.onLine) {

            getReviews()
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, [productId]);

    const handleUserAction = (actionType: any) => {
        const token = getCookies('authToken'); // Get the auth token from cookies

        axios.post(
            'https://api.lusso.dev/api/v1/userAction',
            {
                action: actionType,
                productId: productId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the auth token
                },
            }
        )
            .then((response) => {
                GetMovieData()
            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
            });
    };
    return (
        <div className="alignCenter bg-blurred-new text-white min-h-screen">
            <MainBannerWithHeader isCreator={isCreator} bannerImg={bannerImg} headerData={headerData} isCourse={true} handleUserAction={handleUserAction} product={product} />
            <div className="content-new">
                <div className="lg:max-w-[80%] mx-auto py-3 md:px-4 md:py-8 769-1300:max-w-[100%]">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <MainContent
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            characterData={characterData} // Static Data
                            screenshotData={mediaData}
                            // Static Data
                            additionalInfoData={additionalInfoData1} // Dynamic Data
                            headerData={{
                                data: headerData,
                                setter: (data: any) => setHeaderData(data),
                            }}
                            ratingData={ratingData}
                            productId={productId}
                            product={product}
                            sourceLinks={sourceLinks}
                            trendingData={filterRelatedData(trendingData)}
                            recommendedData={recommendedData1}
                            isCreator={isCreator}

                        />
                        {!isCreator && <Sidebar trendingData={filterRelatedData(trendingData1)}
                            recommendedData={recommendedData} />}
                    </div>
                </div>
            </div>
        </div>
    );
};


const MainContent = (props: any) => {
    const onChangeTag = (index: number) => {
        const newTagData = {
            ...props?.headerData?.data,
            tags: props?.headerData?.data?.tags?.map((tag: any, id: number) => ({
                ...tag,
                selected: id === index ? !tag?.selected : false,
            })),
        };
        props?.headerData?.setter(newTagData);
    };
    return (
        <div className={`w-full md:${props?.isCreator ? 'w-full' : 'w-2/3'}`}>
            <Screenshots
                screenshotData={props?.screenshotData}
                title={'Preview the course'}
            />
            <AvailableAt
                sourceLinks={props?.sourceLinks}
                infoArr={availableAtInfo}
                selectedOption={props?.selectedOption}
                setSelectedOption={props?.setSelectedOption}
            />
            <Storyline desc={props.headerData?.data?.storyline} />
            <CourseInfo description={props?.headerData?.data.desc} />

            <TeamMembersGrid
                members={teamMembersData}
                title='Instructor & Co-Instructors'
            />

            <AdditionalInfo infoData={props?.additionalInfoData} />
            <RatingSection isCreator={props?.isCreator} ratingDataAverage={{ avaerageRating: props?.product?.rating, memeberToRate: props?.product?.ratingCount }} ratingData={props?.ratingData} productId={props?.productId} />

            {props?.isCreator !== true && <div className='mt-14 mb-24 md:mt-24 md:mb-44 px-3'>
                <CategorySection title="Top Rated" cards={props?.trendingData} category={'Course'}
                    isPopup={true}
                />
            </div>}

        </div>
    );
};

export default CourseDetailsScreen;
