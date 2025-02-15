
import { Client } from "@stomp/stompjs";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCookies } from '../../../utils/utils';
import CategorySection from '../CategorySection';
import AdditionalInfo from '../categoryDetails/Common/AdditionalInfo';
import DescriptionSection from '../categoryDetails/Common/DescriptionSection';
import MainBannerWithHeader from '../categoryDetails/Common/MainBannerWithHeader';
import RatingSection from '../categoryDetails/Common/RatingSection';
import Screenshots from '../categoryDetails/Common/Screenshots';
import TeamMembersGrid from '../categoryDetails/Common/TeamMembersGrid';
import Sidebar from "../categoryDetails/Common/sidebar";
import { getCategoryName } from "../categoryDetails/GameDetailsScreen";
import AvailableAt from './AvailableAt';
import MovieDesc from "./MovieDesc";

export interface HeaderDataType {
    logo: string;
    title: string;
    rating: number;
    ratingCount: string;
    category: string;
    ageRating: string;
    desc: string;
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
    <svg className='mb-5' xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 1077 2" fill="none">
        <path opacity="0.2" d="M4.37222e-08 0.999906L1077 1" stroke="white" />
    </svg>
)
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
const MovieDetailsScreen = ({ isCreator = false }: { isCreator?: boolean }) => {
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
        // console.log(data, 'filter')
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
    const [reviewStats, setReviewStats] = useState({

        rating: 0,
        ratingCount: '0'


    })
    const [isLoading, setIsLoading] = useState(false);

    const [sourceLinks, setSourceLinks]: any = useState([]);
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
        logo: '',
        title: '',
        rating: 0,
        ratingCount: '0',
        category: '',
        ageRating: '',
        desc: ''
    });

    const [additionalInfoData1, setAdditionalInfoData1] = useState<AdditionalInfoDataType>({
        trailerVideos: [],
        publisher: '',
        genres: '',
        category: '',
        productSize: '',
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

    const [mediaData, setMediaData]: any[] = useState([]);
    const [product, setProduct] = useState("")
    const [bannerImg, setBannerImg] = useState('');
    const [createdOn, setCreatedOn] = useState('');
    const [creator, setCreator] = useState('');
    const [teamInfo, setTeamInfo] = useState([]);
    const [tags, setTags] = useState([]);
    const [website, setWebsite] = useState('');

    const [starDistribution, setStarDistribution] = useState([
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 },
    ]);



    const GetMovieData = () => {
        const token = getCookies('authToken');
        setIsLoading(true);

        axios
            .get(`https://api.lusso.dev/api/v1/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                const product = response.data;
                setProduct(product)
                setIsLoading(false);

                setReviewStats({

                    rating: product?.rating || 4.5,
                    ratingCount: product?.ratingCount || '330k',


                });
                setHeaderData({
                    logo: product?.exploreImage,
                    title: product?.name || 'N/A',
                    rating: product?.rating || 'N/A',
                    ratingCount: product?.ratingCount || 'N/A',
                    category: product?.category || 'N/A',
                    ageRating: product?.additionalInfo?.audience?.age[0] || 'N/A',
                    desc: product?.description || 'N/A'
                });

                setAdditionalInfoData1({
                    publisher: product?.createdBy || '',
                    trailerVideos: product?.trailerVideos,
                    genres: product?.subCategory || '',
                    category: product?.category || '',
                    productSize: '',
                    ageRating: product?.additionalInfo?.audience?.age[0],
                    support: {
                        phoneNumber: product?.additionalInfo?.supportInfo?.PHONE,
                        website: product?.additionalInfo?.supportInfo?.WEBSITE,
                        email: product?.additionalInfo?.supportInfo?.EMAIL
                    },
                    compatibility: {
                        devices: product?.additionalInfo?.productComability || [
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

                setMediaData(mediaData);


                setBannerImg(product?.bannerImage);
                setCreatedOn(product?.createdOn);
                setSourceLinks(product?.sourceLinks);
                setTags(product?.tags || []);
                setTeamInfo(product?.teamInfo.cast || []);
                setWebsite(product?.websiteLink || '');
                setCreator(product?.createdBy || '');
            })
            .catch(error => {
                console.log('Error fetching data', error);
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
                GetMovieData()
                // Optionally, update the state or UI to reflect the action
            })
            .catch((error) => {
                console.error(`Error performing ${actionType} action`, error);
                // Handle errors, maybe show a notification to the user
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
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [1]);

    console.log({ trendingData })


    return (
        <>

            <div className="alignCenter bg-blurred-new text-white min-h-screen">
                <MainBannerWithHeader
                    bannerImg={bannerImg}
                    headerData={headerData}
                    handleUserAction={handleUserAction}
                    product={product}
                    isCreator={isCreator}
                />
                <div className="content-new">
                    <div className="lg:max-w-[80%] mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row md:space-x-8">
                            <MainContent
                                headerData={headerData}
                                sourceLinks={sourceLinks}
                                additionalInfoData={additionalInfoData1}
                                mediaData={mediaData}
                                trailerData={additionalInfoData1?.trailerVideos ? additionalInfoData1?.trailerVideos : []}
                                teamInfo={teamInfo.length ? teamInfo : []}

                                productId={productId}
                                product={product}
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

        </>
    );

};


const MainContent = ({ isCreator = false, headerData, additionalInfoData, mediaData, trailerData, teamInfo, ratingData, productId, product, sourceLinks, trendingData, recommendedData }: any) => (
    <div className={`w-full md:${isCreator ? 'w-full' : 'w-2/3'}`}>
        <Screenshots
            screenshotData={mediaData}
            title={'Trailer & Snapshot'} />
        {/* <Trailor trailerData={trailerData} /> */}

        <AvailableAt sourceLinks={sourceLinks} />
        <DescriptionSection desc={headerData?.desc} isMovie={true} />
        <MovieDesc />
        <TeamMembersGrid
            members={teamInfo}
            title='Cast'
        />

        {/* <Storyline desc={headerData?.storyline} /> */}
        {/* <Details /> */}

        {/* <Cast teamInfo={teamInfo} /> */}
        <AdditionalInfo infoData={additionalInfoData} />
        <RatingSection isCreator={isCreator} ratingDataAverage={{
            avaerageRating: product?.rating, memeberToRate: product?.ratingCount
        }} productId={productId} />

        {/* Recommendation */}
        {!isCreator && <div className='mt-14 mb-24 md:mt-24 md:mb-44 px-0'>
            <CategorySection title="Recommended" cards={trendingData} category={'Movies'}
                isPopup={true}
            />
        </div>}
    </div>
);

export default MovieDetailsScreen;