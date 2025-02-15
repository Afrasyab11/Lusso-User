import { Client } from "@stomp/stompjs";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import demo1 from '../../../assets/images/explore/category/games/img1.png';
import demo2 from '../../../assets/images/explore/category/games/img2.png';
import demo3 from '../../../assets/images/explore/category/games/img3.png';
import { getCookies } from '../../../utils/utils';
import CategorySection from '../CategorySection';
import AdditionalInfo from './Common/AdditionalInfo';
import AvailableAt from './Common/AvailableAt';
import DescriptionSection from './Common/DescriptionSection';
import FeatureSection from "./Common/FeatureSection";
import MainBannerWithHeader from './Common/MainBannerWithHeader';
import RatingSection from './Common/RatingSection';
import Screenshots from './Common/Screenshots';
import Sidebar from "./Common/sidebar";
interface HeaderDataType {
    logo: string;
    title: string;
    rating: number;
    ratingCount: string;
    category: string;
    ageRating: string;
    desc: string
}

interface infoSectionDataType {
    title: string,
    data: [],
    linkPath: string
}

interface additionalInfoDataType {
    publisher: string,
    genres: string,
    category: string,
    productSize: string,
    productInfo: {
        Feature?: string;
    };
    ageRating: string,
    support: {
        phoneNumber?: string,
        website?: string,
        email: string
    },
    compatibility: {
        devices: string[],
        requirements: string[]
    }
}



export const LineDraw = () => (
    <svg className='mb-5' xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 1077 2" fill="none">
        <path opacity="0.2" d="M4.37222e-08 0.999906L1077 1" stroke="white" />
    </svg>
)

export const screenshotData = [
    {
        video: 'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1
    },
    demo2,
    demo3,
    {
        video: 'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1
    },
    demo2,
    demo3,
    {
        video: 'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1
    },
    demo2,
    demo3,
    {
        video: 'https://videos.pexels.com/video-files/2928382/2928382-hd_1920_1080_30fps.mp4',
        img: demo1
    },
    demo2,
    demo3,
]

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

export function getCategoryName(category: string): string {
    // console.log(category.toLowerCase(), 'cat')
    switch (category.toLowerCase()) {
        case "games":
            return "Game";
        case "game":
            return "Game";
        case "movies":
            return "Movie";
        case "courses":
            return "Course";
        case "course":
            return "Course";
        case "apps":
            return "App";
        case "ai":
            return "AI Products";
        case "ai-products":
            return "AI Products";
        case "services":
            return "Service";
        case "service":
            return "Service";
        case "movie":
         return "Movie";
        default:
            return category;
    }
}

