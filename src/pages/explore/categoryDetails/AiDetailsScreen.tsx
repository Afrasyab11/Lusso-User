import { Client } from "@stomp/stompjs";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { default as bannerImg } from '../../../assets/images/explore/category/ai/bg.svg';
import starIcon from '../../../assets/images/explore/category/games/star.svg';
import { getCookies } from '../../../utils/utils';
import { availableAtInfo } from '../../products/NewProductDetails';
import CategorySection from '../CategorySection';
import AdditionalInfo from './Common/AdditionalInfo';
import AvailableAt from './Common/AvailableAt';
import DescriptionSection from './Common/DescriptionSection';
import FeatureSection from './Common/FeatureSection';
import MainBannerWithHeader from './Common/MainBannerWithHeader';
import RatingSection from './Common/RatingSection';
import Screenshots from './Common/Screenshots';
import Sidebar from "./Common/sidebar";
import { getCategoryName } from "./GameDetailsScreen";
export interface HeaderDataType {
    logo: string;
    bannerImage: string;
    title: string;
    rating: number;
    ratingCount: string;
    category: string;
    ageRating: string;
    availableDesc?: string
    desc: string
}
interface AdditionalInfoDataType {
    trailerVideos: string[];
    publisher: string;
    genres: string;
    category: string;
    productSize: string;
    ageRating: string;
    productInfo: {
        Feature?: string;
    };
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

const AiDetailsScreen = ({ isCreator = false }: { isCreator?: boolean }) => {

    const { id }: { id?: string } = useParams();
    const productId = id
    const location = useLocation()
    const segments = location?.pathname?.split('/');
    const category = segments?.[2];

    const filterRelatedData = (data: any) => {
        // console.log(data, 'filter')
        let filterData = data?.filter((e: any) => e.category?.toLowerCase() === getCategoryName(category)?.toLowerCase())
        return filterData
    }

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
    //     try {
    //         const stompClient = new Client({
    //             webSocketFactory: () => new SockJS("https://api.lusso.dev/ws"),
    //             debug: (str) => {
    //                 console.log(`[STOMP Debug] ${str}`);
    //             },
    //             reconnectDelay: 5000,
    //             heartbeatIncoming: 4000,
    //             heartbeatOutgoing: 4000,
    //         });

    //         stompClient.onConnect = () => {
    //             console.log("Connected");
    //             setConnected(true);

    //             // Subscribe to product progress updates
    //             const subscription = stompClient.subscribe(
    //                 `/topic/progress/${productId}`,
    //                 (message) => {
    //                     const progressUpdate = JSON.parse(message.body);
    //                     setReceivedMessages((prevMessages) => [
    //                         ...prevMessages,
    //                         progressUpdate,
    //                     ]);
    //                 }
    //             );

    //             // Unsubscribe on cleanup
    //             return () => subscription.unsubscribe();
    //         };

    //         stompClient.onDisconnect = () => {
    //             console.log("Disconnected");
    //             setConnected(false);
    //         };

    //         stompClient.activate();
    //         setClient(stompClient);

    //         // Cleanup
    //         return () => {
    //             stompClient.deactivate();
    //         };
    //     } catch (activationError) {
    //         console.error("Error during STOMP client setup: ", activationError);
    //     }
    // }, [productId]); // Depend only on productId


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
    const [selectedOption, setSelectedOption] = useState('Subscription');
    const [product, setProduct] = useState("")
    const [headerData, setHeaderData] = useState<HeaderDataType>({
        logo: '',
        bannerImage: '',
        title: '',
        rating: 0,
        ratingCount: '',
        category: '',
        ageRating: '',
        availableDesc: '',
        desc: ``
    });
    const [screenShotData, setScreenShotData]: any[] = useState([]);




    const infoSectionData = {
        title: "Features",
        data: [
            "Unleash the power of 𝐆𝐏𝐓-𝟒 in your searches to get straight to your answer instead of scrolling through endless links",
            "Bing will come back with a relevant, sourced summary to save your time and effort",
            "𝐀 𝐆𝐏𝐓-𝟒 𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐰𝐫𝐢𝐭𝐢𝐧𝐠 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭",
            "Write an email",
            "Create a 5-day itinerary for a dream vacation to Hawaii",
            "Prepare for a job interview",
            "Design a quiz for trivia night",
            "Craft poems",
            "Compose rap lyrics",
            "Weave tales with ease",
            "Read more",
            "𝐀 𝐜𝐫𝐞𝐚𝐭𝐢𝐯𝐞 𝐢𝐦𝐚𝐠𝐞 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫",
            "Just dream it, type it, and let Bing create gorgeous images for 𝐅𝐑𝐄𝐄",
            "𝐀𝐧 𝐚𝐜𝐜𝐮𝐫𝐚𝐭𝐞 𝐥𝐚𝐧𝐠𝐮𝐚𝐠𝐞 𝐭𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐨𝐫 𝐚𝐧𝐝 𝐨𝐩𝐭𝐢𝐦𝐢𝐳𝐞𝐫",
            "Translate multiple languages",
            "Proofread and optimize content in various languages All using 𝐆𝐏𝐓-𝟒",
            "𝐀 𝐟𝐚𝐢𝐭𝐡𝐟𝐮𝐥 𝐚𝐧𝐝 𝐫𝐞𝐥𝐢𝐚𝐛𝐥𝐞 𝐀𝐈-𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐜𝐨𝐩𝐢𝐥𝐨𝐭",
            "Understand your intent and provide accurate information",
            "Personalize responses based on your preferences and previous interactions",
            "Tell jokes, create stories, and even play games with you",
            "Experience the safest, most powerful way to search, chat, and find inspiration in a single app Built on the power of 𝐆𝐏𝐓-𝟒"
        ],
        linkPath: ""
    }

    // const additionalInfoData = {
    //     publisher: "Netflix, Inc.",
    //     genres: "Entertainment",
    //     category: "Apps/Entertainment",
    //     productSize: "50 GB",
    //     ageRating: "PG-18",
    //     compatibility: {
    //         devices: [
    //             "iPhone",
    //             "iPad",
    //             "iPod touch"
    //         ],
    //         requirements: [
    //             "Requires iOS 12.0 or later.",
    //             "Requires iPadOS 12.0 or later."
    //         ]
    //     }
    // };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const [loading, setLoading] = useState(true);
    const [additionalInfoData1, setAdditionalInfoData1] = useState<AdditionalInfoDataType>({
        trailerVideos: [],
        publisher: '',
        genres: '',
        category: '',
        productSize: '',
        productInfo: {
            Feature: ''

        },
        ageRating: '',
        support: {
            phoneNumber: '',
            website: '',
            email: ''
        },
        compatibility: {
            devices: [],
            requirements: []
        }
    });
    const [sourceLinks, setSourceLinks]: any = useState([]);


    const fetchAiData = () => {
        const token = getCookies
            ('authToken');
        axios
            .get(`https://api.lusso.dev/api/v1/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const service = response.data;

                setProduct(service);
                setSourceLinks(service?.sourceLinks);
                setHeaderData({
                    logo: service?.exploreImage,        // Dynamic logo
                    bannerImage: service?.bannerImage,  // Dynamic banner image
                    title: service?.name || 'N/A',               // Dynamic title
                    rating: service?.rating || 'N/A',            // Dynamic rating
                    ratingCount: service?.ratingCount && service?.ratingCount + ' Downloads' || 'N/A',  // Dynamic rating count
                    category: service?.category || 'N/A',        // Dynamic category
                    ageRating: service?.ageRating || 'N/A',      // Dynamic age rating
                    availableDesc: service?.description || 'N/A', // Dynamic description
                    desc: service?.description || 'N/A'         // Dynamic detailed description
                });

                let mediaData: any = [];
                if (service?.mediaLinks) {
                    mediaData = [...service?.mediaLinks?.map((media: any) => media?.url)]; // Just the image URLs
                }

                if (service?.trailerVideos) {
                    mediaData = [
                        ...service?.trailerVideos?.map((trailer: any) => ({
                            video: trailer.url,
                            img: 'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg' // Replace with the actual thumbnail or placeholder
                        })), // Add videos with corresponding images
                        ...mediaData
                    ]
                }

                setScreenShotData(mediaData)
                setAdditionalInfoData1({
                    publisher: service?.createdBy || '',
                    trailerVideos: service?.trailerVideos,
                    genres: service?.subCategory || '',
                    category: service?.category || '',
                    productSize: '',
                    productInfo: {
                        Feature: service?.productInfo.Feature
                    },
                    ageRating: service?.additionalInfo?.audience?.age[0],
                    support: {
                        phoneNumber: service?.additionalInfo?.supportInfo?.PHONE,
                        website: service?.additionalInfo?.supportInfo?.WEBSITE,
                        email: service?.additionalInfo?.supportInfo?.EMAIL
                    },
                    // socialLinks: {
                    //     facebook: service?.additionalInfo?.socialLinks?.Facebook?.link || 'N/A', // Fallback for Facebook link
                    // },
                    compatibility: {
                        devices: service?.additionalInfo?.productComability || [
                            "iPhone",
                            "iPad",
                            "iPod touch"
                        ],
                        requirements: [
                            "Requires iOS 12.0 or later.",
                            "Requires iPadOS 12.0 or later."
                        ]
                    }
                });

            })
            .catch(error => {
                console.error('Error fetching service data:', error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        sendMessage()
        if (navigator.onLine) {

            fetchAiData();
            if (!isCreator) {
                topTrendingData()
                recommendedDataFn()
            }
        } else {
            console.warn("No internet connection, API calls skipped.");
        }
    }, [id]);
    const getReviews = () => {
        setLoading(true);
        const token = getCookies('authToken');
        axios
            .get(
                `https://api.lusso.dev/api/v1/reviews?productId=${id}&page=0&size=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(response => {
                let reviews: any = response.data?.reviews;
                setReviews(reviews);
                console.log('reviews', reviews);
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
    }, [id]);
    const [reviews, setReviews]: any = useState([]);
    const [starDistributions, setStarDistributions] = useState([
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 },
    ]);
    const [reviewStats, setReviewStats] = useState({ rating: 0, ratingCount: '0' });

