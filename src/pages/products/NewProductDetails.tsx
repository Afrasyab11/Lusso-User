import { useEffect, useRef, useState } from 'react';
//import rightArrow from "../../assets/images/rightArrowIcon.svg"
import appleTv from '../../assets/images/apple-tv.png';
import defaultIcon from '../../assets/images/icons/flickr.svg';
import Udemy from '../../assets/images/icons/udemy.svg';
import { default as playstore, default as playstore_icon } from '../../assets/images/playstore.svg';
import primeVideo from '../../assets/images/primevideo.svg';
import vimeo from '../../assets/images/vimeo.svg';
import youtube from '../../assets/images/youtube.svg';
import './NewProductDetails.scss';

import netflix_title from '../../assets/images/netflix-title.png';

import { Client } from "@stomp/stompjs";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getCookies } from '../../utils/utils';
import AdditionalInfo from '../explore/categoryDetails/Common/AdditionalInfo';
import AvailableAt from '../explore/categoryDetails/Common/AvailableAt';
import DescriptionSection from '../explore/categoryDetails/Common/DescriptionSection';
import FeatureSection from '../explore/categoryDetails/Common/FeatureSection';
import MainBannerWithHeader from '../explore/categoryDetails/Common/MainBannerWithHeader';
import RatingSection from '../explore/categoryDetails/Common/RatingSection';
import Screenshots from '../explore/categoryDetails/Common/Screenshots';
import Sidebar from '../explore/categoryDetails/Common/sidebar';
import CategorySection from '../explore/CategorySection';
type IconMap = {
    [key: string]: string;
};

const screenshotsArr = [
    'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg',
    'https://www.gizchina.com/wp-content/uploads/images/2023/01/imagem_2023-01-31_094302152.png',
    'https://qph.cf2.quoracdn.net/main-qimg-70da4715d61313aeca1632f8ef490f3b-lq',
    // 'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg',
    // 'https://www.gizchina.com/wp-content/uploads/images/2023/01/imagem_2023-01-31_094302152.png',
    // 'https://qph.cf2.quoracdn.net/main-qimg-70da4715d61313aeca1632f8ef490f3b-lq',
];

export const availableAtInfo = [
    {
        logo: playstore_icon,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing
                                                        elit. Laborum nostrum beatae rerum earum iusto quae
                                                        blanditiis quod maiores fugiat repellendus, minima
                                                        velit iste doloribus cum voluptate quia consequatur,
                                                        rem quam.`,
        purchaseTxt: '',
        price: '10.99/ month',
        subtext: 'Offers In-App Purchases',
    },
    {
        logo: playstore_icon,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing
                                                        elit. Laborum nostrum beatae rerum earum iusto quae
                                                        blanditiis quod maiores fugiat repellendus, minima
                                                        velit iste doloribus cum voluptate quia consequatur,
                                                        rem quam.`,
        purchaseTxt: '',
        price: '10.99/ month',
        subtext: 'Offers In-App Purchases',
    },
];

const infoSectionData = {
    title: 'Features',
    data: [
        'We add TV shows and movies all the time. Browse new titles or search for your favorites, and stream videos right on your device.',
        'The more you watch, the better Netflix gets at recommending TV shows and movies you’ll love.',
        'Beat your stars, complete puzzle quests, and collect awesome rewards',
        'Master the epic game time target and win',
        'Relaxing, stress relief time killer game to play whenever and wherever you want',
        'Fight alongside the bravest warriors of the kingdom and conquer all the amazing challenges',
        'Boost your experience with awesome power-ups and boosters and pop all the colorful balloons',
    ],
    linkPath: '',
};

export interface Tag {
    name?: string;
    selected?: boolean;
}