const GameDetailsScreen = ({ isCreator = false }: { isCreator?: boolean }) => {
    const { id }: { id?: string } = useParams();
    const productId = id
    const [client, setClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("");
    const [trendingData, setTrendingData] = useState([]);
    const [trendingData1, setTrendingData1] = useState([]);
    const [recommendedData1, setRecommendedData1] = useState([]);
    const [recommendedData, setRecommendedData] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState<any[]>([]); // Adjust type as needed
    const [userData, setUserData] = useState<any>(null);
    const location = useLocation()
    const segments = location?.pathname?.split('/');
    const category = segments?.[2];


    const filterRelatedData = (data: any) => {
        let filterData = data?.filter((e: any) => e.category?.toLowerCase() === getCategoryName(category)?.toLowerCase())
        return filterData
    }


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
                id: product.productId,
                imageSrc: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                category: product.category
            }));

            setTrendingData(trendingData);
            const trendingData1 = response.data.products.map((product: Product) => ({
                id: product.productId,
                image: product.exploreImage || '',
                title: product.name,
                subtitle: `${product.category} | ${product.subCategory}`,
                productId: product.productId,
                rating: 4.7,
                category: product.category

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

    const [selectedOption, setSelectedOption] = useState('Subscription');
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
    const [headerData, setHeaderData]: any = useState<HeaderDataType>({
        logo: "",
        title: "",
        rating: 0,
        ratingCount: "",
        category: "",
        ageRating: "",
        desc: '',
    });
    const [infoSectionData, setinfoSectionData]: any = useState<infoSectionDataType>({
        data: [],
        linkPath: "",
        title: ""
    });

    const [additionalInfoData, setadditionalInfoData] = useState<additionalInfoDataType>({
        publisher: "",
        genres: "",
        category: "",
        productSize: "",
        productInfo: {
            Feature: ''

        },
        ageRating: "",
        support: {
            phoneNumber: "",
            website: "",
            email: ""
        },
        compatibility: {
            devices: [],
            requirements: []
        }
    })

    const [loading, setLoading] = useState(false);
    const [createdOn, setCreatedOn] = useState('');
    const [productType, setProductType] = useState('');
    const [tags, setTags] = useState([]);
    const [website, setWebsite] = useState('');
    const [bannerImg, setbannerImg] = useState('');
    const [creator, setCreator] = useState('');
    const [images, setImages]: any = useState([]);
    const [product, setProduct]: any = useState({});
    const [similarProducts, setSimilarProducts]: any[] = useState([]);
    const [addReviewFlag, setAddReviewFlag]: any = useState(false);
    const [mediaData, setmediaData]: any[] = useState([]);




    // console.log("productId", productId)

    const GetGameData = () => {

        setLoading(true);
        const token = getCookies('authToken');

        axios
            .get(`https://api.lusso.dev/api/v1/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                const product = response.data;
                let currentProductType = '';

                // Find the current product and set its type

                if (product.productId === productId) {
                    currentProductType = product.productType;

                    setHeaderData({
                        logo: product?.exploreImage,
                        title: product?.name || 'N/A',
                        rating: product?.rating || 'N/A',
                        ratingCount: product?.ratingCount || 'N/A',
                        category: product?.category || 'N/A',
                        ageRating: product?.additionalInfo?.audience?.age[0] || 'N/A',
                        desc: product?.description || 'N/A'
                    })

                    setReviewStats({

                        rating: product?.rating || 'N/A',
                        ratingCount: product?.ratingCount || 'N/A',


                    });
                    setSourceLinks(product?.sourceLinks);
                    setProduct(product);

                    let mediaData: any = [];
                    if (product?.mediaLinks) {
                        mediaData = [...product?.mediaLinks?.map((media: any) => media?.url)]; // Just the image URLs
                    }

                    if (product?.trailerVideos) {
                        mediaData = [
                            ...product?.trailerVideos?.map((trailer: any) => ({
                                video: trailer.url,
                                img: 'https://beebom.com/wp-content/uploads/2022/01/how-to-screenshot-netflix.jpg' // Replace with the actual thumbnail or placeholder
                            })),
                            ...mediaData// Add videos with corresponding images
                        ]
                    }

                    setmediaData(mediaData)
                    setbannerImg(product?.bannerImage)

                    setinfoSectionData({
                        title: "Why You'll Like this Game?",
                        // data: product?.productInfo?.Feature?.Features,
                        data: [],
                        linkPath: ""
                    })

                    setadditionalInfoData({
                        publisher: "",
                        genres: product?.subCategory || "",
                        category: product?.category || "",
                        productSize: "",
                        productInfo: {
                            Feature: product?.productInfo.Feature
                        },
                        ageRating: product?.additionalInfo?.audience?.age[0],
                        support: {
                            phoneNumber: product?.additionalInfo?.supportInfo["PHONE_NUMBER"],
                            website: product?.additionalInfo?.supportInfo["WEBSITE"],
                            email: product?.additionalInfo?.supportInfo["EMAIL"]
                        },
                        compatibility: {
                            devices: product?.additionalInfo?.productComability?.map((dev: string) => dev),
                            requirements: []
                        }
                    })

                    setCreatedOn(product?.createdOn);
                    setTags(product?.tags);
                    setWebsite(product?.websiteLink);
                    setCreator(product?.createdBy);
                    setProductType(currentProductType);
                    // setWishlisted(true);
                }

                axios
                    .get(`https://api.lusso.dev/api/v1/similarProducts?productId=${productId}&productType=${currentProductType}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(response => {
                        setSimilarProducts(response.data.products);
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.log('error', error);
                setLoading(false);
            });
    };
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
                GetGameData()
                // Optionally, update the state or UI to reflect the action
            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
                // Handle errors, maybe show a notification to the user
            });
    };



    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    useEffect(() => {

        sendMessage()
        if (navigator.onLine) {

            GetGameData()
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

    // render
    return (
        <div className="alignCenter bg-blurred-new text-white min-h-screen">
            <MainBannerWithHeader isCreator={isCreator} bannerImg={bannerImg} headerData={headerData} handleUserAction={handleUserAction} product={product} />
            {/* <button onClick={sendMessage}>Send Event</button> */}
            <div className='content-new'>
                <div className="lg:max-w-[80%] mx-auto py-3 md:px-4 md:py-8 769-1300:max-w-[100%]">

                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <MainContent
                            productId={productId}
                            product={product}
                            trendingData={filterRelatedData(trendingData)}
                            recommendedData={recommendedData1}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            headerData={headerData}
                            ratingData={ratingData}
                            ratingDataOfReview={reviews}
                            screenshotData={mediaData}
                            infoSectionData={infoSectionData}
                            additionalInfoData={additionalInfoData}
                            sourceLinks={sourceLinks}
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

const MainContent = (props: any) => (
    <div className={`w-full md:${props?.isCreator ? 'w-full' : 'w-2/3'}`}>
        <Screenshots
            screenshotData={props?.screenshotData}
            title={'Screenshots'} />

        <AvailableAt
            selectedOption={props?.selectedOption}
            setSelectedOption={props?.setSelectedOption} sourceLinks={props?.sourceLinks} />

        <DescriptionSection desc={props.headerData?.desc} lineLimit={5} />
        <FeatureSection title={"Why You'll Like This Game?"}
            productInfo={props?.additionalInfoData.productInfo.Feature}
        />

        {/* <InfoSection
            data={props?.infoSectionData?.data}
            title={props?.infoSectionData?.title}
            linkPath={props?.infoSectionData?.linkPath}
        /> */}

        <AdditionalInfo infoData={props?.additionalInfoData} />

        <RatingSection isCreator={props?.isCreator} ratingDataAverage={{ avaerageRating: props?.product?.rating, memeberToRate: props?.product?.ratingCount }} ratingData={props?.ratingData} productId={props?.productId} />

        {props?.isCreator !== true && <div className='md:hidden mt-14 mb-20 px-3'>
            {/* isPopup={true} */}
            <CategorySection title="PEOPLE ALSO VIEW" cards={props?.recommendedData} category={'Game'}
                isPopup={true}
            />
        </div>}

        {props?.isCreator !== true && <div className='mb-24 md:mt-24 md:mb-44 px-3'>
            <CategorySection title="Top Rated" cards={props?.trendingData} category={'Game'}
                isPopup={true}
            />
        </div>}
    </div>
);


export default GameDetailsScreen;