    const ratingData = {
        starDistribution: starDistributions,
        ratings: reviewStats.rating,
        ratingTotal: reviewStats.ratingCount,
        reviews
    };
    const handleUserAction = (actionType: any) => {
        const token = getCookies('authToken'); // Get the auth token from cookies

        axios.post(
            'https://api.lusso.dev/api/v1/userAction',
            {
                action: actionType,
                productId: id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the auth token
                },
            }
        )
            .then((response) => {
                fetchAiData()
            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
            });
    };
    return (
        <div className="alignCenter bg-blurred-new text-white min-h-screen">
            { }
            <MainBannerWithHeader isCreator={isCreator} bannerImg={headerData.bannerImage} headerData={headerData} handleUserAction={handleUserAction} product={product} />

            <div className='content-new'>
                <div className="lg:max-w-[80%] mx-auto py-3 md:px-4 md:py-8 769-1300:max-w-[100%]">
                    { }
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <MainContent
                            productId={id}
                            product={product}

                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            headerData={headerData}
                            screenshotData={screenShotData}
                            infoSectionData={infoSectionData}
                            additionalInfoData={additionalInfoData1}
                            ratingData={ratingData}
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

const MainBanner = () => (
    <div className="explore-cat-banner">
        { }
        <img src={bannerImg} alt="FIFA 24 Banner" className="explore-cat-banner" />
    </div>
);

const Header = ({ headerData }: any) => (
    <div className="flex items-center mb-8 gap-5">
        <div className='w-[200px] h-[200px] rounded-2xl'>
            <img src={headerData?.logo} alt={`${headerData?.title} logo`} />
        </div>
        <div className='flex flex-col justify-between gap-3'>
            <h1 className="text-4xl font-bold">{headerData?.title}</h1>
            <div className="flex items-center gap-2">
                <p className="text-white text-md flex flex-wrap md:flex-nowrap items-center">
                    <span>{headerData?.rating}</span>
                    <div className='h-4 w-4 mx-2 mb-[2px]'>
                        <img src={starIcon} alt='star' />
                    </div>
                    <span> | {headerData?.ratingCount} ratings | {headerData?.category}</span>
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <p className='text-[#6DDCFF] font-semibold'>Category</p>
                    <p className='text-white'>{headerData.category}</p>
                </div>
                <div>
                    <p className='text-[#6DDCFF] font-semibold'>Age Rating</p>
                    <p className='text-white'>{headerData.ageRating}</p>
                </div>
            </div>
        </div>
    </div>
);

const MainContent = (props: any) => (
    <div className={`w-full md:${props?.isCreator ? 'w-full' : 'w-2/3'}`}>
        <Screenshots
            screenshotData={props?.screenshotData}
            title={'Screenshots'} />

        <AvailableAt
            sourceLinks={props?.sourceLinks}
            infoArr={availableAtInfo}
            selectedOption={props?.selectedOption}
            setSelectedOption={props?.setSelectedOption}
            desc={props?.headerData?.availableDesc}
            isAI={true}
        />

        <DescriptionSection desc={props.headerData?.desc} lineLimit={5} />
        <FeatureSection
            title={"Key Features"}
            productInfo={typeof props.additionalInfoData?.productInfo.Feature === 'object' && !Array.isArray(props.additionalInfoData?.productInfo.Feature) ? props.additionalInfoData.productInfo.Feature : {}}
        />

        {/* <InfoSection
            data={props?.infoSectionData?.data}
            title={props?.infoSectionData?.title}
            linkPath={props?.infoSectionData?.linkPath}
        /> */}

        <AdditionalInfo infoData={props?.additionalInfoData} />

        <RatingSection isCreator={props?.isCreator} ratingDataAverage={{ avaerageRating: props?.product?.rating, memeberToRate: props?.product?.ratingCount }} ratingData={props?.ratingData}
            productId={props?.productId}

        />

        { }
        {props?.isCreator !== true && <><div className='mt-14 mb-20 md:mt-24 md:mb-44 px-3'>
            <CategorySection title="Top Rated" cards={props?.trendingData} category={'AI'}
                isPopup={true}
            />
        </div>

            <div className='md:hidden mb-24 px-3'>
                <CategorySection title="People also view" cards={props?.recommendedData} category={'AI'}
                    isPopup={true}
                />
            </div></>}

    </div>
);

export default AiDetailsScreen