export interface HeaderDataType {
    logo?: string;
    title?: string;
    rating?: number;
    ratingCount?: string;
    ageRating: string;
    category?: string;
    desc?: string;
    tags?: Tag[];
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

const NewProductDetails = () => {
    const [selectedOption, setSelectedOption]: any = useState('All');
    const [bannerImg, setbannerImg] = useState('');
    const [product, setProduct] = useState("")
    const [avlType, setAvlType]: any = useState('All');
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [loading, setLoading]: any = useState(true);
    const [hoveredCategory, setHoveredCategory]: any = useState();
    const [productInfo, setProductInfo]: any = useState({});
    const [mediaLinks, setMediaLinks]: any[] = useState([]);
    const [platformList, setPlatformList]: any[] = useState([]);
    const [sourceLinks, setSourceLinks]: any = useState([]);

    const [reviewStats, setReviewStats] = useState({

        rating: 0,
        ratingCount: '0'


    })
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
    const [headerData, setHeaderData] = useState<HeaderDataType>({
        logo: netflix_title,
        title: 'Netflix',
        rating: 4.5,
        ratingCount: '330k',
        category: 'Entertainment',
        ageRating: '12+',
        tags: [
            { name: 'Educational', selected: false },
            { name: 'Ai', selected: false },
            { name: 'CS', selected: false },
            { name: 'Computer', selected: false },
            { name: 'Biography', selected: false },
            { name: 'Drama', selected: false },
        ],
        desc: `Looking for the most talked about TV shows and movies from around the world? They’re all on Netflix.
We’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break.

Netflix membership is a month-to-month subscription that begins at sign up. You can easily cancel anytime, online, 24 hours a day. Looking for the most talked about TV shows and movies from around the world? They’re all on Netflix.
We’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break.

Netflix membership is a month-to-month subscription that begins at sign up. You can easily cancel anytime, online, 24 hours a day.`,
    });
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

    // const handleClick = () => {
    //     if (videoRef.current && imageRef.current) {
    //         imageRef.current.style.display = "none";
    //         videoRef.current.style.display = "block";
    //         videoRef.current.play();
    //     }
    // };
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
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const iconMap: IconMap = {
        Youtube: youtube,
        Appletv: appleTv,
        ' Playstore': playstore,
        Amazonprimevideos: primeVideo,
        ' Vimeo': vimeo,
        Udemy: Udemy,
    };

    // Define the type for your function parameter
    const findIcon = (name: string): string => iconMap[name] || defaultIcon; // Replace `string` with the appropriate return type

    const getAppsData = () => {
        setLoading(true);
        const token = getCookies('authToken');
        axios
            .get(`https://api.lusso.dev/api/v1/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                let productData: any = response.data;

                setProduct(productData)
                setHeaderData({
                    logo: productData.bannerImage,
                    title: productData.name || 'N/A',
                    rating: productData?.rating || 'N/A',
                    ratingCount: productData?.ratingCount || 'N/A',
                    category: productData.category || 'N/A',
                    ageRating: productData?.additionalInfo?.audience?.age[0] || 'N/A',
                    desc: productData.description || 'N/A',
                    tags: [],
                });

                setReviewStats({

                    rating: productData?.rating || 4.5,
                    ratingCount: productData?.ratingCount || '330k',


                });
                setbannerImg(response?.data?.bannerImage)
                const mediaData = [
                    ...productData?.trailerVideos.map((trailer: any) => ({
                        video: trailer.url,
                        img: 'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg' // Replace with the actual thumbnail or placeholder
                    })), // Add videos with corresponding images
                    ...productData?.mediaLinks.map((media: any) => media.url) // Just the image URLs
                ];

                setMediaLinks(mediaData);
                setSourceLinks(productData.sourceLinks);

                setProductInfo(productData?.productInfo);
                setAdditionalInfoData1({
                    publisher: productData?.createdBy || '',
                    trailerVideos: productData?.trailerVideos,
                    genres: productData?.subCategory || '',
                    category: productData?.category || '',
                    productSize: '',
                    productInfo: {
                        Feature
                            : productData?.productInfo.Feature
                    },
                    ageRating: productData?.additionalInfo?.audience?.age[0],
                    support: {
                        phoneNumber: productData?.additionalInfo?.supportInfo?.PHONE,
                        website: productData?.additionalInfo?.supportInfo?.WEBSITE,
                        email: productData?.additionalInfo?.supportInfo?.EMAIL
                    },
                    compatibility: {
                        devices: productData?.additionalInfo?.productComability || [
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
                let platformData = productData?.sourceLinks;
                let updatedPlatformData: any[] = [];
                if (platformData) {
                    platformData.map((platform: any) => {
                        const platformItem = {
                            icon: findIcon(platform?.name), // Replace with the actual icon if needed
                            subscription: platform?.price,
                            height: '40px',
                            url: platform?.link,
                            quality: platform?.quality,
                            audio: platform?.audio,
                            captions: platform?.captions,
                        };
                        updatedPlatformData.push(platformItem);
                    });
                    setPlatformList(updatedPlatformData);
                }
                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        sendMessage()
        if (navigator.onLine) {

            getAppsData();
            topTrendingData()
            recommendedDataFn()
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
                getAppsData();

            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
                // Handle errors, maybe show a notification to the user
            });
    };

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
    }, [productId]);


    return (
        // <div className="product-details-wrapper">
        <div className="alignCenter bg-blurred-new text-white min-h-screen">
            <MainBannerWithHeader bannerImg={bannerImg} headerData={headerData} handleUserAction={handleUserAction} product={product} />

            <div className="content-new">
                <div className="lg:max-w-[80%] mx-auto py-3 md:px-4 md:py-8 769-1300:max-w-[100%]">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="w-full md:w-2/3">
                            <Screenshots
                                screenshotData={mediaLinks}
                                title={'Screenshots'}
                            />

                            <AvailableAt
                                sourceLinks={sourceLinks}
                                infoArr={availableAtInfo}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                            />

                            <DescriptionSection desc={headerData?.desc ?? ''} lineLimit={3} />

                            <FeatureSection
                                title={'Features'}
                                productInfo={typeof additionalInfoData1?.productInfo.Feature === 'object' && !Array.isArray(additionalInfoData1?.productInfo.Feature) ? additionalInfoData1.productInfo.Feature : {}}
                            />

                            {/* <InfoSection
                                data={infoSectionData?.data}
                                title={infoSectionData?.title}
                                linkPath={infoSectionData?.linkPath}
                            /> */}
                            <AdditionalInfo infoData={additionalInfoData1} />

                            <RatingSection ratingData={ratingData}
                                productId={productId}

                            />

                            <div className="mb-5 px-3">
                                <CategorySection
                                    title="Top Rated"
                                    cards={trendingData}
                                    category={'Apps'}
                                />
                            </div>

                            <div className="md:hidden mb-5 px-3">
                                <CategorySection
                                    // title="Apps"
                                    title="PEOPLE ALSO VIEW"
                                    cards={recommendedData1}
                                    category={'Apps'}
                                />
                            </div>
                        </div>
                        <Sidebar
                            trendingData={trendingData} recommendedData={recommendedData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProductDetails;
